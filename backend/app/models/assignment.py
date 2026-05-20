from sqlalchemy import Column, Integer, ForeignKey

from app.core.database import Base


class Assignment(Base):

    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True)

    reviewer_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    article_id = Column(
        Integer,
        ForeignKey("articles.id")
    )