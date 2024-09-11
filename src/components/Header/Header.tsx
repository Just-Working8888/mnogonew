import React, { useState, useEffect } from 'react';
import { Button, Flex } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import classes from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCategories } from '../../store/reducers/Categories';
import { setCategory, setOffcet } from '../../store/slices/windowSlice';
import { clearData } from '../../store/slices/productSlice';
import CartDrawer from '../CartBar/CartBar';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../Auth/Auth';
import Protected from '../Protected/Protected';
import { deleteCookie } from '../../helpers/cookies';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const targetId = useAppSelector((state) => state.scroll.targetId);
    const navigate = useNavigate()
    const handleScroll = () => {
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    // Добавляем событие прокрутки для отслеживания положения страницы
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) { // Если прокрутили больше чем на 50px, меняем состояние
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const dispatch = useAppDispatch()
    const { data } = useAppSelector((state) => state.categories)
    const { menuprops } = useAppSelector((state) => state.window)
    const [all, setALl] = useState(false)

    useEffect(() => {
        dispatch(fetchCategories({}))
    }, [menuprops])

    const handleNavigate = (path: any) => {
        navigate(path, { replace: true });
        handleScroll(); // Вызываем handleScroll после навигации
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };


    return (
        <>
            {!isScrolled ? (
                <header className={classes.header}>
                    <Flex wrap='wrap' gap={10} justify="space-between" align="center">
                        <Flex gap={26} align="center">
                            <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                                <img
                                    src="https://mnogosuhi.vercel.app/static/media/blackLogo%20(1).38e8ec556aedb0f78b19.png"
                                    width={50}
                                    alt=""
                                />
                            </div>
                            <div>
                                <h1>Доставка пиццы Бишкек</h1>
                                <p>
                                    35мин * 4.56
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                        <defs>
                                            <linearGradient id="8fbfbd78-f351-4948-94fb-8bc8cbb96021a">
                                                <stop offset="50%" stopColor="#FFD200"></stop>
                                                <stop offset="50%" stopColor="#999" stopOpacity="0.5"></stop>
                                            </linearGradient>
                                        </defs>
                                        <path fill="url(#8fbfbd78-f351-4948-94fb-8bc8cbb96021a)" d="M8.451 1.49a1 1 0 0 0-.902 0c-.245.123-.378.359-.461.528-.09.182-.185.427-.296.712l-.928 2.39a3 3 0 0 1-.07.173v.002H5.79c-.036.006-.086.01-.184.02l-2.504.214c-.272.024-.51.044-.695.077-.176.032-.418.09-.6.274a1 1 0 0 0-.28.826c.03.256.186.45.307.583.126.139.302.3.503.485l1.987 1.823.125.118.002.002v.003c-.006.033-.016.079-.036.168l-.592 2.66a9 9 0 0 0-.145.73c-.024.184-.042.445.087.68a1 1 0 0 0 .733.508c.265.038.504-.072.667-.16a9 9 0 0 0 .632-.392l2.036-1.332c.086-.056.13-.085.164-.104L8 12.476l.003.002c.033.019.078.048.164.104l2.036 1.332c.246.161.458.3.632.393.163.087.401.197.667.159a1 1 0 0 0 .733-.508c.13-.235.11-.496.087-.68a9 9 0 0 0-.145-.73l-.592-2.66c-.02-.09-.03-.135-.035-.168v-.003l.001-.002.125-.118 1.987-1.823c.201-.185.377-.346.503-.485.12-.133.276-.327.308-.583a1 1 0 0 0-.281-.826c-.182-.183-.424-.242-.6-.274-.185-.033-.423-.053-.695-.077l-2.504-.215a3 3 0 0 1-.184-.018h-.003l-.002-.003a3 3 0 0 1-.069-.172l-.928-2.39a10 10 0 0 0-.296-.713c-.083-.17-.216-.405-.46-.529"></path>
                                    </svg>
                                </p>
                            </div>
                            <div>
                                <a href="tel:0 (551) 550-550">0 (551) 550-550</a>
                                <p>Звонок по телефону</p>
                            </div>
                        </Flex>
                        <div>
                        <Protected fallback={<Button style={{ height: '40px', borderRadius: '10px' }} type="primary" onClick={showModal}>
                                Войти / Зарегистрироваться
                            </Button>}>
                                <Button style={{ height: '40px', borderRadius: '10px' }} onClick={() => deleteCookie('access_token')}>Выйти</Button>
                            </Protected>
                        </div>
                    </Flex>
                </header>
            ) : (
                <header className={classes.scrolledHeader}>
                    <Flex justify="space-between" align="center">
                        <Flex gap={26} align="center">
                            <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                                <img
                                    src="https://mnogosuhi.vercel.app/static/media/blackLogo%20(1).38e8ec556aedb0f78b19.png"
                                    width={50}
                                    alt=""
                                />
                            </div>

                            <Flex className='categoriesSex'>
                                <Button
                                    onClick={() => {
                                        dispatch(setOffcet(1))
                                        dispatch(clearData())
                                        dispatch(setCategory(0))
                                        handleNavigate('/')
                                        handleScroll()
                                    }}

                                    type={
                                        menuprops.category === 0
                                            ? 'primary'
                                            : 'text'}>
                                    Все
                                </Button>
                                {data.results
                                    .slice(0, all === false ? 6 : data.results.length)
                                    .map((category) =>
                                        <Button
                                            onClick={() => {
                                                dispatch(setOffcet(1))
                                                dispatch(clearData())
                                                dispatch(setCategory(category.id))
                                                handleNavigate('/')
                                                handleScroll()
                                            }}
                                            type={
                                                menuprops.category === category.id
                                                    ? 'primary'
                                                    : 'text'}>
                                            {category.title}
                                        </Button>
                                    )}

                                <Button
                                    type="dashed"
                                    icon={all ? <CaretUpOutlined /> : <CaretDownOutlined />}

                                    onClick={() => setALl(!all)}>
                                    {all
                                        ? 'Скрыть'
                                        : "Показать все"}
                                </Button>
                            </Flex>

                        </Flex>
                        {/* <div className={classes.button}>
                            <ShoppingCartOutlined />
                        </div> */}
                        <Flex gap={10}>
                       


                            {/* Использование компонента модального окна */}
                            <AuthModal visible={isModalVisible} onClose={handleCloseModal} />
                            <div className={classes.mobnone}>
                                <CartDrawer />
                            </div>
                        </Flex>

                    </Flex>

                </header>
            )}
            <div className={classes.mobile_cart}>
                <CartDrawer />
                <button className='buttonn' style={{ color: 'white' }}>Оформить</button>
            </div>
        </>
    );
};

export default Header;
