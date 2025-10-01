import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SentimentChart = ({ data, darkMode }) => {
  if (!data || !data.sentiment_counts) {
    return <div>No sentiment data available</div>;
  }

  const { sentiment_counts, total_reviews } = data;
  
  // Prepare data for bar chart
  const barData = Object.entries(sentiment_counts).map(([sentiment, count]) => ({
    sentiment: sentiment.charAt(0).toUpperCase() + sentiment.slice(1),
    count,
    percentage: ((count / total_reviews) * 100).toFixed(1)
  }));

  // Prepare data for pie chart
  const pieData = Object.entries(sentiment_counts).map(([sentiment, count]) => ({
    name: sentiment.charAt(0).toUpperCase() + sentiment.slice(1),
    value: count,
    percentage: ((count / total_reviews) * 100).toFixed(1)
  }));

  const COLORS = ['#4ade80', '#f87171']; // Green for positive, red for negative

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="tooltip">
          <p className="label">{`${label} Reviews`}</p>
          <p className="count">{`Count: ${data.count.toLocaleString()}`}</p>
          <p className="percentage">{`Percentage: ${data.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="tooltip">
          <p className="label">{`${data.name} Reviews`}</p>
          <p className="count">{`Count: ${data.value.toLocaleString()}`}</p>
          <p className="percentage">{`Percentage: ${data.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="sentiment-chart">
      <div className="chart-container">
        <div className="chart-item">
          <h3>Review Distribution - Bar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="sentiment" 
                stroke={darkMode ? '#d1d5db' : '#374151'}
                fontSize={12}
              />
              <YAxis 
                stroke={darkMode ? '#d1d5db' : '#374151'}
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              >
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-item">
          <h3>Review Distribution - Pie Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span>{entry.name}: {entry.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="summary-stats">
        <div className="stat-card">
          <h4>Total Reviews</h4>
          <p className="stat-number">{total_reviews.toLocaleString()}</p>
        </div>
        {Object.entries(sentiment_counts).map(([sentiment, count]) => (
          <div key={sentiment} className="stat-card">
            <h4>{sentiment.charAt(0).toUpperCase() + sentiment.slice(1)} Reviews</h4>
            <p className="stat-number">{count.toLocaleString()}</p>
            <p className="stat-percentage">
              {((count / total_reviews) * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .sentiment-chart {
          color: ${darkMode ? '#e5e7eb' : '#374151'};
        }

        .chart-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .chart-item h3 {
          text-align: center;
          margin-bottom: 1rem;
          color: ${darkMode ? '#f9fafb' : '#1f2937'};
          font-size: 1.1rem;
          font-weight: 600;
        }

        .pie-legend {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .summary-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .stat-card {
          background: ${darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(255, 255, 255, 0.8)'};
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          border: 1px solid ${darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(229, 231, 235, 0.5)'};
          backdrop-filter: blur(10px);
        }

        .stat-card h4 {
          margin-bottom: 0.5rem;
          color: ${darkMode ? '#d1d5db' : '#6b7280'};
          font-size: 0.9rem;
          font-weight: 500;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: ${darkMode ? '#f9fafb' : '#1f2937'};
          margin-bottom: 0.25rem;
        }

        .stat-percentage {
          color: ${darkMode ? '#9ca3af' : '#6b7280'};
          font-size: 0.9rem;
        }

        .tooltip {
          background: ${darkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
          border: 1px solid ${darkMode ? '#374151' : '#e5e7eb'};
          border-radius: 8px;
          padding: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .tooltip .label {
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: ${darkMode ? '#f9fafb' : '#1f2937'};
        }

        .tooltip .count,
        .tooltip .percentage {
          margin: 0.25rem 0;
          color: ${darkMode ? '#d1d5db' : '#4b5563'};
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .chart-container {
            grid-template-columns: 1fr;
          }
          
          .summary-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SentimentChart;