import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { supabase } from '../utils/supabaseClient';
import { useState, useEffect } from 'react';
import loading from '../assets/loading.gif'
import '../styles/AccPage.css';
import { useNavigate } from "react-router-dom";
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
    if (!user) return <div className="loading-page"> <div className="loading">Загрузка ... <img className="gif" src={loading}></img></div></div>;
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
                <main className="main-acc">
                    <h1>Ваш профиль</h1>
                    <p>Nickname: {profile.nickname}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>выйти</button>
                    <button onClick={back}>Назад</button>
                </main>
            <Footer className="footer-acc" />
        </div>
    );
};
export default PersonalAccount;