'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

export default function deleteArtist() {

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
            await api.deleteArtist(data);
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
            <h1>Delete Artist</h1>

            <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                    <input name="name" required placeholder="e.g. Leonardo da Vinci" />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                    <input name="email" type="email" required placeholder="e.g. leo@renaissance.com" />
                </div>

                <button type="submit" className="btn btn-primary">
                    {loading ? 'Deleting...' : 'Delete'}
                </button>
            </form>
        </div>
    )
}