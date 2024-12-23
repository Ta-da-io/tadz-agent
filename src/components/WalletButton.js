import React, { useState } from 'react';
import './WalletButton.css';

const WalletButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleConnect = () => {
    // Add Solana wallet connection logic here
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setIsDropdownOpen(false);
  };

  const displayAddress = "0x1234...5678"; // Replace with actual wallet address

  return (
    <div className="wallet-switch">
      {!isConnected ? (
        <div className="wallet-item" onClick={handleConnect}>
          <span className="wallet-label">Connect Wallet</span>
        </div>
      ) : (
        <div className="wallet-container">
          <div className="wallet-item active" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className="wallet-label">{displayAddress}</span>
          </div>
          
          {isDropdownOpen && (
            <div className="wallet-dropdown">
              <div className="wallet-item" onClick={handleDisconnect}>
                <span className="wallet-label">Disconnect</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletButton;