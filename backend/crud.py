from sqlalchemy.orm import Session
from sqlalchemy import or_
from . import models, schemas

# Artist CRUD
def get_artist(db: Session, artist_id: int):
    return db.query(models.Artist).filter(models.Artist.id == artist_id).first()

#for delete Artist
def delete_artist(db: Session, name: str, email: str):
    return db.query(models.Artist).filter(models.Artist.name == name, models.Artist.email == email).first()

def get_artists(db: Session, skip: int = 0, limit: int = 100, country: str = None):
    query = db.query(models.Artist)
    if country:
        query = query.filter(models.Artist.country.ilike(f"%{country}%"))
    return query.offset(skip).limit(limit).all()

def create_artist(db: Session, artist: schemas.ArtistCreate):
    db_artist = models.Artist(**artist.model_dump())
    db.add(db_artist)
    db.commit()
    db.refresh(db_artist)
    return db_artist

def search_artists_by_name(db: Session, name: str):
    return db.query(models.Artist).filter(models.Artist.name.ilike(f"%{name}%")).all()

def get_artist_stats(db: Session):
    count = db.query(models.Artist).count()
    return {"total_artists": count}

# Gallery CRUD
def get_gallery(db: Session, gallery_id: int):
    return db.query(models.Gallery).filter(models.Gallery.id == gallery_id).first()

def get_galleries(db: Session, skip: int = 0, limit: int = 100, theme: str = None):
    query = db.query(models.Gallery)
    if theme:
        query = query.filter(models.Gallery.theme.ilike(f"%{theme}%"))
    return query.offset(skip).limit(limit).all()

def create_gallery(db: Session, gallery: schemas.GalleryCreate):
    db_gallery = models.Gallery(**gallery.dict())
    db.add(db_gallery)
    db.commit()
    db.refresh(db_gallery)
    return db_gallery

def search_galleries_by_name(db: Session, name: str):
    return db.query(models.Gallery).filter(models.Gallery.name.ilike(f"%{name}%")).all()

# Artwork CRUD
def get_artwork(db: Session, artwork_id: int):
    return db.query(models.Artwork).filter(models.Artwork.id == artwork_id).first()

def get_artworks(db: Session, skip: int = 0, limit: int = 100, 
                 category: str = None, min_price: float = None, max_price: float = None,
                 year: int = None, tags: str = None, sort_by: str = None, order: str = "asc"):
    query = db.query(models.Artwork)
    
    if category:
        query = query.filter(models.Artwork.category == category)
    if min_price is not None:
        query = query.filter(models.Artwork.price >= min_price)
    if max_price is not None:
        query = query.filter(models.Artwork.price <= max_price)
    if year:
        query = query.filter(models.Artwork.created_year == year)
    if tags:
        # Simple tag search (contains)
        tag_list = tags.split(',')
        for tag in tag_list:
            query = query.filter(models.Artwork.tags.ilike(f"%{tag.strip()}%"))
            
    if sort_by:
        field = getattr(models.Artwork, sort_by, None)
        if field:
            if order == "desc":
                query = query.order_by(field.desc())
            else:
                query = query.order_by(field.asc())
                
    return query.offset(skip).limit(limit).all()

def create_artwork(db: Session, artwork: schemas.ArtworkCreate):
    db_artwork = models.Artwork(**artwork.dict())
    db.add(db_artwork)
    db.commit()
    db.refresh(db_artwork)
    return db_artwork

def search_artworks(db: Session, keyword: str):
    return db.query(models.Artwork).filter(
        or_(
            models.Artwork.title.ilike(f"%{keyword}%"),
            models.Artwork.tags.ilike(f"%{keyword}%")
        )
    ).all()

def get_artworks_by_artist(db: Session, artist_id: int):
    return db.query(models.Artwork).filter(models.Artwork.artist_id == artist_id).all()

def get_artwork_stats(db: Session):
    count = db.query(models.Artwork).count()
    return {"total_artworks": count}
