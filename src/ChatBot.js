import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { generateClient } from 'aws-amplify/api';

Amplify.configure(awsExports);
const client = generateClient();

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    // أضف رسالة المستخدم إلى الواجهة
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    const userInput = input;
    setInput('');

    try {
      // إرسال الرسالة إلى Lambda عبر AppSync
      const mutation = `
        mutation SendChatMessage($input: String!) {
          sendChatMessage(input: $input) {
            userMessage
            botReply
          }
        }
      `;

      const response = await client.graphql({
        query: mutation,
        variables: { input: userInput },
      });

      const botReply = response?.data?.sendChatMessage?.botReply || 'No response received.';

      // أضف رد البوت إلى الواجهة
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'An error occurred while sending the message.' },
      ]);
    }
  };

  return (
    <div className="chat-container" style={{ padding: '20px' }}>
      <h2>EC2 Instance Checker</h2>
      <div
        className="chat-box"
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '200px',
          marginBottom: '10px',
          whiteSpace: 'pre-wrap'
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender} style={{ marginBottom: '10px' }}>
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        style={{ width: '80%', padding: '10px' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message (e.g. show s3)..."
      />
      <button onClick={sendMessage} style={{ padding: '10px', marginLeft: '10px' }}>
        Send
      </button>
    </div>
  );
}
