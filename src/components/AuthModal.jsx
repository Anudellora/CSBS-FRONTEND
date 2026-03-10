import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode); // 'login' or 'register'
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    // Reset state when modal closes or mode changes
    useEffect(() => {
        setFormData({ name: '', email: '', confirmEmail: '', password: '', confirmPassword: '' });
        setErrors({});
        setShowPassword(false);
        setShowConfirmPassword(false);
    }, [isOpen, mode]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const validateField = (fieldName, value, currentFormData = formData) => {
        let errorMsg = '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (fieldName === 'email') {
            if (!value) errorMsg = "Email обязателен";
            else if (!emailRegex.test(value)) errorMsg = "Введите корректный email";
        }
        
        if (fieldName === 'password') {
            if (!value) errorMsg = "Пароль обязателен";
            else if (mode === 'register') {
                const forbiddenChars = /[()[\]{}|\`¬¦!«£$%^&*»<>:;#~_\-+=,@file]/;
                
                if (value.length < 8) errorMsg = "Пароль должен содержать минимум 8 символов";
                else if (forbiddenChars.test(value)) errorMsg = "Пароль содержит недопустимые спецсимволы";
                else if (!/(?=.*[a-z])/.test(value)) errorMsg = "Должна быть хотя бы одна строчная буква";
                else if (!/(?=.*[A-Z])/.test(value)) errorMsg = "Должна быть хотя бы одна заглавная буква";
                else if (!/(?=.*\d)/.test(value)) errorMsg = "Должна быть хотя бы одна цифра";
            }
        }

        if (mode === 'register') {
            if (fieldName === 'name' && !value) {
                errorMsg = "Имя обязательно";
            }
            if (fieldName === 'confirmEmail') {
                if (value !== currentFormData.email) errorMsg = "Email адреса не совпадают";
            }
            if (fieldName === 'confirmPassword') {
                if (value !== currentFormData.password) errorMsg = "Пароли не совпадают";
            }
            // If email changes, re-validate confirmEmail if it has a value
            if (fieldName === 'email' && currentFormData.confirmEmail) {
                if (value !== currentFormData.confirmEmail) {
                    setErrors(prev => ({ ...prev, confirmEmail: "Email адреса не совпадают" }));
                } else {
                    setErrors(prev => ({ ...prev, confirmEmail: '' }));
                }
            }
            // If password changes, re-validate confirmPassword if it has a value
            if (fieldName === 'password' && currentFormData.confirmPassword) {
                if (value !== currentFormData.confirmPassword) {
                    setErrors(prev => ({ ...prev, confirmPassword: "Пароли не совпадают" }));
                } else {
                    setErrors(prev => ({ ...prev, confirmPassword: '' }));
                }
            }
        }

        return errorMsg;
    };

    const handleChange = (e, fieldName) => {
        const newValue = e.target.value;
        const newFormData = { ...formData, [fieldName]: newValue };
        setFormData(newFormData);
        
        // Real-time validation
        const fieldError = validateField(fieldName, newValue, newFormData);
        setErrors(prev => ({ ...prev, [fieldName]: fieldError }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Validate all relevant fields based on mode
        const fieldsToValidate = mode === 'register' 
            ? ['name', 'email', 'confirmEmail', 'password', 'confirmPassword']
            : ['email', 'password'];

        fieldsToValidate.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log(`Submitting ${mode} form...`, formData);
            onClose();
        } else {
            console.log('Validation failed');
        }
    };

    return (
        <div className={`auth-modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className="auth-modal glass-panel">
                <button className="auth-close-btn" onClick={onClose}>
                    <X size={24} />
                </button>
                
                <div className="auth-header">
                    <h2>{mode === 'login' ? 'Вход' : 'Регистрация'}</h2>
                </div>

                <div className="auth-toggle-slider">
                    <div className={`slider-bg ${mode === 'login' ? 'left' : 'right'}`}></div>
                    <button 
                        type="button" 
                        className={`slider-option ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => setMode('login')}
                    >
                        Войти
                    </button>
                    <button 
                        type="button" 
                        className={`slider-option ${mode === 'register' ? 'active' : ''}`}
                        onClick={() => setMode('register')}
                    >
                        Регистрация
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {/* Decoy fields to fool password managers */}
                    <input type="email" style={{display: 'none'}} name="decoy_email" />
                    <input type="password" style={{display: 'none'}} name="decoy_password" />
                    
                    {mode === 'register' && (
                        <div className="form-group">
                            <label htmlFor="name">Имя</label>
                            <div className="input-with-icon">
                                <User size={18} className="input-icon" />
                                <input 
                                    type="text" 
                                    id="input_f1" 
                                    placeholder="Введите ваше имя" 
                                    value={formData.name}
                                    onChange={(e) => handleChange(e, 'name')}
                                    className={errors.name ? 'input-error' : ''}
                                    autoComplete="off"
                                />
                            </div>
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-with-icon">
                            <Mail size={18} className="input-icon" />
                            <input 
                                type="email" 
                                id="input_f2" 
                                placeholder="Введите ваш email" 
                                value={formData.email}
                                onChange={(e) => handleChange(e, 'email')}
                                className={errors.email ? 'input-error' : ''}
                                autoComplete={mode === 'register' ? 'off' : 'email'}
                            />
                        </div>
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    {mode === 'register' && (
                        <div className="form-group">
                            <label htmlFor="confirmEmail">Подтвердите Email</label>
                            <div className="input-with-icon">
                                <Mail size={18} className="input-icon" />
                                <input 
                                    type="email" 
                                    id="input_f3" 
                                    placeholder="Повторите email" 
                                    value={formData.confirmEmail}
                                    onChange={(e) => handleChange(e, 'confirmEmail')}
                                    className={errors.confirmEmail ? 'input-error' : ''}
                                    autoComplete="off"
                                />
                            </div>
                            {errors.confirmEmail && <span className="error-text">{errors.confirmEmail}</span>}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <div className="input-with-icon">
                            <Lock size={18} className="input-icon" />
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id="input_f4" 
                                name={`pwd_${Math.random().toString(36).slice(2)}`}
                                placeholder="Введите пароль" 
                                value={formData.password}
                                onChange={(e) => handleChange(e, 'password')}
                                className={errors.password ? 'input-error' : ''}
                                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                            />
                            <button 
                                type="button" 
                                className="password-toggle-btn" 
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex="-1"
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    {mode === 'register' && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Подтвердите пароль</label>
                            <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    id="input_f5" 
                                    name={`cpwd_${Math.random().toString(36).slice(2)}`}
                                    placeholder="Повторите пароль" 
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleChange(e, 'confirmPassword')}
                                    className={errors.confirmPassword ? 'input-error' : ''}
                                    autoComplete="new-password"
                                />
                                <button 
                                    type="button" 
                                    className="password-toggle-btn" 
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    tabIndex="-1"
                                >
                                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary btn-submit">
                        {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
            </div>
        </div>
    );
}
