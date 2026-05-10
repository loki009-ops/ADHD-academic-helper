from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json

from database import get_db
from models.db_models import Lesson

router = APIRouter()

@router.get("/")
def get_lessons(db: Session = Depends(get_db)):
    lessons_db = db.query(Lesson).all()
    
    result = []
    for l in lessons_db:
        result.append({
            "id": l.id,
            "title": l.title,
            "reading": json.loads(l.reading_content) if l.reading_content else [],
            "question": l.question,
            "options": json.loads(l.options) if l.options else [],
            "correctAnswer": l.correct_answer,
            "explanation": l.explanation
        })
        
    return result

@router.delete("/")
def clear_lessons(db: Session = Depends(get_db)):
    db.query(Lesson).delete()
    db.commit()
    return {"message": "All lessons cleared"}
