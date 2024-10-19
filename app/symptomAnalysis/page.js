"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Mic, MessageSquare, Send } from 'lucide-react';

export default function DoctorInterface() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [interactionMode, setInteractionMode] = useState('chat');
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [transcript, setTranscript] = useState('');

    const webSocketRef = useRef(null);
    const recognitionRef = useRef(null);

    const symptoms = ['Headache', 'Fever', 'Cough', 'Sore throat', 'Fatigue', 'Nausea'];

    // Initialize WebSocket connection
    useEffect(() => {
        // Replace with your WebSocket endpoint
        webSocketRef.current = new WebSocket('ws://your-backend-url/ws');

        webSocketRef.current.onopen = () => {
            setIsConnected(true);
            console.log('WebSocket Connected');
        };

        webSocketRef.current.onmessage = (event) => {
            const response = JSON.parse(event.data);
            setMessages(prev => [...prev, { role: 'doctor', content: response.message }]);

            // Optional: Text-to-Speech for doctor's response
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(response.message);
                speechSynthesis.speak(utterance);
            }
        };

        webSocketRef.current.onclose = () => {
            setIsConnected(false);
            console.log('WebSocket Disconnected');
        };

        // Initialize Speech Recognition
        if ('webkitSpeechRecognition' in window) {
            recognitionRef.current = new webkitSpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                let currentTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript;
                }
                setTranscript(currentTranscript);
            };

            recognitionRef.current.onend = () => {
                if (isSpeaking) {
                    recognitionRef.current.start();
                }
            };
        }

        return () => {
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            const filteredSuggestions = symptoms.filter(symptom =>
                symptom.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const toggleSpeaking = () => {
        if (!isSpeaking) {
            recognitionRef.current?.start();
        } else {
            recognitionRef.current?.stop();
        }
        setIsSpeaking(!isSpeaking);
    };

    const sendMessage = (message) => {
        if (!message.trim()) return;

        // Add message to local state
        setMessages(prev => [...prev, { role: 'user', content: message }]);

        // Send message through WebSocket
        if (webSocketRef.current?.readyState === WebSocket.OPEN) {
            webSocketRef.current.send(JSON.stringify({
                message: message,
                timestamp: new Date().toISOString()
            }));
        }

        // Clear input
        setSearchTerm('');
        setTranscript('');
    };

    return (
        <div className="container mx-auto max-w-4xl p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Med AI Consultation</h1>

            <div className="flex justify-center gap-4 mb-6">
                <button
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${interactionMode === 'chat' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                        }`}
                    onClick={() => setInteractionMode('chat')}
                >
                    <MessageSquare className="w-5 h-5" />
                    Chat
                </button>
                <button
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${interactionMode === 'voice' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                        }`}
                    onClick={() => setInteractionMode('voice')}
                >
                    <Mic className="w-5 h-5" />
                    Voice
                </button>
            </div>

            {/* Messages Container */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4 h-96 overflow-y-auto">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'
                            }`}
                    >
                        <div
                            className={`inline-block p-3 rounded-lg ${message.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-800'
                                }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>

            {interactionMode === 'chat' ? (
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 p-3 border rounded-lg"
                        placeholder="Type your message..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                sendMessage(searchTerm);
                            }
                        }}
                    />
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        onClick={() => sendMessage(searchTerm)}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="p-4 bg-gray-100 rounded-lg min-h-[60px]">
                        {transcript || 'Start speaking...'}
                    </div>
                    <div className="flex justify-center gap-4">
                        <button
                            className={`px-6 py-3 rounded-lg flex items-center gap-2 ${isSpeaking ? 'bg-red-600' : 'bg-blue-600'
                                } text-white`}
                            onClick={toggleSpeaking}
                        >
                            <Mic className="w-5 h-5" />
                            {isSpeaking ? 'Stop Speaking' : 'Start Speaking'}
                        </button>
                        {transcript && (
                            <button
                                className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center gap-2"
                                onClick={() => sendMessage(transcript)}
                            >
                                <Send className="w-5 h-5" />
                                Send
                            </button>
                        )}
                    </div>
                </div>
            )}

            {suggestions.length > 0 && (
                <ul className="mt-4 border rounded-lg divide-y">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => setSearchTerm(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}

            {!isConnected && (
                <div className="fixed bottom-4 right-4 bg-red-100 text-red-800 px-4 py-2 rounded-lg">
                    Reconnecting to server...
                </div>
            )}
        </div>
    );
}