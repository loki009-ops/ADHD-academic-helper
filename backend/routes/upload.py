from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
import PyPDF2
from sqlalchemy.orm import Session
import json

from database import get_db
from models.db_models import Lesson
from services.llm_service import generate_micro_lessons_from_text

router = APIRouter()

@router.post("/")
async def upload_pdf(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    try:
        pdf_reader = PyPDF2.PdfReader(file.file)
        text = ""
        # Only read first 3 pages to prevent overwhelming the local LLM or API limits during demo
        for page in pdf_reader.pages[:3]:
            text += page.extract_text() + "\n"
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")

        # Generate micro-lessons
        lessons_data = generate_micro_lessons_from_text(text)
        
        if not lessons_data:
            raise HTTPException(status_code=500, detail="Failed to generate lessons from text")

        # Save to DB
        saved_lessons = []
        for l in lessons_data:
            new_lesson = Lesson(
                title=l.get("title", "Lesson"),
                reading_content=json.dumps(l.get("reading", [])),
                question=l.get("question", "Question?"),
                options=json.dumps(l.get("options", ["A", "B", "C", "D"])),
                correct_answer=l.get("correctAnswer", 0),
                explanation=l.get("explanation", "")
            )
            db.add(new_lesson)
            saved_lessons.append(new_lesson)
            
        db.commit()
        
        return {"message": f"Successfully generated {len(saved_lessons)} lessons", "count": len(saved_lessons)}
        
    except Exception as e:
        print(f"Error processing PDF: {e}")
        raise HTTPException(status_code=500, detail=str(e))
