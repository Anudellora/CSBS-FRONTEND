import { useState } from 'react';
import { CalendarCheck, MapPin, Building2, Presentation, Armchair, LayoutDashboard, Users, Info } from 'lucide-react';
import './Booking.css';

export default function Booking() {
    const [selectedType, setSelectedType] = useState('desk');
    const [selectedDesk, setSelectedDesk] = useState(null);

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setSelectedDesk(null); // Reset desk on type change
    };

    const handleDeskSelect = (deskId) => {
        setSelectedDesk(deskId);
    };

    const getPrice = () => {
        if (!selectedDesk) return '—';
        return selectedDesk.startsWith('MR') ? '1 500 ₽/ч' : '1 200 ₽/день';
    };

    return (
        <div className="booking-page">
            <div className="booking-page-header">
                <div className="container">
                    <h1>Бронирование</h1>
                    <p>Выберите тип пространства, укажите дату и подберите место на карте зала.</p>
                </div>
            </div>

            <div className="container booking-layout">
                {/* ЛЕВАЯ КОЛОНКА: ФОРМА */}
                <aside className="booking-form-col">
                    <div className="booking-form-card glass-panel">
                        <h2 className="form-title">
                            <CalendarCheck className="form-title-icon" />
                            Форма бронирования
                        </h2>

                        <div className="form-section">
                            <label className="form-label">Тип пространства</label>
                            <div className="type-selector">
                                <button
                                    className={`type-btn ${selectedType === 'desk' ? 'active' : ''}`}
                                    onClick={() => handleTypeSelect('desk')}
                                >
                                    <Armchair size={20} />
                                    <span>Рабочее место</span>
                                </button>
                                <button
                                    className={`type-btn ${selectedType === 'room' ? 'active' : ''}`}
                                    onClick={() => handleTypeSelect('room')}
                                >
                                    <Presentation size={20} />
                                    <span>Переговорная</span>
                                </button>
                                <button
                                    className={`type-btn ${selectedType === 'office' ? 'active' : ''}`}
                                    onClick={() => handleTypeSelect('office')}
                                >
                                    <Building2 size={20} />
                                    <span>Приватный офис</span>
                                </button>
                            </div>
                        </div>

                        <div className="form-section">
                            <label className="form-label" htmlFor="location">Локация</label>
                            <select id="location" className="form-select">
                                <option value="">Выберите локацию</option>
                                <option>CSBS Центр — ул. Тверская, 15</option>
                                <option>CSBS Сити — Кутузовский пр-т, 2</option>
                                <option>CSBS Парк — ул. Парковая, 8</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-section">
                                <label className="form-label" htmlFor="date-from">Дата начала</label>
                                <input type="date" id="date-from" className="form-input" />
                            </div>
                            <div className="form-section">
                                <label className="form-label" htmlFor="date-to">Дата окончания</label>
                                <input type="date" id="date-to" className="form-input" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-section">
                                <label className="form-label" htmlFor="time-from">Начало</label>
                                <select id="time-from" className="form-select">
                                    <option>08:00</option>
                                    <option>09:00</option>
                                    <option>10:00</option>
                                </select>
                            </div>
                            <div className="form-section">
                                <label className="form-label" htmlFor="time-to">Конец</label>
                                <select id="time-to" className="form-select">
                                    <option>18:00</option>
                                    <option>19:00</option>
                                    <option>20:00</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-section">
                            <label className="form-label" htmlFor="name">Ваше имя</label>
                            <input type="text" id="name" className="form-input" placeholder="Иван Петров" />
                        </div>

                        <div className="form-section">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input type="email" id="email" className="form-input" placeholder="ivan@example.com" />
                        </div>

                        {/* ВЫБРАННОЕ МЕСТО */}
                        <div className={`selected-desk-banner ${selectedDesk ? 'visible' : ''}`}>
                            <MapPin size={18} />
                            <span>Выбранное место: <strong>{selectedDesk || 'не выбрано'}</strong></span>
                        </div>

                        {/* ИТОГ */}
                        <div className="form-summary">
                            <div className="summary-row">
                                <span>Стоимость</span>
                                <span className="summary-price">{getPrice()}</span>
                            </div>
                            {!selectedDesk && (
                                <div className="summary-row muted">
                                    <span>Выберите место на карте, чтобы увидеть стоимость</span>
                                </div>
                            )}
                        </div>

                        <button className="btn btn-primary btn-block btn-submit" disabled={!selectedDesk}>
                            Подтвердить бронирование
                        </button>
                    </div>
                </aside>

                {/* ПРАВАЯ КОЛОНКА: КАРТА СТОЛОВ */}
                <section className="desk-map-col">
                    <div className="desk-map-card glass-panel">
                        <div className="map-header">
                            <h2 className="form-title">
                                <LayoutDashboard className="form-title-icon" />
                                Карта зала
                            </h2>
                            <div className="map-legend">
                                <div className="legend-item"><span className="legend-dot free"></span>Свободно</div>
                                <div className="legend-item"><span className="legend-dot busy"></span>Занято</div>
                                <div className="legend-item"><span className="legend-dot selected"></span>Выбрано</div>
                            </div>
                        </div>

                        <div className="floor-plan">
                            <div className="floor-plan-placeholder">
                                <div className="floor-zones">
                                    {/* Зона А */}
                                    <div className="zone-block">
                                        <div className="zone-title">Зона А — Open Space</div>
                                        <div className="desk-grid">
                                            {['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'].map(id => {
                                                const isBusy = id === 'A3' || id === 'A5' || id === 'A8';
                                                return (
                                                    <div
                                                        key={id}
                                                        className={`desk ${isBusy ? 'busy' : 'free'} ${selectedDesk === id ? 'selected-state' : ''}`}
                                                        onClick={() => !isBusy && handleDeskSelect(id)}
                                                    >
                                                        <span>{id}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="floor-aisle"></div>

                                    {/* Переговорные */}
                                    <div className="zone-block">
                                        <div className="zone-title">Переговорные комнаты</div>
                                        <div className="meeting-rooms-grid">
                                            <div
                                                className={`meeting-room free ${selectedDesk === 'MR1 (до 6 чел.)' ? 'selected-state' : ''}`}
                                                onClick={() => handleDeskSelect('MR1 (до 6 чел.)')}
                                            >
                                                <Users size={24} />
                                                <span>MR-1</span>
                                                <small>до 6 чел.</small>
                                            </div>
                                            <div className="meeting-room busy">
                                                <Users size={24} />
                                                <span>MR-2</span>
                                                <small>Занято</small>
                                            </div>
                                            <div
                                                className={`meeting-room free ${selectedDesk === 'MR3 (до 12 чел.)' ? 'selected-state' : ''}`}
                                                onClick={() => handleDeskSelect('MR3 (до 12 чел.)')}
                                            >
                                                <Users size={24} />
                                                <span>MR-3</span>
                                                <small>до 12 чел.</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="map-coming-soon">
                                    <Info size={18} />
                                    <span>Интерактивная карта с точным планом этажей появится в следующем обновлении. Пока выберите место на схеме выше.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
