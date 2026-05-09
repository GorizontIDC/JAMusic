//import React from "react";
import "../styles/compStyle.css";
import {
    FaVk, FaTelegram, FaGithub, FaReddit
} from 'react-icons/fa';
function Footer(){
    const currentYear = new Date().getFullYear();
    const social = [
        {icon: FaVk, url: 'https://vk.com/mygorizontsobitiy', name: 'VK'},
        {icon: FaTelegram, url: 'https://t.me/itsworth_its', name: 'Telegram'},
        {icon: FaGithub, url: 'https://github.com/GorizontIDC', name: 'Github'},
        {icon: FaReddit, url: 'https://www.reddit.com/user/Ok-Ant9128/', name: 'Reddit'}
    ]
    console.log('Footer загрузился!');
    return (
        
        <footer className="footer"> 
            <p className="textFooter">
                © JAMusic {currentYear}. Все права защищены. <br></br>
                Музыка принадлежит правообладателям.
            </p>
            <div className="social-links">
                {social.map((social ,index) =>{
                    const IconComponent = social.icon;
                    return(
                    <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label={social.name}
                    >
                        <IconComponent size={47}/>
                    </a>
                    )
                })}
            </div>
            <div className="">

            </div>
            <button className="btn btn-primary" id="ftbtn">
                Обратная связь
            </button>
        </footer>        
    )
}
export default Footer;