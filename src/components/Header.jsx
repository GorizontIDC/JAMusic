import  "../styles/compStyle.css";
import "../styles/MediaAdaptatiot.css"
import { PersonCircle } from 'react-bootstrap-icons';
import logo from '../assets/images/logotype.png';
import { useNavigate } from "react-router-dom";
import { supabase } from '../utils/supabaseClient';
import { useState, useEffect } from 'react';
function Header({ onRLClick }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    //проверка на то, залогинен ли пользователь.
        useEffect(() => {
            const getSession = async () => {
                const { data: { user }, error } = await supabase.auth.getSession();
                if (error){
                    console.log('Ошибка', error.message);
                    setUser(null)
                }else{
                    setUser(user);  
                }
            };
            getSession();
            // Факт изменения статуса, отслеживание входа выхода
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                setUser(session?.user ?? null);
            });
            return () => subscription.unsubscribe();
        }, []);
        const handleProfileClick = () => {
            if (user) {
                navigate('/profile');
            } else {
                onRLClick();
            }
        };
        // Поиск музыки через Deezer API
    const searchDeezer = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        try {
            const response = await fetch(
                `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=5`
            );
            const data = await response.json();
            
            const tracks = data.data.map(track => ({
                id: track.id,
                title: track.title,
                artist: track.artist.name,
                cover: track.album.cover_small,
                duration: track.duration,
                preview: track.preview
            }));
            
            setSearchResults(tracks);
            setShowResults(true);
        } catch (error) {
            console.error('Ошибка поиска:', error);
            setSearchResults([]);
        }
    };

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        searchDeezer(value);
    };

    // Закрываем результаты при клике вне области поиска
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.search-container')) {
                setShowResults(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);
    return (
                <header className="header">
            <a href="/" className="logo-link">
                <img src={logo} alt="JAMusic" className="logo-images" />
            </a>
            
            <div className="search-container">
                <div id="search" className="search w-500px d-flex align-items-center"> 
                    <input 
                        type="search"
                        className="form-control me-1 w-600px"
                        placeholder="Поиск музыки..."
                        value={searchQuery}
                        onChange={handleSearchInput}
                    />
                    <button id="searchButton" className="btn btn-primary w-15px h-8px">Найти</button>
                </div>
                
                {/* Результаты поиска */}
                {showResults && searchResults.length > 0 && (
                    <div className="search-results-dropdown">
                        {searchResults.map(track => (
                            <div key={track.id} className="search-result-item">
                                <img src={track.cover} alt={track.title} />
                                <div className="result-info">
                                    <div className="result-title">{track.title}</div>
                                    <div className="result-artist">{track.artist}</div>
                                </div>
                                {track.preview && (
                                    <audio controls className="result-preview">
                                        <source src={track.preview} type="audio/mpeg" />
                                    </audio>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="userProfile">
                <button className="profile-button" onClick={handleProfileClick}>
                    <PersonCircle className="PersonalCircle" size={58}/>
                </button>
            </div>
        </header>
    )
}
export default Header;