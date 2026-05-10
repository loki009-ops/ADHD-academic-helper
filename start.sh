#!/bin/bash

echo "Starting FocusFlow (ADHD Academic Helper)..."

# Ensure old containers are stopped and removed
echo "Cleaning up any old instances..."
if command -v docker &> /dev/null && docker compose version &> /dev/null; then
    docker compose down --remove-orphans
else
    docker-compose down --remove-orphans
fi

echo "Building and starting Docker containers..."

if command -v docker &> /dev/null && docker compose version &> /dev/null; then
    docker compose up -d --build
else
    docker-compose up -d --build
fi

echo ""
echo "🚀 FocusFlow services are starting in the background!"
echo "---------------------------------------------------"
echo "🖥️  Frontend UI: http://localhost:5173"
echo "⚙️  Backend API: http://localhost:8080"
echo "📚 API Docs:   http://localhost:8080/docs"
echo "---------------------------------------------------"
echo "To view logs, run: docker compose logs -f (or docker-compose logs -f)"
echo "To stop, run: docker compose down (or docker-compose down)"

