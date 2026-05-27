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
     const [confirmPassword, setConfirmPassword] = useState('');
    //ошибки
    const [Errors, setErrors] = useState({});
    //проверка открытия модального окна
     if (!isOpen) return null;
        //логин
    const validateRegistration = () => {
        const newErrors = {};
        if (!nickname.trim()) {
            newErrors.nickname = 'Никнейм обязателен.';
        } else if (nickname.length < 2) {
            newErrors.nickname = 'Никнейм должен быть не менее 2 символов.';
        } else if (nickname.length > 16){
            newErrors.nickname = 'Никнейм должен быть не более 16 символов.'
        }
        if (!signupEmail) {
            newErrors.email = 'Email обязателен.';
        } else if (!/\S+@\S+\.\S+/.test(signupEmail)) {
            newErrors.email = 'Введите корректный email.';
        }
        if (!signupPassword) {
            newErrors.password = 'Пароль обязателен';
        } else if (signupPassword.length < 8) {
            newErrors.password = 'Пароль должен быть не менее 8 символов';
        }
        if (signupPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
        const handleLogin = async (e) => {
            e.preventDefault();
                const { error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });
            if (error){
                if (error.message.includes('Invalid login credentials')) {
                    toast.error('Неверный email или пароль');
                } else if (error.message.includes('Email not confirmed')){
                    toast.error('Подтвердите email!');
                } else{
                    toast.error(error.message);
                }
            } else {
                toast.success('Успешный вход!')// Пользователь успешно вошёл 
                navigate('/profile');
                onClose();
                if(onLogin) onLogin(); //обновление состояния
            }
        };
          //логин
          //регистрация
        const handleRegistration = async (e) => {
            e.preventDefault();
            if (!validateRegistration()){
                toast.error('Заполните все поля!');
                return;
            }
            const { error } = await supabase.auth.signUp({
                email: signupEmail,
                password: signupPassword,
                options:{data:{nickname: nickname}}
            });
            if (error) {
                if (error.message.includes('User already registered')) {
                    toast.error('Пользователь с таким email уже существует.')
                } else {
                    toast.error(error.message);
                }
            }else{
                toast.success('Вы успешно зарегистрировались! Подтвердите email в письме.');
                setIsLogin(true);
                setSignupEmail('');
                setSignupPassword('');
                setConfirmPassword('')
                setNickname('');
                setErrors('');
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
                                        <input type='email' 
                                            className='form-input' 
                                            placeholder='Email' 
                                            value={email} 
                                            onChange={(e) => setLoginEmail(e.target.value)} 
                                            required>
                                        </input>
                                        <input type='password' 
                                            className='form-input' 
                                            placeholder='Пароль' 
                                            value={password} 
                                            onChange={(e) => setLoginPassword(e.target.value)} 
                                            required>
                                        </input>
                                    </div>
                                        <button  type="submit" 
                                            className='form-submit-login'> 
                                                <FaPlay size = {42} /> 
                                        </button>
                                </form>
                    )}
                    {!isLogin && (
                                <form onSubmit={handleRegistration} action='' method='post' className='registr-form'>
                                    <div className='inputs-reg'>
                                        <input type='text' 
                                            className='form-input' 
                                            placeholder='Никнейм'
                                            maxLength={16}
                                            value={nickname} 
                                            onChange={(e) => setNickname(e.target.value)} 
                                            required >
                                        </input>
                                        {Errors.nickname && <span className='err-text'>{Errors.nickname}</span>}
                                        <input type='email' 
                                            className='form-input' 
                                            placeholder='Email' 
                                            value={signupEmail} 
                                            onChange={(e) => setSignupEmail(e.target.value)} 
                                            required >
                                        </input>
                                        {Errors.email && <span className='err-text'>{Errors.email}</span>}
                                        <input type='password' 
                                            className='form-input' 
                                            placeholder='Пароль (8 символов)' 
                                            value={signupPassword} 
                                            onChange={(e) => setSignupPassword(e.target.value)} 
                                            required >
                                        </input>
                                        {Errors.password && <span className='err-text'>{Errors.password}</span>}
                                        <input type='password'
                                            className='form-input'
                                            placeholder='Подтвердите пароль'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required>
                                        </input>
                                        {Errors.confirmPassword && <span className='err-text'>{Errors.confirmPassword}</span>}
                                    </div>
                                        <button type="submit" 
                                            className='form-submit-reg'> 
                                                <FaPlay size = {42} /> 
                                        </button>
                                </form>
                    )}
                </div>
            </div>
        </div>
                        
    )
}
export default ModalRegLog;