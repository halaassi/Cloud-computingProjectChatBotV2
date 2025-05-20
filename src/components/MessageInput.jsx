import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div>
      <input
        style={{ width: '80%', padding: '10px' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message (e.g. show s3)..."
      />
      <button onClick={handleSend} style={{ padding: '10px', marginLeft: '10px' }}>Send</button>
    </div>
  );
};

export default MessageInput;
