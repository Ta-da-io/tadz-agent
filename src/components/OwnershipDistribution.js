import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const OwnershipDistribution = ({ ownersList }) => {
  const data = {
    labels: ownersList.map(owner => owner.address),
    datasets: [{
      data: ownersList.map(owner => parseFloat(owner.percentage)),
      backgroundColor: ownersList.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`),
    }]
  };

  return (
    <div className="ownership-distribution">
      <h3>Ownership Distribution</h3>
      <Pie data={data} />
    </div>
  );
};

export default OwnershipDistribution; 