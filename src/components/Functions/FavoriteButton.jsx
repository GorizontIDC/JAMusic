import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { supabase } from '../../utils/supabaseClient';
import { toast } from 'react-toastify';
function FavoriteButton({ userId, trackId, onToggle }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    // Проверяем, есть ли трек в избранном
    useEffect(() => {
        if (!userId || !trackId) return;
        const checkFavorite = async () => {
            const { data, error } = await supabase
                .from('favorites')
                .select('*')
                .eq('user_id', userId)
                .eq('track_id', trackId)
                .maybeSingle();
            if (!error && data) {
                setIsFavorite(true);
            }
        };
        checkFavorite();
    }, [userId, trackId]);
    const toggleFavorite = async () => {
        if (!userId) {
            toast.error('Войдите в аккаунт, чтобы добавлять в избранное');
            return;
        }
        setLoading(true);
        if (isFavorite) {
            // Удалить из избранного
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', userId)
                .eq('track_id', trackId);

            if (error) {
                toast.error(error.message);
            } else {
                setIsFavorite(false);
                toast.success('Удалено из избранного');
                if (onToggle) onToggle(trackId, false);
            }
        } else {
            // Добавить в избранное
            const { error } = await supabase
                .from('favorites')
                .insert({ user_id: userId, track_id: trackId });

            if (error) {
                toast.error(error.message);
            } else {
                setIsFavorite(true);
                toast.success('Добавлено в избранное');
                if (onToggle) onToggle(trackId, true);
            }
        }
        setLoading(false);
    };
    return (
        <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={toggleFavorite}
            disabled={loading}
        >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
    );
}
export default FavoriteButton;