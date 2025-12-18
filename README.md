# Virtual Art Gallery

A full-stack web application for managing digital art collections.

## Tech Stack
- **Backend**: FastAPI, SQLite, SQLAlchemy
- **Frontend**: Next.js 14, Vanilla CSS (Glassmorphism)

## Setup & Run

### 1. Backend
Open a terminal in the project root (`d:\Art Gallery AG`):

```bash
# Install dependencies
pip install -r backend/requirements.txt

# Run the server
uvicorn backend.main:app --reload
```
The API will be available at `http://localhost:8000`. Documentation at `http://localhost:8000/docs`.

### 2. Frontend
Open a new terminal in the `frontend` directory (`d:\Art Gallery AG\frontend`):

```bash
# Install dependencies (if not already done)
npm install

# Run the dev server
npm run dev
```
The app will be available at `http://localhost:3000`.

## Features
- Artists Management (CRUD, Search, Filter)
- Artworks Management (CRUD, Search, Filter by Category/Price)
- Galleries (View, Add Artworks)
- Dashboard statistics
- Premium Glassmorphism UI
