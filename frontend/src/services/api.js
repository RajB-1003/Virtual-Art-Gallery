const API_URL = 'http://localhost:8000';

const fetcher = async (url, options = {}) => {
    try {
        const res = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            cache: 'no-store'
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.detail || 'An error occurred');
        }
        return res.json();
    } catch (error) {
        console.error(`API Call failed: ${url}`, error);
        throw error;
    }
};

export const api = {
    // Artists
    getArtists: (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return fetcher(`/artists/?${query}`);
    },
    getArtist: (id) => fetcher(`/artists/${id}`),
    createArtist: (data) => fetcher('/artists/', { method: 'POST', body: JSON.stringify(data) }),
    updateArtist: (id, data) => fetcher(`/artists/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteArtist: (name, email) => fetcher(`/artists/delete/${name}`, { method: 'DELETE', body: JSON.stringify({ email }) }),
    searchArtists: (name) => fetcher(`/artists/search/${name}`),
    getArtistStats: () => fetcher('/artists/stats/'),

    // Artworks
    getArtworks: (params = {}) => {
        // Remove null/undefined
        const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null && v !== ''));
        const query = new URLSearchParams(cleanParams).toString();
        return fetcher(`/artworks/?${query}`);
    },
    getArtwork: (id) => fetcher(`/artworks/${id}`),
    createArtwork: (data) => fetcher('/artworks/', { method: 'POST', body: JSON.stringify(data) }),
    updateArtwork: (id, data) => fetcher(`/artworks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteArtwork: (id) => fetcher(`/artworks/${id}`, { method: 'DELETE' }),
    searchArtworks: (keyword) => fetcher(`/artworks/search/${keyword}`),
    getArtworkStats: () => fetcher('/artworks/stats/'),
    getArtworksByArtist: (artistId) => fetcher(`/artworks/artist/${artistId}`),

    // Galleries
    getGalleries: (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return fetcher(`/galleries/?${query}`);
    },
    getGallery: (id) => fetcher(`/galleries/${id}`),
    createGallery: (data) => fetcher('/galleries/', { method: 'POST', body: JSON.stringify(data) }),
    updateGallery: (id, data) => fetcher(`/galleries/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteGallery: (id) => fetcher(`/galleries/${id}`, { method: 'DELETE' }),
    searchGalleries: (name) => fetcher(`/galleries/search/${name}`),
    addArtworkToGallery: (galleryId, artworkId) => fetcher(`/galleries/${galleryId}/artworks`, { method: 'POST', body: JSON.stringify({ artwork_id: artworkId }) }),
    removeArtworkFromGallery: (galleryId, artworkId) => fetcher(`/galleries/${galleryId}/artworks/${artworkId}`, { method: 'DELETE' }),
};
