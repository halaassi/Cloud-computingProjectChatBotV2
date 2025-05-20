import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { generateClient } from 'aws-amplify/api';
import NavBar from '../components/NavBar';
import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';

// إعداد AWS Amplify
Amplify.configure(awsExports);
const client = generateClient();

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  // إرسال رسالة إلى AppSync عبر GraphQL
  const sendMessage = async (input) => {
    if (!input.trim()) return;

    // أضف رسالة المستخدم
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);

    try {
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
        variables: { input },
      });

      const botReply = response?.data?.sendChatMessage?.botReply || 'No response received.';
      // أضف رد البوت
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
    <div>
      <NavBar />
      <div style={{ padding: '20px' }}>
        <h2>Cloud Assistant</h2>
        <ChatBox messages={messages} />
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
