import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import BASE_URL from '../constance/BaseUrl';
import '../assets/css/style.css'

const CreateCar = () => {
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
        fetch(`${BASE_URL}/api/v1/models/`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            setMadels(res)
        }).finally(setFetching(false))
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/generations/`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            setGeneric(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/colors/`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            setColor(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/countries/`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            setCountry(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/regions/`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            setRegion(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/cyties/`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            setCity(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/look_likes/`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            setLook_likes(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/interiors/`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            setInteriors(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/securities/`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            setCecurities(res)
        })
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/options/`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            setOptions(res)
        })
    }, [])
    const [inputs, setInputs] = useState([]);
    const addInput = () => {
        const newInput = { id: inputs.length + 1 };
        setInputs([...inputs, newInput]);
    };
    const [selectedLookLikes, setSelectedLookLikes] = useState([]);
    const handleLookLikesChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        setSelectedLookLikes(selectedOptions);
    };
    const [selectedInterriors, setselectedInterriors] = useState([]);
    const handleselectedInterriors = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        setselectedInterriors(selectedOptions);
    };
    const [selectedSecurities, setselectedSecurities] = useState([]);
    const handleselectedSecurities = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        setselectedSecurities(selectedOptions);
    };
    const [selectedOptions1, setselectedOptions] = useState([]);
    const handleselectedOptions = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        setselectedOptions(selectedOptions);
    };


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

        if(images[0]){
            console.log(engine[0].value);
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
                const response = await axios.post(`${BASE_URL}/api/v1/cars/`, carData, { headers });
                setLoggedIn(true)
            } catch (error) {
                setError(error.response.data)
                console.log(error.response.data);
            }
        }
    }

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
        setImages([...images , loadEvent.target.result])
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

    return (
        <div className='create_body_prodile'>
            <div className="container_">
                {
                    fetching
                        ? <div>hello</div>
                        :
                        <form action="" method='post' className='create_row' onSubmit={handleSubmit}>
                            <div className="create_div">
                                <label htmlFor="select">Модель: </label>
                                <select name="madels" id="" onChange={genericChange} required>
                                <option value="" disabled selected hidden>Выбрать модель</option>
                                    {
                                        madels.map(item => (
                                            <option value={item.id}>{item.marka.name.toUpperCase()} {item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Поколение: </label>
                                <select disabled={genericDisabled} name="generics" id="" required>
                                <option value="" disabled selected hidden>Выбрать поколение</option>

                                    {
                                        genericSelect.map(item => (
                                            <option value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Год: </label>
                                <input type="number" min={1} name="year" id="" placeholder='Год выпуска' required />
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Пробег: </label>
                                <input type="number" min={0} name="millage" id="" placeholder='Пробег' required />
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Кузов: </label>
                                <select name="type" id="" required>
                                <option value="" disabled selected hidden>Выбрать кузов</option>
                                    {
                                        typeSelect.map(item => (
                                            <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Цвет: </label>
                                <select name="colors" id="" required>
                                <option value="" disabled selected hidden>Выбрать цвет</option>
                                    {
                                        color.map(item => (
                                            <option value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Обьем: </label>
                                <input type="number" step="0.01" min={0.3} max={7.4} name="engine" id="" placeholder='Объем' required />
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Топливо: </label>
                                <select name="fuel" id="" required>
                                <option value="" disabled selected hidden>Выбрать топливо</option>

                                    {
                                        fuelSelect.map(item => (
                                            <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Коробка: </label>
                                <select name="gear" id="" required>
                                <option value="" disabled selected hidden>Выбрать передачу</option>
                                    {
                                        gearSelect.map(item => (
                                            <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Привод: </label>
                                <select name="drive" id="" required>
                                <option value="" disabled selected hidden>Выбрать привод</option>

                                    {
                                        driveSelect.map(item => (
                                            <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Руль: </label>
                                <select name="rudder" id="" required>
                                <option value="" disabled selected hidden>Выбрать сторону</option>

                                    {
                                        ruuderSelect.map(item => (
                                            <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Состояние: </label>
                                <select name="state" id="" required>
                                <option value="" disabled selected hidden>Выбрать состояние</option>
                                    {
                                        stateSeletc.map(item => (
                                            <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div1">
                                <label htmlFor="input">Растоможен: </label>
                                <input type="checkbox" name='customs' />
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Обмен: </label>

                                <select name="excnhage" id="" required>
                                <option value="" disabled selected hidden>Выбрать обмен</option>

                                    {
                                        exchangeSelect.map(item => (
                                            <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Наличия: </label>
                                <select name="in_stock" id="" required>
                                <option value="" disabled selected hidden>Выбрать наличие</option>

                                    {
                                        inSctockSelect.map(item => (
                                            <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Страна: </label>
                                <select name="country" id="" required onChange={countryChange}>
                                <option value="" disabled selected hidden>Выбрать страну</option>

                                    {
                                        country.map(item => (
                                            <option value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Регион: </label>
                                <select disabled={regionDisabled} onChange={regionChange} name="region" id="" required>
                                <option value="" disabled selected hidden>Выбрать регион</option>
                                    {
                                        regionSelect.map(item => (
                                            <option value={item.id}>{item.country.name} {item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Город: </label>
                                <select disabled={cityDisabled} name="city" id="" required>
                                <option value="" disabled selected hidden>Выбрать город</option>

                                    {
                                        citySelect.map(item => (
                                            <option value={item.id}>{item.region.name} {item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="select">Описание: </label>
                                <textarea name="content" id="" placeholder='Комментарий от продовца' cols="30" rows="10" required></textarea>
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Цена: </label>
                                <input type="number" placeholder='цена машины' max={1000000000} name="price" min={1} id="" required />
                            </div>  
                            <div className="create_div">
                                <label htmlFor="input">Вид: </label>
                                <select name="look_likes" id="" onChange={handleLookLikesChange} multiple>
                                    {look_likes.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select></div>
                            <div className="create_div">
                                <label htmlFor="input">Салон: </label>
                                <select name="interiors" id="" onChange={handleselectedInterriors} multiple>
                                    {interiors.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Безопасность: </label>
                                <select name="securities" id="" onChange={handleselectedSecurities} multiple>
                                    {securities.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Опции: </label>
                                <select name="options" id="" multiple onChange={handleselectedOptions} >
                                    {options.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="create_div">
                                <label htmlFor="input">Изображение: </label>
                                <input placeholder='Выберите фото' type="file" name="image_0" accept=".jpg, .jpeg, .png, .svg, .webp" id="" required onChange={func} />
                            </div>
                            {
                                inputs.map(item => (
                                    <div className="create_div">
                                        <label htmlFor="input">Изображение: </label>
                                        <input placeholder='Выберите фото' type="file" name="image_0" accept=".jpg, .jpeg, .png, .svg, .webp" id="" required onChange={func} />
                                    </div>
                                ))
                            }
                            {
                                error
                                ? 
                                <div>{error}</div>
                                :
                                <div></div>
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

export default CreateCar;