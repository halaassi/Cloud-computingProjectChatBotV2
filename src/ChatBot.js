import React, { useState } from 'react';
import './ChatBot.css';
import { getClient } from './graphqlClient';

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput('');

    const mutation = `
      mutation SendChatMessage($input: String!) {
        sendChatMessage(input: $input) {
          userMessage
          botReply
        }
      }
    `;

    try {
      const client = await getClient();
      const response = await client.request(mutation, { input: userInput });

      const botReply = response?.sendChatMessage?.botReply || 'No reply.';
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (err) {
      console.error('❌ Error:', err);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error sending message.' }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="bot-avatar" />
        <div>
          <div className="bot-name">LeadBot</div>
          <div className="bot-status">🟢 Online Now</div>
        </div>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
