//import React from "react";
import "../styles/compStyle.css";
import {
    FaVk, FaTelegram, FaGithub, FaReddit
} from 'react-icons/fa';
function Footer(){
    const currentYear = new Date().getFullYear();
    const socialcontact = [
        {icon: FaVk, url: 'https://vk.com/mygorizontsobitiy', name: 'VK'},
        {icon: FaTelegram, url: '#', name: 'Telegram'},
        {icon: FaGithub, url: '#', name: 'Github'},
        {icon: FaReddit, url: '#', name: 'Reddit'}
    ]
    return (
        
        <footer className="footer"> 
            <p className="textFooter">
                © JAMusic {currentYear}. Все права защищены. <br></br>
                Музыка принадлежит правообладателям.
            </p>
            <div className="social-links">
                {socialcontact.map((social ,index) =>{
                    const IconComponent = social.icon;
                    return(
                    <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-lable={social.name}
                    >
                        <IconComponent size={47}/>
                    </a>
                    )
                })}
            </div>
            <button className="btn btn-primary" id="ftbtn">
                Обратная связь
            </button>
        </footer>        
    )
}
export default Footer;