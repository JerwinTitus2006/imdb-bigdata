import React from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ darkMode, onToggle }) => {
  return (
    <button 
      onClick={onToggle} 
      className="theme-toggle"
      title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      
      <style jsx>{`
        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid #4299e1;
          background: ${darkMode ? '#4a5568' : '#4299e1'};
          color: ${darkMode ? '#f7fafc' : 'white'};
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .theme-toggle:hover {
          background: ${darkMode ? '#2d3748' : '#3182ce'};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .theme-toggle:active {
          transform: translateY(0);
        }
      `}</style>
    </button>
  );
};

export default ThemeToggle;