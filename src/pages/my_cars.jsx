import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaHeart } from "react-icons/fa6";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import BASE_URL from '../constance/BaseUrl'
import Nav from '../components/Nav';
import Load from '../assets/img/7plQ.gif'
import { PrimaryLinkBtn } from '../components/ui/buttons';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../assets/css/style.css'
import '../assets/css/media.css'
import 'rc-slider/assets/index.css';
import '../assets/css/CustomSlider.css';
const My_cars = () => {

    const [cars, setCars] = useState([])

    const [isFetching, setFetching] = useState(true)

    let [loveCar, setLoveCar] = useState([])

    let dataFromLocalStorage = localStorage.getItem('loveCar');
    dataFromLocalStorage = JSON.parse(dataFromLocalStorage);
    loveCar = dataFromLocalStorage

    const [swiper, setSwiper] = useState(null);

    const user = JSON.parse(localStorage.getItem('token'))

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
    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/nopagin/`).then(res => {
            return res.json()
        }
        ).then(res => {
            console.log(res);
            const resultat = res.filter(item => user.id == item.user.id)
            setCars(resultat)
        }).finally(() => setFetching(false))
    }, [])

    return (
        <div>
            <header>
                {
                    <div>
                        <Nav />
                        <nav>
                            <div className="container_">
                                <div className="row_nav1">
                                    <div className="nav1_col1">
                                        <PrimaryLinkBtn to={'/'} className="nav_select">
                                            Каталог авто
                                        </PrimaryLinkBtn>
                                    </div>
                                    <div className="nav1_col2">
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                }
            </header>
            <main className='container_'>
                {isFetching ?
                    <div className='load'>
                        <img src={Load} alt="" />
                    </div>
                    :
                    <div className="">
                        <div className='Title titlE'>Ваши машины</div>
                        <div className="row_car">
                            {
                                cars.map(car => (
                                    <div className="car_item" key={car.id}>
                                        <div className="car_images">
                                            <Swiper
                                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                spaceBetween={0}
                                                slidesPerView={1}
                                                onSlideChange={() => console.log('slide change')}
                                                onSwiper={setSwiper}
                                                pagination={{ clickable: true }}
                                            >
                                                {car.images.map(img => (
                                                    <SwiperSlide className='car_image'>
                                                        <img src={img.image} alt="" />
                                                    </SwiperSlide>
                                                ))}
                                                {
                                                    loveCar.includes(car.id)
                                                        ?
                                                        <div className={`hear_ red font_white`} id={`color${car.id}`}>
                                                            <FaHeart onClick={() => love(car.id)} alt="" />
                                                        </div>
                                                        :
                                                        <div className={`hear_ `} id={`color${car.id}`}>
                                                            <FaHeart onClick={() => love(car.id)} alt="" />
                                                        </div>

                                                }
                                            </Swiper>
                                        </div>
                                        <PrimaryLinkBtn className='item_a' to={`/cars/${car.id}`}>
                                            <div className="car_content">
                                                <div className="car_name">{car.madel.marka.name} {car.madel.name}</div>
                                                <div className="car_box">
                                                    <div className="car_col1">
                                                        <div className="car_title">Год: <span>{car.year}</span></div>
                                                        <div className="car_title p5">Привод: <span>{DRIVE_CHOICES[car.drive]}</span></div>
                                                        <div className="car_title">КПП: <span>{GEAR_CHOICES[car.gear]}</span></div>
                                                    </div>
                                                    <div className="car_col1">
                                                        <div className="car_title">Объем: <span>{car.engine}</span></div>
                                                        <div className="car_title">Кузов: <span>{TYPE_CHOICES[car.type]}</span></div>
                                                        <div className="car_title">Пробег: <span>{car.millage} км</span></div>
                                                    </div>
                                                </div>
                                                <div className="car_price">Цена: {Math.round(car.price).toLocaleString()} ⃀ <span>${Math.round(car.price / 89).toLocaleString()}</span></div>
                                            </div>
                                        </PrimaryLinkBtn>
                                        <PrimaryLinkBtn to={`/cars/${car.id}`} className="car_btn">
                                            Просмотр
                                        </PrimaryLinkBtn>
                                    </div>
                                ))
                            }
                            <div className=""></div>
                            <div className=""></div>
                            <div className=""></div>
                        </div>
                    </div>
                }
            </main>

        </div>
    );
};

export default My_cars;