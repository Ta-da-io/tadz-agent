import React, { useState } from 'react';
import IntroFeatures from './IntroFeatures';
import TokenOverview from './TokenOverview';
import SecurityAnalysis from './SecurityAnalysis';
import LiquidityInfo from './LiquidityInfo';
import TopHolders from './TopHolders';
import LoadingQuotes from './LoadingQuotes';
import { PriceChartWidget } from './PriceChartWidget';
import { Switch } from 'antd';
import './MainContent.css';
import TransactionHistory from './TransactionHistory';
import PortfolioView from './PortfolioView';
import SolanaInfo from './SolanaInfo';
import TokenPrice from './TokenPrice';
import { FaTelegram } from 'react-icons/fa';

const debugTokenData = (data) => {
  console.log('Full TokenData:', data);
  console.log('TokenData type:', typeof data);
  console.log('TokenData details:', data?.details);
  console.log('TokenData output:', data?.output);
};

const MainContent = ({ tokenData, chatRef, isLoading }) => {
  const [showChart, setShowChart] = useState(false);
  
  const handleExampleClick = (text, isComingSoonMessage = false) => {
    if (chatRef?.current) {
      chatRef.current.setInputAndSend(text, isComingSoonMessage);
    } else {
      console.warn('Chat reference not available');
    }
  };

  // Show loading quotes when loading
  if (isLoading) {
    return (
      <div className="main-content">
        <LoadingQuotes />
      </div>
    );
  }

  // If there's no token data, show the intro features
  if (!tokenData) {
    return (
      <div className="main-content">
        <IntroFeatures onExampleClick={handleExampleClick} />
      </div>
    );
  }

  // Debug logs
  console.log('TokenData received:', tokenData);
  console.log('Response type:', tokenData?.type);

  // Get the response type from tokenData
  const responseType = tokenData?.type || 'audit';

  if (responseType === 'other') {
    // Don't change the main content for general questions
    return (
      <div className="main-content">
        <IntroFeatures onExampleClick={handleExampleClick} />
      </div>
    );
  }

  if (responseType === 'history') {
    let transactions = [];
    
    try {
      console.log('Raw tokenData:', tokenData);
      
      // The transactions are already in the details array, but might be a string
      const rawTransactions = tokenData.details;
      transactions = typeof rawTransactions === 'string' 
        ? JSON.parse(rawTransactions) 
        : rawTransactions;

      console.log('Extracted transactions:', transactions);
      
    } catch (err) {
      console.error('Error handling transaction history:', err);
      console.error('Error details:', {
        hasTokenData: !!tokenData,
        hasDetails: !!tokenData?.details,
        tokenDataType: typeof tokenData,
        detailsType: typeof tokenData?.details
      });
    }

    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
      return (
        <div className="main-content">
          <div className="placeholder-message">
            No transaction history available.
          </div>
        </div>
      );
    }

    return (
      <div className="main-content">
        <TransactionHistory data={transactions} />
      </div>
    );
  }

  // Add this new condition before the audit type check
  if (responseType === 'portfolio') {
    let portfolioData = [];
    
    try {
      // Parse the nested JSON structure if it's a string
      if (typeof tokenData.output === 'string') {
        const cleanJson = tokenData.output
          .replace(/```json\n/g, '')
          .replace(/\n```/g, '')
          .trim();
        const parsed = JSON.parse(cleanJson);
        portfolioData = parsed.output.details;
      } else {
        // If it's already an object, use the details directly
        portfolioData = tokenData.details;
      }
    } catch (err) {
      console.error('Error parsing portfolio data:', err);
      return (
        <div className="main-content">
          <div className="placeholder-message">
            Error loading portfolio data.
          </div>
        </div>
      );
    }

    return (
      <div className="main-content">
        <PortfolioView data={portfolioData} />
      </div>
    );
  }

  // Add this new condition before the audit type check
  if (responseType === 'solana_info') {
    let chainData = {};
    
    try {
      // Parse the nested JSON structure if it's a string
      if (typeof tokenData.output === 'string') {
        const cleanJson = tokenData.output
          .replace(/```json\n/g, '')
          .replace(/\n```/g, '')
          .trim();
        const parsed = JSON.parse(cleanJson);
        chainData = parsed.output.details;
      } else {
        // If it's already an object, use the details directly
        chainData = tokenData.details;
      }

      return (
        <div className="main-content">
          <SolanaInfo data={chainData} />
        </div>
      );
    } catch (err) {
      console.error('Error parsing Solana info:', err);
      return (
        <div className="main-content">
          <div className="placeholder-message">
            Error loading Solana network information.
          </div>
        </div>
      );
    }
  }

  // For audit type, parse the nested details object
  if (responseType === 'audit') {
    let auditData = {};
    
    try {
      debugTokenData(tokenData);

      if (typeof tokenData.output === 'string') {
        const cleanJson = tokenData.output
          .replace(/```json\n/g, '')
          .replace(/\n```/g, '')
          .trim();
        console.log('Cleaned JSON string:', cleanJson);
        const parsed = JSON.parse(cleanJson);
        console.log('Parsed data:', parsed);
        auditData = parsed.output.details;
      } else {
        auditData = tokenData.details;
      }

      if (!auditData) {
        console.error('auditData is null or undefined');
        return (
          <div className="main-content">
            <div className="placeholder-message">
              No audit data available.
            </div>
          </div>
        );
      }

      if (!auditData.overview) {
        console.error('auditData.overview is missing', auditData);
        return (
          <div className="main-content">
            <div className="placeholder-message">
              Invalid audit data format.
            </div>
          </div>
        );
      }

      const overview = auditData.overview || {};
      const security = auditData.security || {};
      const liquidity = auditData.liquidity || {};
      const holders = auditData.holders || {};

      return (
        <div className="main-content">
          <div className="view-toggle">
            <span className={`toggle-label ${!showChart ? 'active' : ''}`}>Analysis</span>
            <Switch 
              checked={showChart}
              onChange={setShowChart}
              className="view-switch"
            />
            <span className={`toggle-label ${showChart ? 'active' : ''}`}>Chart</span>
          </div>
          
          {showChart ? (
            <div className="chart-container">
              <PriceChartWidget tokenAddress={overview.address} />
            </div>
          ) : (
            <div className="content-grid">
              <TokenOverview data={overview} />
              <SecurityAnalysis data={security} links={tokenData.links} />
              <div className="charts-container">
                <LiquidityInfo data={liquidity} />
                <TopHolders data={holders} links={tokenData.links} />
              </div>
            </div>
          )}
        </div>
      );
    } catch (err) {
      console.error('Error in audit section:', err);
      console.error('TokenData at error:', tokenData);
      return (
        <div className="main-content">
          <div className="placeholder-message">
            Error processing audit data. Please try again.
          </div>
        </div>
      );
    }
  }

  // In the MainContent component, add this condition:

  if (responseType === 'price') {
    let priceData = {};
    
    try {
      if (typeof tokenData.output === 'string') {
        const cleanJson = tokenData.output
          .replace(/```json\n/g, '')
          .replace(/\n```/g, '')
          .trim();
        const parsed = JSON.parse(cleanJson);
        priceData = parsed.output.details;
      } else {
        priceData = tokenData.details;
      }

      return (
        <div className="main-content">
          <TokenPrice data={priceData} />
        </div>
      );
    } catch (err) {
      console.error('Error parsing price data:', err);
      return (
        <div className="main-content">
          <div className="placeholder-message">
            Error loading price data.
          </div>
        </div>
      );
    }
  }

  // Add this condition after the price type check:

  if (responseType === 'alert') {
    return (
      <div className="main-content">
        <div className="alert-container">
          <div className="alert-message">
            <FaTelegram className="telegram-icon" />
            <div className="alert-text">
              <h3>Set up Price Alerts on Telegram</h3>
              <ol>
                <li>Go to <a href="https://t.me/TadzAlertbot" target="_blank" rel="noopener noreferrer">@TadzAlertbot</a> on Telegram</li>
                <li>Send a message to the bot</li>
                <li>Come back here and provide your Telegram username</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For other types, return a placeholder for now
  return (
    <div className="main-content">
      <div className="placeholder-message">
        {`Content for ${responseType} type will be implemented soon.`}
      </div>
    </div>
  );
};

export default MainContent; 