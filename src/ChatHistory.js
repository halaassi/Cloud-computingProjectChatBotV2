import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listChatMessages } from '../graphql/queries';

export default function ChatHistory() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await API.graphql(graphqlOperation(listChatMessages));
        const items = result.data.listChatMessages.items;
        const sorted = [...items].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setMessages(sorted);
        setLoading(false);
      } catch (error) {
        console.error(' Error loading messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p className="text-center mt-8">⏳ Loading chat history...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📜 Chat History</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li key={msg.id} className="border p-3 rounded shadow bg-white">
              <p><strong> User:</strong> {msg.user}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p><strong>Response:</strong> {msg.response}</p>
              <p className="text-sm text-gray-400">{new Date(msg.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}