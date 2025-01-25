import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import styles from './Next.module.css'; // Import the CSS Module

gsap.registerPlugin(CustomEase);

export default function Next({ project, slug, image }) {
    const { setProjectTransition, projectTransition } = useStore();
    const wrapperRef = useRef(null);
    const textRef = useRef(null);
    gsap.registerEase("customEase", "M0,0 C0.075,0.82 0.165,1 1,1");
    const router = useRouter();

    const handleClick = () => {
        let rect;
        setProjectTransition(true);
        
        // Scroll to the bottom of the page
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

        // Start animations after scrolling completes
        setTimeout(() => {
            gsap.to(textRef.current, {
                opacity: 0,
                duration: 0.5
            });
            setTimeout(() => {
                rect = wrapperRef.current.getBoundingClientRect();
            }, 10);
            gsap.to(wrapperRef.current, {
                filter: "brightness(200%)",
                duration: 0.1,
                onComplete: () => {
                    gsap.to(wrapperRef.current, {
                        filter: "brightness(100%)",
                        duration: 0.3,
                        onComplete: () => {
                            gsap.to(wrapperRef.current, {
                                y: -rect.top - 3,
                                duration: 0.5,
                                ease: "customEase",
                                onComplete: () => {
                                    router.push(slug);
                                }
                            });
                        }
                    });
                }
            });
        }, 300); // Delay animations to allow scroll to complete
    };

    return (
        <div className={styles.wrapper} ref={wrapperRef} onClick={handleClick} style={{ pointerEvents: projectTransition ? "none" : "auto" }}>
            <div ref={textRef}>
                <p className={styles.seeNext}>SEE NEXT</p>
                <p className={styles.title}>{project}</p>
            </div>
            <div className={styles.imageWrapper}>
                <img className={styles.image} src={image} alt={project} />
            </div>
        </div>
    );
}
