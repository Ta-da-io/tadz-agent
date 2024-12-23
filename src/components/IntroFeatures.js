import React from 'react';
import { FaHistory, FaWallet, FaChartLine, FaShieldAlt, FaCoins, FaBell, FaRocket, FaUserSecret, FaRobot } from 'react-icons/fa';
import './IntroFeatures.css';

const IntroFeatures = ({ onExampleClick }) => {
  const features = [
    {
      icon: <FaHistory />,
      title: "Transaction History",
      description: "Get detailed transaction history for any Solana wallet address",
      example: "I want to see the transaction history of wallet:"
    },
    {
      icon: <FaWallet />,
      title: "Wallet Portfolio",
      description: "Check token balances and holdings of any Solana wallet",
      example: "Show me the portfolio of this wallet:"
    },
    {
      icon: <FaChartLine />,
      title: "Chain Information",
      description: "Access real-time Solana blockchain statistics and metrics",
      example: "Can you give me the current Solana chain stats?"
    },
    {
      icon: <FaShieldAlt />,
      title: "Token Analysis",
      description: "Analyze any Solana token for safety and performance metrics",
      example: "Analyze this token for me:"
    },
    {
      icon: <FaCoins />,
      title: "Token Price",
      description: "Get real-time price information for any Solana token",
      example: "What's the current price of:"
    },
    {
      icon: <FaBell />,
      title: "Price Alerts",
      description: "Set price alerts for Solana tokens",
      example: "Alert me when Solana reaches:"
    },
    {
      icon: <FaRocket />,
      title: "Liquidity Sniper",
      description: "Monitor and automatically snipe new liquidity pools as soon as they are created",
      example: "Monitor new pools for token:",
      comingSoon: true
    },
    {
      icon: <FaUserSecret />,
      title: "Wallet Tracker",
      description: "Track all movements from specific wallets with real-time Telegram notifications",
      example: "Track movements from wallet:",
      comingSoon: true
    },
    {
      icon: <FaRobot />,
      title: "Trading Bot",
      description: "Develop, backtest, and run custom trading strategies with hourly performance reports",
      example: "Create trading strategy for:",
      comingSoon: true
    }
  ];

  const comingSoonMessages = {
    "Liquidity Sniper": "🚀 The Liquidity Sniper feature will allow you to automatically detect and snipe new liquidity pools as soon as they are created. This powerful tool will help you be among the first to trade new tokens. Currently in development - stay tuned!",
    "Wallet Tracker": "🕵️ The Wallet Tracker feature will enable you to monitor specific wallets and receive real-time notifications about their activities through Telegram. Perfect for tracking whale movements and smart money. Coming soon!",
    "Trading Bot": "🤖 The Trading Bot feature will allow you to create, test, and deploy custom trading strategies with detailed performance reports. You'll be able to automate your trading with sophisticated rules and parameters. Currently under development!"
  };

  const handleCardClick = (feature) => {
    if (typeof onExampleClick === 'function') {
      if (feature.comingSoon) {
        onExampleClick(comingSoonMessages[feature.title], true);
      } else {
        onExampleClick(feature.example);
      }
    }
  };

  return (
    <div className="intro-features">
      <h1>Welcome to TADZ Agent</h1>
      <p className="intro-description">
        Your AI-powered assistant for Solana blockchain analysis. Choose a tool to get started or ask anything in the chat.
      </p>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`feature-card ${feature.comingSoon ? 'coming-soon' : ''}`}
            onClick={() => handleCardClick(feature)}
          >
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <div className="feature-example">
              {feature.example}
            </div>
            {feature.comingSoon && <div className="soon-overlay">SOON</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroFeatures; 