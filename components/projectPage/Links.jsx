import styles from './Links.module.css'; // Import the CSS Module

export default function Links({ backend, frontend, demo }) {
    return (
        <div className={styles.wrapper}>
            <button className={styles.button} onClick={() => window.open(backend, "_blank")}>Backend</button>
            <button className={styles.button} onClick={() => window.open(frontend, "_blank")}>Frontend</button>
            <button className={styles.button} onClick={() => window.open(demo, "_blank")}>Try it out!</button>
        </div>
    );
}
