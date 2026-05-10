# FocusFlow (ADHD Academic Helper)

FocusFlow is a web application designed to help users with ADHD manage their academic tasks effectively.

## Running the Application

The easiest way to start the application is using Docker. A startup script is provided for convenience.

### Quick Start

Make sure the script is executable, then run it:

```bash
chmod +x start.sh
./start.sh
```

This will automatically clean up old containers, build the Docker images, and start the services in the background.

Once started, the services will be available at:
- **Frontend UI:** http://localhost:5173
- **Backend API:** http://localhost:8080
- **API Documentation:** http://localhost:8080/docs

### Manual Docker Commands

If you prefer to run the Docker commands manually, you can use either `docker compose` or `docker-compose` depending on your installation:

**Start the services (in the background):**
```bash
docker compose up -d --build
```

**View the logs:**
```bash
docker compose logs -f
```

**Stop the services:**
```bash
docker compose down
```

**Stop and remove volumes:**
```bash
docker compose down -v
```

### Development Setup

To run locally without Docker:
1. Navigate to `backend/` and install requirements with `pip install -r requirements.txt`. Run the server with `uvicorn main:app --reload --port 8000`.
2. Navigate to `frontend/` and install dependencies with `npm install`. Start the development server with `npm run dev`.
