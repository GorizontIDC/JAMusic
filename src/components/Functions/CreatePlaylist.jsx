// src/components/CreatePlaylist.jsx
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { toast } from 'react-toastify';

function CreatePlaylist({ userId, onPlaylistCreated }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim()) {
            toast.error('Название плейлиста обязательно');
            return;
        }
        
        setLoading(true);
        
        const { data, error } = await supabase
            .from('playlists')
            .insert({
                user_id: userId,
                title: title.trim(),
                description: description.trim() || null,
            })
            .select()
            .single();
        
        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Плейлист создан!');
            setTitle('');
            setDescription('');
            setIsOpen(false);
            if (onPlaylistCreated) onPlaylistCreated(data);
        }
        
        setLoading(false);
    };

    return (
        <div className="create-playlist">
            {!isOpen ? (
                <button 
                    className="btn btn-primary create-playlist-btn"
                    onClick={() => setIsOpen(true)}
                >
                    + Создать плейлист
                </button>
            ) : (
                <div className="create-playlist-form">
                    <h3>Новый плейлист</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Название плейлиста"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={50}
                            required
                        />
                        <textarea
                            placeholder="Описание (необязательно)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                        />
                        <div className="form-buttons">
                            <button type="submit" disabled={loading}>
                                {loading ? 'Создание...' : 'Создать'}
                            </button>
                            <button type="button" onClick={() => setIsOpen(false)}>
                                Отмена
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default CreatePlaylist;