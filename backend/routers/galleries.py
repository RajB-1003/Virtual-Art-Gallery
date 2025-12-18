from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from typing import List
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/galleries",
    tags=["galleries"],
    responses={404: {"description": "Not found"}},
)

@router.get("/search/{name}", response_model=List[schemas.Gallery])
def search_galleries(name: str, db: Session = Depends(get_db)):
    return crud.search_galleries_by_name(db, name)

@router.get("/", response_model=List[schemas.Gallery])
def read_galleries(skip: int = 0, limit: int = 100, theme: str = None, db: Session = Depends(get_db)):
    return crud.get_galleries(db, skip=skip, limit=limit, theme=theme)

@router.get("/{gallery_id}", response_model=schemas.GalleryWithArtworks)
def read_gallery(gallery_id: int, db: Session = Depends(get_db)):
    db_gallery = crud.get_gallery(db, gallery_id=gallery_id)
    if db_gallery is None:
        raise HTTPException(status_code=404, detail="Gallery not found")
    return db_gallery

@router.post("/", response_model=schemas.Gallery)
def create_gallery(gallery: schemas.GalleryCreate, db: Session = Depends(get_db)):
    db_artist = crud.get_artist(db, artist_id=gallery.artist_id)
    if db_artist is None:
        raise HTTPException(status_code=404, detail=f"Artist with the id {gallery.artist_id} not found")
    return crud.create_gallery(db=db, gallery=gallery)

@router.put("/{gallery_id}", response_model=schemas.Gallery)
def update_gallery(gallery_id: int, gallery_update: schemas.GalleryCreate, db: Session = Depends(get_db)):
    db_gallery = crud.get_gallery(db, gallery_id=gallery_id)
    if db_gallery is None:
        raise HTTPException(status_code=404, detail="Gallery not found")
    
    for key, value in gallery_update.dict().items():
        setattr(db_gallery, key, value)
    
    db.commit()
    db.refresh(db_gallery)
    return db_gallery

@router.delete("/{gallery_id}")
def delete_gallery(gallery_id: int, db: Session = Depends(get_db)):
    db_gallery = crud.get_gallery(db, gallery_id=gallery_id)
    if db_gallery is None:
        raise HTTPException(status_code=404, detail="Gallery not found")
    db.delete(db_gallery)
    db.commit()
    return {"message": "Gallery deleted successfully"}

# Add Artwork to Gallery
@router.post("/{gallery_id}/artworks")
def add_artwork_to_gallery(gallery_id: int, artwork_id: int, db: Session = Depends(get_db)):
    db_gallery = crud.get_gallery(db, gallery_id=gallery_id)
    if db_gallery is None:
        raise HTTPException(status_code=404, detail="Gallery not found")
    
    db_artwork = crud.get_artwork(db, artwork_id=artwork_id)
    if db_artwork is None:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    db_artwork.gallery_id = gallery_id
    db.commit()
    return {"message": "Artwork added to gallery"}

# Remove Artwork from Gallery
@router.delete("/{gallery_id}/artworks/{artwork_id}")
def remove_artwork_from_gallery(gallery_id: int, artwork_id: int, db: Session = Depends(get_db)):
    db_gallery = crud.get_gallery(db, gallery_id=gallery_id)
    if db_gallery is None:
        raise HTTPException(status_code=404, detail="Gallery not found")
    
    db_artwork = crud.get_artwork(db, artwork_id=artwork_id)
    if db_artwork is None:
        raise HTTPException(status_code=404, detail="Artwork not found")
    
    if db_artwork.gallery_id != gallery_id:
        raise HTTPException(status_code=400, detail="Artwork is not in this gallery")
        
    db_artwork.gallery_id = None
    db.commit()
    return {"message": "Artwork removed from gallery"}
