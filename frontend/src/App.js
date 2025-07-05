
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMsg = { type: 'user', text: input };
    setMessages([...messages, userMsg]);

    const res = await axios.post('http://localhost:5000/chat', { message: input });
    const botMsg = { type: 'bot', text: res.data.reply };
    setMessages(prev => [...prev, botMsg]);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>FAQ Chatbot</h2>
      <div style={{ height: 300, overflowY: 'scroll', border: '1px solid gray', padding: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.type === 'user' ? 'right' : 'left' }}>
            <p><strong>{msg.type === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} style={{ width: '70%' }} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
