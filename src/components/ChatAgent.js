import React from 'react';
import './ChatAgent.css';
import agentImage from '../assets/tadz-agent-purple.png';

const ChatAgent = () => {
  return (
    <div className="chat-agent">
      <img src={agentImage} alt="AI Agent" className="agent-image" />
    </div>
  );
};

export default ChatAgent; 