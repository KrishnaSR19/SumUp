'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyCRYyxrOcuWeyHtdOmQrJ0bURZPQzrMzrU");

export default function AskAIPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse('');
    setError('');

    try {
      const model = genAI.getGenerativeModel({ model: 'models/gemini-pro' });
      const result = await model.generateContent(input);
      const geminiResponse = await result.response;
      setResponse(geminiResponse.text());
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please check the API key or your input.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ask Gemini AI</h1>

      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything..."
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <strong>Gemini says:</strong>
          <p className="mt-2 whitespace-pre-line">{response}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500 font-medium">{error}</div>
      )}
    </div>
  );
}
