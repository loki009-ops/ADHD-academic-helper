from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import generate, upload, lessons
from database import engine, Base

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ADHD Academic Helper API")

# Configure CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate.router, prefix="/api/generate", tags=["generate"])
app.include_router(upload.router, prefix="/api/upload", tags=["upload"])
app.include_router(lessons.router, prefix="/api/lessons", tags=["lessons"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the ADHD Academic Helper API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

