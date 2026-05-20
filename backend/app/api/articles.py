from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    Form,
    HTTPException
)
from sqlalchemy import func
from sqlalchemy.orm import Session
from pathlib import Path
import shutil
import uuid
import csv
from io import StringIO
from fastapi.responses import StreamingResponse
from app.models.assignment import Assignment
from app.core.deps import get_db, get_current_user
from app.models.article import Article
from app.models.article import ArticleStatus

router = APIRouter(prefix="/articles", tags=["articles"])


UPLOAD_DIR = Path("storage/articles")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


ALLOWED_EXTENSIONS = [".pdf", ".docx", ".tex"]


@router.post("/")
async def create_article(
    title: str = Form(...),
    abstract: str = Form(...),
    keywords: str = Form(None),

    file: UploadFile = File(...),

    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    ext = Path(file.filename).suffix.lower()

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOCX and TEX files are allowed"
        )

    unique_filename = f"{uuid.uuid4()}{ext}"

    file_path = UPLOAD_DIR / unique_filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    article = Article(
        title=title,
        abstract=abstract,
        keywords=keywords,
        file_path=str(file_path),
        status=ArticleStatus.SUBMITTED,
        author_id=user.id
    )

    db.add(article)
    db.commit()
    db.refresh(article)

    return {
        "id": article.id,
        "title": article.title,
        "status": article.status,
        "file": article.file_path
    }

@router.get("/")
def get_articles(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    articles = db.query(Article).all()

    return articles

@router.get("/search")
def search_articles(
    title: str = None,
    status: str = None,
    keywords: str = None,

    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    query = db.query(Article)

    # AUTHOR sees only own articles
    if user.role == "AUTHOR":
        
        query = query.filter(
            Article.author_id == user.id
        )
    elif user.role == "REVIEWER":
        query = query.filter(
            Article.status == "IN_REVIEW"
            )
    if title:

        query = query.filter(
            Article.title.ilike(f"%{title}%")
        )

    if status:

        query = query.filter(
            Article.status == status
        )

    if keywords:

        query = query.filter(
            Article.keywords.ilike(f"%{keywords}%")
        )

    return query.all()

@router.get("/my")
def my_articles(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    articles = db.query(Article).filter(
        Article.author_id == user.id
    ).all()

    return articles

@router.get("/public")
def get_public_articles(

    db: Session = Depends(get_db)
):

    articles = db.query(Article).filter(
        Article.status == "PUBLISHED"
    ).all()

    return [
        {
            "id": article.id,
            "title": article.title,
            "abstract": article.abstract,
            "keywords": article.keywords,
            "status": article.status,
            "file": article.file_path,
            "author": {
                "first_name": article.author.first_name,
                "last_name": article.author.last_name
            }
        }
        for article in articles
    ]

@router.get("/public/{article_id}")
def get_public_article(

    article_id: int,

    db: Session = Depends(get_db)
):

    article = db.query(Article).filter(
        Article.id == article_id,
        Article.status == "PUBLISHED"
    ).first()

    if not article:

        raise HTTPException(
            status_code=404,
            detail="Article not found"
        )

    return {
            "id": article.id,
            "title": article.title,
            "abstract": article.abstract,
            "keywords": article.keywords,
            "status": article.status,
            "file": article.file_path,

            "author": {
                "first_name": article.author.first_name,
                "last_name": article.author.last_name
            }
    }

@router.get("/{article_id}")
def get_article(
    article_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    article = db.query(Article).filter(
        Article.id == article_id
    ).first()

    if not article:
        raise HTTPException(
            status_code=404,
            detail="Article not found"
        )

    return article

@router.put("/{article_id}/review")
def take_article_to_review(

    article_id: int,

    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    if user.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Admins only"
        )

    article = db.query(Article).filter(
        Article.id == article_id
    ).first()

    if not article:

        raise HTTPException(
            status_code=404,
            detail="Article not found"
        )

    article.status = "IN_REVIEW"

    db.commit()

    return {
        "message": "Article moved to review"
    }

@router.put("/{article_id}/decision")
def final_decision(

    article_id: int,
    decision: str,

    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    if user.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Admins only"
        )

    article = db.query(Article).filter(
        Article.id == article_id
    ).first()

    if not article:

        raise HTTPException(
            status_code=404,
            detail="Article not found"
        )

    if decision not in ["ACCEPTED", "REJECTED"]:

        raise HTTPException(
            status_code=400,
            detail="Invalid decision"
        )

    article.status = decision

    db.commit()

    return {
        "message": f"Article {decision}"
    }

@router.put("/{article_id}/publish")
def publish_article(

    article_id: int,

    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    if user.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Admins only"
        )

    article = db.query(Article).filter(
        Article.id == article_id
    ).first()

    if not article:

        raise HTTPException(
            status_code=404,
            detail="Article not found"
        )

    if article.status != "ACCEPTED":

        raise HTTPException(
            status_code=400,
            detail="Only accepted articles can be published"
        )

    article.status = "PUBLISHED"

    db.commit()

    return {
        "message": "Article published"
    }

@router.get("/stats/overview")
def get_stats(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    total_articles = db.query(Article).count()

    submitted = db.query(Article).filter(
        Article.status == "SUBMITTED"
    ).count()

    accepted = db.query(Article).filter(
        Article.status == "ACCEPTED"
    ).count()

    rejected = db.query(Article).filter(
        Article.status == "REJECTED"
    ).count()
    published = db.query(Article).filter(
        Article.status == "PUBLISHED"
    ).count() 
    in_review = db.query(Article).filter(
        Article.status == "IN_REVIEW"
    ).count()
    return {
        "total_articles": total_articles,
        "SUBMITTED": submitted,
        "ACCEPTED": accepted,
        "REJECTED": rejected,
        "PUBLISHED": published,
        "IN_REVIEW": in_review
    }



@router.get("/export/csv")
def export_articles_csv(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    articles = db.query(Article).all()

    output = StringIO()

    writer = csv.writer(output)

    writer.writerow([
        "ID",
        "Title",
        "Status",
        "Keywords"
    ])

    for article in articles:

        writer.writerow([
            article.id,
            article.title,
            article.status,
            article.keywords
        ])

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition":
            "attachment; filename=articles.csv"
        }
    )