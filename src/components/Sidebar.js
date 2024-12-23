import React, { forwardRef } from 'react';
import './Sidebar.css';
import ChatAgent from './ChatAgent';
import ChatContainer from './ChatContainer';

const Sidebar = forwardRef(({ currentNetwork, onTokenDataUpdate, onLoading }, ref) => {
  return (
    <div className="sidebar">
      <div className="top-section" />
      <div className="oracle-container">
        <ChatAgent />
      </div>
      <div className="chat-section">
        <ChatContainer 
          ref={ref}
          currentNetwork={currentNetwork}
          onTokenDataUpdate={onTokenDataUpdate}
          onLoading={onLoading}
        />
      </div>
    </div>
  );
});

export default Sidebar; 