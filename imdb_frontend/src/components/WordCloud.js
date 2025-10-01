import React, { useState, useEffect } from 'react';
import { Download, RefreshCw } from 'lucide-react';

const WordCloud = ({ darkMode }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWordCloud();
  }, []);

  const loadWordCloud = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add timestamp to prevent caching and use absolute URL
      const timestamp = new Date().getTime();
      const url = `http://localhost:8000/wordcloud.png?t=${timestamp}`;
      setImageUrl(url);
      
    } catch (err) {
      setError('Failed to load word cloud');
    } finally {
      setLoading(false);
    }
  };

  const downloadWordCloud = async () => {
    try {
      const response = await fetch('http://localhost:8000/wordcloud.png');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'imdb-wordcloud.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading word cloud:', err);
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError('Failed to load word cloud image');
  };

  if (error) {
    return (
      <div className="wordcloud-error">
        <p>{error}</p>
        <button onClick={loadWordCloud} className="retry-button">
          <RefreshCw size={16} />
          Retry
        </button>
        <style jsx>{`
          .wordcloud-error {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 400px;
            color: ${darkMode ? '#fc8181' : '#e53e3e'};
            gap: 1rem;
          }

          .retry-button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: ${darkMode ? '#4a5568' : '#4299e1'};
            border: 1px solid ${darkMode ? '#2d3748' : '#4299e1'};
            color: ${darkMode ? '#f7fafc' : 'white'};
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .retry-button:hover {
            background: ${darkMode ? '#2d3748' : '#3182ce'};
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="wordcloud-container">
      <div className="wordcloud-header">
        <div className="wordcloud-info">
          <p>Visualization of the most frequently used words in movie reviews</p>
        </div>
        <div className="wordcloud-actions">
          <button onClick={loadWordCloud} className="action-button" title="Refresh">
            <RefreshCw size={16} />
          </button>
          <button onClick={downloadWordCloud} className="action-button" title="Download">
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className="wordcloud-display">
        {loading && (
          <div className="wordcloud-loading">
            <div className="spinner"></div>
            <p>Generating word cloud...</p>
          </div>
        )}
        
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Word Cloud of Top 200 Words"
            className={`wordcloud-image ${loading ? 'loading' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>

      <div className="wordcloud-description">
        <p>
          <strong>Word Cloud Analysis:</strong> This visualization shows the most frequently 
          used words across all movie reviews. Larger words appear more frequently in the dataset.
        </p>
      </div>

      <style jsx>{`
        .wordcloud-container {
          width: 100%;
        }

        .wordcloud-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .wordcloud-info p {
          color: ${darkMode ? '#d1d5db' : '#4b5563'};
          font-size: 0.95rem;
          margin: 0;
        }

        .wordcloud-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: ${darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(255, 255, 255, 0.8)'};
          border: 1px solid ${darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(229, 231, 235, 0.5)'};
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: ${darkMode ? '#e5e7eb' : '#374151'};
          backdrop-filter: blur(10px);
        }

        .action-button:hover {
          background: ${darkMode ? 'rgba(75, 85, 99, 0.7)' : 'rgba(255, 255, 255, 0.9)'};
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .wordcloud-display {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          background: ${darkMode ? 'rgba(17, 24, 39, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
          border-radius: 12px;
          border: 1px solid ${darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'};
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .wordcloud-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: ${darkMode ? '#d1d5db' : '#4b5563'};
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid ${darkMode ? 'rgba(229, 231, 235, 0.3)' : 'rgba(75, 85, 99, 0.3)'};
          border-top: 3px solid ${darkMode ? '#e5e7eb' : '#4b5563'};
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .wordcloud-image {
          max-width: 100%;
          max-height: 500px;
          border-radius: 8px;
          transition: opacity 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .wordcloud-image.loading {
          opacity: 0;
        }

        .wordcloud-description {
          background: ${darkMode ? 'rgba(17, 24, 39, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid ${darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.3)'};
          backdrop-filter: blur(10px);
        }

        .wordcloud-description p {
          color: ${darkMode ? '#d1d5db' : '#4b5563'};
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }

        .wordcloud-description strong {
          color: ${darkMode ? '#f9fafb' : '#1f2937'};
        }

        @media (max-width: 768px) {
          .wordcloud-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .wordcloud-display {
            min-height: 300px;
          }

          .wordcloud-image {
            max-height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default WordCloud;