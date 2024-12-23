import React from 'react';
import './PortfolioView.css';

const PortfolioView = ({ data }) => {
  // First separate SOL from other tokens
  const solToken = data.find(token => token.symbol === 'SOL');
  const otherTokens = data.filter(token => token.symbol !== 'SOL');
  
  // Sort other tokens by amount
  const sortedOtherTokens = [...otherTokens].sort((a, b) => {
    const aValue = a.amount;
    const bValue = b.amount;
    return bValue - aValue;
  });

  // Combine SOL with other tokens, SOL first
  const sortedTokens = solToken 
    ? [solToken, ...sortedOtherTokens]
    : sortedOtherTokens;

  return (
    <div className="portfolio-container">
      <h2>Wallet Portfolio</h2>
      <div className="portfolio-grid">
        {sortedTokens.map((token, index) => (
          <div key={index} className="token-card">
            <div className="token-header">
              <h3>{token.token}</h3>
              <span className="token-symbol">{token.symbol}</span>
            </div>
            <div className="token-amount">
              {(token.amount).toLocaleString()}
            </div>
            {token.address && (
              <div className="token-address">
                {`${token.address.slice(0, 4)}...${token.address.slice(-4)}`}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioView; 