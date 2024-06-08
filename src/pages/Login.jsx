import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/style.css'
import { PrimaryLinkBtn } from '../components/ui/buttons';
import BASE_URL from '../constance/BaseUrl';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const [email, setEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState('');

    const handleForm = async e => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/auth/login/`, { email, password });
            console.log(response.data);
            localStorage.setItem('token', JSON.stringify(response.data))
            setLoggedIn(true);
        } catch (error) {
            alert('Не правильный пароль или электроный адрес', error);
        }
        setEmail('');
        setPassword('');
    }
    if (loggedIn) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <div className="container_ center">
                <div className="form_login">
                    <form onSubmit={handleForm} method="POST">
                        <div className="row_inp">
                            <div className="inp_login">
                                <input name="email" type="text" className='inp_login_inp' placeholder='Эл. почта' id="" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="inp_login">
                                <input name="password" type="password" className='inp_login_inp' placeholder='Пароль' id="" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                            <div className="inp_login">
                                <button className='btn_submit inp_login_inp' type='submit'>Войти</button>
                            </div>
                            <div className="reg">Нету учетной записи? <span><PrimaryLinkBtn to="/register" className='reg_btn'>Зарегистрироваться</PrimaryLinkBtn></span></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;