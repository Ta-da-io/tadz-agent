import React from 'react';
import './FloatingOracle.css';
import logo from '../assets/logo.png';

const FloatingOracle = () => {
  return (
    <div className="floating-oracle">
      <img src={logo} alt="TADZ Logo" className="oracle-image" />
    </div>
  );
};

export default FloatingOracle;