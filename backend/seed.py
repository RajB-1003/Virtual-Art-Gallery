from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine
from backend import models

def seed_data():
    db = SessionLocal()
    
    # Check if data already exists to avoid duplicates if run multiple times
    if db.query(models.Artist).count() > 0:
        print("Database already contains data. skipping seed.")
        db.close()
        return

    print("Seeding database...")

    # 1. Create Artists
    artist1 = models.Artist(
        name="Leonardo da Vinci",
        email="leo@renaissance.com",
        country="Italy",
        bio="Italian polymath of the High Renaissance who was active as a painter, draughtsman, engineer, scientist, theorist, sculptor, and architect."
    )
    
    artist2 = models.Artist(
        name="Vincent van Gogh",
        email="vincent@impressionism.com",
        country="Netherlands",
        bio="Dutch Post-Impressionist painter who is among the most famous and influential figures in the history of Western art."
    )
    
    artist3 = models.Artist(
        name="Frida Kahlo",
        email="frida@surrealism.com",
        country="Mexico",
        bio="Mexican painter known for her many portraits, self-portraits, and works inspired by the nature and artifacts of Mexico."
    )

    db.add_all([artist1, artist2, artist3])
    db.commit()
    
    # Refresh to get IDs
    db.refresh(artist1)
    db.refresh(artist2)
    db.refresh(artist3)

    # 2. Create Galleries
    gallery1 = models.Gallery(
        name="Renaissance Masterpieces",
        description="A collection of the finest works from the High Renaissance period.",
        theme="Classic",
        artist_id=artist1.id 
    )
    
    gallery2 = models.Gallery(
        name="Modern Impressions",
        description="Exploring the beauty of light and color through Post-Impressionist works.",
        theme="Modern",
        artist_id=artist2.id
    )

    db.add_all([gallery1, gallery2])
    db.commit()
    
    db.refresh(gallery1)
    db.refresh(gallery2)

    # 3. Create Artworks
    # Da Vinci
    art1 = models.Artwork(
        title="Mona Lisa",
        description="A half-length portrait painting.",
        artist_id=artist1.id,
        category="Painting",
        price=860000000.00,
        tags="portrait,oil,renaissance,famous",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
        created_year=1503,
        gallery_id=gallery1.id
    )
    
    art2 = models.Artwork(
        title="The Last Supper",
        description="Mural painting of Jesus and the Twelve Apostles.",
        artist_id=artist1.id,
        category="Painting",
        price=450000000.00, 
        tags="religious,mural,renaissance",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1200px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg",
        created_year=1498,
        gallery_id=gallery1.id
    )

    # Van Gogh
    art3 = models.Artwork(
        title="The Starry Night",
        description="Oil on canvas painting.",
        artist_id=artist2.id,
        category="Painting",
        price=100000000.00,
        tags="landscape,night,swirls,famous",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        created_year=1889,
        gallery_id=gallery2.id
    )
    
    art4 = models.Artwork(
        title="Sunflowers",
        description="Still life painting of sunflowers.",
        artist_id=artist2.id,
        category="Painting",
        price=39000000.00,
        tags="floral,still-life,yellow",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/1200px-Vincent_Willem_van_Gogh_127.jpg",
        created_year=1888,
        gallery_id=gallery2.id
    )

    # Kahlo (No gallery initially)
    art5 = models.Artwork(
        title="The Two Fridas",
        description="Double self-portrait oil painting.",
        artist_id=artist3.id,
        category="Painting",
        price=8000000.00,
        tags="surrealism,portrait,self-portrait",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/The_Two_Fridas.jpg/800px-The_Two_Fridas.jpg",
        created_year=1939
    )

    db.add_all([art1, art2, art3, art4, art5])
    db.commit()

    print("Database seeded successfully!")
    db.close()

if __name__ == "__main__":
    seed_data()
