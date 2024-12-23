import React from 'react';
import { FaWater, } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './LiquidityInfo.css';

const LiquidityInfo = ({ data }) => {
  // Process liquidity data
  const liquidityByDex = data.reduce((acc, pool) => {
    const [[dex, details]] = Object.entries(pool);
    if (!acc[dex]) acc[dex] = 0;
    acc[dex] += details.amount;
    return acc;
  }, {});

  const chartData = Object.entries(liquidityByDex).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="content-section liquidity-info">
      <h2><FaWater className="section-icon" /> Liquidity Distribution</h2>
      
      <div className="liquidity-content">
        <div className="liquidity-chart">
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
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="liquidity-details">
          {Object.entries(liquidityByDex).map(([dex, amount], index) => (
            <div key={dex} className="liquidity-item">
              <div className="dex-info">
                <div className="color-indicator" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="dex-name">{dex}</span>
              </div>
              <span className="amount">${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiquidityInfo; 