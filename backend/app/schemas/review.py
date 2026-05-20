from pydantic import BaseModel
from app.models.review import ReviewDecision


class ReviewCreate(BaseModel):
    article_id: int
    score: int
    comment: str
    decision: ReviewDecision