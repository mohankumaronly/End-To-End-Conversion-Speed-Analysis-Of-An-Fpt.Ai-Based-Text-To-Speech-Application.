// controllers/ttsController.js
import path from "path";
import fs from "fs/promises";                // promise-based fs for stat/unlink
import fsSync from "fs";                    // sync/fs stream functions (createWriteStream)
import fsExtra from "fs-extra";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { parseFile } from "music-metadata";
import { User } from "../models/userModel.js";

const UPLOAD_DIR = path.resolve("uploads", "tts");

// ensure upload dir exists at startup
await fsExtra.ensureDir(UPLOAD_DIR);

const FPT_URL = "https://api.fpt.ai/hmi/tts/v5";
const SERVER_API_KEY = process.env.FPT_API_KEY;

/**
 * POST /user/tts/generate
 * Body: raw text/plain (handled by express.text() at app level)
 * Headers: optional "voice" and "speed"
 */
export async function generateTTS(req, res) {
  console.log(
    '>>> generateTTS called; method=',
    req.method,
    'url=',
    req.originalUrl,
    'authHeader=',
    !!req.headers.authorization,
    'content-type=',
    req.headers['content-type'],
    'bodyType=',
    typeof req.body,
    'bodyLen=',
    (typeof req.body === 'string' ? req.body.length : 'n/a')
  );

  try {
    const userId = req.user?._id || req.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const text = (typeof req.body === "string" && req.body.trim()) ? req.body.trim() : req.query.text;
    if (!text) return res.status(400).json({ error: "text is required" });

    const voice = req.headers["voice"] || req.query.voice || "banmai";
    const speed = parseFloat(req.headers["speed"] || req.query.speed || "1.0");

    const apiKeyToUse = SERVER_API_KEY;
    if (!apiKeyToUse) {
      return res.status(500).json({ error: "Server TTS API key not configured (FPT_API_KEY)" });
    }

    // Call FPT TTS
    const fptResp = await axios.post(FPT_URL, text, {
      headers: {
        "api-key": apiKeyToUse,
        "speed": String(speed),
        "voice": voice,
        "content-type": "text/plain",
      },
      timeout: 30000,
    });

    // safe logging
    console.log('[TTS] FPT status:', fptResp.status);
    console.log('[TTS] FPT data keys:', fptResp.data && typeof fptResp.data === 'object' ? Object.keys(fptResp.data) : typeof fptResp.data);
    // optional: log summary of fields you care about
    if (fptResp.data && typeof fptResp.data === 'object') {
      console.log('[TTS] FPT sample fields:', {
        async: !!fptResp.data.async,
        sync: !!fptResp.data.sync,
        request_id: fptResp.data.request_id || null,
        message: fptResp.data.message || null,
      });
    }

    // extract audio URL/token (safe)
    let audioUrl = null;
    if (fptResp?.data) {
      audioUrl = fptResp.data.async || fptResp.data.sync || fptResp.data.url || null;
    }

    if (!audioUrl) {
      return res.status(500).json({
        error: "No audio URL returned from FPT",
        fptSummary: {
          status: fptResp.status,
          dataKeys: fptResp.data && typeof fptResp.data === 'object' ? Object.keys(fptResp.data) : [],
        }
      });
    }

    console.log('[TTS] attempting to fetch audioUrl:', audioUrl);

    // Helper: fetch audio stream with api-key header and retry once.
    async function fetchAudioStreamWithRetry(url, apiKey, tries = 2, delayMs = 1200) {
      for (let attempt = 1; attempt <= tries; attempt++) {
        try {
          const audioResp = await axios.get(url, {
            responseType: "stream",
            headers: {
              // include api-key in case file host expects it
              "api-key": apiKey,
              "Accept": "*/*"
            },
            timeout: 15000,
            maxRedirects: 5
          });

          const ct = audioResp.headers['content-type'] || '';
          if (!audioResp.status || audioResp.status >= 400 || ct.includes('text/html')) {
            const summary = {
              status: audioResp.status,
              statusMessage: audioResp.statusText,
              contentType: ct,
              contentLength: audioResp.headers['content-length']
            };
            throw new Error('File not ready or returned non-audio content: ' + JSON.stringify(summary));
          }

          return audioResp; // success
        } catch (e) {
          if (attempt === tries) throw e;
          await new Promise((r) => setTimeout(r, delayMs));
        }
      }
      throw new Error('Failed to fetch audio after retries');
    }

    // attempt to fetch audio
    const audioResp = await fetchAudioStreamWithRetry(audioUrl, apiKeyToUse, 2, 1200);

    // Determine extension and filename
    const contentType = audioResp.headers["content-type"] || "application/octet-stream";
    const ext = contentType.includes("mpeg") || contentType.includes("mp3") ? ".mp3" : ".bin";
    const filename = `${uuidv4()}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    // write stream to file (use fsSync.createWriteStream)
    await new Promise((resolve, reject) => {
      const writeStream = fsSync.createWriteStream(filepath);
      audioResp.data.pipe(writeStream);
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    // file stats and metadata
    const stats = await fs.stat(filepath);
    const sizeBytes = stats.size;
    let durationSec = null;
    try {
      const meta = await parseFile(filepath);
      durationSec = meta.format?.duration ? Math.round(meta.format.duration * 100) / 100 : null;
    } catch (metaErr) {
      console.warn("music-metadata parse failed:", metaErr?.message || metaErr);
    }

    const publicUrl = `/uploads/tts/${filename}`;

    // Add record to user document
    const ttsRecord = {
      filename,
      url: publicUrl,
      text,
      voice,
      speed,
      sizeBytes,
      mimeType: contentType,
      durationSec,
      createdAt: new Date()
    };

    const user = await User.findByIdAndUpdate(userId, { $push: { ttsRecords: ttsRecord } }, { new: true });
    if (!user) {
      // cleanup orphaned file
      await fs.unlink(filepath).catch(() => { });
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      ok: true,
      file: {
        filename,
        url: publicUrl,
        sizeBytes,
        mimeType: contentType,
        durationSec
      },
      ttsRecord
    });

  } catch (err) {
    // log safe details server-side
    console.error("generateTTS error:", err?.response?.data || err.message || err);
    const safeDetail = err?.response && err.response.data ? (
      (typeof err.response.data === 'object' ? Object.keys(err.response.data) : String(err.response.data))
    ) : err.message;
    return res.status(500).json({ error: "Failed to generate TTS", detail: safeDetail });
  }
}

export async function getTTSHistory(req, res) {
  try {
    const userId = req.user?._id || req.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    // select only ttsRecords to keep payload small
    const user = await User.findById(userId).select('ttsRecords');
    if (!user) return res.status(404).json({ error: "User not found" });

    const records = Array.isArray(user.ttsRecords) ? user.ttsRecords.slice().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
    return res.json({ ok: true, records });
  } catch (err) {
    console.error('getTTSHistory error:', err);
    return res.status(500).json({ error: "Failed to fetch TTS history" });
  }
}