import React, { useState } from 'react';
import { PrimaryLinkBtn } from '../components/ui/buttons';
import BASE_URL from '../constance/BaseUrl';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/style.css';
import '../assets/css/media.css';

const RedactorProfile = () => {
    const user = JSON.parse(localStorage.getItem('token'));
    const [email, setEmail] = useState(user.email);
    const [first_name, setFirstName] = useState(user.first_name);
    const [last_name, setLastName] = useState(user.last_name);
    const [role, setRole] = useState(user.role);
    const [phone, setPhone] = useState(user.phone);
    const [loggedIn, setLoggedIn] = useState(false);
    const [base64Image, setBaseImage64] = useState('');

    const [error, setError] = useState('');
    const [fetching, setFetching] = useState(false);

    const [avatar, setAvatar] = useState(null);

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
        setBaseImage64(loadEvent.target.result);
        setFetching(true);
    };
    let userData;
    const handleForm2 = async () => {
        if (fetching) {
            console.log(role);
            if (base64Image) {
                userData = {
                    email,
                    first_name,
                    last_name,
                    avatar: base64Image,
                    role,
                    phone,
                };
            } else {
                userData = {
                    email,
                    first_name,
                    last_name,
                    role,
                    phone,
                };
            }
            try {
                const headers = {
                    'Authorization': `Token ${user.token}`
                };
                const response = await axios.patch(`${BASE_URL}/api/v1/redactor_profile/${user.id}/`, userData, { headers });
                localStorage.setItem('token', JSON.stringify(response.data));
                setLoggedIn(true);
            } catch (error1) {
                console.log(error1);
                setError(error1.response.data);
            }
        }
    };

    const handleForm = (e) => {
        e.preventDefault();
        if (avatar) {
            reader.readAsDataURL(avatar);
        } else {
            setFetching(true);
        }
        handleForm2();
    };

    if (loggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className='create_body'>
            <div className="container_ center">
                <div className="form">
                    <form onSubmit={handleForm}>
                        <div className="row_inp">
                            <div className="inp_login">
                                <input name="email" type="text" className='inp_login_inp' placeholder='Эл. почта' id="" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                {
                                    error.email
                                    ?
                                    <div className='error'>{error.email}</div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="inp_login">
                                <input name="first_name" type="text" className='inp_login_inp' placeholder='Имя' id="" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
                                {
                                    error.first_name
                                    ?
                                    <div className='error'>{error.first_name}</div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="inp_login">
                                <input name="last_name" type="text" className='inp_login_inp' placeholder='Фамилия' id="" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
                                {
                                    error.last_name
                                    ?
                                    <div className='error'>{error.last_name}</div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="inp_login">
                                <select name="role" className='inp_login_inp' onChange={(e) => setRole(e.target.value)} placeholder={'Роль'} id="">
                                    <option value="client" selected={role == 'client'}>Клиент</option>
                                    <option value="salesman" selected={role == 'salesman'}>Продавец</option>
                                    {role == 'admin' && <option value="admin" selected>Админ</option>}
                                </select>
                                {
                                    error.role
                                    ?
                                    <div className='error'>{error.role}</div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="inp_login">
                                <PhoneInput
                                    placeholder="Введите номер телефона"
                                    value={phone}
                                    onChange={(value) => setPhone(value)}
                                />
                                {
                                    error.phone
                                    ?
                                    <div className='error'>{error.phone}</div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="inp_login inp_login1">
                                <span>Аватарка:</span> <input type="file" name='avatar' onChange={(e) => setAvatar(e.target.files[0])} />
                                {
                                    error.avatar
                                    ?
                                    <div className='error'>{error.avatar}</div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="inp_login">
                                <button className='btn_submit inp_login_inp' type='submit'>Редактировать</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RedactorProfile;
