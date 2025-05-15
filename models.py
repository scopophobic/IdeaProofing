from pydantic import BaseModel
from typing import List

class Idea(BaseModel):
    idea_text: str

class MatchResult(BaseModel):
    title: str
    summary: str
    similarity: float
    link: str

class IdeaResult(BaseModel):
    novelty_score: int
    matches: List[MatchResult]
