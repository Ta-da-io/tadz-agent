import React, { useState } from 'react';
import { FaCoins, FaCalendar, FaHashtag, FaUser } from 'react-icons/fa';
import ClipboardNotification from './ClipboardNotification';
import './TokenOverView.css';

const TokenOverview = ({ data }) => {
  const [copiedAddress, setCopiedAddress] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  if (!data) {
    return null;
  }

  const formatAddress = (address) => {
    if (!address) return 'N/A';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleCopyAddress = (address) => {
    if (!address || address === 'N/A') return;
    navigator.clipboard.writeText(address).then(() => {
      setCopiedAddress(address);
      setShowNotification(true);
      setTimeout(() => {
        setCopiedAddress(null);
        setShowNotification(false);
      }, 2000);
    });
  };

  return (
    <>
      <div className="content-section token-overview">
        <h2><FaCoins className="section-icon" /> Token Overview</h2>
        <div className="data-grid">
          <div className="data-item">
            <div className="data-header">
              <FaCoins className="item-icon" />
              <span className="label">Name/Symbol</span>
            </div>
            <span className="value">{data.name || 'N/A'} ({data.symbol || 'N/A'})</span>
          </div>
          <div className="data-item">
            <div className="data-header">
              <FaHashtag className="item-icon" />
              <span className="label">Address</span>
            </div>
            <span 
              className={`value address clickable ${copiedAddress === data.address ? 'copied' : ''}`}
              onClick={() => handleCopyAddress(data.address)}
            >
              {formatAddress(data.address)}
            </span>
          </div>
          <div className="data-item">
            <div className="data-header">
              <FaUser className="item-icon" />
              <span className="label">Deployer</span>
            </div>
            <span 
              className={`value address clickable ${copiedAddress === data.deployer ? 'copied' : ''}`}
              onClick={() => handleCopyAddress(data.deployer)}
            >
              {formatAddress(data.deployer)}
            </span>
          </div>
          <div className="data-item">
            <div className="data-header">
              <FaCalendar className="item-icon" />
              <span className="label">Launch Date</span>
            </div>
            <span className="value">
              {data.launchDate ? new Date(data.launchDate).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
      <ClipboardNotification show={showNotification} />
    </>
  );
};

export default TokenOverview; 