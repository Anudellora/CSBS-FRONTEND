import { Link, useLocation } from 'react-router-dom';
import { Bot, MapPin } from 'lucide-react';
import './Navigation.css';

export default function Navigation() {
    const location = useLocation();

    return (
        <nav className="navbar glass-panel">
            <div className="container nav-container">
                <Link to="/" className="nav-logo">
                    <div className="logo-icon"></div>
                    <span>CSBS</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        Главная
                    </Link>
                    <Link to="/booking" className={`nav-link ${location.pathname === '/booking' ? 'active' : ''}`}>
                        Бронирование
                    </Link>
                    <Link to="/ai-assistant" className={`nav-link nav-link-ai ${location.pathname === '/ai-assistant' ? 'active' : ''}`}>
                        <Bot size={18} />
                        ИИ-Ассистент
                    </Link>
                    <button className="btn btn-primary">Войти</button>
                </div>
            </div>
        </nav>
    );
}
