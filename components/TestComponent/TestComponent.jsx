"use client"

// TestComponent.jsx
import React, { useState } from 'react';

const TestComponent = () => {
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const testAPI = async () => {
        setError('');
        setResult('');
        
        const testData = {
            user_query: "Test query",
            data_query: "SELECT * FROM user"
        };

        try {
            console.log('Sending request with data:', testData);
            
            const response = await fetch('http://localhost:3000/api/processConsult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testData)
            });

            console.log('Response status:', response.status);
            
            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                throw new Error(data.detail || 'An error occurred');
            }

            setResult(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    };

    // Add a simple test for the test endpoint
    const testConnection = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/test');
            const data = await response.json();
            console.log('Test endpoint response:', data);
            alert('Connection successful!');
        } catch (error) {
            console.error('Connection test failed:', error);
            alert('Connection failed!');
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <button 
                    onClick={testConnection}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                    Test Connection
                </button>
                <button 
                    onClick={testAPI}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Test API
                </button>
            </div>

            {error && (
                <div className="text-red-500 mb-4">
                    Error: {error}
                </div>
            )}

            {result && (
                <div className="bg-gray-100 p-4 rounded">
                    <h3 className="font-bold mb-2">Result:</h3>
                    <pre className="whitespace-pre-wrap">{result}</pre>
                </div>
            )}
        </div>
    );
};

export default TestComponent;