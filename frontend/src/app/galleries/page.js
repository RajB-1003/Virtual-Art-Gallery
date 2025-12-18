import Link from 'next/link';
import { api } from '@/services/api';

export default async function GalleriesPage({ searchParams }) {
    const theme = searchParams?.theme || '';

    let galleries = [];
    try {
        galleries = await api.getGalleries({ theme });
    } catch (e) {
        console.error(e);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1>Galleries</h1>
                <Link href="/galleries/new" className="btn btn-primary">Create Gallery</Link>
            </div>

            <div className="glass-card mb-8">
                <form className="flex gap-4">
                    <input name="theme" placeholder="Filter by theme..." defaultValue={theme} />
                    <button type="submit" className="btn btn-secondary">Filter</button>
                </form>
            </div>

            <div className="grid grid-cols-2">
                {galleries.map(gallery => (
                    <div key={gallery.id} className="glass-card">
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{gallery.name}</h3>
                        <p style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{gallery.theme}</p>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{gallery.description}</p>
                        <Link href={`/galleries/${gallery.id}`} className="btn btn-secondary btn-sm">View Gallery</Link>
                    </div>
                ))}
                {galleries.length === 0 && <div className="col-span-2 text-center text-muted">No galleries found.</div>}
            </div>
        </div>
    );
}