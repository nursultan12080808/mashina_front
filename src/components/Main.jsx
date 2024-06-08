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
import Nav from './Nav';
const Main = () => {

    const [cars, setCars] = useState([])
    const [cars1, setCars1] = useState([])

    let [loveCar, setLoveCar] = useState([])

    const [marks, setMarks] = useState([])
    const [isFetching, setFetching] = useState(true)

    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);

    const [modelNav, setModelNav] = useState(false)

    const [millage, setMillage] = useState(false)

    const [cars2, setCars2] = useState([])

    const [modelDisabled, setModelDisabled] = useState(true);

    let dataFromLocalStorage = localStorage.getItem('loveCar');
    dataFromLocalStorage = JSON.parse(dataFromLocalStorage);
    loveCar = dataFromLocalStorage

    const [trueToken, setTrueToken] = useState(false)

    const [valueCity, setValueCity] = useState(null)
    const [cytiesDisabled, setCytiesDisabled] = useState(true)
    const [region, setRegion] = useState([])
    const [cities, setCyties] = useState([])
    const [citiesSelector, setCytiesSelector] = useState([])
    const [modelsSelectSeletor, setModelsSelectSelector] = useState([])
    const [valueMadel, setValueMadel] = useState(null)
    const [tru1, setTru1] = useState(true)
    const [modelsSelect, setModelsSelect] = useState([])
    const [valueGeneric, setValueGeneric] = useState(null)
    const [generat, setGenerat] = useState([])
    const [generatSelect, setGeneratSelect] = useState([])
    const [generationsDisabled, setGenerationsDisabled] = useState(true)

    async function fetchData(e) {
        e.preventDefault()
        console.log(123);
        let rangeInp = document.getElementsByName('range')
        let markaInp = document.getElementsByName('marka')
        let madelInp = document.getElementsByName('madel')
        let generatInp = document.getElementsByName('generic')
        let regionInp = document.getElementsByName('region')
        let cityInp = document.getElementsByName('city')
        let typeInp = document.getElementsByName('type')
        let gearInp = document.getElementsByName('gear')
        let driveInp = document.getElementsByName('drive')
        let rudderInp = document.getElementsByName('rudder')
        let stateInp = document.getElementsByName('state')
        let fuelInp = document.getElementsByName('fuel')
        let exchangeInp = document.getElementsByName('exchange')
        let inStockInp = document.getElementsByName('inStock')

        markaInp = markaInp[0] ? markaInp[0].value : "";
        madelInp = madelInp[0] ? madelInp[0].value : "";
        generatInp = generatInp[0] ? generatInp[0].value : "";
        regionInp = regionInp[0] ? regionInp[0].value : "";
        cityInp = cityInp[0] ? cityInp[0].value : "";
        typeInp = typeInp[0] ? typeInp[0].value : "";
        gearInp = gearInp[0] ? gearInp[0].value : "";
        driveInp = driveInp[0] ? driveInp[0].value : "";
        rudderInp = rudderInp[0] ? rudderInp[0].value : "";
        stateInp = stateInp[0] ? stateInp[0].value : "";
        fuelInp = fuelInp[0] ? fuelInp[0].value : "";
        exchangeInp = exchangeInp[0] ? exchangeInp[0].value : "";
        inStockInp = inStockInp[0] ? inStockInp[0].value : "";
        const value11 = value1 ? value1.replace(/\s/g, '') : ""
        const value22 = value2 ? value2.replace(/\s/g, '') : ""
        try {
            console.log(value11, value22);
        const params = `?madel=${madelInp}&generation=${generatInp}&region=${regionInp}&city=${cityInp}&type=${typeInp}&gear=${gearInp}&drive=${driveInp}&rudder=${rudderInp}&state=${stateInp}&fuel=${fuelInp}&exchange=${exchangeInp}&in_stock=${inStockInp}&price_from=${value11}&price_to=${value22}`;
            console.log(params);

            const response = await fetch(`${BASE_URL}/api/v1/cars/${params}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            let data_mark = data.results
            if (markaInp !== '' && markaInp !== 'null'){
                data_mark = data_mark.filter(item => item.madel.marka.id == markaInp)
            }
            setCars1(data_mark)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleRange1Change = (e) => {
        setValue1((e[0] * 3000000).toLocaleString())
        setValue2((e[1] * 3000000).toLocaleString())
    };


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
        'NO_EXCHANGE': 'обмен не предлагать',
        'EXCHANGE_TO_IMMOVABLES': 'обмен на недвижимость',
        'ONLY_EXCHANGE': 'только обмен',
    };
    const IN_STOCK_CHOICES = {
        'IN_STOCK': 'в наличии',
        'TO_ORDER': 'на заказ',
        'IN_TRANSIT': 'в пути',
    };
    const gearSelect = [
        {
            label: 'другое',
            value: '',
        },
        {
            label: 'механика',
            value: 'MANUAL'
        },
        {
            label: 'автомат',
            value: 'AUTOMATIC'
        },
        {
            label: 'вариатор',
            value: 'CVT'
        },
        {
            label: 'робот',
            value: 'ROBOT'
        },
    ]
    const typeSelect = [
        {
            label: 'другое',
            value: '',
        },
        {
            label: 'седан',
            value: 'SEDAN'
        },
        {
            label: 'хэтчбек',
            value: 'HATCHBACK'
        },
        {
            label: 'купе',
            value: 'COUPE'
        },
        {
            label: 'кабриолет',
            value: 'CONVERTIBLE'
        },
        {
            label: 'внедорожник',
            value: 'SUV'
        },
        {
            label: 'грузовик',
            value: 'TRUCK'
        },
        {
            label: 'фургон',
            value: 'VAN'
        }, {
            label: 'минивэн',
            value: 'MINIVAN'
        },
        {
            label: 'спортивный автомобиль',
            value: 'SPORTS_CAR'
        },

    ]
    const driveSelect = [
        {
            label: 'другое',
            value: '',
        },
        {
            label: 'Задний',
            value: 'REAR_WHEEL_DRIVE'
        },
        {
            label: 'передний',
            value: 'FRONT_WHEEL_DRIVE'
        },
        {
            label: 'полный',
            value: 'ALL_WHEEL_DRIVE'
        },
    ]
    const ruuderSelect = [
        {
            label: 'Любой',
            value: ''
        },
        {
            label: 'справа',
            value: 'RIGHT'
        },
        {
            label: 'слева',
            value: 'LEFT'
        }
    ]
    const stateSeletc = [
        {
            label: 'другое',
            value: '',
        },
        {
            value: 'GOOD',
            label: 'хорошее',
        },
        {
            value: 'PERFECT',
            label: 'идеальное',
        },
        {
            value: 'EMERGENCY',
            label: 'аварийное / не на ходу',
        },
        {
            value: 'NEW',
            label: 'новое',
        }
    ]
    const fuelSelect = [
        {
            label: 'другое',
            value: '',
        },
        {
            label: 'бензин',
            value: 'GASOLINE',
        },
        {
            value: 'DIESEL',
            label: 'дизель',
        },
        {
            value: 'ELECTRIC',
            label: 'электричество',
        },
        {
            value: 'GAS',
            label: 'газ',
        },
        {
            value: 'GAS_GASOLINE',
            label: 'газ / бензин',
        },
        {
            value: 'GIBRID',
            label: 'гибрид',
        }

    ]
    const exchangeSelect = [
        {
            label: 'другое',
            value: '',
        },
        {
            label: 'рассмотрю варианты',
            value: 'LOOK_VARIANT',
        },
        {
            value: 'MONEY_TO_SURCHARGE',
            label: 'с доплатой покупателя',
        },
        {
            value: 'MONEY_TO_SELLER',
            label: 'с доплатой продавца',
        },
        {
            value: 'KEY_TO_KEY',
            label: 'ключ на ключ',
        },
        {
            value: 'NO_EXCHANGE',
            label: 'обмен не предлагать',
        },
        {
            value: 'EXCHANGE_TO_IMMOVABLES',
            label: 'обмен на недвижимость',
        },
        {
            label: 'ONLY_EXCHANGE',
            value: 'только обмен',
        }
    ]
    const inSctockSelect = [
        {
            label: 'другое',
            value: '',
        },
        {
            value: 'IN_STOCK',
            label: 'в наличии',
        },
        {
            value: 'TO_ORDER',
            label: 'на заказ',
        },
        {
            value: 'IN_TRANSIT',
            label: 'в пути',
        }
    ]

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/tokens/`).then(res => {
            return res.json()
        }).then(res => {
            const token = localStorage.getItem('token')
            setTrueToken(res.find(item => item.key == JSON.parse(token)["token"]))
        })
    }, [])
    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/cyties/`).then(res => {
            return res.json()
        }).then(res => {
            setCyties(res)
        })
    }, [])
    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/regions/`).then(res => {
            return res.json()
        }).then(res => {
            const arr1 = [{
                label: 'другое',
                value: 'null'
            },]
            for (let item in res) {
                arr1.push({
                    label: res[item].name,
                    value: res[item].id,
                })
            }
            setRegion(arr1)
        })
    }, [])
    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/cars/`).then(res => {
            return res.json()
        }
        ).then(res => {
            setCars(res)
            console.log(res);
            setCars1(res.results)
        }).finally(() => setFetching(false))
    }, [])
    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/generations/`).then(res => {
            return res.json()
        }
        ).then(res => {
            setGenerat(res)
        })
    }, [])
    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/nopagin/`).then(res => {
            return res.json()
        }
        ).then(res => {
            setCars2(res)
        })
    }, [])
    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/models/`).then(res => {
            return res.json()
        }
        ).then(res => {
            setModelsSelectSelector(res)
        })
    }, [])
    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/marks/`).then(res => {
            return res.json()
        }
        ).then(res => {
            const arr1 = [{
                label: 'другое',
                value: 'null'
            },]
            for (let item in res) {
                arr1.push({
                    label: res[item].name,
                    value: res[item].id,
                })
            }
            setMarks(arr1)
        })
    }, [])

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

    const def_cyties = (e) => {
        let gen = []
        for (let item in cities) {
            if (cities[item].region.id == e.value) {
                setCytiesDisabled(false)
                gen.push({
                    value: cities[item].id,
                    label: cities[item].name,
                })
            }
            console.log(gen);
        }
        setCytiesSelector(gen)
        setValueCity('')
    }

    const city = (e) => {
        setValueCity(e)
    }

    const madelFunc = (e) => {
        let gen = []
        console.log(modelsSelectSeletor);
        for (let item in modelsSelectSeletor) {
            if (modelsSelectSeletor[item].marka.id == e.value) {
                setModelDisabled(false)
                gen.push({
                    value: modelsSelectSeletor[item].id,
                    label: modelsSelectSeletor[item].name,
                })
            }
        }
        setModelsSelect(gen)
        setValueMadel('')
        setValueGeneric('')
    }

    const generatFunc = (e) => {
        setValueMadel(e)
        let gen = []
        for (let item in generat) {
            if (generat[item].madel.id == e.value) {
                setGenerationsDisabled(false)
                gen.push({
                    value: generat[item].id,
                    label: generat[item].name,
                })
            }
        }
        setGeneratSelect(gen)
        setValueGeneric('')
    }

    const generic = (e) => {
        setValueGeneric(e)
    }

    const changeMillage1 = () => {
        setCars1(cars.results)
        setTru1(true)
    }
    const changeMillage2 = () => {
        setTru1(false)
        let car = cars2.filter(item => item.millage > 0)
        setCars1(car)
    }

    const openNavModel = () => {
        setModelNav(!modelNav)
    }

    const filterSubmit = (e) => {
        e.preventDefault()
    }
    const nextCars = () => {
        fetch(`${cars["next"]}`).then(res => {
            return res.json()
        }).then(res => {
            setCars(res)
            setCars1(res.results)
        })
    }
    const previousCars = () => {
        fetch(`${cars["previous"]}`).then(res => {
            return res.json()
        }).then(res => {
            setCars(res)
            setCars1(res.results)
        })
    }
    return (
        <div>
            <header>
                <div>
                    <nav>
                        <div className="container_">
                            <div className="row_nav1">
                                <div className="nav1_col1">
                                    <PrimaryLinkBtn onClick={changeMillage1} to='/' className="nav_select">
                                        Каталог авто
                                    </PrimaryLinkBtn>
                                    <div onClick={changeMillage2} to="/" className="nav_select">
                                        Авто с пробегом
                                    </div>
                                </div>
                                <div className="nav1_col2">
                                    <div className="buttons">
                                        <PrimaryLinkBtn to="favorites/" className='pr'>
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

            </header>
            <main className='container_'>
                {isFetching ?
                    <div className='load'>
                        <img src={Load} alt="" />
                    </div>
                    :
                    <div className="">
                        <div className='Title title123'>Каталог авто</div>
                        <form onSubmit={fetchData} method='GET'>
                            <div className="marks_filter">
                                <div className="filter_model">
                                    <div className="filter_title">
                                        Быстрый подбор авто
                                    </div>
                                    <div className="range">
                                        <div>
                                            <div className="price_fil">
                                                <span className='price_filter'>Цена</span>
                                                <span className='price_filter-right'>{value1} - {value2}⃀</span>
                                            </div>
                                            <Slider onChange={handleRange1Change} className='range' range min={0} max={9} style={{ width: '100%' }} />
                                        </div>
                                        <div className="range_size">
                                            <div className="range_size-item">
                                                {/* <div className="palka_range-item">|</div> */}
                                                0,0 </div>
                                            <div className="range_size-item">
                                                {/* <div className="palka_range-item">|</div> */}
                                                3,0</div>
                                            <div className="range_size-item">
                                                {/* <div className="palka_range-item">|</div> */}
                                                6,0</div>
                                            <div className="range_size-item">
                                                {/* <div className="palka_range-item">|</div> */}
                                                9,0</div>
                                            <div className="range_size-item">
                                                {/* <div className="palka_range-item">|</div> */}
                                                12</div>
                                            <div className="range_size-item">
                                                {/* <div className="palka_range-item">|</div> */}
                                                15</div>
                                            <div className="range_size-item">
                                                {/* <div className="palka_range-item">|</div> */}
                                                18</div>
                                            <div className="range_size-item">
                                                {/* <div className="palka_range-item">|</div> */}
                                                21</div>
                                            <div className="range_size-item">
                                                {/* <div className="palka_range-item">|</div> */}
                                                24</div>
                                            <div className="range_size-item">
                                                {/* <div className="palka_range-item">|</div> */}
                                                27
                                            </div>
                                        </div>
                                    </div>
                                    <div className="selecter">
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                placeholder="Марка"
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                isSearchable={false}
                                                name="marka"
                                                onChange={madelFunc}
                                                options={marks}
                                            />
                                        </div>
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                default={''}
                                                value={valueMadel}
                                                isDisabled={modelDisabled}
                                                placeholder="Модель"
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                isSearchable={false}
                                                name="madel"
                                                onChange={generatFunc}
                                                options={modelsSelect}
                                            />
                                        </div>
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                default={''}
                                                onChange={generic}
                                                value={valueGeneric}
                                                placeholder="Поколение"
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                isDisabled={generationsDisabled}
                                                isSearchable={false}
                                                name="generic"
                                                options={generatSelect}
                                            />
                                        </div>
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                default={''}
                                                placeholder="Регион"
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                onChange={def_cyties}
                                                isSearchable={false}
                                                name="region"
                                                options={region}
                                            />
                                        </div>
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                default={''}
                                                value={valueCity}
                                                placeholder="Город"
                                                onChange={city}
                                                isDisabled={cytiesDisabled}
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                isSearchable={false}
                                                name="city"
                                                options={citiesSelector}
                                            />
                                        </div>
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                default={''}
                                                placeholder="Кузов"
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                isSearchable={false}
                                                name="type"
                                                options={typeSelect}
                                            />
                                        </div>
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                default={''}
                                                placeholder="Коробка"
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                isSearchable={false}
                                                name="gear"
                                                options={gearSelect}
                                            />
                                        </div>
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                default={''}
                                                placeholder="Привод"
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                isSearchable={false}
                                                name="drive"
                                                options={driveSelect}
                                            />
                                        </div>
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                placeholder="Руль"
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                isSearchable={false}
                                                name="rudder"
                                                options={ruuderSelect}
                                            />
                                        </div>
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                default={''}
                                                placeholder="Состояние"
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                isSearchable={false}
                                                name="state"
                                                options={stateSeletc}
                                            />
                                        </div>
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                default={''}
                                                placeholder="Топливо"
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                isSearchable={false}
                                                name="fuel"
                                                options={fuelSelect}
                                            />
                                        </div>
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                default={''}
                                                placeholder="Обмен"
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                isSearchable={false}
                                                name="exchange"
                                                options={exchangeSelect}
                                            />
                                        </div>
                                        <div className="select">
                                            <Select
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: 'pink',
                                                        primary: 'red',
                                                    },
                                                })}
                                                default={''}
                                                placeholder="В наличии"
                                                className="basic-single custom_selector"
                                                classNamePrefix="select"
                                                isSearchable={false}
                                                name="inStock"
                                                options={inSctockSelect}
                                            />
                                        </div>
                                    </div>
                                    <div className="red_butt">
                                        <button type="submit">Фильтр</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="row_car">
                            {
                                cars1.map(car => (
                                    <div className="car_item" key={car.id}>
                                        <div className="car_images">
                                            <Swiper
                                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                spaceBetween={0}
                                                slidesPerView={1}
                                                onSlideChange={() => console.log('slide change')}
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
                        </div>
                        <div className="paginator_div">
                            {
                                cars["next"] && tru1
                                ? 
                                <a className='paginator_block' onClick={nextCars}>{'>'}</a>
                                :
                                ''
                            }
                            {
                                cars["previous"] && tru1
                                ? 
                                <a className='paginator_block' onClick={previousCars}>{'<'}</a>
                                :
                                ''
                            }
                        </div>
                    </div>
                }
            </main>
        </div>
    );
};

export default Main;