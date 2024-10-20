"use client";

import React, { useState } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';

const SpeechComponents = () => {
  const [listening, setListening] = useState(false);
  const [isTextMode, setIsTextMode] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  let recognition;

  if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const speechToText = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setTranscript(speechToText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  }

  const toggleListening = () => {
    setListening(!listening);
    if (!listening) {
      recognition?.start();
    } else {
      recognition?.stop();
      if (transcript.trim() !== '') {
        sendMessage(transcript);
        sendToAI(transcript);
      }
    }
  };

  const sendToAI = async (speechToText) => {
    // Log what we're sending
    const data = {
      user_query: speechToText,
      data_query: "SELECT * FROM user"
    };

    console.log('Sending data:', data);

    try {
      const response = await fetch('https://med-ai-lilac.vercel.app/api/processConsult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Log the response status
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Received result:', result);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: result.result, sender: 'bot' }
      ]);

    } catch (error) {
      console.error('Error sending message to AI:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, there was an error processing your request.", sender: 'bot' }
      ]);
    }
  };

  const sendMessage = (message) => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setTranscript(''); // Clear the transcript
    }
  };

  const handleTextMessage = () => {
    if (inputText.trim() !== '') {
      sendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="position-absolute top-0 end-0 m-3">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="textModeSwitch"
            checked={isTextMode}
            onChange={() => setIsTextMode(!isTextMode)}
          />
          <label className="form-check-label" htmlFor="textModeSwitch">
            Chat Mode
          </label>
        </div>
      </div>

      {!isTextMode && (
        <div className="position-relative mb-4" style={{ width: '200px', height: '200px' }}>
          <div className="position-absolute w-100 h-100 rounded-circle bg-primary opacity-10 animate__animated animate__pulse animate__infinite"></div>
          <button
            onClick={toggleListening}
            className="position-absolute w-100 h-100 btn btn-light rounded-circle shadow-lg d-flex justify-content-center align-items-center"
            style={{ transition: 'all 0.3s' }}
          >
            {listening ? (
              <MicOff className="text-danger" style={{ width: '60px', height: '60px' }} />
            ) : (
              <Mic className="text-primary" style={{ width: '60px', height: '60px' }} />
            )}
          </button>
        </div>
      )}

      {isTextMode ? (
        <div className="w-100 max-w-md d-flex flex-column h-100" style={{ maxWidth: '400px' }}>
          <div className="flex-grow-1 overflow-auto mb-3 rounded p-3" style={{ height: '400px' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`d-flex ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-2`}
              >
                <div className={`rounded p-2 ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-secondary text-white'}`} style={{ maxWidth: '70%' }}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTextMessage()}
            />
            <button className="btn btn-primary" type="button" onClick={handleTextMessage}>
              <Send size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="fs-4 fw-semibold mb-2">{listening ? 'Listening...' : 'Click the microphone to start'}</p>
          <p className="text-muted">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default SpeechComponents;
