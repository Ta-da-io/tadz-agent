import React from 'react';
import { FaShieldAlt, FaLock, FaSnowflake, FaFire, FaUsers, FaArrowRight } from 'react-icons/fa';
import './SecurityAnalysis.css';

const SecurityAnalysis = ({ data, links }) => {
  if (!data) {
    return null;
  }

  const getStatusIcon = (status) => {
    if (!status) return null;
    
    switch (status.toLowerCase()) {
      case 'disabled':
        return <FaLock className="status-icon disabled" />;
      case 'burned':
        return <FaFire className="status-icon burned" />;
      case 'high concentration':
        return <FaUsers className="status-icon warning" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    if (!status) return '';
    
    switch (status.toLowerCase()) {
      case 'disabled':
        return 'status-good';
      case 'burned':
        return 'status-good';
      case 'high concentration':
        return 'status-warning';
      default:
        return '';
    }
  };

  return (
    <div className="content-section security-analysis">
      <div className="section-header">
        <h2><FaShieldAlt className="section-icon" /> Security Analysis</h2>
        {links?.[0] && (
          <button 
            className="analysis-link-button"
            onClick={() => window.open(links[0], '_blank')}
            title="View on Solsniffer"
          >
            Solsniffer <FaArrowRight className="arrow-icon" />
          </button>
        )}
      </div>
      <div className="security-grid">
        <div className={`security-item ${getStatusClass(data.mintStatus)}`}>
          <div className="security-header">
            <FaSnowflake className="item-icon" />
            <span className="label">Mint Status</span>
          </div>
          <div className="security-status">
            {getStatusIcon(data.mintStatus)}
            <span className="value">{data.mintStatus || 'N/A'}</span>
          </div>
        </div>

        <div className={`security-item ${getStatusClass(data.freezeStatus)}`}>
          <div className="security-header">
            <FaLock className="item-icon" />
            <span className="label">Freeze Status</span>
          </div>
          <div className="security-status">
            {getStatusIcon(data.freezeStatus)}
            <span className="value">{data.freezeStatus || 'N/A'}</span>
          </div>
        </div>

        <div className={`security-item ${getStatusClass(data.lpStatus)}`}>
          <div className="security-header">
            <FaFire className="item-icon" />
            <span className="label">LP Status</span>
          </div>
          <div className="security-status">
            {getStatusIcon(data.lpStatus)}
            <span className="value">{data.lpStatus || 'N/A'}</span>
          </div>
        </div>

        <div className={`security-item ${getStatusClass(data.topHoldersRisk)}`}>
          <div className="security-header">
            <FaUsers className="item-icon" />
            <span className="label">Top Holders Risk</span>
          </div>
          <div className="security-status">
            {getStatusIcon(data.topHoldersRisk)}
            <span className="value">{data.topHoldersRisk || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAnalysis; 