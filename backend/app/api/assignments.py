from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.assignment import Assignment
from app.models.user import User
from app.models.article import Article


router = APIRouter(
    prefix="/assignments",
    tags=["Assignments"]
)

@router.get("/reviewers")
def get_reviewers(

    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    if user.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Admins only"
        )

    reviewers = db.query(User).filter(
        User.role == "REVIEWER"
    ).all()

    return reviewers
@router.post("/")
def assign_reviewer(

    reviewer_id: int,
    article_id: int,

    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    if user.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Admins only"
        )

    reviewer = db.query(User).filter(
        User.id == reviewer_id
    ).first()

    article = db.query(Article).filter(
        Article.id == article_id
    ).first()

    if not reviewer or reviewer.role != "REVIEWER":

        raise HTTPException(
            status_code=400,
            detail="Invalid reviewer"
        )

    if not article:

        raise HTTPException(
            status_code=404,
            detail="Article not found"
        )

    assignment = Assignment(
        reviewer_id=reviewer_id,
        article_id=article_id
    )

    db.add(assignment)

    db.commit()

    return {
        "message": "Reviewer assigned"
    }