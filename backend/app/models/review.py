from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
    Enum
)
from datetime import datetime
from sqlalchemy import DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum


class ReviewDecision(str, enum.Enum):
    ACCEPT = "accept"
    REJECT = "reject"


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)

    article_id = Column(Integer, ForeignKey("articles.id"))
    reviewer_id = Column(Integer, ForeignKey("users.id"))

    score = Column(Integer)
    comment = Column(Text)

    decision = Column(Enum(ReviewDecision))
    created_at = Column(DateTime, default=datetime.utcnow)
    article = relationship("Article")
    reviewer = relationship("User")