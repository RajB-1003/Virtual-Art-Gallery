'use client';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

export default function ArtistActions({ artist }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this artist?')) {
            try {
                await api.deleteArtist(artist.id);
                router.push('/artists');
                router.refresh();
            } catch (e) {
                alert('Failed to delete artist');
                console.error(e);
            }
        }
    };

    return (
        <div className="flex gap-4">
            <button onClick={() => alert('Edit feature not implemented in this demo (use separate page)')} className="btn btn-secondary">Edit</button>
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
    );
}
