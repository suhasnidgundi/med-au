"use client"

// SpeechComponents.js
import React, { useState } from 'react';

// Speech-to-Text Component
const SpeechToText = ({ onTranscriptChange }) => {
  const [listening, setListening] = useState(false);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const currentTranscript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');
    onTranscriptChange(currentTranscript);
  };

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition.stop();
  };

  return (
    <div className="mb-3">
      <button className={`btn btn-${listening ? 'danger' : 'primary'}`} onClick={listening ? stopListening : startListening}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
    </div>
  );
};

// Text-to-Speech Component
const TextToSpeech = ({ text }) => {
  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synth.speak(utterance);
  };

  return (
    <div className="mb-3">
      <button className="btn btn-primary" onClick={handleSpeak}>
        Speak Response
      </button>
    </div>
  );
};

// Main Component
const SpeechComponents = () => {
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  return (
    <div className="container">
      <h1>Real-Time Speech Interaction</h1>

      <h5>Speech to Text:</h5>
      <SpeechToText onTranscriptChange={setTranscript} />
      <div className="mb-3">
        <h5>Transcript:</h5>
        <textarea className="form-control" rows="3" value={transcript} readOnly />
      </div>

      <h5>Text to Speech:</h5>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Enter response text here..."
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />
      </div>
      <TextToSpeech text={response} />
    </div>
  );
};

export default SpeechComponents;
