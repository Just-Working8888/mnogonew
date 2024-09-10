import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";

// Сопоставление маршрутов с их названиями
const routeNames: { [key: string]: string } = {
    "": "Главная",
    "product": "Продукт",
    "order": "Заказ"
};

const Breadcrumbs: React.FC = () => {
    const location = useLocation();

    // Разбиваем путь на массив элементов
    const pathnames = location.pathname.split("/").filter(Boolean);

    return (
        <nav className={styles.breadcrumbs}>
            <Link to="/">Главная</Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                return (
                    <span key={to} className={styles.breadcrumbItem}>
                        <span className={styles.separator}> / </span>
                        {/* Если маршрут product, то рендерим его как текст, а не ссылку */}
                        {value === "product" ? (
                            <span>{routeNames[value] || decodeURIComponent(value)}</span>
                        ) : index === pathnames.length - 1 ? (
                            <span>{routeNames[value] || decodeURIComponent(value)}</span>
                        ) : (
                            <Link to={to}>{routeNames[value] || decodeURIComponent(value)}</Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
