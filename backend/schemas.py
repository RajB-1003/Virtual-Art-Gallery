from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
from decimal import Decimal

# Artist Schemas
class ArtistBase(BaseModel):
    name: str
    email: EmailStr
    country: Optional[str] = None
    bio: Optional[str] = None

class ArtistCreate(ArtistBase):
    email: EmailStr
    country: Optional[str] = None
    bio: Optional[str] = None

class ArtistUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    country: Optional[str] = None
    bio: Optional[str] = None

class Artist(ArtistBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ArtistDelete(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None

# Gallery Schemas
class GalleryBase(BaseModel):
    name: str
    description: Optional[str] = None
    theme: Optional[str] = None
    artist_id: int

class GalleryCreate(GalleryBase):
    pass

class Gallery(GalleryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ArtworktoGallery(BaseModel):
    artwork_id: int
    gallery_id: int


# Artwork Schemas
class ArtworkBase(BaseModel):
    title: str
    description: Optional[str] = None
    artist_id: int
    category: Optional[str] = None
    price: Optional[Decimal] = None
    tags: Optional[str] = None
    image_url: Optional[str] = None
    created_year: Optional[int] = None
    gallery_id: Optional[int] = None

class ArtworkCreate(ArtworkBase):
    artist_id: int

class Artwork(ArtworkBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ArtworkWithArtist(Artwork):
    artist: Artist

class GalleryWithArtworks(Gallery):
    artworks: List[Artwork] = []
