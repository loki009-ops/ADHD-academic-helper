import os
import json
from litellm import completion
from models.schemas import GenerateRequest, QuestionResponse

def generate_question(request: GenerateRequest) -> QuestionResponse:
    use_local = os.getenv("USE_LOCAL_LLM", "True").lower() in ("true", "1", "yes")
    
    if use_local:
        model_name = os.getenv("LOCAL_MODEL_NAME", "ollama/llama3")
        api_base = os.getenv("LOCAL_API_BASE", "http://host.docker.internal:11434")
    else:
        model_name = os.getenv("CLOUD_MODEL_NAME", "gemini/gemini-1.5-flash")
        api_base = None

    prompt = f"""
    Generate a {request.content_type} question about '{request.topic}' suitable for a {request.grade_level} student with ADHD.
    Keep the language clear, engaging, and avoid overly complex sentences.
    
    Respond STRICTLY in JSON format matching this schema:
    {{
        "question": "The question text",
        "options": ["Option A", "Option B", "Option C", "Option D"], // Only if MCQ
        "correct_answer": "The correct option text",
        "explanation": "A short, encouraging explanation of why it's correct"
    }}
    """
    
    try:
        response = completion(
            model=model_name,
            messages=[{"role": "user", "content": prompt}],
            api_base=api_base,
            response_format={ "type": "json_object" }
        )
        
        content = response.choices[0].message.content
        data = json.loads(content)
        return QuestionResponse(**data)
    except Exception as e:
        print(f"LLM Generation Error: {e}")
        # Fallback for demonstration if model is unreachable
        return QuestionResponse(
            question=f"What is the core concept of {request.topic}?",
            options=["Option 1", "Option 2", "Option 3", "Option 4"],
            correct_answer="Option 1",
            explanation=f"This is a fallback explanation for {request.topic}."
        )

def generate_micro_lessons_from_text(text: str):
    use_local = os.getenv("USE_LOCAL_LLM", "True").lower() in ("true", "1", "yes")
    
    if use_local:
        model_name = os.getenv("LOCAL_MODEL_NAME", "ollama/llama3")
        api_base = os.getenv("LOCAL_API_BASE", "http://host.docker.internal:11434")
    else:
        model_name = os.getenv("CLOUD_MODEL_NAME", "gemini/gemini-1.5-flash")
        api_base = None

    prompt = f"""
    You are an ADHD academic assistant. Break down the following textbook text into 2-3 engaging micro-lessons.
    Each lesson must be exactly a JSON object with this schema:
    {{
        "title": "Short catchy title",
        "reading": ["Short paragraph 1", "Short paragraph 2"],
        "question": "A multiple choice question to check understanding",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0, // integer index of correct option
        "explanation": "Why it's correct"
    }}
    
    Return a JSON array of these objects.
    Text: {text}
    """
    
    try:
        response = completion(
            model=model_name,
            messages=[{"role": "user", "content": prompt}],
            api_base=api_base,
            response_format={ "type": "json_object" } # Wait, gemini json_object might require a wrapper object instead of array directly
        )
        content = response.choices[0].message.content
        data = json.loads(content)
        # Handle cases where model returns an object with a "lessons" key or directly a list
        if isinstance(data, dict):
            for k, v in data.items():
                if isinstance(v, list):
                    return v
        if isinstance(data, list):
            return data
        return []
    except Exception as e:
        print(f"LLM Generation Error for Lessons: {e}")
        # Fallback for demonstration if model is unreachable
        return [
            {
                "title": "Mock Lesson: Introduction",
                "reading": ["This is a fallback paragraph generated because the LLM API is not configured yet. It demonstrates that the PDF was processed.", "You can add the real API later."],
                "question": "Why did you receive this mock lesson?",
                "options": ["The API is not set up", "The PDF was blank", "There is a bug", "I answered correctly"],
                "correctAnswer": 0,
                "explanation": "This is a fallback response provided by the system when the LLM is not reachable."
            }
        ]
