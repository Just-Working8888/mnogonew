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
