import React, { useState } from 'react';
import './TransactionHistory.css';
import ClipboardNotification from './ClipboardNotification';

const TransactionHistory = ({ data }) => {
  const [showNotification, setShowNotification] = useState(false);
  
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="transaction-history">
      <div className="history-header">
        <h2>Transaction History</h2>
        <div className="subtitle">Last {data.length} transactions</div>
      </div>
      <div className="transactions-grid">
        {data.map((tx, index) => (
          <div key={index} className="transaction-card">
            <div className="transaction-header">
              <div className={`transaction-type ${tx.type.toLowerCase()}`}>
                {tx.type}
              </div>
              <div className="transaction-date">
                {tx.date}
              </div>
            </div>
            <div className="transaction-amount">
              {tx.amount} {tx.token}
            </div>
            <div className="address-info">
              <div className="address-row">
                <span className="label">From:</span>
                <span 
                  className="address"
                  onClick={() => copyToClipboard(tx.from)}
                  title="Click to copy"
                >
                  {tx.from}
                </span>
              </div>
              <div className="address-row">
                <span className="label">To:</span>
                <span 
                  className="address"
                  onClick={() => copyToClipboard(tx.to)}
                  title="Click to copy"
                >
                  {tx.to}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ClipboardNotification show={showNotification} />
    </div>
  );
};

export default TransactionHistory; 