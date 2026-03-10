import { CalendarCheck, MapPin, Building2, Presentation, Armchair } from 'lucide-react';

export default function BookingForm({ selectedType, handleTypeSelect, selectedDesk, getPrice }) {
    return (
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
    );
}
