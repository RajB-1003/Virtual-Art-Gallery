import Link from 'next/link';
import { api } from '@/services/api';

export default async function ArtistsPage({ searchParams }) {
    const search = searchParams?.search || '';
    const country = searchParams?.country || '';

    let artists = [];
    try {
        if (search) {
            artists = await api.searchArtists(search);
        } else {
            artists = await api.getArtists({ country });
        }
    } catch (e) {
        console.error(e);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1>Artists</h1>
                <Link href="/artists/new" className="btn btn-primary">Add Artist</Link>
                <Link href="/artists/delete" className="btn btn-primary">Delete Artist</Link>
            </div>

            <div className="glass-card mb-8">
                <form className="flex gap-4">
                    <input name="search" placeholder="Search by name..." defaultValue={search} />
                    <input name="country" placeholder="Filter by country..." defaultValue={country} />
                    <button type="submit" className="btn btn-secondary">Filter</button>
                    {(search || country) && <Link href="/artists" className="btn btn-secondary">Clear</Link>}
                </form>
            </div>

            <div className="grid grid-cols-3">
                {artists.map(artist => (
                    <Link href={`/artists/${artist.id}`} key={artist.id} className="glass-card" style={{ display: 'block', textDecoration: 'none' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{artist.name}</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{artist.country || 'Unknown Location'}</p>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            {artist.email}
                        </div>
                    </Link>
                ))}
            </div>
            {artists.length === 0 && (
                <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
                    No artists found.
                </div>
            )}
        </div>
    );
}
