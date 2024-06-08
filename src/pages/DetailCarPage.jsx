import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link, json } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import BASE_URL from '../constance/BaseUrl'
import Load from '../assets/img/7plQ.gif'
import { PrimaryLinkBtn } from '../components/ui/buttons';
import Nav from '../components/Nav';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../assets/css/media.css'
import '../assets/css/CustomSlider.css';
const DetailCarPage = () => {

    const { id } = useParams()

    const [car, setCar] = useState([])

    const [isFetching, setFetching] = useState(true)

    const [loggedIn, setLoggedIn] = useState(false)

    const user = JSON.parse(localStorage.getItem('token'))

    const deleteCar = (e) => {
        fetch(`${BASE_URL}/api/v1/cars/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${user["token"]}`
            }})
            setLoggedIn(true)
    }


    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/cars/${id}/`).then(res => {
            return res.json()
        }
        ).then(res => {
            setCar(res)
            console.log(res);
        }).finally(() => setFetching(false))
    }, [])

    let [loveCar, setLoveCar] = useState([])

    let dataFromLocalStorage = localStorage.getItem('loveCar');
    dataFromLocalStorage = JSON.parse(dataFromLocalStorage);
    loveCar = dataFromLocalStorage

    const love = (id) => {
        const userDataString = localStorage.getItem('loveCar');
        let userData = JSON.parse(userDataString);
        if (userData.includes(id)) {
            userData = userData.filter(item => item !== id)
            const color = document.getElementById(`color${id}`)
            color.classList = 'hear_ white font_black'
        } else {
            userData.push(id)
            let color = document.getElementById(`color${id}`)
            color.classList = 'hear_ red font_white'
        }
        setLoveCar(userData)
        userData = JSON.stringify(userData)
        localStorage.setItem('loveCar', userData)
    }

    const TYPE_CHOICES = {
        'SEDAN': 'седан',
        'HATCHBACK': 'хэтчбек',
        'COUPE': 'купе',
        'CONVERTIBLE': 'кабриолет',
        'SUV': 'внедорожник',
        'TRUCK': 'грузовик',
        'VAN': 'фургон',
        'MINIVAN': 'минивэн',
        'SPORTS_CAR': 'спортивный автомобиль',
    };

    const FUEL_CHOICES = {
        'GASOLINE': 'бензин',
        'DIESEL': 'дизель',
        'ELECTRIC': 'электричество',
        'GAS': 'газ',
        'GAS_GASOLINE': 'газ / бензин',
        'GIBRID': 'гибрид',
    };

    const GEAR_CHOICES = {
        'MANUAL': 'механика',
        'AUTOMATIC': 'автомат',
        'CVT': 'вариатор',
        'ROBOT': 'робот',
    };

    const DRIVE_CHOICES = {
        'FRONT_WHEEL_DRIVE': 'передний',
        'REAR_WHEEL_DRIVE': 'задний',
        'ALL_WHEEL_DRIVE': 'полный',
    };

    const STATE_CHOICES = {
        'GOOD': 'хорошее',
        'PERFECT': 'идеальное',
        'EMERGENCY': 'аварийное / не на ходу',
        'NEW': 'новое',
    };

    const RUDDER_CHOICES = {
        'RIGHT': 'справа',
        'LEFT': 'слева',
    };

    const EXCHANGE_CHOICES = {
        'LOOK_VARIANT': 'рассмотрю варианты',
        'MONEY_TO_SURCHARGE': 'с доплатой покупателя',
        'MONEY_TO_SELLER': 'с доплатой продавца',
        'KEY_TO_KEY': 'ключ на ключ',
        'NO_EXCHANGE': 'не предлагать',
        'EXCHANGE_TO_IMMOVABLES': 'на недвижимость',
        'ONLY_EXCHANGE': 'только обмен',
    };

    const IN_STOCK_CHOICES = {
        'IN_STOCK': 'в наличии',
        'TO_ORDER': 'на заказ',
        'IN_TRANSIT': 'в пути',
    };

    if (loggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Nav />
            <div className="container_">
                {
                    isFetching
                        ?
                        <div className='load'><img src={Load} alt="" /></div>
                        :
                        <div className="car_row">
                            <div className="car_co0">
                                <div className="car_year">
                                    Марка <span>{car.madel.marka.name}</span>
                                </div>
                                <div className="car_year">
                                    Модель <span>{car.madel.name}</span>
                                </div>
                                <div className="car_year">
                                    Год выпуска <span>{car.year}</span>
                                </div>
                                <div className="car_millage">
                                    Пробег <span>{car.millage}</span>
                                </div>
                                <div className="car_type">
                                    Кузов <span>{TYPE_CHOICES[car.type]}</span>
                                </div>
                                <div className="car_type">
                                    Цвет <span style={{ backgroundColor: `#${car.color.hex_value}`, color: 'white', padding: '3px 5px' }}>{car.color.name}</span>
                                </div>
                                <div className="gear_oil">
                                    Двигатель <span>{car.engine} / {FUEL_CHOICES[car.fuel]}</span>
                                </div>
                                <div className="car_box1">
                                    Коробка <span>{GEAR_CHOICES[car.gear]}</span>
                                </div>
                                <div className="car_privod">
                                    Привод <span>{DRIVE_CHOICES[car.drive]}</span>
                                </div>
                                <div className="car_rudder">
                                    Руль <span>{RUDDER_CHOICES[car.rudder]}</span>
                                </div>
                                <div className="car_state">
                                    Состояние <span>{STATE_CHOICES[car.state]}</span>
                                </div>
                                <div className="car_rudder">
                                    Таможня <span>{car.customs
                                        ? <span>Растоможен</span>
                                        : <span>Не растоможен</span>}</span>
                                </div>
                                <div className="car_exchange">
                                    Обмен <span>{EXCHANGE_CHOICES[car.exchange]}</span>
                                </div>
                                <div className="car_in_stock">
                                    Наличие <span>{IN_STOCK_CHOICES[car.in_stock]}</span>
                                </div>
                                <div className="region_city">
                                    Регион <span>{car.region.name}, {car.city.name}</span>
                                </div>
                                <div className="region_city">
                                    Учет <span>{car.registration.name}</span>
                                </div>
                                <div className="region_city">
                                    Продавец <span>{car.user.first_name}</span>
                                </div>
                            </div>
                            <div className="car_col1">
                                <div className="car_imgs">
                                    <Swiper
                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        spaceBetween={1}
                                        slidesPerView={1}
                                        pagination={{ clickable: true }}
                                        onSlideChange={() => console.log('slide change')}
                                        onSwiper={(swiper) => console.log(swiper)}
                                    >
                                        {
                                            car.images.map(item => (
                                                <SwiperSlide><img key={item.id} src={item.image} alt="" /></SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </div>
                                <div className="car_co1">
                                    <div className="car_year">
                                        Год выпуска <span>{car.year}</span>
                                    </div>
                                    <div className="car_millage">
                                        Пробег <span>{car.millage}</span>
                                    </div>
                                    <div className="car_type">
                                        Кузов <span>{TYPE_CHOICES[car.type]}</span>
                                    </div>
                                    <div className="car_type">
                                        Цвет <span style={{ backgroundColor: `#${car.color.hex_value}`, color: 'white', padding: '3px 5px' }}>{car.color.name}</span>
                                    </div>
                                    <div className="gear_oil">
                                        Двигатель <span>{car.engine} / {FUEL_CHOICES[car.fuel]}</span>
                                    </div>
                                    <div className="car_box1">
                                        Коробка <span>{GEAR_CHOICES[car.gear]}</span>
                                    </div>
                                    <div className="car_privod">
                                        Привод <span>{DRIVE_CHOICES[car.drive]}</span>
                                    </div>
                                    <div className="car_rudder">
                                        Руль <span>{RUDDER_CHOICES[car.rudder]}</span>
                                    </div>
                                    <div className="car_state">
                                        Состояние <span>{STATE_CHOICES[car.state]}</span>
                                    </div>
                                    <div className="car_rudder">
                                        Таможня <span>{car.customs
                                            ? <span>Растоможен</span>
                                            : <span>Не растоможен</span>}</span>
                                    </div>
                                    <div className="car_exchange">
                                        Обмен <span>{EXCHANGE_CHOICES[car.exchange]}</span>
                                    </div>
                                    <div className="car_in_stock">
                                        Наличие <span>{IN_STOCK_CHOICES[car.in_stock]}</span>
                                    </div>
                                    <div className="region_city">
                                        Регион <span>{car.region.name}, {car.city.name}</span>
                                    </div>
                                    <div className="region_city">
                                        Учет <span>{car.registration.name}</span>
                                    </div>
                                    <div className="region_city">
                                        Продавец <span>{car.user.first_name}</span>
                                    </div>
                                </div>
                                <div className="commet">Комментарий продавца</div>
                                <div dangerouslySetInnerHTML={{ __html: car.content }} />
                                <div className="commet">Комплектация</div>
                                <div className="commet1">
                                    Внешний вид
                                </div>
                                <div className="commet_grid">
                                    {
                                        car.look_likes.map(item => (
                                            <div className="item_commet">{item.name}</div>
                                        ))
                                    }
                                </div>
                                <div className="commet1">
                                    Салон
                                </div>
                                <div className="commet_grid">
                                    {
                                        car.interiors.map(item => (
                                            <div className="item_commet">{item.name}</div>
                                        ))
                                    }
                                </div>
                                <div className="commet1">
                                    Безопасность
                                </div>
                                <div className="commet_grid">
                                    {
                                        car.securities.map(item => (
                                            <div className="item_commet">{item.name}</div>
                                        ))
                                    }
                                </div>
                                <div className="commet1">
                                    Опции
                                </div>
                                <div className="commet_grid">
                                    {
                                        car.options.map(item => (
                                            <div className="item_commet">{item.name}</div>
                                        ))
                                    }
                                </div>
                                <div className="two_btn">
                                    {
                                        user.id == car.user.id
                                            ?
                                            <PrimaryLinkBtn to={`/update_car/${car.id}`} className="update_btn">
                                                Изменить
                                            </PrimaryLinkBtn>
                                            :
                                            ''
                                    }
                                    {
                                        user.id == car.user.id
                                            ?
                                            <div onClick={deleteCar} className="update_btn delete_btn">
                                                Удалить
                                            </div>
                                            :
                                            ''
                                    }
                                </div>
                            </div>
                        </div>

                }

            </div>
        </div>
    );
};

export default DetailCarPage;