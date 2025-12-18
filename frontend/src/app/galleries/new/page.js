'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

export default function NewGalleryPage() {
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
            await api.createGallery(data);
            router.push('/galleries');
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Add New Gallery</h1>

            <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {error && <div style={{ color: '#ef4444', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>{error}</div>}

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                    <input name="name" required placeholder="e.g. Modern Art Gallery" />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                    <input name="description" required placeholder="e.g. Description of the gallery" />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Theme</label>
                    <input name="theme" placeholder="e.g. Modern Art" />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                    <textarea name="description" rows="4" placeholder="Tell us about the gallery..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Gallery'}
                </button>
            </form>
        </div>
    );
}
