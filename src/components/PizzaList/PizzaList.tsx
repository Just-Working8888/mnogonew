import React, { useEffect, useState } from 'react';
import PizzaCard from '../PizzaCard/PizzaCard';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setOffcet } from '../../store/slices/windowSlice';
import CardSceleton from '../Sceletons/CardSceleton/CardSceleton';
import { Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IProduct } from '../../store/models/IProduct';
import { fetchProduct } from '../../store/reducers/productReduser';
import { formatParams } from '../../helpers/convertProps';
import { setTargetId } from '../../store/slices/scroolSlice';

const PizzaList: React.FC = () => {
    const pizzas = [
        {
            image: '/images/pizza1.png',
            name: 'Мясная с аджикой',
            description: 'Охотничьи колбаски, острый соус аджика, колбаски чоризо из цыпленка, перец, моцарелла и томатный соус',
            price: '495',
            isNew: true,
        },
        {
            image: '/images/pizza2.png',
            name: 'Креветки со сладким чили',
            description: 'Креветки, ананасы, сладкий перец, моцарелла и соус альфредо',
            price: '545',
            isNew: true,
        },
        {
            image: '/images/pizza3.png',
            name: 'Баварская',
            description: 'Охотничьи колбаски, маринованные огурчики, красный лук, горчичный соус и томатный соус',
            price: '495',
            isNew: true,
        },
        {
            image: '/images/pizza4.png',
            name: 'Чикен Бомбони',
            description: 'Куриные кусочки, сладкий перчик, сыры чеддер и пармезан, соус сладкий чили и альфредо',
            price: '495',
            isNew: false,
        },
    ];
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.product.data.results)
    const hasNext = useAppSelector((state) => state.product.data.next)
    const { menuprops } = useAppSelector((state) => state.window)
    const { laoding } = useAppSelector((state) => state.product)

    function next() {
        dispatch(setOffcet((menuprops.offset + 20)))
    }



    const targetId = 'scrollTarget'; // Уникальный ID для целевого элемента

    useEffect(() => {
        dispatch(setTargetId(targetId)); // Сохраняем ID элемента в Redux
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchProduct({ filters: formatParams({ menuprops }) }))
    }, [menuprops])
    return (
        <div>
            <h2>Популярные продукты</h2>
            <br />
            <div id={targetId} className="pizza-list">
                {laoding ?
                    <>
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                        <CardSceleton />
                    </>
                    :
                    <InfiniteScroll
                        dataLength={data.length}
                        next={next}
                        className="pizza-list"
                        hasMore={hasNext !== null}
                        loader={<>
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                            <CardSceleton />
                        </>}
                        endMessage={<Divider plain>Это все, ничего больше. 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
                        {data.map((pizza: IProduct, index) => (
                            <PizzaCard
                                key={index}
                                id={pizza.id}
                                image={pizza.iiko_image}
                                name={pizza.title}
                                description={pizza.description}
                                price={pizza.price}
                                isNew={true}
                            />
                        ))}
                    </InfiniteScroll>}

            </div>
        </div>
    );
};

export default PizzaList;
