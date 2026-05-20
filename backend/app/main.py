from fastapi import FastAPI  
from app.api.auth import router as auth_router
from app.api.articles import router as articles_router
from app.api.reviews import router as reviews_router
from fastapi.middleware.cors import CORSMiddleware 
from fastapi.staticfiles import StaticFiles
from prometheus_fastapi_instrumentator import Instrumentator
from app.api.assignments import router as assignments_router
from app.models.user import User
from app.models.article import Article
from app.models.review import Review
from app.models.assignment import Assignment
from app.core.database import Base, engine
from app.api.admin import router as admin_router

Base.metadata.create_all(bind=engine)
app = FastAPI()
Instrumentator().instrument(app).expose(app)
app.include_router(admin_router)
app.mount(
    "/storage",
    StaticFiles(directory="storage"),
    name="storage"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(articles_router)
app.include_router(reviews_router)
app.include_router(assignments_router)