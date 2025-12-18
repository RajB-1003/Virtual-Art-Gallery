from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/artists",
    tags=["artists"],
    responses={404: {"description": "Not found"}},
)

@router.get("/stats/")
def get_stats(db: Session = Depends(get_db)):
    return crud.get_artist_stats(db)

@router.get("/search/{name}", response_model=List[schemas.Artist])
def search_artists(name: str, db: Session = Depends(get_db)):
    return crud.search_artists_by_name(db, name)

@router.get("/", response_model=List[schemas.Artist])
def read_artists(skip: int = 0, limit: int = 100, country: str = None, db: Session = Depends(get_db)):
    artists = crud.get_artists(db, skip=skip, limit=limit, country=country)
    return artists

@router.get("/{artist_id}", response_model=schemas.Artist)
def read_artist(artist_id: int, db: Session = Depends(get_db)):
    db_artist = crud.get_artist(db, artist_id=artist_id)
    if db_artist is None:
        raise HTTPException(status_code=404, detail="Artist not found")
    return db_artist

@router.post("/", response_model=schemas.Artist)
def create_artist(artist: schemas.ArtistCreate, db: Session = Depends(get_db)):
    db_artist = db.query(models.Artist).filter(models.Artist.email == artist.email).first()
    if db_artist:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_artist(db=db, artist=artist)

@router.patch("/{artist_id}", response_model=schemas.Artist)
def update_artist(artist_id: int, artist_update: schemas.ArtistUpdate, db: Session = Depends(get_db)):
    db_artist = crud.get_artist(db, artist_id=artist_id)
    if db_artist is None:
        raise HTTPException(status_code=404, detail="Artist not found")

    update_data = artist_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_artist, key, value)
    db.add(db_artist)
    db.commit()
    db.refresh(db_artist)
    return db_artist

@router.delete("delete/{name}")
def delete_artist(name: str , email: str, db: Session = Depends(get_db)):
    db_artist = crud.delete_artist(db, name=name, email=email)
    if db_artist is None:
        raise HTTPException(status_code=404, detail="Artist not found")
    db.delete(db_artist)
    db.commit()
    return {"message": "Artist deleted successfully"}
