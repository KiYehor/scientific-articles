from app.core.security import hash_password, verify_password, create_access_token
from app.models.user import User
from sqlalchemy.orm import Session


def register_user(db: Session, first_name: str, last_name: str, email: str, password: str):
    user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hash_password(password),
        role="AUTHOR"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    token = create_access_token({"sub": str(user.id), "role": user.role})

    return token