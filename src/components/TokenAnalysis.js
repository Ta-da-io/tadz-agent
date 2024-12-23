import React from 'react';
import { Card, Typography, Space } from 'antd';

const { Title, Text } = Typography;

const TokenAnalysis = () => {
  // Mock data for testing
  const mockAnalysis = {
    tokenName: "Sample Token",
    contractAddress: "0x1234...5678",
    analysis: {
      securityScore: 85,
      liquidityAnalysis: "Sufficient liquidity with $2.5M locked",
      ownershipRisks: "Contract ownership is renounced",
      tradingPatterns: "Normal trading activity detected",
      recommendations: [
        "Liquidity appears stable",
        "No suspicious wallet activities",
        "Contract code is verified"
      ]
    }
  };

  return (
    <Card className="analysis-frame" style={{ width: '100%', height: '100%', margin: '20px 0' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={3}>Token Analysis Results</Title>
        
        <div className="token-info">
          <Text strong>Token Name: </Text>
          <Text>{mockAnalysis.tokenName}</Text>
          <br />
          <Text strong>Contract: </Text>
          <Text>{mockAnalysis.contractAddress}</Text>
        </div>

        <div className="security-score">
          <Title level={4}>Security Score</Title>
          <Text>{mockAnalysis.analysis.securityScore}/100</Text>
        </div>

        <div className="analysis-details">
          <Title level={4}>Analysis Details</Title>
          <Text strong>Liquidity Status: </Text>
          <Text>{mockAnalysis.analysis.liquidityAnalysis}</Text>
          <br />
          <Text strong>Ownership Status: </Text>
          <Text>{mockAnalysis.analysis.ownershipRisks}</Text>
          <br />
          <Text strong>Trading Patterns: </Text>
          <Text>{mockAnalysis.analysis.tradingPatterns}</Text>
        </div>

        <div className="recommendations">
          <Title level={4}>Recommendations</Title>
          <ul>
            {mockAnalysis.analysis.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </Space>
    </Card>
  );
};

export default TokenAnalysis; 