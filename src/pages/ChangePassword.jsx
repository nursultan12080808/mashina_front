import React, { useState } from 'react'; // Один раз импортируем React и useState
import { PrimaryLinkBtn } from '../components/ui/buttons';
import BASE_URL from '../constance/BaseUrl';
import 'react-phone-number-input/style.css'; // Подключаем стили библиотеки
import PhoneInput from 'react-phone-number-input';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/style.css'
import '../assets/css/media.css'

const ChangePassword = () => {
    const user = JSON.parse(localStorage.getItem('token'))
    const [email, setEmail] = useState(user["email"]);
    const [first_name, setFirstName] = useState(user["first_name"]);
    const [last_name, setLastName] = useState(user["last_name"]);
    const [role, setRole] = useState(user["role"]);
    const [phone, setPhone] = useState(user["phone"])
    const [loggedIn, setLoggedIn] = useState(false);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [base64Image, setBaseImage64] = useState('')

    const [error, setError] = useState('')

    let [avatar, setAvatar] = useState(null)

    const [password, setPassword] = useState('')

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
        setBaseImage64(loadEvent.target.result);
    };


    const handleForm = async e => {
        e.preventDefault();
        if(avatar){
            reader.readAsDataURL(avatar);
            if(base64Image){
                let userData
                if (password && password1 && password2){
                    userData = {
                        email: email,
                        password: password,
                        password1: password1,
                        password2: password2,
                        first_name: first_name,
                        last_name: last_name,
                        avatar: base64Image,
                        role: role,
                        phone: phone,
                    }
                }else{
                    userData = {
                        email: email,
                        first_name: first_name,
                        last_name: last_name,
                        role: role,
                        avatar: base64Image,
                        phone: phone,
                    }
                }
                try {
                    const headers = {
                        'Authorization': `Token ${user["token"]}`
                    };
                    const response = await axios.patch(`${BASE_URL}/api/v1/redactor_profile/${user["id"]}/`, userData, {headers});
                    localStorage.setItem('token', JSON.stringify(response.data))
                    setLoggedIn(true);
                } catch (error1) {
                    setError(error1.response.data)
                }
            }
        }else{
            let userData
                if (password && password1 && password2){
                    userData = {
                        email: email,
                        password: password,
                        password1: password1,
                        password2: password2,
                        first_name: first_name,
                        last_name: last_name,
                        role: role,
                        phone: phone,
                    }
                }else{
                    userData = {
                        email: email,
                        first_name: first_name,
                        last_name: last_name,
                        role: role,
                        phone: phone,
                    }
                }
                try {
                    const headers = {
                        'Authorization': `Token ${user["token"]}`
                    };
                    const response = await axios.patch(`${BASE_URL}/api/v1/redactor_profile/${user["id"]}/`, userData, {headers});
                    localStorage.setItem('token', JSON.stringify(response.data))
                    setLoggedIn(true);
                } catch (error1) {
                    setError(error1.response.data)
                }
        }
        
    }

    if (loggedIn) {
        return <Navigate to="/" />;
    }
    return (
        <div className='create_body'>
            <div className="container_ center">
                <div className="form_password">
                    <form onSubmit={handleForm}>
                        <div className="row_inp">
                            <div className="inp_login">
                                <input name="password" type="password" className='inp_login_inp' placeholder='Старый пароль' id="" vaТlue={password} onChange={(e) => setPassword(e.target.value)} />
                                {
                                    error
                                    ?
                                    <div className="error">{error.error}</div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="inp_login">
                                <input name="password1" type="password" className='inp_login_inp' placeholder='Новый пароль' id="" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                                {
                                    error.password1
                                    ?
                                    <div className="error">{error.password1}</div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="inp_login">
                                <input name="password2" type="password" className='inp_login_inp' placeholder='Повторите пароль' id="" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                                {
                                    error.password2
                                    ?
                                    <div className="error">{error.password2}</div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="inp_login">
                                <button className='btn_submit inp_login_inp' type='submit'>Изменить</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
