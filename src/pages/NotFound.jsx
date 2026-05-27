import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-code">404</h1>
                <h2 className="not-found-title">Страница не найдена</h2>
                <p className="not-found-text">
                    Извините, страница, которую вы ищете, не существует или была перемещена.
                </p>
                <Link to="/" className="not-found-button">
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
}

export default NotFound;