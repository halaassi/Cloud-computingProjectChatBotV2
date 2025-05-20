import React from 'react';
import NavBar from '../components/NavBar';
import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';

const ChatPage = () => (
  <div>
    <NavBar />
    <div style={{ padding: '20px' }}>
      <h2>Cloud Assistant</h2>
      <ChatBox />
      <MessageInput />
    </div>
  </div>
);

export default ChatPage;
