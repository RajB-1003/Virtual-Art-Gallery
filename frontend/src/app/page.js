import Link from 'next/link';
import { api } from '@/services/api';

export default async function Home() {
  let stats = { artists: 0, artworks: 0 };

  try {
    // We catch errors individually so one failure doesn't break the page
    try {
      const artistStats = await api.getArtistStats();
      stats.artists = artistStats.total_artists;
    } catch { }

    try {
      const artworkStats = await api.getArtworkStats();
      stats.artworks = artworkStats.total_artworks;
    } catch { }
  } catch (e) {
    console.error("Failed to fetch stats", e);
  }

  return (
    <div className="container">
      <section className="text-center animate-fade-in" style={{ padding: '6rem 0' }}>
        <h1 style={{ marginBottom: '1.5rem', lineHeight: '1.1' }}>
          Explore<br /> Digital Art Gallery
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          The Virtual Art Gallery provides an immersive platform to explore, curate, and manage digital art collections.
        </p>
        <div className="flex justify-center" style={{ gap: '1rem' }}>
          <Link href="/artworks" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Explore Artworks</Link>
          <Link href="/galleries" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>View Galleries</Link>
        </div>
      </section>

      <section className="stats-grid">
        <div className="glass-card stat-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="stat-value">{stats.artists}</div>
          <div className="stat-label">Artists</div>
        </div>
        <div className="glass-card stat-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="stat-value">{stats.artworks}</div>
          <div className="stat-label">Artworks</div>
        </div>
        <div className="glass-card stat-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="stat-value">3+</div>
          <div className="stat-label">Collections</div>
        </div>
      </section>

      <section className="glass-card" style={{ marginTop: '4rem', padding: '3rem', textAlign: 'center' }}>
        <h2>For Artists</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Manage your portfolio, track your statistics, and showcase your work to the world.
        </p>
        <Link href="/artists" className="btn btn-secondary">Manage Profile</Link>
      </section>
    </div>
  )
}
