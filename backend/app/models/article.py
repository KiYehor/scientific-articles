from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum


class ArticleStatus(str, enum.Enum):
    SUBMITTED = "SUBMITTED"
    IN_REVIEW = "IN_REVIEW"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    PUBLISHED = "PUBLISHED"


class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    abstract = Column(Text, nullable=False)
    keywords = Column(String)

    file_path = Column(String)  # PDF/DOCX/LaTeX

    status = Column(Enum(ArticleStatus), default=ArticleStatus.SUBMITTED)

    author_id = Column(Integer, ForeignKey("users.id"))

    author = relationship("User")