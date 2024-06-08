import React from 'react';
import { useParams, useNavigate, Link, json } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import BASE_URL from '../constance/BaseUrl';
import '../assets/css/style.css'

const UpdateCar = () => {
    const { id } = useParams()
    const [regionDisabled, setRegionDisabled] = useState(true)
    const [cityDisabled, setCityDisabled] = useState(true)
    const [genericDisabled, setGenericDisabled] = useState(true)
    const [error, setError] = useState('')
    const user = JSON.parse(localStorage.getItem('token'))
    const [fetching, setFetching] = useState(true)
    const [madels, setMadels] = useState([])
    const [generic, setGeneric] = useState([])
    const [color, setColor] = useState([])
    const [country, setCountry] = useState([])
    const [region, setRegion] = useState([])
    const [city, setCity] = useState([])
    const [look_likes, setLook_likes] = useState([])
    const [interiors, setInteriors] = useState([])
    const [securities, setCecurities] = useState([])
    const [options, setOptions] = useState([])
    const [carImage, setCarImage] = useState([])
    let [images, setImages] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    const [genericSelect, setGenericSelect] = useState([])
    const [regionSelect, setRegionSelect] = useState([])
    const [citySelect, setCitySelect] = useState([])
    const [car, setCar] = useState({})
    const [carImage1, setcarImage1] = useState([])

    const gearSelect = [
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
            label: 'только обмен',
            value: 'ONLY_EXCHANGE',
        }
    ]
    const inSctockSelect = [
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
        fetch(`${BASE_URL}/api/v1/cars/${id}`).then(res => {
            return res.json()
        }).then(res => {
            setCar(res)
            setcarImage1(res.images)
            setYear(res.year)
            setMillage(res.millage)
            setEngine(res.engine)
            setContent1(res.content)
            setPrice(res.price)
            setSelectedLookLikes(res.look_likes.map(item => item.id))
            setselectedInterriors(res.interiors.map(item => item.id))
            setselectedOptions(res.options.map(item => item.id))
            setselectedSecurities(res.securities.map(item => item.id))
            console.log(res);
        }).finally(setFetching(false))
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/models/`).then(res => {
            return res.json()
        }).then(res => {
            setMadels(res)
            console.log(res);
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/generations/`).then(res => {
            return res.json()
        }).then(res => {
            setGeneric(res)
            setGenericSelect(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/colors/`).then(res => {
            return res.json()
        }).then(res => {
            setColor(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/countries/`).then(res => {
            return res.json()
        }).then(res => {
            setCountry(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/regions/`).then(res => {
            return res.json()
        }).then(res => {
            setRegion(res)
            setRegionSelect(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/cyties/`).then(res => {
            return res.json()
        }).then(res => {
            setCity(res)
            setCitySelect(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/look_likes/`).then(res => {
            return res.json()
        }).then(res => {
            setLook_likes(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/interiors/`).then(res => {
            return res.json()
        }).then(res => {
            setInteriors(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/securities/`).then(res => {
            return res.json()
        }).then(res => {
            setCecurities(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/options/`).then(res => {
            return res.json()
        }).then(res => {
            setOptions(res)
        })
    }, [])
    const [inputs, setInputs] = useState([]);
    const addInput = () => {
        const newInput = { id: inputs.length + 1 };
        setInputs([...inputs, newInput]);
    };
    let [selectedLookLikes, setSelectedLookLikes] = useState([])
    const handleLookLikesChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        setSelectedLookLikes(selectedOptions);
    }
    let [selectedInterriors, setselectedInterriors] = useState([]);
    const handleselectedInterriors = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        setselectedInterriors(selectedOptions);
    };
    let [selectedSecurities, setselectedSecurities] = useState([]);
    const handleselectedSecurities = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        setselectedSecurities(selectedOptions);
    };
    let [selectedOptions1, setselectedOptions] = useState([]);
    const handleselectedOptions = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        setselectedOptions(selectedOptions);
    };


    const [millage, setMillage] = useState(0);

    const handleMillageChange = (event) => {
        setMillage(event.target.value);
    };

    const [year, setYear] = useState(0);

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const [engine, setEngine] = useState(0);

    const handleEngineChange = (event) => {
        setEngine(event.target.value);
    };

    const [content1, setContent1] = useState('');

    const handleContentChange = (event) => {
        setContent1(event.target.value);
    };

    const [price, setPrice] = useState(0)

    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const madel = document.getElementsByName('madels')
        const generation = document.getElementsByName('generics')
        const year = document.getElementsByName('year')
        const millage = document.getElementsByName('millage')
        const type = document.getElementsByName('type')
        const colors = document.getElementsByName('colors')
        const engine = document.getElementsByName('engine')
        const fuel = document.getElementsByName('fuel')
        const gear = document.getElementsByName('gear')
        const drive = document.getElementsByName('drive')
        const rudder = document.getElementsByName('rudder')
        const state = document.getElementsByName('state')
        const customs = document.getElementsByName('customs')
        const excnhage = document.getElementsByName('excnhage')
        const registration = document.getElementsByName('country')
        const in_stock = document.getElementsByName('in_stock')
        const region = document.getElementsByName('region')
        const city = document.getElementsByName('city')
        const content = document.getElementsByName('content')
        const price = document.getElementsByName('price')

        if (images[0]) {
            let carData = {
                madel: madel[0].value,
                generation: generation[0].value,
                year: year[0].value,
                millage: millage[0].value,
                type: type[0].value,
                color: colors[0].value,
                engine: engine[0].value,
                fuel: fuel[0].value,
                gear: gear[0].value,
                drive: drive[0].value,
                rudder: rudder[0].value,
                state: state[0].value,
                customs: customs[0].checked,
                exchange: excnhage[0].value,
                in_stock: in_stock[0].value,
                registration: registration[0].value,
                region: region[0].value,
                city: city[0].value,
                user: user["id"],
                content: content[0].value,
                price: price[0].value,
                look_likes: selectedLookLikes,
                interiors: selectedInterriors,
                securities: selectedSecurities,
                options: selectedOptions1,
                images: images,
            }
            const headers = {
                'Authorization': `Token ${user["token"]}`
            };
            try {
                const response = await axios.patch(`${BASE_URL}/api/v1/cars/${id}/`, carData, { headers });
                setLoggedIn(true)
            } catch (error) {
                setError(error)
            }
        }else{
            let carData = {
                madel: madel[0].value,
                generation: generation[0].value,
                year: year[0].value,
                millage: millage[0].value,
                type: type[0].value,
                color: colors[0].value,
                engine: engine[0].value,
                fuel: fuel[0].value,
                gear: gear[0].value,
                drive: drive[0].value,
                rudder: rudder[0].value,
                state: state[0].value,
                customs: customs[0].checked,
                exchange: excnhage[0].value,
                in_stock: in_stock[0].value,
                registration: registration[0].value,
                region: region[0].value,
                city: city[0].value,
                user: user["id"],
                content: content[0].value,
                price: price[0].value,
                look_likes: selectedLookLikes,
                interiors: selectedInterriors,
                securities: selectedSecurities,
                options: selectedOptions1,
            }
            const headers = {
                'Authorization': `Token ${user["token"]}`
            };
            try {
                const response = await axios.patch(`${BASE_URL}/api/v1/cars/${id}/`, carData, { headers });
                setLoggedIn(true)
            } catch (error) {
                setError(error)
            }
        }
    }

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
        setImages([...images, loadEvent.target.result])
    };

    const func = (e) => {
        reader.readAsDataURL(e.target.files[0]);
    }

    if (loggedIn) {
        return <Navigate to="/" />;
    }

    const genericChange = (e) => {
        setGenericSelect(generic.filter(item => {
            return item.madel.id == e.target.value
        }))
        setGenericDisabled(false)
    }

    const countryChange = (e) => {
        setRegionSelect(region.filter(item => {
            return item.country.id == e.target.value
        }))
        setRegionDisabled(false)
    }
    const regionChange = (e) => {
        setCitySelect(city.filter(item => {
            return item.region.id == e.target.value
        }))
        setCityDisabled(false)
    }
    const deleteImg = (id) => {
        fetch(`${BASE_URL}/api/v1/images/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${user["token"]}`
            },
        })
        setcarImage1(carImage1.filter(item => item.id != id))
    }
    return (
        <div className='create_body_prodile'>
            <div className="container_">
                {
                    fetching
                        ? <div>loading</div>
                        :
                        <form action="" method='post' className='create_row' onSubmit={handleSubmit}>
                            <div className="create_div">
                                <label htmlFor="select">Модель: </label>
                                <select name="madels" onChange={genericChange} required>
                                    {
                                        madels.map(item => (
                                            item == car.madel
                                                ?
                                                <option value={item.id} selected>{item.marka.name.toUpperCase()} {item.name}</option>
                                                :
                                                <option value={item.id}>{item.marka.name.toUpperCase()} {item.name}</option>

                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Поколение: </label>
                                <select name="generics" id="" required>
                                    {
                                        genericSelect.map(item => (
                                            item == car.generation
                                                ?
                                                <option value={item.id} selected>{item.name}</option>
                                                :
                                                <option value={item.id}>{item.name}</option>

                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Год: </label>
                                <input type="number" min={1} name="year" id="" value={year} placeholder='Год выпуска' onChange={handleYearChange} required />
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Пробег: </label>
                                <input type="number" min={0} name="millage" id="" value={millage} onChange={handleMillageChange} placeholder='Пробег' required />
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Кузов: </label>
                                <select name="type" id="" required>
                                    {
                                        typeSelect.map(item => (
                                            item.value == car.type
                                                ?
                                                <option value={item.value} selected>{item.label}</option>
                                                :
                                                <option value={item.value}>{item.label}</option>

                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Цвет: </label>
                                <select name="colors" id="" required>
                                    {
                                        color.map(item => (
                                            item == car.color
                                                ?
                                                <option value={item.id} selected>{item.name}</option>
                                                :
                                                <option value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Обьем: </label>
                                <input type="number" value={engine} max={7.4} min={0.3} onChange={handleEngineChange} step="0.01" name="engine" id="" placeholder='Объем' required />
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Топливо: </label>
                                <select name="fuel" id="" required>

                                    {
                                        fuelSelect.map(item => (
                                            item.value == car.fuel
                                                ?
                                                <option value={item.value} selected>{item.label}</option>
                                                :
                                                <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Коробка: </label>
                                <select name="gear" id="" required>
                                    {
                                        gearSelect.map(item => (
                                            item.value == car.gear
                                                ?
                                                <option value={item.value} selected>{item.label}</option>
                                                :
                                                <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Привод: </label>
                                <select name="drive" id="" required>

                                    {
                                        driveSelect.map(item => (
                                            item.value == car.drive
                                                ?
                                                <option value={item.value} selected>{item.label}</option>
                                                :
                                                <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Руль: </label>
                                <select name="rudder" id="" required>

                                    {
                                        ruuderSelect.map(item => (
                                            item.value == car.rudder
                                                ?
                                                <option value={item.value} selected>{item.label}</option>
                                                :
                                                <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Состояние: </label>
                                <select name="state" id="" required>
                                    {
                                        stateSeletc.map(item => (
                                            item.value == car.state
                                                ?
                                                <option value={item.value} selected>{item.label}</option>
                                                :
                                                <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div1">
                                <label htmlFor="input">Растоможен: </label>
                                {
                                    car.customs
                                        ?
                                        <input type="checkbox" name='customs' checked />
                                        :
                                        <input type="checkbox" name='customs' />
                                }
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Обмен: </label>

                                <select name="excnhage" id="" required>
                                    {
                                        exchangeSelect.map(item => (
                                            item.value == car.exchange
                                                ?
                                                <option value={item.value} selected>{item.label}</option>
                                                :
                                                <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Наличия: </label>
                                <select name="in_stock" id="" required>
                                    {
                                        inSctockSelect.map(item => (
                                            item.value == car.in_stock
                                                ?
                                                <option value={item.value} selected>{item.label}</option>
                                                :
                                                <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Страна: </label>
                                <select name="country" id="" required onChange={countryChange}>
                                    {
                                        country.map(item => (
                                            item == car.registration
                                                ?
                                                <option value={item.id} selected>{item.name}</option>
                                                :
                                                <option value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Регион: </label>
                                <select onChange={regionChange} name="region" id="" required>
                                    {
                                        regionSelect.map(item => (
                                            item == car.region
                                                ?
                                                <option value={item.id} selected>{item.name}</option>
                                                :
                                                <option value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Город: </label>
                                <select name="city" id="" required>
                                    {
                                        citySelect.map(item => (
                                            item == car.city
                                                ?
                                                <option value={item.id} selected>{item.name}</option>
                                                :
                                                <option value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Описание: </label>
                                <textarea name="content" value={content1} onChange={handleContentChange} id="" placeholder='Комментарий от продовца' cols="30" rows="10" required></textarea>
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Цена: </label>
                                <input value={price} max={1000000000} onChange={handlePriceChange} type="number" placeholder='цена машины' name="price" min={1} id="" required />
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Вид: </label>
                                <select name="look_likes" id="" onChange={handleLookLikesChange} multiple>
                                    {
                                        car.look_likes
                                            ? look_likes.map(item => (
                                                Boolean(car.look_likes.find(item1 => {
                                                    if (item1.id == item.id) {
                                                        return true
                                                    }
                                                }))
                                                    ? <option value={item.id} selected>{item.name}</option>
                                                    : <option value={item.id}>{item.name}</option>
                                            ))
                                            : ''
                                    }
                                </select></div>
                            <div className="create_div">
                                <label htmlFor="input">Салон: </label>
                                <select name="interiors" id="" onChange={handleselectedInterriors} multiple>
                                    {
                                        car.interiors
                                            ? interiors.map(item => (
                                                Boolean(car.interiors.find(item1 => {
                                                    if (item1.id == item.id) {
                                                        return true
                                                    }
                                                }))
                                                    ? <option value={item.id} selected>{item.name}</option>
                                                    : <option value={item.id}>{item.name}</option>
                                            ))
                                            : ''
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Безопасность: </label>
                                <select name="securities" id="" onChange={handleselectedSecurities} multiple>
                                    {
                                        car.securities
                                            ? securities.map(item => (
                                                Boolean(car.securities.find(item1 => {
                                                    if (item1.id == item.id) {
                                                        return item
                                                    }
                                                }))
                                                    ? <option value={item.id} selected>{item.name}</option>
                                                    : <option value={item.id}>{item.name}</option>
                                            ))
                                            : ''
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Опции: </label>
                                <select name="options" id="" multiple onChange={handleselectedOptions} >
                                    {
                                        car.options
                                            ? options.map(item => (
                                                Boolean(car.options.find(item1 => {
                                                    if (item1.id == item.id) {
                                                        return item
                                                    }
                                                }))
                                                    ? <option value={item.id} selected>{item.name}</option>
                                                    : <option value={item.id}>{item.name}</option>
                                            ))
                                            : ''
                                    }
                                </select>
                            </div>

                            <div className="img_div">
                                {
                                    carImage1
                                        ?
                                        carImage1.map(item => (
                                            <div className="img_flex">
                                                <div className="img_update five">
                                                    <img src={`${item.image}`} alt="" />
                                                </div>
                                                <div className="img_delete-btn ">
                                                    <span onClick={() => deleteImg(item.id)} className="img_del-btn">
                                                        Удалить
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                        :
                                        ''
                                }

                            </div>
                            {
                                carImage1
                                    ?
                                    <div className="create_div">
                                        <label htmlFor="input">Изображение: </label>
                                        <input placeholder='Выберите фото' type="file" name="image_0" accept=".jpg, .jpeg, .png, .svg, .webp" id="" onChange={func} />
                                    </div>
                                    :
                                    <div className="create_div">
                                        <label htmlFor="input">Изображение: </label>
                                        <input placeholder='Выберите фото' type="file" name="image_0" accept=".jpg, .jpeg, .png, .svg, .webp" id="" required onChange={func} />
                                    </div>
                            }
                            {
                                 inputs.map(item => (
                                    <div className="create_div">
                                        <label htmlFor="input">Изображение: </label>
                                        <input placeholder='Выберите фото' type="file" name="image_0" accept=".jpg, .jpeg, .png, .svg, .webp" id="" required onChange={func} />
                                    </div>
                                ))
                            }

                            <div className="add_img" onClick={addInput}>Еще фото</div>
                            <div className="create_div1">
                                <button>Создать</button>
                            </div>
                        </form>
                }
            </div>
        </div>
    );
};

export default UpdateCar;