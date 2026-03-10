import { useState } from 'react';
import BookingForm from '../components/booking/BookingForm';
import BookingMap from '../components/booking/BookingMap';
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
        if (selectedType === 'office') return '15 000 ₽/день';
        if (selectedType === 'room') return '1 500 ₽/ч';
        return '1 200 ₽/день';
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
                <BookingForm 
                    selectedType={selectedType} 
                    handleTypeSelect={handleTypeSelect} 
                    selectedDesk={selectedDesk} 
                    getPrice={getPrice} 
                />
                
                <BookingMap 
                    selectedType={selectedType}
                    selectedDesk={selectedDesk}
                    handleDeskSelect={handleDeskSelect}
                />
            </div>
        </div>
    );
}
