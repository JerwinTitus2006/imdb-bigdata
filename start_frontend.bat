@echo off
echo ==================================
echo IMDb Analytics - Starting Frontend
echo ==================================

cd /d "c:\Users\Jerwin titus\Desktop\bdtt\imdb_frontend"

echo Installing/updating dependencies...
npm install

echo.
echo Starting React development server on http://localhost:3000
echo Press Ctrl+C to stop the server
npm start