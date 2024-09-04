import React from "react";
import styles from "./PizzaCard.module.scss";

interface CrustSelectorProps {
    crust: string;
    setCrust: (crust: string) => void;
}

const CrustSelector: React.FC<CrustSelectorProps> = ({ crust, setCrust }) => {
    return (
        <div className={styles.crustSelector}>
            <button
                className={crust === "Традиционное" ? styles.active : ""}
                onClick={() => setCrust("Традиционное")}
            >
                Традиционное
            </button>
            <button
                className={crust === "Тонкое" ? styles.active : ""}
                onClick={() => setCrust("Тонкое")}
            >
                Тонкое
            </button>
        </div>
    );
};

export default CrustSelector;
