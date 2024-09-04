import React from "react";
import styles from "./PizzaCard.module.scss";

interface AddToCartButtonProps {
    price: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ price }) => {
    return (
        <button className={styles.addToCart}>
            Добавить в корзину за {price} ₽
        </button>
    );
};

export default AddToCartButton;
