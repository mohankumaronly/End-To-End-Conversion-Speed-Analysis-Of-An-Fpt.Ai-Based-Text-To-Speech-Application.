import React, { useState } from 'react';
import { FileText, DollarSign, Clock, RefreshCw, Volume2, Play, Download, ArrowLeft, Zap, MessageSquare } from 'lucide-react';
import AIChatBox from './AIChatBox';

const VOICE_OPTIONS = [
  { id: 'VN-M-1', name: 'Le Anh (Male, North)', accent: 'Vietnamese', price: 0.005 },
  { id: 'VN-F-2', name: 'Thanh Mai (Female, South)', accent: 'Vietnamese', price: 0.005 },
  { id: 'EN-F-3', name: 'Sophia (Female, English)', accent: 'English', price: 0.003 },
  { id: 'VN-F-5', name: 'Minh Chau (Female, HQ)', accent: 'Vietnamese', price: 0.006 },
];

const TTSConverterDashboard = ({ history = [], setHistory, onViewChange }) => {
  const [prompt, setPrompt] = useState(
    'Type your text here to convert it into natural speech. Try describing a scene from Hanoi or Ho Chi Minh City to test the Vietnamese accent models.'
  );
  const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[0].id);
  const [speed, setSpeed] = useState(1.0);
  const [isConverting, setIsConverting] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const charCount = prompt.length;
  const maxChars = 1000;
  const currentVoice = VOICE_OPTIONS.find((v) => v.id === selectedVoice);
  const estimatedCost = (charCount / 1000) * (currentVoice ? currentVoice.price : 0);

  // BASE_URL fallback to same origin if REACT_APP_API_BASE_URL not set
  // Safe base URL for all React environments (Vite / CRA / Next)
  // Replace whatever BASE_URL line you have with this:
  // Backend API base address for local dev
  const BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || 'http://localhost:8000';




  // helpers
  function formatDuration(seconds) {
    if (seconds == null) return '—';
    const s = Math.round(seconds);
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }

  function formatSize(bytes) {
    if (bytes == null) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  // Attempt to refresh access token using refresh token stored in localStorage.
  // Adjust endpoint & payload to match your backend.
  async function refreshAccessToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken'); // or cookie
      if (!refreshToken) return null;

      const resp = await fetch(`${BASE_URL}/user/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!resp.ok) {
        console.warn('[Auth] refresh token request failed', resp.status);
        return null;
      }
      const data = await resp.json();
      if (data?.token) {
        localStorage.setItem('token', data.token);
        return data.token;
      }
      return null;
    } catch (e) {
      console.error('[Auth] refreshAccessToken error', e);
      return null;
    }
  }


  const handleConvert = async () => {
    if (charCount === 0 || isConverting) return;
    setIsConverting(true);
    setAudioUrl(null);

    const makeRequest = async (accessToken) => {
      const resp = await fetch(`${BASE_URL}/user/tts/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'voice': selectedVoice,
          'speed': String(speed),
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: prompt,
      });
      return resp;
    };

    try {
      let token = localStorage.getItem('token') || '';
      let resp = await makeRequest(token);

      // if token expired or unauthorized, try refresh + retry once
      if (resp.status === 400 || resp.status === 401) {
        // try reading body to see if it's the expired-token message
        let body = '';
        try { body = await resp.text(); } catch { }
        const bodyLower = body ? body.toLowerCase() : '';
        if (bodyLower.includes('expired') || resp.status === 401) {
          console.log('[Auth] access token expired — attempting refresh');
          const newToken = await refreshAccessToken();
          if (newToken) {
            // retry with new token
            resp = await makeRequest(newToken);
          } else {
            throw new Error('Session expired — please log in again');
          }
        } else {
          // other 400/401 reason
          throw new Error(body || `Server returned ${resp.status}`);
        }
      }

      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        throw new Error(text || `Server returned ${resp.status}`);
      }

      const data = await resp.json();
      if (!data?.ok || !data.file) throw new Error('Invalid response from server');

      const absUrl = data.file.url && data.file.url.startsWith('http') ? data.file.url : `${BASE_URL}${data.file.url}`;

      // push history item (same as before)...
      const newId = history && history.length ? (history[0].id || 0) + 1 : 1;
      const durationStr = formatDuration(data.file.durationSec);
      const sizeStr = formatSize(data.file.sizeBytes);
      const newHistoryItem = {
        id: newId,
        duration: durationStr,
        characters: charCount,
        speed: `${speed}x`,
        voice: (() => {
          const v = VOICE_OPTIONS.find((vv) => vv.id === selectedVoice);
          return v ? `${v.name} (${v.id})` : selectedVoice;
        })(),
        timestamp: new Date().toISOString().substring(0, 16).replace('T', ' '),
        size: sizeStr,
        _meta: {
          filename: data.file.filename,
          sizeBytes: data.file.sizeBytes,
          mimeType: data.file.mimeType,
          durationSec: data.file.durationSec,
        },
      };

      if (typeof setHistory === 'function') {
        setHistory((prev) => [newHistoryItem, ...(Array.isArray(prev) ? prev : [])]);
      }

      setAudioUrl(absUrl);
    } catch (err) {
      console.error('TTS conversion failed:', err);
      // Friendly UX: suggest re-login if token refresh failed
      if (String(err).toLowerCase().includes('session expired') || String(err).toLowerCase().includes('log in')) {
        alert('Session expired — please log in again.');
        // optional: redirect to login page
        // window.location.href = '/login';
      } else {
        alert('Conversion failed: ' + (err.message || err));
      }
    } finally {
      setIsConverting(false);
    }
  };



  const handleDownload = () => {
    if (!audioUrl) return;
    const a = document.createElement('a');
    a.href = audioUrl;
    const filenameFallback = `tts-${Date.now()}.mp3`;
    a.download = filenameFallback;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <main className="bg-gray-50 min-h-[calc(100vh-64px)] py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center flex items-center justify-center">
          <Zap className="w-7 h-7 mr-2 text-amber-500" /> Real-time Speech Synthesis
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-200">
              <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Enter Your Prompt
              </h2>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value.substring(0, maxChars))}
                rows={10}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 resize-none text-gray-700 transition duration-150"
                placeholder="Type or paste your text here..."
              />

              <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                <span>
                  Characters: {charCount} / {maxChars}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Est. Cost (mock): ${estimatedCost.toFixed(5)}
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-1" /> Select Voice
                </label>
                <select
                  id="voice-select"
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                  {VOICE_OPTIONS.map((voice) => (
                    <option key={voice.id} value={voice.id}>
                      {voice.name} ({voice.accent})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="speed-slider" className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" /> Speaking Speed: {speed.toFixed(1)}x
                </label>
                <input
                  id="speed-slider"
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
              </div>

              <button
                onClick={handleConvert}
                disabled={isConverting || charCount === 0}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-full text-base font-bold text-white shadow-md transition duration-300 ${isConverting || charCount === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 transform hover:scale-[1.02]'
                  }`}
              >
                {isConverting ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Synthesizing...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 mr-2" />
                    Convert to Speech
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-green-200 h-full flex flex-col justify-center">
              <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                <Play className="w-5 h-5 mr-2" /> Latest Audio Output
              </h2>

              {audioUrl ? (
                <>
                  <audio controls src={audioUrl} className="w-full mb-4 rounded-lg">
                    Your browser does not support the audio element.
                  </audio>
                  <p className="text-sm text-gray-600">
                    File ready! Duration: {history?.[0]?.duration ?? '—'}, Size: {history?.[0]?.size ?? '—'}.
                  </p>
                  <button
                    className="mt-3 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-150"
                    onClick={handleDownload}
                  >
                    <Download className="w-4 h-4 mr-1" /> Download MP3/WAV
                  </button>
                </>
              ) : (
                <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <Volume2 className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Audio will appear here after conversion.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onViewChange && onViewChange('history')}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-150 flex items-center justify-center mx-auto"
          >
            View Full Conversion History ({history?.length ?? 0} items) <ArrowLeft className="w-4 h-4 ml-2 transform rotate-180" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-8 right-8 z-40 p-4 rounded-full text-white shadow-2xl transition-all duration-300 transform ${isChatOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-blue-800 hover:bg-blue-900 hover:scale-[1.05]'
          } flex items-center space-x-2`}
        title="Interact with AI Assistant"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="hidden sm:inline font-semibold">AI Chat</span>
      </button>

      {isChatOpen && <AIChatBox onClose={() => setIsChatOpen(false)} />}
    </main>
  );
};

export default TTSConverterDashboard;
