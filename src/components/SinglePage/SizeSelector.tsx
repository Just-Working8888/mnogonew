import React from "react";
import styles from "./PizzaCard.module.scss";

interface SizeSelectorProps {
  size: string;
  setSize: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ size, setSize }) => {
  return (
    <div className={styles.sizeSelector}>
      <button
        className={size === "Маленькая" ? styles.active : ""}
        onClick={() => setSize("Маленькая")}
      >
        Маленькая
      </button>
      <button
        className={size === "Средняя" ? styles.active : ""}
        onClick={() => setSize("Средняя")}
      >
        Средняя
      </button>
      <button
        className={size === "Большая" ? styles.active : ""}
        onClick={() => setSize("Большая")}
      >
        Большая
      </button>
    </div>
  );
};

export default SizeSelector;
