from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.deps import get_db, require_role, get_current_user
from app.models.review import Review
from app.models.article import Article, ArticleStatus
from app.schemas.review import ReviewCreate
from app.models import user

router = APIRouter(prefix="/reviews", tags=["reviews"])

@router.get("/{article_id}")
def get_reviews(
    article_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
    
):

    reviews = db.query(Review).filter(
        Review.article_id == article_id
    ).all()

    return [
        {
            "id": review.id,
            "reviewer": {
                "id": review.reviewer.id,
                "first_name": review.reviewer.first_name,
                "last_name": review.reviewer.last_name,
         },
            "score": review.score,
            "comment": review.comment,
            "decision": review.decision,
            "created_at": review.created_at
        }
        for review in reviews
    ]

@router.post("/")
def create_review(
    data: ReviewCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user),
    reviewer=Depends(require_role("REVIEWER", "ADMIN"))
):
    
    if user.role not in ["REVIEWER", "ADMIN"]:

        raise HTTPException(
            status_code=403,
            detail="Only reviewers can review"
        )


    article = db.query(Article).filter(
        Article.id == data.article_id
    ).first()

    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    review = Review(
        article_id=data.article_id,
        reviewer_id=reviewer.id,
        score=data.score,
        comment=data.comment,
        decision=data.decision
    )

    db.add(review)
    db.commit()
    db.refresh(review)

    return review