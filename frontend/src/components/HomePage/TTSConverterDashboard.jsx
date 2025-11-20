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

  const handleConvert = () => {
    if (charCount === 0 || isConverting) return;

    setIsConverting(true);
    setAudioUrl(null);

    // Simulate API call delay
    setTimeout(() => {
      const newDurationFloat = (charCount / 20).toFixed(2); // mock seconds-like
      const mins = Math.floor(newDurationFloat / 60);
      const secs = Math.floor(newDurationFloat % 60);
      const newDuration = `${mins}:${String(secs).padStart(2, '0')}`;

      const newHistoryItem = {
        id: (history && history.length ? history[0].id + 1 : 1),
        duration: newDuration,
        characters: charCount,
        speed: `${speed}x`,
        voice: currentVoice ? `${currentVoice.name} (${currentVoice.id})` : selectedVoice,
        timestamp: new Date().toISOString().substring(0, 16).replace('T', ' '),
        size: `${(charCount * 1.5 + Math.random() * 50).toFixed(0)} KB`,
      };

      // Use functional updater to avoid stale closures
      if (typeof setHistory === 'function') {
        setHistory((prev) => [newHistoryItem, ...(Array.isArray(prev) ? prev : [])]);
      }

      // Mock audio URL
      setAudioUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

      setIsConverting(false);
    }, 2000);
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
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-full text-base font-bold text-white shadow-md transition duration-300 ${
                  isConverting || charCount === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 transform hover:scale-[1.02]'
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
                    onClick={() => console.log('Downloading audio...')}
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
        className={`fixed bottom-8 right-8 z-40 p-4 rounded-full text-white shadow-2xl transition-all duration-300 transform ${
          isChatOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-blue-800 hover:bg-blue-900 hover:scale-[1.05]'
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
