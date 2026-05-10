from sqlalchemy import Column, Integer, String
from database import Base

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    reading_content = Column(String) # Stored as JSON string list of paragraphs
    question = Column(String)
    options = Column(String) # Stored as JSON string list of options
    correct_answer = Column(Integer)
    explanation = Column(String)
