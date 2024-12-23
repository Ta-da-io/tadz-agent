import React, { useState } from 'react';
import './NetworkSwitch.css';
import solanaIcon from '../assets/token_sol.png';
import mvxIcon from '../assets/token_mvx.png';

const NetworkSwitch = ({ currentNetwork, onNetworkChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const networks = [
    { id: 'solana', name: 'Solana', icon: solanaIcon },
    { id: 'mvx', name: 'MultiversX', icon: mvxIcon }
  ];

  const handleNetworkClick = (networkId) => {
    onNetworkChange(networkId);
    setIsExpanded(false);
  };

  const currentNetworkData = networks.find(n => n.id === currentNetwork);

  return (
    <div className="network-switch">
      <div 
        className="network-item active"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img 
          src={currentNetworkData?.icon} 
          alt={currentNetworkData?.name}
          className="network-icon"
        />
        <span className="network-label">{currentNetworkData?.name}</span>
      </div>
      
      {isExpanded && (
        <div className="network-dropdown">
          {networks.map(network => (
            network.id !== currentNetwork && (
              <div
                key={network.id}
                className="network-item"
                onClick={() => handleNetworkClick(network.id)}
              >
                <img 
                  src={network.icon} 
                  alt={network.name}
                  className="network-icon"
                />
                <span className="network-label">{network.name}</span>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default NetworkSwitch; 