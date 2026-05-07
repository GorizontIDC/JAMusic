import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { supabase } from '../utils/supabaseClient';
import { useState, useEffect } from 'react';
const PersonalAccount = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    // Получение пользователя из SB
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
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
    if (!user) return <div>Загрузка пользователя...</div>;
    if (!profile) return <div>Загрузка профиля...</div>;
    return (
        <div className="allAccPage" >
          <Header />  
            <h1>Ваш профиль</h1>
            <p>Nickname: {profile.nickname}</p>
            <p>Email: {user.email}</p>
          <Footer />
        </div>
    );
};
export default PersonalAccount;