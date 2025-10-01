import React from 'react';
import { Database, FileText, Hash, Clock } from 'lucide-react';

const Statistics = ({ stats }) => {
  if (!stats) {
    return (
      <div className="stats-loading">
        <div className="loading-spinner"></div>
        <p>Loading statistics...</p>
      </div>
    );
  }

  const { total_reviews, unique_words, top_5_words } = stats;

  const statCards = [
    {
      title: 'Total Reviews',
      value: total_reviews?.toLocaleString() || '0',
      icon: <FileText size={24} />,
      color: '#3b82f6',
      description: 'Movie reviews analyzed'
    },
    {
      title: 'Unique Words',
      value: unique_words?.toLocaleString() || '0',
      icon: <Hash size={24} />,
      color: '#8b5cf6',
      description: 'Distinct words found'
    },
    {
      title: 'Data Processing',
      value: 'Complete',
      icon: <Database size={24} />,
      color: '#10b981',
      description: 'MapReduce operations'
    },
    {
      title: 'Last Updated',
      value: new Date().toLocaleDateString(),
      icon: <Clock size={24} />,
      color: '#f59e0b',
      description: 'Data freshness'
    }
  ];

  return (
    <div className="statistics-container">
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ '--accent-color': stat.color }}>
            <div className="stat-icon">
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-description">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {top_5_words && top_5_words.length > 0 && (
        <div className="top-words-preview">
          <h3>Top 5 Most Common Words</h3>
          <div className="words-preview-list">
            {top_5_words.map((word, index) => (
              <div key={index} className="word-preview-item">
                <span className="word-rank">#{index + 1}</span>
                <span className="word-text">{word.word}</span>
                <span className="word-count">{word.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .statistics-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .dark .stat-card {
          background: rgba(45, 55, 72, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent-color);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: var(--accent-color);
        }

        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          color: var(--accent-color);
          flex-shrink: 0;
        }

        .stat-content {
          flex: 1;
        }

        .stat-title {
          font-size: 0.9rem;
          font-weight: 500;
          color: #718096;
          margin: 0 0 0.25rem 0;
        }

        .dark .stat-title {
          color: #a0aec0;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 0.25rem 0;
          line-height: 1.2;
        }

        .dark .stat-value {
          color: #f7fafc;
        }

        .stat-description {
          font-size: 0.8rem;
          color: #a0aec0;
          margin: 0;
        }

        .dark .stat-description {
          color: #718096;
        }

        .stats-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 2rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .top-words-preview {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .dark .top-words-preview {
          background: rgba(45, 55, 72, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .top-words-preview h3 {
          color: #2d3748;
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          text-align: center;
        }

        .dark .top-words-preview h3 {
          color: #f7fafc;
        }

        .words-preview-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .word-preview-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .dark .word-preview-item {
          background: rgba(74, 85, 104, 0.5);
        }

        .word-preview-item:hover {
          background: rgba(255, 255, 255, 0.7);
          transform: translateX(4px);
        }

        .dark .word-preview-item:hover {
          background: rgba(74, 85, 104, 0.7);
        }

        .word-rank {
          font-size: 0.8rem;
          font-weight: 600;
          color: #718096;
          min-width: 24px;
        }

        .dark .word-rank {
          color: #a0aec0;
        }

        .word-text {
          flex: 1;
          color: #2d3748;
          font-weight: 500;
        }

        .dark .word-text {
          color: #f7fafc;
        }

        .word-count {
          color: #4a5568;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .dark .word-count {
          color: #cbd5e0;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            padding: 1rem;
          }

          .stat-icon {
            width: 48px;
            height: 48px;
          }

          .stat-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Statistics;