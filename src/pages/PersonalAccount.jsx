import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { supabase } from '../utils/supabaseClient';
import { useState, useEffect } from 'react';
import loading from '../assets/loading.gif'
import '../styles/AccPage.css';
import { useNavigate } from "react-router-dom";
import FavoriteTracks from "../components/Lists/FavoriteTracks.jsx";
const PersonalAccount = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    // Получение пользователя из SB
    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user ?? null;
            setUser(user);
        };
        getUser();
    }, []);
    useEffect(() => {
    const checkAuth = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) console.error('Ошибка сессии:', error);
            console.log('Сессия:', session); // Должен быть объект, если пользователь вошёл
            setUser(session?.user ?? null);
        };
        checkAuth();
    }, []);
    // Загрузка пользователя
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            if (error) {
                console.error('Ошибка:', error);
            } else {
                setProfile(data);
            }
        };
        fetchProfile();
    }, [user]);
    //Показывается пока грузится пользователь
    if (!user) return <div className="loading-page"> <div className="loading"> {console.log("Пользователь не найден")} Загрузка... <img className="gif" src={loading}></img></div></div>;
    if (!profile) return <div className="loading-page"> <div className="loading">Загрузка профиля... <img className="gif" src={loading}></img></div></div> ;
    //кнопка выхода
    const handleLogout = async () => {
        try{
           const {error} = await supabase.auth.signOut();
           if (error) {
            console.error('Ошибка выхода:', error.message);
           }
        } catch (err){
            console.error('Сетевая ошибка при входе:', err);
        }finally{
            // Очистка
            setUser(null);
            setProfile(null);
            //Удаление токена вручную
            const supabaseKey = Object.keys(localStorage).find(key => key.startsWith('sb-'));
            if (supabaseKey) localStorage.removeItem(supabaseKey);
            // Перенаправляем на главную
            navigate('/');
        }
    };
    const back = () =>{
        navigate('/');
    }
    return (
        <div className="page-acc" >
            <Header />  
                    <button className="logout-button" onClick={handleLogout}>Выйти</button>
                    <button className="back-button" onClick={back}>Назад</button>
                <main className="main-acc">
                    <div className="user-hello">
                        <p className="user-hello-title">Привет, {profile.nickname}!👋</p>
                        <div className="profile-picture"> p </div>
                    </div>
                    <div className="fav-tracks">
                        <h3 className="tracks-title">Избранные треки:</h3>
                        <div className="fav-tracks-container">
                            <FavoriteTracks
                                userId={user?.id}
                                //onPlaySong={playSong}
                            />
                        </div>
                    </div>
                    <div className="fav-albims">
                        <h3 className="albums-title">Избранные альбомы:</h3>
                    </div>
                    <div className="fav-playlists">
                        <h3 className="playlists-title">Ваши плейлисты:</h3>
                    </div>
                </main>
    {user?.email === "jamusic@list.ru" && (
            <a href="/admin" className="admin-link">Админ панель</a>
        )}
            <Footer className="footer-acc" />
        </div>
    );
};
export default PersonalAccount;