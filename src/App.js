import React, { useState, useRef } from 'react';
import './App.css';
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import MainContent from './components/MainContent.js';
import IntroPage from './components/IntroPage.js';

function App() {
  const [currentNetwork, setCurrentNetwork] = useState('solana');
  const [showIntro, setShowIntro] = useState(true);
  const [tokenData, setTokenData] = useState(null);
  const chatInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setShowIntro(false);
  };

  const handleTokenDataUpdate = (data) => {
    setTokenData(data);
  };

  const handleLoading = (loading) => {
    setIsLoading(loading);
  };

  if (showIntro) {
    return <IntroPage onContinue={handleContinue} />;
  }

  return (
    <div className="app-container">
      <Header 
        currentNetwork={currentNetwork}
        onNetworkChange={setCurrentNetwork}
      />
      <div className="content-container">
        <Sidebar 
          currentNetwork={currentNetwork} 
          onTokenDataUpdate={handleTokenDataUpdate}
          ref={chatInputRef}
          onLoading={handleLoading}
        />
        <MainContent 
          tokenData={tokenData} 
          chatRef={chatInputRef}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;