import React, { useEffect, useState } from 'react';
import { Input, Button, List, Avatar, Form, message, Radio, Select, Flex } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './OrderForm.scss'; // Стилизация компонента
import { api } from '../../api';
import { removeItem } from '../../store/slices/cartSlice';
import { fetchCartItemById } from '../../store/reducers/cartReduser';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import Counter from '../CartBar/Counter/Counter';
import MapTest from '../Map/Map';
import SearchComponent from '../TestLocationSerch/TestLocationSearch';
import { createBiling } from '../../store/reducers/bilingReduser';
import { createDelivary } from '../../store/reducers/delivaryReduser';

const { Option } = Select;

const OrderForm: React.FC = () => {
    const [receiptType, setReceiptType] = useState<string>('Самовывоз');
    const [paymentMethod, setPaymentMethod] = useState<string>('bankCard');
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.cart);
    const points = useAppSelector((state) => state.point)
    const delivery = useAppSelector((state) => state.delivary)

    const AdressTitle = useAppSelector((state) => state.adresses.adressTitle)
    useEffect(() => {
        const cartId = localStorage.getItem('cart_id');
        if (cartId) {
            dispatch(fetchCartItemById({ id: Number(cartId) }));
        }
    }, [dispatch]);

    const handleReceiptTypeChange = (e: any) => {
        setReceiptType(e.target.value);
    };

    const handlePaymentMethodChange = (value: string) => {
        setPaymentMethod(value);
    };

    const delte = async (id: number) => {
        try {
            await api.deleteCartItemById(id).then(() => {
                dispatch(removeItem(id));
                message.success('Товар успешно удалён из корзины');
            });
        } catch (error) {
            console.log(error);
        }
    };

    const totalPrice = data.items?.reduce(
        (acc: number, item: any) => acc + parseFloat(item.product.price) * item.quantity, 0
    ) || 0;
    useEffect(() => {
        if (receiptType === 'Доставка') {
            dispatch(createDelivary({ data: { lon: `${points.adressPoint[0]}`, lat: `${points.adressPoint[1]}` } }));
        }
    }, [points, AdressTitle, receiptType]);

    const onFinish = async (values: any) => {
        const data = {
            full_name: values.full_name,
            whatsapp_number: values.whatsapp_number,
            billing_receipt_type: values.billing_receipt_type,
            delivery_price: delivery.data.price,
            street: AdressTitle,
            phone: values.phone,
            payment_method: values.payment_method,
            note: values.note,
            status: true,
            parent: 0
        };

        dispatch(createBiling({
            data: data
        })).then(() => {
            const cartId = localStorage.getItem('cart_id');

            dispatch(fetchCartItemById({ id: Number(cartId) }));
        })

    };

    return (
        <div className="order-container">
            <div className="he">
                {receiptType === 'Доставка' && (
                    <div className="address-section">
                        <h2> Адрес доставки</h2>
                        <br />
                        <>
                            <MapTest />
                            <SearchComponent />
                            <br />
                        </>
                    </div>
                )}
                <div className="personal-info-section">
                    <h2> Информация</h2>

                    <Form onFinish={onFinish} layout="vertical">
                        <Form.Item initialValue="Самовывоз" label="Тип получения" name="billing_receipt_type">
                            <Radio.Group onChange={handleReceiptTypeChange} value={receiptType}>
                                <Radio value="Доставка">Доставка</Radio>
                                <Radio value="Самовывоз">Самовывоз</Radio>
                            </Radio.Group>
                        </Form.Item>



                        <Form.Item label="Метод оплаты" name="payment_method">
                            <Select defaultValue="bankCard" onChange={handlePaymentMethodChange}>
                                <Option value="bankCard">Банковская карта</Option>
                                <Option value="cash">Наличные</Option>
                                <Option value="eWallet">Электронный кошелек</Option>
                            </Select>
                        </Form.Item>

                        {paymentMethod === 'cash' && (
                            <Form.Item label="Сдача с" name="change">
                                <Input placeholder="Введите сумму для сдачи" />
                            </Form.Item>
                        )}

                        <Form.Item label="Телефон" name="phone" initialValue="+996 ">
                            <Input placeholder="Введите номер телефона" />
                        </Form.Item>


                        <Form.Item label="Комментарий к заказу" name="comment">
                            <Input.TextArea rows={3} placeholder="Укажите тут дополнительную информацию для курьера" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Оформить заказ
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            <div className="order-summary-section he">
                <div className="">
                    <h2><Flex justify='space-between'> Корзина <Button icon={<DeleteOutlined />} className="clear-cart-btn">
                        Очистить корзину
                    </Button></Flex></h2>

                    <List
                        itemLayout="horizontal"
                        dataSource={data.items}
                        renderItem={(item: any) => (
                            <List.Item

                                actions={[
                                    <div className='rightBar'>
                                        <Button onClick={() => delte(item.id)} style={{ width: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px 0px 0px 7px' }} type='text' icon={<DeleteOutlined style={{ color: 'red' }} />}>      </Button>

                                        <Counter record={item} />

                                    </div>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" size="large" style={{ height: '100px', width: '100px' }} src={item.product.iiko_image} />}
                                    title={item.product.title}
                                    description={
                                        <div>
                                            <p>{item.product.description}</p>
                                            <span style={{ color: 'red' }}>{parseFloat(item.product.price) * item.quantity} c</span>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
                <br />
                <h3>Итого: {totalPrice} c</h3>
                <div className="order-details">
                    <p>Стоимость товаров: {totalPrice} c</p>
                    <p>Адресc: <p>{AdressTitle}</p>  </p>
                    <p>Растояние <p>{delivery.data.distanse}</p></p>
                    <p>Примерное время доставки <p>{delivery.data.time as any}</p></p>
                    <p>Доставка: 120 c</p>
                </div>
                <Button type="primary" size="large" block>
                    Перейти к оплате
                </Button>
            </div>
        </div >
    );
};

export default OrderForm;
