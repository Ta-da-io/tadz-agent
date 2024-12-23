import React from 'react';
import { FaTwitter, FaTelegram, FaGlobe } from 'react-icons/fa';
import './TokenPrice.css';

const TokenPrice = ({ data }) => {
  const formatNumber = (num) => {
    if (num === undefined || num === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(num);
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 10,
    }).format(parseFloat(price));
  };

  const formatPriceChange = (change) => {
    if (change === undefined || change === null) return 'N/A';
    const isPositive = change > 0;
    return (
      <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </span>
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Show loading state if data is not available
  if (!data || !data.info || !data.baseToken) {
    return (
      <div className="token-price-container">
        <div className="token-price-content">
          <div className="loading-message">Loading token data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="token-price-container">
      {data.info?.header && (
        <div className="token-header-image">
          <img src={data.info.header} alt={`${data.baseToken.name} header`} />
        </div>
      )}
      
      <div className="token-price-content">
        <div className="token-info-header">
          {data.info?.imageUrl && (
            <img src={data.info.imageUrl} alt={data.baseToken.name} className="token-logo" />
          )}
          <div className="token-basic-info">
            <div className="token-title-row">
              <h1>{data.baseToken?.name} ({data.baseToken?.symbol})</h1>
              <div className="token-addresses">
                <div 
                  className="address-item"
                  onClick={() => copyToClipboard(data.baseToken?.address)}
                  title="Click to copy token address"
                >
                  <span className="address-label">Token:</span>
                  <span className="address-value">
                    {data.baseToken?.address}
                  </span>
                </div>
                <div 
                  className="address-item"
                  onClick={() => copyToClipboard(data.pairAddress)}
                  title="Click to copy pair address"
                >
                  <span className="address-label">{`${data.baseToken?.symbol}/SOL:`}</span>
                  <span className="address-value">
                    {data.pairAddress}
                  </span>
                </div>
              </div>
            </div>
            <div className="social-links">
              {data.info?.socials?.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {social.type === 'twitter' && <FaTwitter />}
                  {social.type === 'telegram' && <FaTelegram />}
                  {social.type === 'website' && <FaGlobe />}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="price-stats-grid">
          <div className="stat-card">
            <div className="stat-label">Price USD</div>
            <div className="stat-value">{formatPrice(data.priceUsd)}</div>
            <div className="sub-stat">
              Price SOL: {formatNumber(data.priceNative)} SOL
            </div>
            <div className="sub-stat">
              24h Change: {formatPriceChange(data.priceChange?.h24)}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Market Cap / FDV</div>
            <div className="stat-value">${formatNumber(data.marketCap)}</div>
            <div className="sub-stat">
              Fully Diluted: ${formatNumber(data.fdv)}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Liquidity</div>
            <div className="stat-value">${formatNumber(data.liquidity?.usd)}</div>
            <div className="sub-stat">
              {formatNumber(data.liquidity?.base)} {data.baseToken?.symbol}
            </div>
            <div className="sub-stat">
              {formatNumber(data.liquidity?.quote)} {data.quoteToken?.symbol}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">24h Volume</div>
            <div className="stat-value">${formatNumber(data.volume?.h24)}</div>
            <div className="sub-stat">
              Buys: {data.txns?.h24?.buys || 0} / Sells: {data.txns?.h24?.sells || 0}
            </div>
            <div className="sub-stat">
              Total Trades: {(data.txns?.h24?.buys || 0) + (data.txns?.h24?.sells || 0)}
            </div>
          </div>
        </div>

        <div className="trading-activity">
          <h3>Trading Activity</h3>
          <div className="activity-grid">
            {['5m', '1h', '6h', '24h'].map((period, index) => {
              const key = period === '5m' ? 'm5' : 
                         period === '1h' ? 'h1' : 
                         period === '6h' ? 'h6' : 'h24';
              return (
                <div key={index} className="activity-card">
                  <div className="period-label">{period}</div>
                  <div className="volume">
                    Volume: ${formatNumber(data.volume?.[key])}
                  </div>
                  <div className="trades">
                    <div className="buys">
                      Buys: {data.txns?.[key]?.buys || 0}
                    </div>
                    <div className="sells">
                      Sells: {data.txns?.[key]?.sells || 0}
                    </div>
                  </div>
                  <div className="price-change">
                    Change: {formatPriceChange(data.priceChange?.[key])}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPrice; 