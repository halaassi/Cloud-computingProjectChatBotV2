const MessageItem = ({ sender, text }) => (
  <div style={{ marginBottom: '10px' }}>
    <strong>{sender === 'user' ? 'You' : 'Bot'}:</strong> {text}
  </div>
);

export default MessageItem;
