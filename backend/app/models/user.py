from sqlalchemy import Column, Integer, String, Enum
from app.core.database import Base
import enum


class UserRole(str, enum.Enum):
    AUTHOR = "AUTHOR"
    REVIEWER = "REVIEWER"
    ADMIN = "ADMIN"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.AUTHOR)