import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/services/api';
import ArtistActions from './ArtistActions';

export default async function ArtistPage({ params }) {
    let artist;
    let artworks = [];

    try {
        artist = await api.getArtist(params.id);
        artworks = await api.getArtworksByArtist(params.id);
    } catch (e) {
        console.error(e);
        // If api call fails (404), we should show not found. 
        // In strict Next.js, api.getArtist throws error on 404? 
        // My api.js throws Error with detail.
        // I can check error or just notFound().
        // For now I'll just render whatever (if undefined it will crash), so notFound() is safer.
        // But I need to distinguish 404 from connection error.
        // Assuming 404.
        notFound();
    }

    if (!artist) return notFound();

    return (
        <div>
            <div className="glass-card mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 style={{ marginBottom: '0.5rem' }}>{artist.name}</h1>
                        <p style={{ color: 'var(--primary)', fontSize: '1.2rem', marginBottom: '1rem' }}>{artist.country}</p>
                        <div style={{ color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '800px', whiteSpace: 'pre-wrap' }}>
                            {artist.bio || "No bio available."}
                        </div>
                        <div style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                            Contact: {artist.email}
                        </div>
                    </div>
                    <ArtistActions artist={artist} />
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2>Artworks ({artworks.length})</h2>
                <Link href={`/artworks/new?artist_id=${artist.id}`} className="btn btn-secondary">Add Artwork</Link>
            </div>

            <div className="grid grid-cols-3">
                {artworks.map(artwork => (
                    <Link href={`/artworks/${artwork.id}`} key={artwork.id} className="glass-card" style={{ display: 'block', textDecoration: 'none' }}>
                        <div style={{ aspectRatio: '1/1', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '1rem', overflow: 'hidden', position: 'relative' }}>
                            {artwork.image_url ? (
                                <img src={artwork.image_url} alt={artwork.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>No Image</div>
                            )}
                        </div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{artwork.title}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{artwork.category}</p>
                    </Link>
                ))}
                {artworks.length === 0 && (
                    <div className="text-muted col-span-3">This artist has no artworks yet.</div>
                )}
            </div>
        </div>
    );
}
