import React from 'react';
import { Card, Typography, Table, Space } from 'antd';
import './LiquidityPools.css';

const { Title } = Typography;

const LiquidityPools = ({ liquidityData }) => {
  const columns = [
    {
      title: 'DEX',
      dataIndex: 'dex',
      key: 'dex',
    },
    {
      title: 'Pair',
      dataIndex: 'lpPair',
      key: 'lpPair',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => Number(amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
  ];

  const dataSource = liquidityData.map((pool, index) => {
    const [[dex, details]] = Object.entries(pool);
    return {
      key: index,
      dex: dex,
      lpPair: details.lpPair,
      amount: details.amount,
    };
  });

  return (
    <div className="liquidity-pools">
      <Card className="analysis-frame">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={3}>Liquidity Pools Analysis</Title>
          <Table 
            dataSource={dataSource} 
            columns={columns} 
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        </Space>
      </Card>
    </div>
  );
};

export default LiquidityPools; 