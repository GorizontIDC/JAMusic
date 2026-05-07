import  "../styles/compStyle.css";
import { PersonCircle } from 'react-bootstrap-icons';
import logo from '../assets/images/logo2.png';
function Header({ onRLClick }) {
    
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
                {/**/ }
                <button className="profile-button" onClick={onRLClick}>
                    <PersonCircle size={38}/>
                </button>
            </div>
        </header>
    )
}
export default Header;