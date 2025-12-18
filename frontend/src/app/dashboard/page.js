import { api } from '@/services/api';

export default async function Dashboard() {
    const [artistStats, artworkStats] = await Promise.all([
        api.getArtistStats().catch(() => ({})),
        api.getArtworkStats().catch(() => ({}))
    ]);

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="stats-grid">
                <div className="glass-card stat-card">
                    <div className="stat-value">{artistStats?.total_artists || 0}</div>
                    <div className="stat-label">Total Artists</div>
                </div>
                <div className="glass-card stat-card">
                    <div className="stat-value">{artworkStats?.total_artworks || 0}</div>
                    <div className="stat-label">Total Artworks</div>
                </div>
                <div className="glass-card stat-card">
                    <div className="stat-value">12</div>
                    <div className="stat-label">Active Galleries</div>
                </div>
            </div>

            <div className="grid grid-cols-2 mt-8 gap-8" style={{ marginTop: '2rem', display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
                <div className="glass-card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <h3 className="mb-4">Artworks by Category</h3>
                    <div style={{ color: 'var(--text-muted)' }}>[Pie Chart Visualization]</div>
                </div>
                <div className="glass-card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <h3 className="mb-4">Artists by Country</h3>
                    <div style={{ color: 'var(--text-muted)' }}>[Map/Bar Chart Visualization]</div>
                </div>
            </div>
        </div>
    )
}
