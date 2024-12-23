import React from 'react';
import './IntroPage.css';
import logo from '../assets/logo.png';

const IntroPage = ({ onContinue }) => {
  return (
    <div className="intro-page">
      <div className="intro-content">
        <div className="logo-container">
          <img src={logo} alt="TADZ Logo" className="logo" />
        </div>
        <h1 className="title">TADZ AGENT</h1>
        <p>Your AI-powered assistant for blockchain analysis</p>
        <button className="continue-button" onClick={onContinue}>
          [click to continue]
        </button>
      </div>
    </div>
  );
};

export default IntroPage; 