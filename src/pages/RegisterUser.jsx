import React, { useState } from 'react'; // Один раз импортируем React и useState
import { PrimaryLinkBtn } from '../components/ui/buttons';
import BASE_URL from '../constance/BaseUrl';
import 'react-phone-number-input/style.css'; // Подключаем стили библиотеки
import PhoneInput from 'react-phone-number-input';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/style.css'
import '../assets/css/media.css'

const RegisterUser = () => {
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [role, setRole] = useState('client');
    const [phone, setPhone] = useState('')
    const [loggedIn, setLoggedIn] = useState(false);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [base64Image, setBaseImage64] = useState('')

    const [error, setError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [phoneError, setPhoneError] = useState('');

    let [avatar, setAvatar] = useState(null)

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
        setBaseImage64(loadEvent.target.result);
    };


    const handleForm = async e => {
        e.preventDefault();
        reader.readAsDataURL(avatar);
        if (base64Image) {
            const userData = {
                email: email,
                password1: password1,
                password2: password2,
                first_name: first_name,
                last_name: last_name,
                role: role,
                avatar: base64Image,
                phone: phone,
            };
            console.log(userData);

            if (password1 !== password2) {
                setPasswordError('Пароли не совпадают');
            } else if (password1.length < 8) {
                setPasswordError('Пароль должен содержать не менее 8 символов');
            }


            try {
                console.log(role);
                const response = await axios.post(`${BASE_URL}/api/v1/auth/register/`, userData);
                console.log(response.data);
                localStorage.setItem('token', JSON.stringify(response.data))
                setLoggedIn(true);
            } catch (error) {
                setError('Не правильный номер телефона или такой пользователь существует')
            }
            setEmail('');
            setPassword1('');
            setPassword2('');
        }

    }

    if (loggedIn) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <div className="container_ center">
                <div className="form">
                    <form onSubmit={handleForm} method="POST">
                        <div className="row_inp">
                            <div className="inp_login">
                                <input name="email" type="text" className='inp_login_inp' placeholder='Эл. почта' id="" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="inp_login">
                                <input name="first_name" type="text" className='inp_login_inp' placeholder='Имя' id="" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className="inp_login">
                                <input name="last_name" type="text" className='inp_login_inp' placeholder='Фамилия' id="" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                            <div className="inp_login">
                                <select name="role" className='inp_login_inp' onChange={(e) => setRole(e.target.value)} placeholder={'Роль'} id="">
                                    <option value="client">Клиент</option>
                                    <option value="salesman">Продавец</option>
                                </select>
                            </div>
                            <div className="inp_login">
                                <PhoneInput
                                    placeholder="Введите номер телефона"
                                    value={phone}
                                    onChange={(value) => setPhone(value)}
                                />
                                <div className="error">{phoneError}</div>
                            </div>
                            <div className="inp_login inp_login1">
                              <span>Аватарка:</span> <input type="file" name='avatar' onChange={(e) => setAvatar(e.target.files[0])} required />
                            </div>
                            <div className="inp_login">
                                <input name="password1" type="password" className='inp_login_inp' placeholder='Пароль' id="" value={password1} onChange={(e) => setPassword1(e.target.value)} required />
                            </div>
                            <div className="inp_login">
                                <input name="password2" type="password" className='inp_login_inp' placeholder='Повторите пароль' id="" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                                <div className="error">{passwordError}</div>
                            </div>
                            <div className="inp_login">
                                <button className='btn_submit inp_login_inp' type='submit'>Зарегистрироваться</button>
                                <div className="error">
                                    {error}
                                </div>
                            </div>
                            <div className="reg">Есть учетная запись? <span><PrimaryLinkBtn to="/login" className='reg_btn'>Войти</PrimaryLinkBtn></span></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;
