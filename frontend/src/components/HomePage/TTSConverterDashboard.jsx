import React, { useState, useEffect } from 'react';
import { FileText, DollarSign, Clock, RefreshCw, Volume2, Play, Download, ArrowLeft, Zap, MessageSquare, X } from 'lucide-react';
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

  // History state + modal
  const [localHistory, setLocalHistory] = useState(Array.isArray(history) ? history : []);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const charCount = prompt.length;
  const maxChars = 1000;
  const currentVoice = VOICE_OPTIONS.find((v) => v.id === selectedVoice);
  const estimatedCost = (charCount / 1000) * (currentVoice ? currentVoice.price : 0);

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

  // Fetch history from backend
  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const token = localStorage.getItem('token') || '';
      let resp = await fetch(`${BASE_URL}/user/tts/history`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      // if 401/expired, try refresh token and retry
      if (resp.status === 401 || resp.status === 400) {
        const body = await resp.text().catch(() => '');
        if (body.toLowerCase().includes('expired') || resp.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            resp = await fetch(`${BASE_URL}/user/tts/history`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${newToken}`,
              },
            });
          }
        }
      }

      if (!resp.ok) {
        const txt = await resp.text().catch(() => '');
        throw new Error(txt || `Server returned ${resp.status}`);
      }

      const data = await resp.json();
      const recs = Array.isArray(data.records) ? data.records : [];
      const norm = recs.map((r, idx) => ({
        id: r.filename ? r.filename : idx,
        filename: r.filename,
        url: r.url,
        text: r.text || '',
        voice: r.voice || '',
        speed: r.speed,
        sizeBytes: r.sizeBytes,
        mimeType: r.mimeType,
        durationSec: r.durationSec,
        createdAt: r.createdAt || new Date().toISOString(),
      }));
      setLocalHistory(norm);
      if (typeof setHistory === 'function') setHistory(norm);
    } catch (e) {
      console.error('fetchHistory error', e);
    } finally {
      setLoadingHistory(false);
    }
  };

  const openHistory = async () => {
    setShowHistoryModal(true);
    await fetchHistory();
  };

  // handle TTS convert with token refresh retry
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

      // try refresh on expired/unauthorized
      if (resp.status === 400 || resp.status === 401) {
        let body = '';
        try { body = await resp.text(); } catch { }
        const bodyLower = body ? body.toLowerCase() : '';
        if (bodyLower.includes('expired') || resp.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            resp = await makeRequest(newToken);
          } else {
            throw new Error('Session expired — please log in again');
          }
        } else {
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

      // create history item from server response
      const newId = localHistory && localHistory.length ? (localHistory[0].id || 0) + 1 : 1;
      const newHistoryItem = {
        id: newId,
        duration: formatDuration(data.file.durationSec),
        characters: charCount,
        speed: `${speed}x`,
        voice: (() => {
          const v = VOICE_OPTIONS.find((vv) => vv.id === selectedVoice);
          return v ? `${v.name} (${v.id})` : selectedVoice;
        })(),
        timestamp: new Date().toISOString().substring(0, 16).replace('T', ' '),
        size: formatSize(data.file.sizeBytes),
        _meta: {
          filename: data.file.filename,
          sizeBytes: data.file.sizeBytes,
          mimeType: data.file.mimeType,
          durationSec: data.file.durationSec,
        },
        filename: data.file.filename,
        url: absUrl,
        createdAt: new Date().toISOString(),
      };

      setLocalHistory((prev) => [newHistoryItem, ...(Array.isArray(prev) ? prev : [])]);
      if (typeof setHistory === 'function') {
        setHistory((prev) => [newHistoryItem, ...(Array.isArray(prev) ? prev : [])]);
      }

      setAudioUrl(absUrl);
    } catch (err) {
      console.error('TTS conversion failed:', err);
      if (String(err).toLowerCase().includes('session expired') || String(err).toLowerCase().includes('log in')) {
        alert('Session expired — please log in again.');
      } else {
        alert('Conversion failed: ' + (err.message || err));
      }
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = (url = null, filename = null) => {
    const target = url || audioUrl;
    if (!target) return;
    const a = document.createElement('a');
    a.href = target;
    a.download = filename || `tts-${Date.now()}.mp3`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const openHistoryItem = (item) => {
    const abs = item.url && item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`;
    setAudioUrl(abs);
    setShowHistoryModal(false);
  };

  // keep localHistory in sync when parent passes new history prop
  useEffect(() => {
    if (Array.isArray(history) && history.length) {
      setLocalHistory(history);
    }
  }, [history]);

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
                    File ready! Duration: {localHistory?.[0]?._meta?.durationSec ? formatDuration(localHistory[0]._meta.durationSec) : '—'}, Size: {localHistory?.[0]?._meta?.sizeBytes ? formatSize(localHistory[0]._meta.sizeBytes) : '—'}.
                  </p>
                  <button
                    className="mt-3 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-150"
                    onClick={() => handleDownload(audioUrl, localHistory?.[0]?.filename)}
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
            onClick={() => onViewChange ? onViewChange('history') : openHistory()}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-150 flex items-center justify-center mx-auto"
          >
            View Full Conversion History ({localHistory?.length ?? 0} items) <ArrowLeft className="w-4 h-4 ml-2 transform rotate-180" />
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

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 relative">
            <button onClick={() => setShowHistoryModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
            <h3 className="text-lg font-bold mb-4">Conversion History ({localHistory.length})</h3>

            {loadingHistory ? (
              <div className="py-8 text-center text-gray-500">Loading...</div>
            ) : localHistory.length === 0 ? (
              <div className="py-8 text-center text-gray-500">No items yet.</div>
            ) : (
              <div className="space-y-3 max-h-[60vh] overflow-auto">
                {localHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-sm font-medium">{(item.filename || '').slice(0, 2).toUpperCase()}</div>
                      <div>
                        <div className="font-semibold">{item.voice || 'Voice'}</div>
                        <div className="text-sm text-gray-500">{(item.text || '').slice(0, 80)}{(item.text && item.text.length > 80) ? '...' : ''}</div>
                        <div className="text-xs text-gray-400 mt-1">Created: {new Date(item.createdAt).toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-gray-600 text-right">
                        <div>{formatDuration(item.durationSec ?? item._meta?.durationSec)}</div>
                        <div className="text-xs text-gray-400">{formatSize(item.sizeBytes ?? item._meta?.sizeBytes)}</div>
                      </div>

                      <button onClick={() => openHistoryItem(item)} title="Play this audio" className="p-2 rounded hover:bg-gray-100"><Play className="w-5 h-5" /></button>
                      <button onClick={() => handleDownload(item.url, item.filename)} title="Download" className="p-2 rounded hover:bg-gray-100"><Download className="w-5 h-5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isChatOpen && <AIChatBox onClose={() => setIsChatOpen(false)} />}
    </main>
  );
};

export default TTSConverterDashboard;
