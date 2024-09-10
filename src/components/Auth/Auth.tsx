import React, { useState } from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import classes from './AuthModal.module.scss';
import { useAppDispatch } from '../../store/hook';
import { loginAsync } from '../../store/reducers/authRedusers';
import { setCookie } from '../../helpers/cookies';

const AuthModal: React.FC<{ visible: boolean, onClose: () => void }> = ({ visible, onClose }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // состояние для переключения между формами

    const onFinishLogin = async (values: any) => {
        try {
            setLoading(true);
            const response = await dispatch(loginAsync({ username: values.username, password: values.password }));
            if (response.payload.access) {
                message.success('Login successful');
                setCookie('access_token', response.payload.access, 30);
                localStorage.setItem('user_id', response.payload.user_id);
                onClose();
            }
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response) {
                message.error(err.response.data.message || 'Ошибка авторизации.');
            } else {
                message.error('Ошибка соединения с сервером.');
            }
        } finally {
            setLoading(false);
        }
    };

    const onFinishRegister = async (values: any) => {
        try {
            setLoading(true);
            // Ваша логика для регистрации
            message.success('Регистрация прошла успешно');
            onClose();
        } catch (err: any) {
            message.error('Ошибка регистрации');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            className={classes.modal}
        >
            <div className={classes.icon}>
                <UserOutlined style={{ fontSize: '50px', color: "white" }} />
            </div>

            <div className={classes.title}>
                <h2>{isLogin ? 'Добро пожаловать!' : 'Регистрация'}</h2>
                <p>{isLogin ? 'Войдите в свою учетную запись' : 'Создайте новую учетную запись'}</p>
            </div>

            <Form
                name={isLogin ? "login_form" : "register_form"}
                className={classes.form}
                initialValues={{ remember: true }}
                onFinish={isLogin ? onFinishLogin : onFinishRegister}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Введите имя пользователя!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
                </Form.Item>

                {!isLogin && (
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Введите email!', type: 'email' }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>
                )}

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
                </Form.Item>

                {isLogin && (
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>
                        <a className={classes.forgot} href="#/">Забыли пароль?</a>
                    </Form.Item>
                )}

                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" block>
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                </Form.Item>

                <div className={classes.switch}>
                    {isLogin ? (
                        <p>Нет аккаунта? <a onClick={() => setIsLogin(false)}>Зарегистрируйтесь!</a></p>
                    ) : (
                        <p>Уже есть аккаунт? <a onClick={() => setIsLogin(true)}>Войдите!</a></p>
                    )}
                </div>
            </Form>
        </Modal>
    );
};

export default AuthModal;
