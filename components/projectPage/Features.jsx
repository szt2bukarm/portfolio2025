import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import styles from './Features.module.css'; // Import the CSS Module

gsap.registerPlugin(ScrollTrigger);

export default function Features({ features }) {
    const wrapperRef = useRef(null);
    const featureRef = useRef([]);

    useEffect(() => {
        setTimeout(() => {
            gsap.fromTo(
                wrapperRef.current,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top 70%",
                        end: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.fromTo(
                featureRef.current,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top 70%",
                        end: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, 3300);
    }, []);

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <p className={styles.title}>FEATURES</p>
            <div className={styles.featureList}>
                {features.map((feature, i) => (
                    <p
                        className={styles.feature}
                        ref={(el) => (featureRef.current[i] = el)}
                        key={i}
                    >
                        {feature}
                    </p>
                ))}
            </div>
        </div>
    );
}
