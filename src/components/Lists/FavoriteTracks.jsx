import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { RiPlayLargeFill } from 'react-icons/ri';
import FavoriteButton from '../Functions/FavoriteButton';

function FavoriteTracks({ userId, onPlaySong }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        if (!userId) return;

        const { data, error } = await supabase
            .from('favorites')
            .select(`
                track_id,
                tracks (*)
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error(error);
        } else {
            const tracks = data.map(item => item.tracks).filter(Boolean);
            setFavorites(tracks);
        }
        setLoading(false);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchFavorites();
    }, [userId]);

    const handleRemove = (trackId) => {
        setFavorites(prev => prev.filter(t => t.id !== trackId));
    };

    if (loading) return <div>Загрузка...</div>;
    if (favorites.length === 0) return <p>Нет избранных треков</p>;

    return (
        <div className="favorite-tracks">
            <h3>Избранные треки</h3>
            <div className="favorites-list">
                {favorites.map((track) => (
                    <div key={track.id} className="favorite-item">
                        <div className="favorite-cover">
                            <img src={track.cover} alt={track.title} />
                            <button onClick={() => onPlaySong?.(track)}>
                                <RiPlayLargeFill />
                            </button>
                        </div>
                        <div className="favorite-info">
                            <h4>{track.title}</h4>
                            <p>{track.artist}</p>
                        </div>
                        <FavoriteButton 
                            userId={userId}
                            trackId={track.id}
                            onToggle={handleRemove}
                        />
                        <span className="favorite-duration">{track.duration}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoriteTracks;