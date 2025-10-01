@echo off
echo ================================
echo IMDb Analytics - Starting Backend
echo ================================

cd /d "c:\Users\Jerwin titus\Desktop\bdtt\imdb_venv"

echo Activating Python virtual environment...
call Scripts\activate.bat

echo.
echo Checking if data is prepared...
python -c "from pymongo import MongoClient; client = MongoClient('mongodb://localhost:27017/'); db = client['movie_reviews_db']; print(f'Reviews: {db.imdb_reviews.count_documents({})}'); print(f'Sentiment counts: {db.mr_sentiment_count.count_documents({})}'); print(f'Word counts: {db.mr_word_count.count_documents({})}')"

echo.
echo Starting Flask backend on http://localhost:5000
echo Press Ctrl+C to stop the server
python app.py