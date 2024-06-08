import React, { useState, useEffect, useRef } from 'react';
import { GiEntryDoor } from "react-icons/gi";
import BASE_URL from '../constance/BaseUrl'
import { FaPencilAlt } from "react-icons/fa";
import Load from '../assets/img/7plQ.gif'
import Profile_img from '../assets/img/pofile.jpg'
import { Navigate } from 'react-router-dom';
import { RiLockPasswordFill } from "react-icons/ri";
import { PrimaryLinkBtn } from '../components/ui/buttons';
import '../assets/css/style.css'
import '../assets/css/media.css'
import Nav from '../components/Nav';

const Profile = () => {

    const [exit, setExit] = useState(false)
    const user = JSON.parse(localStorage.getItem("token"))

    const exitAcc = () => {
        localStorage.setItem("token", '[]')
        setExit(true)
    }
    if (exit) {
        return <Navigate to={'/'} />
    }
    const role = {
        "admin": 'Админ',
        'client': 'Клиент',
        'salesman': 'Продавец'
    }
    return (
        <div className='create_body_prodile'>
            <div className="container_ profile_container">
                <div className="user">
                    {
                        user
                            ?
                            <div className="user_row">
                                <div className="user_col1">
                                    <div className="div_avatar">
                                        <div className="div_avatar_img">
                                            {
                                                user.avatar
                                                    ? <img src={`${user.avatar}`} alt="" />
                                                    : <img src={Profile_img} alt="" />
                                            }
                                        </div>
                                        <div className="user_email">
                                            {user.email}
                                        </div>
                                    </div>
                                    <div className="user_titles">
                                        <div className="user_full_name">
                                            Ф.И.О <span>{user.first_name} {user.last_name}</span>
                                        </div>
                                        <div className="user_full_name">
                                            Номер: <span>{user.phone}</span>
                                        </div>
                                        <div className="user_full_name">
                                            Роль: <span>{role[user.role]}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="user_col2">
                                    <div className="">
                                        <PrimaryLinkBtn to={`/redactor-profile/${user.id}`} className='red_btn-prfile'><FaPencilAlt/></PrimaryLinkBtn>
                                    </div>
                                    <div className="">
                                        <PrimaryLinkBtn to={`/change-password/${user.id}`} className='red_btn-prfile'><RiLockPasswordFill/></PrimaryLinkBtn>
                                    </div>
                                    <div className="">
                                        <div onClick={exitAcc} className='red_btn-prfile'>Выйти</div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div >
                                <img className='load_profile' src={Load} alt="" />
                            </div>
                    }
                </div>
            </div>
        </div >
    );
};

export default Profile;