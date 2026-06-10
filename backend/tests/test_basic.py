import sys
from pathlib import Path
sys.path.append(
    str(Path(__file__).resolve().parents[1])
)
from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_home():

    response = client.get("/docs")

    assert response.status_code == 200


def test_public_articles():

    response = client.get("/articles/public")

    assert response.status_code == 200


def test_login_invalid():

    response = client.post(
        "/auth/login",
        json={
            "email": "wrong@test.com",
            "password": "wrong"
        }
    )

    assert response.status_code == 401

def test_register_validation():

    response = client.post(
        "/auth/register",
        json={
            "first_name": "",
            "last_name": "",
            "email": "bad",
            "password": "123"
        }
    )

    assert response.status_code == 422

def test_protected_route():

    response = client.get("/articles/")

    assert response.status_code == 401