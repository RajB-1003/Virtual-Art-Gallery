from sqlalchemy import Column, Integer, String, Text, ForeignKey, Numeric, TIMESTAMP, func
from sqlalchemy.orm import relationship
from .database import Base

class Artist(Base):
    __tablename__ = "artists"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    country = Column(String(50))
    bio = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())

    artworks = relationship("Artwork", back_populates="artist", cascade="all, delete")
    galleries = relationship("Gallery", back_populates="artist")

class Gallery(Base):
    __tablename__ = "galleries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    description = Column(Text)
    theme = Column(String(50))
    artist_id = Column(Integer, ForeignKey("artists.id"), nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())

    artist = relationship("Artist", back_populates="galleries")
    artworks = relationship("Artwork", back_populates="gallery")

class Artwork(Base):
    __tablename__ = "artworks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    artist_id = Column(Integer, ForeignKey("artists.id"), nullable=False)
    category = Column(String(50))
    price = Column(Numeric(10, 2))
    tags = Column(Text)
    image_url = Column(String(500))
    created_year = Column(Integer)
    gallery_id = Column(Integer, ForeignKey("galleries.id"), nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())

    artist = relationship("Artist", back_populates="artworks")
    gallery = relationship("Gallery", back_populates="artworks")
