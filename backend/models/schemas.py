from pydantic import BaseModel
from typing import List, Optional

class GenerateRequest(BaseModel):
    topic: str
    grade_level: str = "High School"
    content_type: str = "MCQ"

class QuestionResponse(BaseModel):
    question: str
    options: Optional[List[str]] = None
    correct_answer: str
    explanation: str
