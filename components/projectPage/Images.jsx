import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import styles from './Images.module.css'; // Import the CSS Module

gsap.registerPlugin(ScrollTrigger);

export default function Images({ images }) {
    const wrapperRef = useRef(null);
    const imagesRef = useRef([]);

    useEffect(() => {
        setTimeout(() => {
            imagesRef.current.forEach((image, i) => {
                if (image) {
                    gsap.fromTo(
                        image,
                        {
                            opacity: 0,
                            y: 50,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: image,
                                start: "top 75%",
                                end: "top 75%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }
            });
        }, 3200);
    }, [images]);

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            {images.map((img, index) => (
                <img
                    key={index}
                    className={styles.image}
                    src={img}
                    ref={(el) => (imagesRef.current[index] = el)}
                />
            ))}
        </div>
    );
}
