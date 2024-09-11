import React, { useState, useEffect } from 'react';
import { Button, Flex, Input } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, SearchOutlined } from '@ant-design/icons';
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
import { CSSTransition } from 'react-transition-group';
import './Header.module.scss';  // Подключаем файл стилей
import { fetchProduct } from '../../store/reducers/productReduser';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const targetId = useAppSelector((state) => state.scroll.targetId);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.categories);
    const { menuprops } = useAppSelector((state) => state.window);
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const [all, setAll] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300); // Задержка 300 мс

        return () => {
            clearTimeout(handler); // Очищаем таймер
        };
    }, [search]);
    const handleNavigate = (path: string) => {
        navigate(path, { replace: true });
        handleScroll();
    };


    useEffect(() => {
        dispatch(setOffcet(1));
        dispatch(clearData());
        handleScroll();
        handleNavigate('/')
        dispatch(setCategory(0))
        dispatch(fetchProduct({ filters: `search=${debouncedSearch}` }));
    }, [debouncedSearch]);
    useEffect(() => {
        dispatch(fetchCategories({}));
    }, [menuprops]);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleScroll = () => {
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
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
                            <AuthModal visible={false} onClose={() => { }} />

                            <div>
                                <a href="tel:0 (551) 550-550">0 (551) 550-550</a>
                                <p>Звонок по телефону</p>
                            </div>
                        </Flex>
                        <div>
                            <Protected fallback={<Button style={{ height: '40px', borderRadius: '10px' }} type="primary" onClick={() => { }}>
                                Войти / Зарегистрироваться
                            </Button>}>
                                <Button style={{ height: '40px', borderRadius: '10px' }} onClick={() => deleteCookie('access_token')}>Выйти</Button>
                            </Protected>
                        </div>
                    </Flex>
                </header>
            ) : (
                <header className={classes.scrolledHeader}>
                    <nav className="navbar">
                        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                            <img
                                src="https://mnogosuhi.vercel.app/static/media/blackLogo%20(1).38e8ec556aedb0f78b19.png"
                                width={50}
                                alt=""
                            />
                        </div>
                        <div className="navbar__pages">
                            <div className="navbar__pages-wrapper">
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
                                {data.results.map((category) =>
                                    <Button
                                        key={category.id}
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
                                    onClick={() => setAll(!all)}>
                                    {all ? 'Скрыть' : "Показать все"}
                                </Button>
                            </div>
                        </div>
                        <Flex gap={10}>
                            <div className={classes.mobnone}>
                                <CartDrawer />
                            </div>
                            <button className="button" onClick={toggleSearch}>
                                <SearchOutlined />
                            </button>
                        </Flex>
                    </nav>

                    <CSSTransition
                        in={showSearch}
                        timeout={0}
                        classNames="search"
                        unmountOnExit
                    >
                        <Input value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Поиск продуктов..." style={{ marginTop: '10px' }} className="search-input" />
                    </CSSTransition>
                </header>
            )}
        </>
    );
};

export default Header;
