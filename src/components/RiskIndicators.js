import React from 'react';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const RiskIndicators = ({ indicatorData }) => {
  const risks = JSON.parse(indicatorData.high.details);

  return (
    <div className="risk-indicators">
      <h3>Risk Indicators</h3>
      <ul>
        {Object.entries(risks).map(([key, value]) => (
          <li key={key}>
            {value ? <FaExclamationTriangle color="red" /> : <FaCheckCircle color="green" />}
            {key}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiskIndicators; 