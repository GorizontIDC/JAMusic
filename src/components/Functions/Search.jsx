import { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchDeezer = async (searchQuery) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.deezer.com/search?q=${encodeURIComponent(searchQuery)}&limit=10`
            );
            const data = await response.json();
            
            const tracks = data.data.map(track => ({
                id: track.id,
                title: track.title,
                artist: track.artist.name,
                cover: track.album.cover_medium,
                duration: track.duration,
                preview: track.preview
            }));
            
            setResults(tracks);
        } catch (error) {
            console.error('Ошибка поиска:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            searchDeezer(query);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Поиск музыки..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Поиск...' : 'Найти'}
                </button>
            </form>
            
            <div className="results">
                {results.map(track => (
                    <div key={track.id} className="track-card">
                        <img src={track.cover} alt={track.title} />
                        <div>
                            <h4>{track.title}</h4>
                            <p>{track.artist}</p>
                            <audio controls src={track.preview}>
                                <source src={track.preview} type="audio/mpeg" />
                            </audio>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchBar;