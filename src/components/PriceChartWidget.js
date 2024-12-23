import React, { useEffect, useRef } from 'react';

const PRICE_CHART_ID = 'price-chart-widget-container';

export const PriceChartWidget = ({ tokenAddress }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.currentWidget) {
      window.currentWidget.remove();
    }

    const loadWidget = () => {
      if (typeof window.createMyWidget === 'function' && tokenAddress) {
        window.currentWidget = window.createMyWidget(PRICE_CHART_ID, {
          autoSize: true,
          chainId: 'solana',
          tokenAddress: tokenAddress,
          defaultInterval: '1D',
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Etc/UTC',
          theme: 'dark',
          locale: 'en',
          hideLeftToolbar: true,
          hideTopToolbar: false,
          hideBottomToolbar: false
        });
      } else {
        console.error('createMyWidget function is not defined or tokenAddress is missing.');
      }
    };

    // Remove existing script if it exists
    const existingScript = document.getElementById('moralis-chart-widget');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new script
    const script = document.createElement('script');
    script.id = 'moralis-chart-widget';
    script.src = 'https://moralis.com/static/embed/chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = loadWidget;
    script.onerror = () => {
      console.error('Failed to load the chart widget script.');
    };
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (window.currentWidget) {
        window.currentWidget.remove();
      }
      if (document.getElementById('moralis-chart-widget')) {
        document.getElementById('moralis-chart-widget').remove();
      }
    };
  }, [tokenAddress]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        id={PRICE_CHART_ID}
        ref={containerRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}; 