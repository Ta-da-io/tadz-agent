import React from 'react';
import './ClipboardNotification.css';

const ClipboardNotification = ({ show }) => {
  if (!show) return null;

  return (
    <div className="clipboard-notification">
      <span>Address copied to clipboard</span>
    </div>
  );
};

export default ClipboardNotification; 