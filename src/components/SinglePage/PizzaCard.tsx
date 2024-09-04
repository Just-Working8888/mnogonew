import React, { useState } from "react";
import styles from "./PizzaCard.module.scss";
import PizzaImage from "./PizzaImage";
import SizeSelector from "./SizeSelector";
import CrustSelector from "./CrustSelector";
import IngredientsList from "./IngredientsList";
import AddToCartButton from "./AddToCartButton";
import { useAppSelector } from "../../store/hook";

const PizzaCard: React.FC = () => {
    const [size, setSize] = useState("Маленькая");
    const [crust, setCrust] = useState("Традиционное");
    const [price, setPrice] = useState(799);
    const { product } = useAppSelector((state) => state.product)
    return (
        <div className={styles.pizzaCard}>
            <div className={styles.pizzaCard__image}>
                <PizzaImage />
            </div>
            <div className={styles.pizzaCard__details}>
                <h1 className={styles.pizzaTitle}>{product.title}</h1>
                <p className={styles.pizzaDescription}>{product.description}</p>
                <SizeSelector size={size} setSize={setSize} />
                <CrustSelector crust={crust} setCrust={setCrust} />
                <IngredientsList />
                <AddToCartButton price={price} />
            </div>
        </div>
    );
};

export default PizzaCard;
