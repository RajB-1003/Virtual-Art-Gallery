from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/artworks",
    tags=["artworks"],
    responses={404: {"description": "Not found"}},
)

@router.get("/stats/")
def get_stats(db: Session = Depends(get_db)):
    return crud.get_artwork_stats(db)

@router.get("/search/{keyword}", response_model=List[schemas.Artwork])
def search_artworks(keyword: str, db: Session = Depends(get_db)):
    return crud.search_artworks(db, keyword)

@router.get("/artist/{artist_id}", response_model=List[schemas.Artwork])
def get_artist_artworks(artist_id: int, db: Session = Depends(get_db)):
    return crud.get_artworks_by_artist(db, artist_id)

@router.get("/", response_model=List[schemas.ArtworkWithArtist])
def read_artworks(
    skip: int = 0, 
    limit: int = 100, 
    category: str = None, 
    min_price: float = None, 
    max_price: float = None,
    year: int = None,
    tags: str = None,
    sort_by: str = None,
    order: str = "asc",
    db: Session = Depends(get_db)
):
    artworks = crud.get_artworks(
        db, skip=skip, limit=limit, 
        category=category, min_price=min_price, max_price=max_price, 
        year=year, tags=tags, sort_by=sort_by, order=order
    )
    return artworks

@router.get("/{artwork_id}", response_model=schemas.ArtworkWithArtist)
def read_artwork(artwork_id: int, db: Session = Depends(get_db)):
    db_artwork = crud.get_artwork(db, artwork_id=artwork_id)
    if db_artwork is None:
        raise HTTPException(status_code=404, detail="Artwork not found")
    return db_artwork

@router.post("/", response_model=schemas.Artwork)
def create_artwork(artwork: schemas.ArtworkCreate, db: Session = Depends(get_db)):
    # Verify artist exists
    artist = crud.get_artist(db, artwork.artist_id)
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    return crud.create_artwork(db=db, artwork=artwork)

@router.put("/{artwork_id}", response_model=schemas.Artwork)
def update_artwork(artwork_id: int, artwork_update: schemas.ArtworkCreate, db: Session = Depends(get_db)):
    db_artwork = crud.get_artwork(db, artwork_id=artwork_id)
    if db_artwork is None:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    for key, value in artwork_update.dict().items():
        setattr(db_artwork, key, value)
    
    db.commit()
    db.refresh(db_artwork)
    return db_artwork

@router.delete("/{artwork_id}")
def delete_artwork(artwork_id: int, db: Session = Depends(get_db)):
    db_artwork = crud.get_artwork(db, artwork_id=artwork_id)
    if db_artwork is None:
        raise HTTPException(status_code=404, detail="Artwork not found")
    db.delete(db_artwork)
    db.commit()
    return {"message": "Artwork deleted successfully"}
