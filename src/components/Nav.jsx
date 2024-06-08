import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import Logo from '../assets/img/Logo12.svg'
import red_phone from '../assets/img/red_phone.svg'
import heart from '../assets/img/heart.svg'
import { GiHamburgerMenu } from "react-icons/gi";
import { Swiper, SwiperSlide } from 'swiper/react';
import Slider, { Range } from 'rc-slider';
import { FaHeart } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'rc-slider/assets/index.css';
import BASE_URL from '../constance/BaseUrl'
import Load from '../assets/img/7plQ.gif'
import { PrimaryLinkBtn, PrimaryBtn } from './ui/buttons';
import 'swiper/css';
import 'swiper/css/pagination';
import '../assets/css/style.css'
import '../assets/css/media.css'
import 'rc-slider/assets/index.css';
import '../assets/css/CustomSlider.css';

const Nav = () => {
    let [loveCar, setLoveCar] = useState([])
    const [trueToken, setTrueToken] = useState(false)
    const [modelNav, setModelNav] = useState(false)

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/tokens/`).then(res => {
            return res.json()
        }).then(res => {
            const token = localStorage.getItem('token')
            setTrueToken(res.find(item => item.key == JSON.parse(token)["token"]))
        })
    }, [])
    const user = JSON.parse(localStorage.getItem('token'))
    loveCar = JSON.parse(localStorage.getItem('loveCar'))

    const openNavModel = () => {
        setModelNav(!modelNav)
    }
    return (
        <div>
            {
                        modelNav
                            ?
                            <div className="">
                                <div onClick={openNavModel} className="x"></div>
                                <div className="model_nav mn">
                                    <div className="model_row">
                                        <div className="model_link">
                                            <PrimaryLinkBtn to="/">Подбор авто</PrimaryLinkBtn>
                                        </div>
                                        <div className="palka_white"></div>
                                        {
                                            trueToken
                                            ? <div className="model_link red_c">
                                            <PrimaryLinkBtn to="/workspace/">Мои обьявление</PrimaryLinkBtn>
                                        </div>
                                        :
                                            <div className="model_link">
                                                <PrimaryLinkBtn to="/">О компани</PrimaryLinkBtn>
                                            </div>
                                        }
                                        <div className="palka_white"></div>
                                        <div className="model_link">
                                            <PrimaryLinkBtn to="/">Техцентр</PrimaryLinkBtn>
                                        </div>
                                        <div className="palka_white"></div>
                                        <div className="model_link1">
                                            {
                                                trueToken
                                                ?
                                                <PrimaryLinkBtn className='red_add' to="/create-car">Подать Обьявление</PrimaryLinkBtn>
                                                : ''
                                            }
                                        </div>
                                        <div className="palka_white"></div>
                                        <div className="model_link red">
                                            {
                                                trueToken
                                                    ? <PrimaryLinkBtn to="/profile">Профиль</PrimaryLinkBtn>
                                                    : <PrimaryLinkBtn to="/login">Войти</PrimaryLinkBtn>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div></div>
                    }
                    <nav>
                        <div className="container_">
                            <div className="nav_row">
                                <div className="nav_col1">
                                    <GiHamburgerMenu onClick={openNavModel} className='burger dn' />
                                    <div className="logo">
                                        <PrimaryLinkBtn to='/'>
                                            <img className='Logo' src={Logo} alt="" />
                                        </PrimaryLinkBtn>
                                    </div>
                                </div>
                                <div className="nav_col2">
                                    <div className="nav_titles a_nav">
                                        <PrimaryLinkBtn to="/">Подбор авто</PrimaryLinkBtn>
                                    </div>
                                    {
                                        user.length != 0
                                        ?
                                        <div className="nav_titles a_nav red_c">
                                        <PrimaryLinkBtn to="/workspace/">Мои обьявление</PrimaryLinkBtn>
                                        </div>
                                        :
                                        <div className="nav_titles a_nav ">
                                        <PrimaryLinkBtn to="/">О компании</PrimaryLinkBtn>
                                        </div>
                                    }
                                    <div className="nav_titles a_nav">
                                        <PrimaryLinkBtn to="/">Техцентр</PrimaryLinkBtn>
                                    </div>
                                    <div className="nav_titles1 a_nav1">
                                        {
                                            trueToken && user["role"] == 'admin' || user["role"] == "seller"
                                            ? <PrimaryLinkBtn className='red_add' to="/create-car">Подать Обьявление</PrimaryLinkBtn>
                                            : ''
                                        }
                                    </div>
                                </div>
                                <div className="nav_col3">
                                    <div className="red_btn">
                                        {
                                            trueToken
                                                ? <PrimaryLinkBtn to="/profile">Профиль</PrimaryLinkBtn>
                                                : <PrimaryLinkBtn to="/login">Войти</PrimaryLinkBtn>
                                        }
                                    </div>
                                </div>
                                <div className="nav_col4">
                                    <div className="phone">
                                        <img src={red_phone} alt="" /> +7 (800) 551-94-31
                                    </div>
                                    <div className="buttons">
                                        <PrimaryLinkBtn to="/favorites/" className='pr'>
                                            <img src={heart} className='heart' alt="" />
                                            {
                                                loveCar != 0
                                                    ? <span className='span'>{loveCar.length}</span>
                                                    : <span></span>
                                            }
                                        </PrimaryLinkBtn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
        </div>
    );
};

export default Nav; 