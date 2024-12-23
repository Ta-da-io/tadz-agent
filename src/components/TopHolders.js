import React, { useState } from 'react';
import { FaUsers, FaWallet, FaArrowRight } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ClipboardNotification from './ClipboardNotification';
import './TopHolders.css';

const TopHolders = ({ data, links }) => {
  const [copiedAddress, setCopiedAddress] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884d8', '#82ca9d', '#ffc658', '#8884d8', '#83a6ed', '#8dd1e1'];
  
  // Take only top 10 holders for the pie chart
  const top10Holders = data.slice(0, 10);
  
  const chartData = top10Holders.map(holder => ({
    name: `${holder.address.slice(0, 6)}...${holder.address.slice(-4)}`,
    value: parseFloat(holder.percentage),
    fullAddress: holder.address
  }));

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedAddress(address);
      setShowNotification(true);
      setTimeout(() => {
        setCopiedAddress(null);
        setShowNotification(false);
      }, 2000); // Reset after 2 seconds
    });
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip" onClick={() => handleCopyAddress(data.fullAddress)}>
          <p className="tooltip-address">
            {data.fullAddress}
          </p>
          <p className="tooltip-percentage">{`${data.value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="content-section top-holders">
        <div className="section-header">
          <h2><FaUsers className="section-icon" /> Top Holders</h2>
          {links?.[1] && (
            <button 
              className="analysis-link-button"
              onClick={() => window.open(links[1], '_blank')}
              title="View on Bubblemaps"
            >
              Bubblemaps <FaArrowRight className="arrow-icon" />
            </button>
          )}
        </div>
        
        <div className="holders-content">
          <div className="holders-chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value}%)`}
                  onClick={(data) => handleCopyAddress(data.fullAddress)}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="holders-list">
            {data.map((holder, index) => (
              <div key={holder.address} className="holder-item">
                <div className="holder-info">
                  <div 
                    className="color-indicator" 
                    style={{ backgroundColor: index < 10 ? COLORS[index] : '#718096' }} 
                  />
                  <FaWallet className="wallet-icon" />
                  <span 
                    className={`address clickable ${copiedAddress === holder.address ? 'copied' : ''}`}
                    onClick={() => handleCopyAddress(holder.address)}
                  >
                    {`${holder.address.slice(0, 6)}...${holder.address.slice(-4)}`}
                  </span>
                </div>
                <div className="holder-stats">
                  <span className="amount">{parseFloat(holder.amount).toLocaleString()}</span>
                  <span className="percentage">{holder.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ClipboardNotification show={showNotification} />
    </>
  );
};

export default TopHolders; 