# 🎬 IMDb Big Data Analytics

A full-stack web application for analyzing IMDb movie reviews using big data technologies including MongoDB MapReduce, Flask, and React.

## 🌟 Features

- **Sentiment Analysis**: Analyze movie review sentiments (positive/negative)
- **Word Frequency Analysis**: Find most common words in reviews
- **Interactive Word Cloud**: Visual representation of review keywords
- **Real-time Statistics**: Live database statistics and analytics
- **Responsive Design**: Modern UI with light/dark theme toggle
- **Big Data Processing**: MongoDB MapReduce for large-scale data analysis

## 🚀 Tech Stack

### Backend
- **Python 3.x** - Core programming language
- **Flask** - Web framework with CORS support
- **MongoDB** - NoSQL database for big data storage
- **PyMongo** - MongoDB Python driver
- **NLTK** - Natural language processing
- **Matplotlib** - Data visualization
- **PIL (Pillow)** - Image processing for word clouds

### Frontend
- **React.js** - Modern JavaScript framework
- **Recharts** - Interactive chart library
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with glass-morphism effects

## 📁 Project Structure

```
bdtt/
├── imdb_venv/                 # Python virtual environment
│   ├── imdb.py               # MongoDB connection and data import
│   ├── pre.py                # Data preprocessing
│   ├── mapr.py               # MapReduce operations
│   ├── viz.py                # Data visualization
│   └── robust_app.py         # Flask backend server
├── imdb_frontend/            # React frontend application
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Styling with theme support
│   │   └── components/      # React components
│   └── package.json         # Node.js dependencies
├── IMDB Dataset.csv         # Raw IMDb dataset
├── start_backend.bat        # Backend startup script
├── start_frontend.bat       # Frontend startup script
└── README.md               # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.x
- Node.js and npm
- MongoDB (running on localhost:27017)

### Backend Setup
1. **Navigate to project directory:**
   ```bash
   cd "c:\Users\Jerwin titus\Desktop\bdtt\imdb_venv"
   ```

2. **Activate virtual environment:**
   ```bash
   .\Scripts\activate.ps1
   ```

3. **Install dependencies:**
   ```bash
   pip install flask flask-cors pymongo nltk matplotlib pillow pandas
   ```

4. **Start Flask backend:**
   ```bash
   python robust_app.py
   ```
   Backend will be available at `http://localhost:8000`

### Frontend Setup
1. **Navigate to frontend directory:**
   ```bash
   cd "c:\Users\Jerwin titus\Desktop\bdtt\imdb_frontend"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start React frontend:**
   ```bash
   npm start
   ```
   Frontend will be available at `http://localhost:3000`

## 🎯 Usage

1. **Start MongoDB** (ensure it's running on port 27017)
2. **Start the backend** using the commands above
3. **Start the frontend** using the commands above
4. **Open your browser** to `http://localhost:3000`

## 📊 API Endpoints

The Flask backend provides the following REST API endpoints:

- `GET /` - Health check
- `GET /sentiment_counts` - Sentiment analysis data
- `GET /top_words` - Most frequent words
- `GET /top_words_by_sentiment` - Words categorized by sentiment
- `GET /wordcloud.png` - Generated word cloud image
- `GET /stats` - Database statistics

## 🔧 Big Data Processing

The project uses MongoDB MapReduce for efficient big data processing:

1. **Data Import**: Raw CSV data imported into MongoDB
2. **MapReduce Operations**: Parallel processing for sentiment analysis and word counting
3. **Aggregation**: Real-time data aggregation for analytics
4. **Visualization**: Interactive charts and word clouds

## 🎨 UI Features

- **Modern Design**: Glass-morphism effects with gradient backgrounds
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Layout**: Works on desktop and mobile devices
- **Interactive Charts**: Hover effects and dynamic data display
- **Real-time Updates**: Live data fetching from backend APIs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Jerwin Titus**
- GitHub: [@JerwinTitus2006](https://github.com/JerwinTitus2006)

## 🙏 Acknowledgments

- IMDb for providing the dataset
- MongoDB for big data processing capabilities
- React community for excellent documentation
- Flask community for the lightweight web framework

## 🎯 Features

### Backend (Flask + MongoDB)
- **REST API** with endpoints for sentiment analysis and word frequency data
- **MongoDB integration** with MapReduce operations for data processing
- **Word cloud generation** using matplotlib and wordcloud libraries
- **CORS enabled** for frontend integration

### Frontend (React.js)
- **Interactive charts** for sentiment analysis (bar chart + pie chart)
- **Dynamic word cloud** visualization of top 200 words
- **Top words analysis** by sentiment (positive/negative) and overall
- **Dark/Light theme** toggle
- **Responsive design** with modern UI/UX
- **Real-time data fetching** from Flask backend

## 🛠️ Technology Stack

**Backend:**
- Python 3.x
- Flask (Web framework)
- MongoDB (Database)
- PyMongo (MongoDB driver)
- Matplotlib (Chart generation)
- WordCloud (Word cloud generation)
- NLTK (Text processing)
- Pandas (Data manipulation)

**Frontend:**
- React.js 18
- Recharts (Chart library)
- Lucide React (Icons)
- Axios (HTTP client)
- CSS3 with modern styling

## 📋 Prerequisites

1. **Python 3.7+** installed
2. **Node.js 14+** and npm installed
3. **MongoDB** running locally on port 27017
4. **IMDb Dataset** (CSV file with 'review' and 'sentiment' columns)

## 🚀 Installation & Setup

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd imdb_venv

# Activate virtual environment (if not already activated)
# On Windows:
Scripts\activate
# On macOS/Linux:
source bin/activate

# Install required packages
pip install -r requirements.txt

# Download NLTK data (if not already done)
python -c "import nltk; nltk.download('stopwords')"
```

### 2. Data Preparation

Make sure you have the IMDb dataset and run the data preparation scripts:

```bash
# 1. Import data to MongoDB
python imdb.py

# 2. Preprocess reviews (clean text)
python pre.py

# 3. Run MapReduce operations
python mapr.py
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../imdb_frontend

# Install dependencies
npm install

# Alternative if you encounter issues:
npm install --legacy-peer-deps
```

## 🏃‍♂️ Running the Application

### 1. Start MongoDB
Make sure MongoDB is running on localhost:27017

### 2. Start Flask Backend

```bash
# In the imdb_venv directory
python app.py
```

The backend will be available at: `http://localhost:5000`

### 3. Start React Frontend

```bash
# In the imdb_frontend directory
npm start
```

The frontend will be available at: `http://localhost:3000`

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information and available endpoints |
| `/sentiment_counts` | GET | Get positive vs negative review counts |
| `/top_words?limit=N` | GET | Get top N words overall (default: 50) |
| `/top_words_by_sentiment?sentiment=X&limit=N` | GET | Get top words by sentiment |
| `/wordcloud.png` | GET | Generate and return word cloud image |
| `/stats` | GET | Get overall statistics |

### Example API Responses

**Sentiment Counts:**
```json
{
  "sentiment_counts": {
    "positive": 25000,
    "negative": 25000
  },
  "total_reviews": 50000
}
```

**Top Words:**
```json
{
  "top_words": [
    {"word": "movie", "count": 12500},
    {"word": "film", "count": 10200},
    {"word": "good", "count": 8900}
  ]
}
```

## 🎨 Frontend Features

### Interactive Dashboard
- **Sentiment Analysis Charts**: Bar chart and pie chart showing positive vs negative review distribution
- **Word Cloud Visualization**: Dynamic word cloud of most frequent words
- **Top Words Lists**: Separate lists for overall, positive, and negative sentiment words
- **Statistics Overview**: Key metrics and data insights

### UI/UX Features
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations and error handling
- **Download Feature**: Download word cloud images
- **Refresh Data**: Manual data refresh capability

## 📁 Project Structure

```
bdtt/
├── imdb_venv/              # Backend (Flask + Python)
│   ├── app.py              # Main Flask application
│   ├── imdb.py             # Data import script
│   ├── pre.py              # Preprocessing script
│   ├── mapr.py             # MapReduce operations
│   ├── viz.py              # Original visualization script
│   ├── requirements.txt    # Python dependencies
│   └── ...
├── imdb_frontend/          # Frontend (React)
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── SentimentChart.js
│   │   │   ├── WordCloud.js
│   │   │   ├── TopWords.js
│   │   │   ├── Statistics.js
│   │   │   └── ThemeToggle.js
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Main styles
│   │   └── index.js        # React entry point
│   ├── public/
│   ├── package.json        # Node.js dependencies
│   └── ...
└── IMDB Dataset.csv        # Your IMDb dataset
```

## 🔧 Customization

### Adding New Features
1. **Backend**: Add new endpoints in `app.py`
2. **Frontend**: Create new React components in `src/components/`
3. **Styling**: Modify CSS in component files or `App.css`

### Configuration
- **MongoDB Connection**: Modify connection string in `app.py`
- **API Base URL**: Update proxy in `package.json` or axios baseURL
- **Word Cloud Settings**: Adjust parameters in the `/wordcloud.png` endpoint

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running: `mongod`
   - Check connection string in `app.py`

2. **CORS Issues**
   - Flask-CORS is installed and configured
   - Check browser console for specific errors

3. **Frontend Build Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

4. **Word Cloud Not Loading**
   - Check Flask backend is running
   - Verify MapReduce data exists in MongoDB
   - Check browser network tab for API errors

### Dependencies Issues

If you encounter dependency conflicts:

```bash
# For Python
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall

# For Node.js
npm install --legacy-peer-deps
```

## 📈 Performance Optimization

- **Backend**: Implement caching for frequently accessed data
- **Frontend**: Add React.memo for component optimization
- **Database**: Create indexes on frequently queried fields
- **Images**: Implement image caching for word clouds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- IMDb for the dataset
- MongoDB for the database
- React.js and Flask communities
- All open-source libraries used in this project

---

**Happy analyzing! 🎬📊**