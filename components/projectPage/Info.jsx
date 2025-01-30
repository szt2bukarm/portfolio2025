import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from './Info.module.css';

export default function Info({ title, description, stack, year, platform }) {
    const ref = useRef(null);

    useGSAP(() => {
        gsap.set(ref.current, {
            opacity: 0
        })
        gsap.to(ref.current, {
            opacity: 1,
            duration: 0.3,
        })
    }, [])

    return (
        <div className={styles.wrapper} ref={ref}>
            <p className={styles.title}>{title}</p>
            <div className={styles.gridWrapper}>
                <div className={styles.gridItem}>
                    <p className={styles.subTitle}>ABOUT</p>
                    <p className={styles.subText}>{description}</p>
                </div>
                <div className={styles.gridItem}>
                    <p className={styles.subTitle}>PLATFORM</p>
                    <p className={styles.subText}>{platform}</p>
                </div>
                <div className={styles.gridItem}>
                    <p className={styles.subTitle}>YEAR</p>
                    <p className={styles.subText}>{year}</p>
                </div>
                <div className={styles.gridItem}>
                    <p className={styles.subTitle}>STACK</p>
                    {stack.map((item, index) => (
                        <p
                            className={styles.subText}
                            style={{ marginBottom: "10px", display: "inline-block", paddingRight: "5px" }}
                            key={index}
                        >
                            {index !== stack.length - 1 ? item + "," : item}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
