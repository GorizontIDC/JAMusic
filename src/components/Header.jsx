import  "../styles/compStyle.css";
import { PersonCircle } from 'react-bootstrap-icons';
import logo from '../assets/images/logo2.png';
import { useNavigate } from "react-router-dom";
import { supabase } from '../utils/supabaseClient';
import { useState, useEffect } from 'react';
function Header({ onRLClick }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
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
    return (
        <header className="header">
            <>
                <a href="/" className="logo-link">
                    <img src={logo}
                        alt="JAMusic"
                        className="logo-images"
                    />
                </a> 
            </>
            <div id="search" className="search w-500px d-flex align-items-center"> 
                <input type="search"
                       className="form-control me-1 w-600px"
                       placeholder="Поиск..."
                />
                <button id="searchButton" className="btn btn-primary w-15px h-8px">Найти</button>
            </div>
            <div className="userProfile">
                {/*Если пользователь залогинился, то перебрасывает на профиль, иначе открывает модалку*/ }
                <button className="profile-button" onClick={handleProfileClick}>
                    <PersonCircle className="PersonalCircle" size={58}/>
                </button>
            </div>
        </header>
    )
}
export default Header;