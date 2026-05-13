@echo off
echo Starting FocusFlow (ADHD Academic Helper)...

:: Ensure old containers are stopped and removed
echo Cleaning up any old instances...
docker compose down --remove-orphans

echo Building and starting Docker containers...
docker compose up -d --build

echo.
echo ===================================================
echo [!] FocusFlow services are starting in the background!
echo ===================================================
echo [-] Frontend UI: http://localhost:5173
echo [-] Backend API: http://localhost:8080
echo [-] API Docs:    http://localhost:8080/docs
echo ===================================================
echo To view logs, run: docker compose logs -f
echo To stop, run: docker compose down
echo.
pause
