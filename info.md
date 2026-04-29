# ADHD Academic Helper Web App - Architecture & Blueprint

## Overview

An AI-powered academic assistant designed specifically for students with ADHD. The system focuses on reducing cognitive overload, improving engagement, and making learning more interactive, structured, and rewarding.

The platform combines micro-learning, gamification, adaptive questioning, and AI-driven assistance to help students stay focused and retain information effectively.

---

## Core Idea

Instead of long, passive learning sessions, the app breaks learning into:

* Small chunks (micro-content)
* Interactive questions
* Immediate feedback
* Reward-based progression

The goal is to keep dopamine levels engaged while maintaining consistent academic progress.

---

## Key Features

### 1. Micro-Learning System
* Content is split into very small, digestible units (2-5 minutes).
* Reduces overwhelm and improves completion rate.

### 2. Multi-Modal Ingestion & AI Generation
* Generates questions and summaries from:
  * Uploaded notes & PDFs (via OCR/Parsing)
  * Textbooks
  * **YouTube Videos** (Transcript extraction)
  * **Audio/Voice Notes**
* Supports MCQs, short answers, and concept questions.

### 3. Adaptive Learning Engine
* Tracks user performance and weak topics over time.
* Adjusts difficulty dynamically based on user profile (e.g., Class 1 vs. Class 12).
* Implements Spaced Repetition.

### 4. Hyper-Visual Gamification Layer
* Uses dynamic micro-animations (Framer Motion) to provide immediate dopamine hits (e.g., confetti for correct answers).
* XP points, streak tracking, and levels.
* Emphasizes a visual **"Done" List** to show momentum, rather than just pending tasks.

### 5. Focus Mode & "Task Paralysis" Breaker
* **Focus Mode:** Minimal UI with Pomodoro timers.
* **"Magic Button":** When overwhelmed, a single click asks the user "What's the one thing you need to learn right now?" and instantly generates a 3-minute starting task.

### 6. AI Learning Assistant (Avatar)
* Explains concepts in simple terms based on the user's grade level.

---

## Technical Architecture

### Frontend (User Interface)
* **Framework:** React (Next.js or Vite) - For dynamic, highly responsive UI.
* **Styling:** Tailwind CSS + Framer Motion (for crucial micro-animations).
* **State Management:** Zustand.
* **Authentication:** Supabase Auth (or Clerk) for frictionless login to track user progress.

### Backend (API & Orchestration)
* **Framework:** FastAPI (Python).
* **Database:** Supabase (PostgreSQL) - Stores user profiles, progress (XP, streaks), and **caches generated questions**.
* **Vector DB:** FAISS or Supabase pgvector for RAG document retrieval.

### AI Strategy (Hybrid Generation & Caching)
* **Question Generation:** Uses Cloud APIs with generous free tiers (e.g., Google Gemini or Groq) to generate questions dynamically based on the student's grade level and topic.
* **Database Caching:** Once the AI generates questions, they are saved to the PostgreSQL database. When reviewing later, questions are fetched instantly from the database (fast & free). AI is only called for *new* content.
* **Local Fallback:** Code structure supports swapping to local LLMs (like Ollama) for offline/demo capabilities.

---

## Deployment Strategy
* **Dockerized Environment:** The entire stack (Frontend, Backend, and DB connections) is containerized using Docker and Docker Compose to ensure it runs seamlessly on any device.

---

---

## Development Log
*   **Step 1:** Concept validation, architecture planning, and `info.md` blueprint finalization.
*   **Step 2:** Initialized the React + Vite frontend environment with Tailwind CSS and Framer Motion.
*   **Step 3:** Initialized the FastAPI backend environment with basic CORS and health-check endpoints.
*   **Step 4:** Set up Docker orchestration (`docker-compose.yml`, `frontend/Dockerfile`, `backend/Dockerfile`) to make the project deployable on any device.
