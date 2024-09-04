import { Flex } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type PizzaCardProps = {
    image: string;
    name: string;
    description: string;
    price: string;
    isNew?: boolean;
    id: number
};

const PizzaCard: React.FC<PizzaCardProps> = ({ image, name, description, price, isNew, id }) => {
    const navigate = useNavigate()
    return (
        <div className="pizza-card">
            <div onClick={() => navigate(`product/${id}`)} className="image-wrapper">
                <img src={image} alt={name} className="pizza-image" />
                {isNew && <span className="new-label">Новинка</span>}
            </div>
            <div className="pizza-info">
                <h3 className="pizza-name">{name}</h3>
                <p className="pizza-description">{description}</p>
                <br />
                <Flex justify='space-between'>
                    <div className="pizza-price">от {price} сом</div>
                    <button className="select-button">Выбрать</button>
                </Flex>

            </div>
        </div>
    );
};

export default PizzaCard;
