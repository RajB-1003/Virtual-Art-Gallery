'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

export default function NewArtistPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            await api.createArtist(data);
            router.push('/artists');
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Add New Artist</h1>

            <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {error && <div style={{ color: '#ef4444', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>{error}</div>}

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                    <input name="name" required placeholder="e.g. Leonardo da Vinci" />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                    <input name="email" type="email" required placeholder="e.g. leo@renaissance.com" />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Country</label>
                    <input name="country" placeholder="e.g. Italy" />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Bio</label>
                    <textarea name="bio" rows="4" placeholder="Tell us about the artist..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Artist'}
                </button>
            </form>
        </div>
    );
}
