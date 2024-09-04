import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs: React.FC = () => {
    const location = useLocation();

    // Разбиваем путь на массив элементов
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav className={styles.breadcrumbs}>
            <Link to="/">Главная</Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                return (
                    <span key={to} className={styles.breadcrumbItem}>
                        <span className={styles.separator}> / </span>
                        {index === pathnames.length - 1 ? (
                            <span>{decodeURIComponent(value)}</span>
                        ) : (
                            <Link to={to}>{decodeURIComponent(value)}</Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
