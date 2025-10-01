import React from 'react';
import { BarChart3, TrendingUp, Hash } from 'lucide-react';

const TopWords = ({ title, words, type, darkMode }) => {
  if (!words || words.length === 0) {
    return (
      <div className="top-words-card">
        <div className="card-header">
          <div className="header-icon">
            {type === 'positive' && <TrendingUp size={20} />}
            {type === 'negative' && <BarChart3 size={20} />}
            {type === 'overall' && <Hash size={20} />}
          </div>
          <h3>{title}</h3>
        </div>
        <div className="no-data">
          <p>No data available</p>
        </div>
        <style jsx>{`
          .top-words-card {
            background: ${getCardBackground(type, darkMode)};
            border: 1px solid ${getCardBorder(type, darkMode)};
            border-radius: 12px;
            padding: 1.5rem;
            backdrop-filter: blur(10px);
          }

          .card-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
            color: ${getHeaderColor(type, darkMode)};
          }

          .card-header h3 {
            font-size: 1.1rem;
            font-weight: 600;
            margin: 0;
          }

          .no-data {
            text-align: center;
            color: ${darkMode ? '#9ca3af' : '#6b7280'};
            padding: 2rem 0;
          }
        `}</style>
      </div>
    );
  }

  const maxCount = Math.max(...words.map(word => word.count));

  return (
    <div className="top-words-card">
      <div className="card-header">
        <div className="header-icon">
          {type === 'positive' && <TrendingUp size={20} />}
          {type === 'negative' && <BarChart3 size={20} />}
          {type === 'overall' && <Hash size={20} />}
        </div>
        <h3>{title}</h3>
        <div className="word-count-badge">
          {words.length} words
        </div>
      </div>

      <div className="words-list">
        {words.map((word, index) => (
          <div key={index} className="word-item">
            <div className="word-rank">#{index + 1}</div>
            <div className="word-info">
              <div className="word-text">{word.word}</div>
              <div className="word-bar-container">
                <div 
                  className="word-bar"
                  style={{ 
                    width: `${(word.count / maxCount) * 100}%`,
                    background: getBarColor(type, word.count / maxCount)
                  }}
                ></div>
              </div>
            </div>
            <div className="word-count">{word.count.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="card-footer">
        <p>Top {words.length} most frequent words {type !== 'overall' ? `in ${type} reviews` : 'overall'}</p>
      </div>

      <style jsx>{`
        .top-words-card {
          background: ${getCardBackground(type, darkMode)};
          border: 1px solid ${getCardBorder(type, darkMode)};
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          height: fit-content;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          color: ${getHeaderColor(type, darkMode)};
        }

        .header-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: ${getIconBackground(type, darkMode)};
          border-radius: 6px;
        }

        .card-header h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          flex: 1;
        }

        .word-count-badge {
          background: ${darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(229, 231, 235, 0.5)'};
          color: ${darkMode ? '#d1d5db' : '#4b5563'};
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .words-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .word-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: ${darkMode ? 'rgba(17, 24, 39, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
          border-radius: 8px;
          border: 1px solid ${darkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.2)'};
          transition: all 0.3s ease;
        }

        .word-item:hover {
          background: ${darkMode ? 'rgba(17, 24, 39, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
          transform: translateX(4px);
        }

        .word-rank {
          font-size: 0.8rem;
          font-weight: 600;
          color: ${darkMode ? '#9ca3af' : '#6b7280'};
          min-width: 24px;
          text-align: center;
        }

        .word-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .word-text {
          font-weight: 600;
          color: ${darkMode ? '#f9fafb' : '#1f2937'};
          font-size: 0.95rem;
        }

        .word-bar-container {
          height: 4px;
          background: ${darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'};
          border-radius: 2px;
          overflow: hidden;
        }

        .word-bar {
          height: 100%;
          border-radius: 2px;
          transition: width 0.8s ease;
        }

        .word-count {
          font-size: 0.9rem;
          font-weight: 600;
          color: ${darkMode ? '#d1d5db' : '#4b5563'};
          min-width: 50px;
          text-align: right;
        }

        .card-footer {
          border-top: 1px solid ${darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'};
          padding-top: 1rem;
          margin-top: 1rem;
        }

        .card-footer p {
          font-size: 0.85rem;
          color: ${darkMode ? '#9ca3af' : '#6b7280'};
          margin: 0;
          text-align: center;
        }

        @media (max-width: 768px) {
          .word-item {
            gap: 0.5rem;
          }

          .word-rank {
            min-width: 20px;
          }

          .word-count {
            min-width: 40px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

// Helper functions for styling
const getCardBackground = (type, darkMode) => {
  const base = darkMode ? 'rgba(17, 24, 39, 0.5)' : 'rgba(255, 255, 255, 0.5)';
  
  if (type === 'positive') {
    return darkMode ? 'rgba(5, 46, 22, 0.3)' : 'rgba(240, 253, 244, 0.7)';
  } else if (type === 'negative') {
    return darkMode ? 'rgba(55, 7, 12, 0.3)' : 'rgba(254, 242, 242, 0.7)';
  }
  return base;
};

const getCardBorder = (type, darkMode) => {
  if (type === 'positive') {
    return darkMode ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)';
  } else if (type === 'negative') {
    return darkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)';
  }
  return darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)';
};

const getHeaderColor = (type, darkMode) => {
  if (type === 'positive') {
    return darkMode ? '#4ade80' : '#059669';
  } else if (type === 'negative') {
    return darkMode ? '#f87171' : '#dc2626';
  }
  return darkMode ? '#e5e7eb' : '#374151';
};

const getIconBackground = (type, darkMode) => {
  if (type === 'positive') {
    return darkMode ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)';
  } else if (type === 'negative') {
    return darkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)';
  }
  return darkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.2)';
};

const getBarColor = (type, intensity) => {
  const opacity = 0.3 + (intensity * 0.7); // Scale opacity from 0.3 to 1.0
  
  if (type === 'positive') {
    return `rgba(34, 197, 94, ${opacity})`;
  } else if (type === 'negative') {
    return `rgba(239, 68, 68, ${opacity})`;
  }
  return `rgba(59, 130, 246, ${opacity})`;
};

export default TopWords;