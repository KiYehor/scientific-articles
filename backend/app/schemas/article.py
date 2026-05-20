from pydantic import BaseModel
from typing import Optional


class ArticleCreate(BaseModel):
    title: str
    abstract: str
    keywords: Optional[str] = None