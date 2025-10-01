@echo off
echo ========================================
echo IMDb Analytics - Data Preparation Setup
echo ========================================

cd /d "c:\Users\Jerwin titus\Desktop\bdtt\imdb_venv"

echo Activating Python virtual environment...
call Scripts\activate.bat

echo.
echo Step 1: Importing IMDb dataset to MongoDB...
python imdb.py

echo.
echo Step 2: Preprocessing reviews (cleaning text)...
python pre.py

echo.
echo Step 3: Running MapReduce operations...
python mapr.py

echo.
echo ========================================
echo Data preparation complete!
echo You can now start the backend and frontend servers.
echo ========================================
pause