import React from 'react';
import './Header.css';
import NetworkSwitch from './NetworkSwitch';
// import WalletButton from './WalletButton';

const Header = ({ currentNetwork, onNetworkChange }) => {
 

  return (
    <div className="header">
      {/* <WalletButton /> */}
      <NetworkSwitch 
        currentNetwork={currentNetwork}
        onNetworkChange={onNetworkChange}
      />
    </div>
  );
};

export default Header; 