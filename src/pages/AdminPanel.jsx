import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import '../styles/AdminPanel.css';

function AdminPanel() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('tracks');
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [AlbumSearchResults, setAlbumSearchResults] = useState([]);
    // Загрузка данных
    const fetchTracks = async () => {
        const { data } = await supabase.from('featured_tracks').select('*').order('position');
        setTracks(data || []);
    };

    const fetchAlbums = async () => {
        const {data} = await supabase.from('featured_albums').select("*").order('position')
        setAlbums(data || [])
    }

    const fetchPlaylists = async () => {
        const { data } = await supabase.from('admin_playlists').select('*').order('position');
        setPlaylists(data || []);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTracks();
        fetchAlbums();
        fetchPlaylists();
    }, []);
    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user;
            if (user?.email !== 'jamusic@list.ru') {
                navigate('/');
            }
        };
        checkAdmin();
    }, []);

    // Поиск в Deezer
    const searchDeezer = async (query) => {
        if (!query.trim()) return;
        const response = await fetch(
            `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=10`
        );
        const data = await response.json();
        setSearchResults(data.data.map(track => ({
            id: track.id,
            title: track.title,
            artist: track.artist.name,
            cover: track.album.cover_medium,
            duration: track.duration,
            preview: track.preview
        })));
    };

    // Добавить трек в секцию
    const addToSection = async (track, section) => {
        const { error } = await supabase.from('featured_tracks').insert([{
            section,
            source: 'deezer',
            external_id: String(track.id),
            title: track.title,
            artist: track.artist,
            cover_url: track.cover,
            preview_url: track.preview,
            duration_sec: track.duration,
            position: tracks.length
        }]);
        if (!error) {
            fetchTracks();
            alert(`Трек добавлен в ${section}`);
        }
    };
    // Удалить трек
    const removeTrack = async (id) => {
        await supabase.from('featured_tracks').delete().eq('id', id);
        fetchTracks();
    };

    // Поиск альбомов в Deezer
        const searchDeezerAlbums = async (query) => {
            if (!query.trim()) return;
            const response = await fetch(
                `http://localhost:8000/search_album?q=${encodeURIComponent(query)}&limit=10`
            );
            const data = await response.json();
            setAlbumSearchResults(data.data.map(album => ({
                id: album.id,
                title: album.title,
                artist: album.artist.name,
                cover: album.cover_medium,
                track_count: album.nb_tracks,
                release_date: album.release_date
            })));
        };
    // Добавить альбом
    const addAlbum = async (album) => {
        const { error } = await supabase.from('featured_albums').insert([{
            title: album.title,
            artist: album.artist,
            cover_url: album.cover,
            source: 'deezer',
            external_id: String(album.id),
            track_count: album.track_count,
            release_date: album.release_date,
            position: albums.length
        }]);
        if (!error) {
            fetchAlbums();
            alert('Альбом добавлен!');
        }
    };
    // Удалить альбом
    const removeAlbum = async (id) => {
        try {
            const {error} = await supabase.from("featured_albums").delete().eq('id',id);
            if (error) {
                console.error('Ошибка удаления:', error);
                alert(error.message);
            } else {
                fetchAlbums();
            }
        } catch (err){
            console.error("Ошибка:", err);
            alert("Не удалось удалить альбом");
        }
    };

    // Создать плейлист
    const createPlaylist = async () => {
        const title = prompt('Название плейлиста:');
        if (!title) return;
        await supabase.from('admin_playlists').insert([{ title, position: playlists.length }]);
        fetchPlaylists();
    };
    const deletePlaylist = async (id) => {
        if (confirm('Удалить плейлист?')) {
            await supabase.from('admin_playlists').delete().eq('id', id);
            fetchPlaylists();
        }
    };
    return (
        <div style={{ padding: '20px' }}>
            <h1>Админ-панель</h1>

            {/* Вкладки */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setActiveTab('tracks')} style={{ padding: '8px 16px', background: activeTab === 'tracks' ? '#ca1919' : '#ccc', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Треки
                </button>
                <button onClick={() => setActiveTab('albums')} style={{ padding: '8px 16px', background: activeTab === 'albums' ? '#ca1919' : '#ccc', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Альбомы
                </button>
                <button onClick={() => setActiveTab('playlists')} style={{ padding: '8px 16px', background: activeTab === 'playlists' ? '#ca1919' : '#ccc', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Плейлисты
                </button>
            </div>

            {/* Вкладка ТРЕКИ */}
            {activeTab === 'tracks' && (
                <>
                    {/* Поиск треков */}
                    <div style={{ marginBottom: '30px' }}>
                        <h3>Поиск треков</h3>
                        <input
                            type="text"
                            placeholder="Название песни..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                searchDeezer(e.target.value);
                            }}
                            style={{ width: '300px', padding: '8px' }}
                        />
                        <div>
                            {searchResults.map(track => (
                                <div key={track.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0', padding: '10px', border: '1px solid #ddd' }}>
                                    <img src={track.cover} width={50} />
                                    <div style={{ flex: 1 }}>{track.title} — {track.artist}</div>
                                    <button onClick={() => addToSection(track, 'listening_now')}>Слушают сейчас</button>
                                    <button onClick={() => addToSection(track, 'new_singles')}>Новые синглы</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Слушают сейчас */}
                    <div style={{ marginBottom: '30px' }}>
                        <h2>Слушают сейчас</h2>
                        {tracks.filter(t => t.section === 'listening_now').map(track => (
                            <div key={track.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={track.cover_url} width={40} />
                                <span>{track.title} — {track.artist}</span>
                                <button onClick={() => removeTrack(track.id)}>✕</button>
                            </div>
                        ))}
                    </div>

                    {/* Новые синглы */}
                    <div style={{ marginBottom: '30px' }}>
                        <h2>Новые синглы</h2>
                        {tracks.filter(t => t.section === 'new_singles').map(track => (
                            <div key={track.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={track.cover_url} width={40} />
                                <span>{track.title} — {track.artist}</span>
                                <button onClick={() => removeTrack(track.id)}>✕</button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Вкладка АЛЬБОМЫ */}
            {activeTab === 'albums' && (
                <div>
                    <h3>Поиск альбомов</h3>
                    <input
                        type="text"
                        placeholder="Название альбома..."
                        onChange={(e) => searchDeezerAlbums(e.target.value)}
                        style={{ width: '300px', padding: '8px' }}
                    />
                    <div>
                        {AlbumSearchResults.map(album => (
                            <div key={album.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0', padding: '10px', border: '1px solid #ddd' }}>
                                <img src={album.cover} width={50} />
                                <div style={{ flex: 1 }}>{album.title} — {album.artist}</div>
                                <button onClick={() => addAlbum(album)}>Добавить</button>
                            </div>
                        ))}
                    </div>

                    <h2>Альбомы на главной</h2>
                    {albums.map(album => (
                        <div key={album.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '5px 0' }}>
                            <img src={album.cover_url} width={40} />
                            <span>{album.title} — {album.artist}</span>
                            <button onClick={() => removeAlbum(album.id)}>✕</button>
                        </div>
                    ))}
                </div>
            )}

            {/* Вкладка ПЛЕЙЛИСТЫ */}
            {activeTab === 'playlists' && (
                <div>
                    <h2>Выбор редакции (плейлисты)</h2>
                    <button onClick={createPlaylist} style={{ marginBottom: '10px', padding: '8px 16px' }}>+ Создать плейлист</button>
                    {playlists.map(playlist => (
                        <div key={playlist.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '5px 0' }}>
                            <strong>{playlist.title}</strong>
                            <button onClick={() => deletePlaylist(playlist.id)}>✕</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminPanel