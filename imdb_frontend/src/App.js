import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SentimentChart from './components/SentimentChart';
import WordCloud from './components/WordCloud';
import TopWords from './components/TopWords';
import Statistics from './components/Statistics';
import ThemeToggle from './components/ThemeToggle';
import { BarChart3, Cloud, TrendingUp } from 'lucide-react';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sentimentData, setSentimentData] = useState(null);
  const [topWords, setTopWords] = useState([]);
  const [topWordsBySentiment, setTopWordsBySentiment] = useState({});
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Use absolute URLs with proper headers
      const baseURL = 'http://localhost:8000';
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
      
      // Fetch all data in parallel
      const [sentimentRes, topWordsRes, sentimentWordsRes, statsRes] = await Promise.all([
        axios.get(`${baseURL}/sentiment_counts`, { headers }),
        axios.get(`${baseURL}/top_words?limit=20`, { headers }),
        axios.get(`${baseURL}/top_words_by_sentiment?limit=10`, { headers }),
        axios.get(`${baseURL}/stats`, { headers })
      ]);

      setSentimentData(sentimentRes.data);
      setTopWords(topWordsRes.data.top_words);
      setTopWordsBySentiment(sentimentWordsRes.data);
      setStats(statsRes.data);
      
    } catch (err) {
      setError('Failed to fetch data. Make sure the Flask backend is running on port 5000.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return (
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading IMDb Analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchData} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <BarChart3 size={32} className="logo" />
            <h1>IMDb Movie Reviews Analytics</h1>
          </div>
          <div className="header-right">
            <button onClick={fetchData} className="refresh-btn">
              Refresh Data
            </button>
            <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Statistics Overview */}
        <section className="stats-section">
          <Statistics stats={stats} />
        </section>

        {/* Sentiment Analysis */}
        <section className="chart-section">
          <div className="section-header">
            <TrendingUp size={24} />
            <h2>Sentiment Analysis</h2>
          </div>
          <SentimentChart data={sentimentData} darkMode={darkMode} />
        </section>

        {/* Word Cloud */}
        <section className="wordcloud-section">
          <div className="section-header">
            <Cloud size={24} />
            <h2>Word Cloud - Top 200 Words</h2>
          </div>
          <WordCloud darkMode={darkMode} />
        </section>

        {/* Top Words */}
        <section className="words-section">
          <div className="section-header">
            <BarChart3 size={24} />
            <h2>Top Words Analysis</h2>
          </div>
          <div className="words-grid">
            <TopWords 
              title="Overall Top Words" 
              words={topWords} 
              type="overall"
              darkMode={darkMode}
            />
            <TopWords 
              title="Positive Reviews" 
              words={topWordsBySentiment.positive || []} 
              type="positive"
              darkMode={darkMode}
            />
            <TopWords 
              title="Negative Reviews" 
              words={topWordsBySentiment.negative || []} 
              type="negative"
              darkMode={darkMode}
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 IMDb Analytics Dashboard | Built with React & Flask</p>
      </footer>
    </div>
  );
}

export default App;