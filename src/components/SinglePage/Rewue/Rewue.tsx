import React, { useState } from 'react';
import { List, Avatar, Button, Modal, Form, Input, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Rewue.scss';
import { useAppSelector } from '../../../store/hook';
import AddRewue from '../AddRewue/AddRewue';

interface Review {
    id: number;
    user: {
        user_img: string;
        user_username: string;
    };
    product: string;
    text: string;
    stars: number;
    created: string;
}

const mockReviews: Review[] = [
    {
        id: 1,
        user: {
            user_img: '',
            user_username: 'Ivan Ivanov',
        },
        product: 'Set 20',
        text: 'Отличный набор, всем понравилось!',
        stars: 5,
        created: '2024-09-05',
    },
    {
        id: 2,
        user: {
            user_img: '',
            user_username: 'Petr Petrov',
        },
        product: 'Set 15',
        text: 'Хороший вкус, но хотелось бы больше.',
        stars: 4,
        created: '2024-09-03',
    },
    {
        id: 1,
        user: {
            user_img: '',
            user_username: 'Ivan Ivanov',
        },
        product: 'Set 20',
        text: 'Отличный набор, всем понравилось!',
        stars: 5,
        created: '2024-09-05',
    },
    {
        id: 2,
        user: {
            user_img: '',
            user_username: 'Petr Petrov',
        },
        product: 'Set 15',
        text: 'Хороший вкус, но хотелось бы больше.',
        stars: 4,
        created: '2024-09-03',
    },
    {
        id: 1,
        user: {
            user_img: '',
            user_username: 'Ivan Ivanov',
        },
        product: 'Set 20',
        text: 'Отличный набор, всем понравилось!',
        stars: 5,
        created: '2024-09-05',
    },
    {
        id: 2,
        user: {
            user_img: '',
            user_username: 'Petr Petrov',
        },
        product: 'Set 15',
        text: 'Хороший вкус, но хотелось бы больше.',
        stars: 4,
        created: '2024-09-03',
    },
];

const Reviews: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reviews, setReviews] = useState<Review[]>(mockReviews);
    const [isAll, setIsAll] = useState(false)
    const { product } = useAppSelector((state) => state.product)


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values: any) => {
        const newReview: Review = {
            id: reviews.length + 1,
            user: {
                user_img: '',
                user_username: 'Новый пользователь', // Замените на авторизованного пользователя
            },
            product: values.product,
            text: values.text,
            stars: values.stars,
            created: new Date().toLocaleDateString(),
        };
        setReviews([...reviews, newReview]);
        setIsModalVisible(false);
    };

    return (
        <div className="reviews-section">
            <List
                itemLayout="horizontal"
                dataSource={product?.product_reviews?.slice(0, isAll ? reviews.length : 3)}
                footer={<Button onClick={() => setIsAll((prev) => !prev)}>
                    {isAll ? 'скрыть' : 'показать все'}
                </Button>}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            // avatar={
                            //     item.user.user_img ? (
                            //         <Avatar src={item.user.user_img} />
                            //     ) : (
                            //         <Avatar icon={<UserOutlined />} />
                            //     )
                            // }
                            // title={item.user.user_username}
                            description={
                                <div>
                                    <p>{item.text}</p>
                                    <Rate disabled defaultValue={item.stars} />
                                    <p className="review-date">{item.created}</p>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
            <Button type="primary" onClick={showModal}>
                Оставить отзыв
            </Button>
            <AddRewue />
            <Modal
                title="Добавить отзыв"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Товар"
                        name="product"
                        rules={[{ required: true, message: 'Пожалуйста, укажите товар!' }]}
                    >
                        <Input placeholder="Введите название товара" />
                    </Form.Item>
                    <Form.Item
                        label="Отзыв"
                        name="text"
                        rules={[{ required: true, message: 'Пожалуйста, введите текст отзыва!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Введите ваш отзыв" />
                    </Form.Item>
                    <Form.Item
                        label="Оценка"
                        name="stars"
                        rules={[{ required: true, message: 'Пожалуйста, оцените товар!' }]}
                    >
                        <Rate />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Отправить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Reviews;
