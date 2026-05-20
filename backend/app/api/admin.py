from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.core.deps import get_db, get_current_user

from app.models.user import User


router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)


@router.get("/users")
def get_users(

    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    if user.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Admins only"
        )

    users = db.query(User).all()

    return users


@router.put("/users/{user_id}/role")
def change_role(

    user_id: int,
    role: str,

    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    if user.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Admins only"
        )

    target = db.query(User).filter(
        User.id == user_id
    ).first()

    if not target:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if role not in ["AUTHOR", "REVIEWER"]:

        raise HTTPException(
            status_code=400,
            detail="Invalid role"
        )

    target.role = role

    db.commit()

    return {
        "message": "Role updated"
    }