from fastapi import APIRouter
from models.schemas import GenerateRequest, QuestionResponse
from services.llm_service import generate_question

router = APIRouter()

@router.post("/question", response_model=QuestionResponse)
def generate_question_endpoint(request: GenerateRequest):
    return generate_question(request)
