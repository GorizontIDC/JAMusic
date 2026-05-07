import '../../styles/log_regModal.css'
import {React, useState } from 'react';
import { FaPlay } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../../utils/supabaseClient.js';
import { toast } from 'react-toastify';
function ModalRegLog({isOpen, onClose, onLogin}) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
     //поля логина
     const [email, setLoginEmail] = useState('');
     const [password, setLoginPassword] = useState('');
     //поля регистрации
     const [nickname, setNickname] = useState('');
     const [signupEmail, setSignupEmail] = useState('');
     const [signupPassword, setSignupPassword] = useState('');
    //проверка открытия модального окна
     if (!isOpen) return null;
        //логин
        const handleLogin = async (e) => {
            e.preventDefault();
                const { error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });
            if (error) {
                toast.error(error.message);
            } else {
                toast.success('Успешный вход! Перенаправление...');
                // Пользователь успешно вошёл 
                navigate('/profile');
                onClose();
                if(onLogin) onLogin(); //обновление состояния
        }}
          //логин
          //регистрация
        const handleRegistration = async (e) => {
            e.preventDefault();
            const { error } = await supabase.auth.signUp({
                email: signupEmail,
                password: signupPassword,
                options:{data:{nickname: nickname}}
            });
            if (error) {
                toast.error(error.message);
            }else{
                toast.success('Вы успешно зарегистрировались! Теперь войдите.');
                setIsLogin(true);
                setSignupEmail('');
                setSignupPassword('');
                setNickname('');
            }
        }
          //регистрация
          
    return(
        <div className="lr-Window" onClick={onClose}>
            <div className="RL-content" onClick = {(e) => e.stopPropagation()}>
                <button className='modal-closed' onClick={onClose}>
                    <AiOutlineClose size={42} />
                </button>
               <div className="auth-header">
                    <button 
                        id="bl"
                        className={isLogin ? "activeLR" : ""} //кнопка логина
                        onClick={() => setIsLogin(true)}> Вход </button>
                    <button 
                        id="br"
                        className={!isLogin ? "activeLR" : ""} //кнопка регистрации
                        onClick={() => setIsLogin(false)}> Регистрация </button>
                </div> 
                <div className='content-inside'>
                    {isLogin && (
                                <form onSubmit={handleLogin} className='login-form'>
                                    <div className="inputs-login">
                                        <input type='email' className='form-input' placeholder='Email' value={email} onChange={(e) => setLoginEmail(e.target.value)} required></input>
                                        <input type='password' className='form-input' placeholder='Пароль' value={password} onChange={(e) => setLoginPassword(e.target.value)} required></input>
                                    </div>
                                        <button type="submit" className='form-submit-login'> <FaPlay size = {42} /> </button>
                                </form>
                    )}
                    {!isLogin && (
                                <form onSubmit={handleRegistration} action='' method='post' className='registr-form'>
                                    <div className='inputs-reg'>
                                        <input type='text' className='form-input' placeholder='Никнейм'value={nickname} onChange={(e) => setNickname(e.target.value)} required ></input>
                                        <input type='email' className='form-input' placeholder='Email' value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required ></input>
                                        <input type='text' className='form-input' placeholder='Пароль' value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required ></input>
                                    </div>
                                        <button type="submit" className='form-submit-reg'> <FaPlay size = {42} /> </button>
                                </form>
                    )}
                </div>
            </div>
        </div>
                        
    )
}
export default ModalRegLog;