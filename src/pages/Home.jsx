import { Search, MapPin, Wifi, Coffee, Users } from 'lucide-react';
import './Home.css';

export default function Home() {
    const workspaces = [
        { id: 1, name: "Neon Hub", location: "Центр", price: "$25/день", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
        { id: 2, name: "Cyan Collective", location: "Технопарк", price: "$30/день", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
        { id: 3, name: "Deep Blue Studio", location: "Набережная", price: "$40/день", img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800", rating: 5.0 },
    ];

    return (
        <div className="home-page animate-fade-in">
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>Коворкинг <span className="text-accent">Будущего</span></h1>
                        <p className="hero-subtitle">Бронируйте премиальные рабочие места, созданные для глубокой концентрации и успешного сотрудничества. Введите свои предпочтения ниже, чтобы найти идеальное место.</p>

                        <div className="search-bar-container glass-panel">
                            <Search className="search-icon text-accent" size={24} />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Попросите ИИ подобрать идеальное место (например, 'Тихое место с быстрым Wi-Fi в центре')"
                            />
                            <button className="btn btn-primary search-btn">Найти</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="workspaces-section container">
                <div className="section-header">
                    <h2>Популярные Места</h2>
                    <a href="#" className="view-all">Смотреть все &rarr;</a>
                </div>

                <div className="workspaces-grid">
                    {workspaces.map(space => (
                        <div key={space.id} className="workspace-card glass-panel">
                            <div className="workspace-img-container">
                                <img src={space.img} alt={space.name} className="workspace-img" />
                                <div className="workspace-price">{space.price}</div>
                            </div>
                            <div className="workspace-info">
                                <h3>{space.name}</h3>
                                <div className="workspace-meta">
                                    <span className="meta-item"><MapPin size={16} /> {space.location}</span>
                                    <span className="meta-item rating">★ {space.rating}</span>
                                </div>
                                <div className="workspace-features">
                                    <span className="feature-icon" title="Быстрый Wi-Fi"><Wifi size={18} /></span>
                                    <span className="feature-icon" title="Бесплатный кофе"><Coffee size={18} /></span>
                                    <span className="feature-icon" title="Переговорка"><Users size={18} /></span>
                                </div>
                                <button className="btn btn-outline book-btn">Забронировать</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
