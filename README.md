# Scientific Articles Management Platform

## Overview

Web platform for managing scientific articles,
peer reviews and publication workflow.

## Features

- JWT Authentication
- Role-based access
- Article upload
- Review system
- Admin moderation
- Publication workflow
- Public homepage
- CSV export
- Docker support
- Monitoring with Prometheus & Grafana

## Tech Stack

Frontend:
- React
- TypeScript
- TailwindCSS

Backend:
- FastAPI
- SQLAlchemy
- PostgreSQL

DevOps:
- Docker
- Docker Compose
- Prometheus
- Grafana

## Roles

### Author
- Upload articles
- Manage own submissions

### Reviewer
- Review articles
- Add scores and comments

### Admin
- Moderate articles
- Publish accepted papers
- Manage reviewers

## Installation

```bash
docker compose up --build
```

Application URLs
Frontend: http://localhost:5173
Backend Docs: http://localhost:8000/docs
Grafana: http://localhost:3000
Prometheus: http://localhost:9090