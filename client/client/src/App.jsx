import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('Ask the AI a question to get started!');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    // 🛑 Client-side validation
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('AI is thinking...'); // Immediate feedback
    
    try {
      // 🚀 Make a POST request to your Express backend
      const res = await axios.post('http://localhost:5000/api/chat', { prompt });

      // Update state with the AI's response
      setResponse(res.data.message);
      setPrompt(''); // Clear input after sending
    } catch (error) {
      console.error('Error contacting backend:', error);
      setResponse('❌ An error occurred. Check your server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Simple AI Chat</h1>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., Explain React components in one sentence."
        rows="3"
      />
      
      <button onClick={handleSend} disabled={loading || !prompt.trim()}>
        {loading ? 'Processing...' : 'Send Message'}
      </button>

      <h2>AI Response:</h2>
      <div className="chat-box">
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;