import { useState } from "react";
import  "../styles/compStyle.css";
import { PersonCircle } from 'react-bootstrap-icons';
interface HeaderProps {
    showSearch?: boolean;
}
function Header({showSearch}:HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="header">
            <>
                <a href="https://vk.com" className="logo-link">
                    <img src="/images/logo2.png"
                        alt="JAMusic"
                        className="logo-images"
                    />
                </a>
            </>
            {showSearch && (
            <div id="search" className="search w-500px d-flex align-items-center justify-content-center"> 
                <input type="search"
                       className="form-control me-1 w-600px"
                       placeholder="Поиск..."
                />
                <button className="btn btn-primary w-15px h-8px">Найти</button>
            </div>
        )}
            <div className="userProfile">
                <button className="profile-button"
                onClick={() => setMenuOpen(!menuOpen)}
                >
                <PersonCircle size={40}/>
                </button>
                {menuOpen && (
                    <div className="profileSection">

                    </div>
                )}
            </div>
        </header>
    )
}
export default Header;