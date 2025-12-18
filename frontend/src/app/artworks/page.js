import Link from 'next/link';
import { api } from '@/services/api';

export default async function ArtworksPage({ searchParams }) {
    const search = searchParams?.search || '';
    const category = searchParams?.category || '';

    let artworks = [];
    try {
        artworks = await api.getArtworks({ category, tags: search }); // Using inputs for simple search
    } catch (e) {
        console.error(e);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1>Artworks</h1>
                {/* Link to create artwork, might need artist_id, but here is general add */}
                <Link href="/artists" className="btn btn-secondary">Go to Artist to Add</Link>
            </div>

            <div className="glass-card mb-8">
                <form className="flex gap-4">
                    <input name="search" placeholder="Search tags..." defaultValue={search} />
                    <select name="category" defaultValue={category} style={{ width: '200px' }}>
                        <option value="">All Categories</option>
                        <option value="Painting">Painting</option>
                        <option value="Digital">Digital</option>
                        <option value="Sculpture">Sculpture</option>
                        <option value="Photography">Photography</option>
                        <option value="Mixed Media">Mixed Media</option>
                    </select>
                    <button type="submit" className="btn btn-secondary">Filter</button>
                </form>
            </div>

            <div className="grid grid-cols-3">
                {artworks.map(artwork => (
                    <Link href={`/artworks/${artwork.id}`} key={artwork.id} className="glass-card" style={{ display: 'block', textDecoration: 'none' }}>
                        <div style={{ aspectRatio: '1/1', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '1rem', overflow: 'hidden' }}>
                            {artwork.image_url ? (
                                <img src={artwork.image_url} alt={artwork.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>No Image</div>
                            )}
                        </div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{artwork.title}</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                            <span>{artwork.category}</span>
                            <span>${artwork.price}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
