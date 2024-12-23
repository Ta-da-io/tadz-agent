import React from 'react';
import './SolanaInfo.css';
import { FaCube, FaClock, FaLayerGroup, FaExchangeAlt } from 'react-icons/fa';

const SolanaInfo = ({ data }) => {
  const formatNumber = (num) => {
    if (num === undefined || num === null) return 'N/A';
    return num.toLocaleString();
  };

  if (!data) {
    return (
      <div className="solana-info">
        <h2>Solana Network Stats</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: <FaCube />,
      label: 'Block Height',
      value: formatNumber(data?.blockHeight),
      color: '#10B981'
    },
    {
      icon: <FaClock />,
      label: 'Current Epoch',
      value: formatNumber(data?.currentEpoch),
      color: '#3B82F6'
    },
    {
      icon: <FaLayerGroup />,
      label: 'Absolute Slot',
      value: formatNumber(data?.absoluteSlot),
      color: '#8B5CF6'
    },
    {
      icon: <FaExchangeAlt />,
      label: 'Transaction Count',
      value: formatNumber(data?.transactionCount),
      color: '#F59E0B'
    }
  ];

  return (
    <div className="solana-info">
      <h2>Solana Network Stats</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-details">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolanaInfo; 