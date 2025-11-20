import React from 'react';
import { Cpu, X, AlertTriangle, MessageSquare } from 'lucide-react';

const AIChatBox = ({ onClose }) => {
    const conversation = [
        { type: 'ai-error', text: 'AI Chat is currently under active development and cannot respond to queries. For urgent assistance or feature requests, please contact our support team below.' }
    ];

    const handleSupportClick = () => console.log('Navigating to support contact form (Mock Action)...');

    const ChatMessage = ({ text }) => (
        <div className="flex justify-start mb-3">
            <div className="max-w-[90%] px-4 py-3 rounded-xl text-sm shadow-md border bg-red-100 text-red-800 border-red-300 font-medium">
                <AlertTriangle className="w-4 h-4 inline mr-2 text-red-500" />
                {text}
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-sm h-[500px] bg-white rounded-2xl shadow-2xl border border-blue-200 flex flex-col fixed bottom-4 right-4 z-100 transform transition-all duration-300">
            <div className="bg-blue-800 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-lg">
                <h2 className="text-lg font-bold flex items-center">
                    <Cpu className="w-5 h-5 mr-2 text-amber-500" /> FPT AI Assistant
                </h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-blue-700 transition duration-150" title="Close Chat">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="grow overflow-y-auto p-4 space-y-3 flex items-center justify-center">
                {conversation.map((msg, index) => <ChatMessage key={index} text={msg.text} />)}
            </div>

            <div className="p-4 border-t border-gray-100">
                <button onClick={handleSupportClick} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full text-base font-bold text-white shadow-lg transition duration-300 bg-red-500 hover:bg-red-600 transform hover:scale-[1.01] items-center">
                    <MessageSquare className="w-5 h-5 mr-2" /> Contact User Support
                </button>
            </div>
        </div>
);
};

export default AIChatBox;
