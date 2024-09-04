import React from "react";
import styles from "./PizzaCard.module.scss";
import { useAppSelector } from "../../store/hook";

const IngredientsList: React.FC = () => {
  const ingredients = [
    { name: "Сырный бортик", price: 179 },
    { name: "Сливочная моцарелла", price: 79 },
    { name: "Сыры чеддер и пармезан", price: 79 },
    { name: "Нежный цыплёнок", price: 79 },
  ];

  const { product } = useAppSelector((state) => state.product)
  return (
    <div className={styles.ingredients}>
      <h3>Ингредиенты</h3>
      <div className={styles.ingredientsList}>
        {ingredients.map((ingredient) => (
          <div key={ingredient.name} className={styles.ingredient}>
            <span>{ingredient.name}</span>
            <span>{ingredient.price} ₽</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientsList;
