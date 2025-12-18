'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/services/api';

export default function NewArtworkPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const artistIdParam = searchParams.get('artist_id');

    const [loading, setLoading] = useState(false);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        if (!artistIdParam) {
            api.getArtists().then(setArtists).catch(console.error);
        }
    }, [artistIdParam]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Manual conversion for numeric fields
        if (data.price) data.price = parseFloat(data.price);
        if (data.created_year) data.created_year = parseInt(data.created_year);
        if (artistIdParam) data.artist_id = parseInt(artistIdParam);
        else data.artist_id = parseInt(data.artist_id);

        try {
            await api.createArtwork(data);
            if (artistIdParam) router.push(`/artists/${artistIdParam}`);
            else router.push('/artworks');
            router.refresh();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Add Artwork</h1>
            <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {!artistIdParam && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Artist</label>
                        <select name="artist_id" required style={{ padding: '0.75rem', borderRadius: '12px', background: 'var(--card-bg)', color: 'var(--foreground)', border: '1px solid var(--glass-border)', width: '100%' }}>
                            <option value="">Select Artist</option>
                            {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                    </div>
                )}

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
                    <input name="title" required placeholder="Artwork Title" />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
                    <select name="category" style={{ padding: '0.75rem', borderRadius: '12px', background: 'var(--card-bg)', color: 'var(--foreground)', border: '1px solid var(--glass-border)', width: '100%' }}>
                        <option value="Painting">Painting</option>
                        <option value="Digital">Digital</option>
                        <option value="Sculpture">Sculpture</option>
                        <option value="Photography">Photography</option>
                        <option value="Mixed Media">Mixed Media</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price ($)</label>
                    <input name="price" type="number" step="0.01" placeholder="0.00" />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Image URL</label>
                    <input name="image_url" placeholder="https://..." />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Year</label>
                    <input name="created_year" type="number" defaultValue={new Date().getFullYear()} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                    <textarea name="description" rows="3"></textarea>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Artwork'}
                </button>
            </form>
        </div>
    )
}
