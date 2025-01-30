import Project from "./Project"
import gsap from "gsap"
import React, { useEffect, useRef, useState } from "react"
import { FaHtml5,FaCss3Alt,FaJs,FaReact,FaNodeJs } from 'react-icons/fa'
import { TbBrandReactNative } from "react-icons/tb";
import { CustomEase,ScrollTrigger } from "gsap/all"
import { useStore } from "@/store"
import { useLenis } from "@studio-freight/react-lenis"
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase)
import styles from "./Projects.module.css"


const list = [
    {
        title: "Benjo",
        image: "benjo.webp",
        stack: ["HTML","CSS","JS","React","NodeJS"],
        platform: "web",
        year: "2024",
        slug: "benjo"
    },
    {
        title: "UNO",
        image: "uno.webp",
        stack: ["HTML","CSS","JS","React","NodeJS"],
        platform: "web",
        year: "2024",
        slug: "uno"
    },
    {
        title: "Benjo - iOS",
        image: "benjomobile.webp",
        stack: ["JS","ReactNative","NodeJS"],
        platform: "mobile",
        year: "2024",
        slug: "benjomobile"
    }
]

export default function Projects() {
    gsap.registerEase("customEase","M0,0 C0.075,0.82 0.165,1 1,1")
    const {projectTransition,clickedProject,loaded,about} = useStore();
    const [currentText,setCurrentText] = useState("Benjo");
    const [currentStack,setCurrentStack] = useState(["HTML","CSS","JS","React","NodeJS"]);
    const [currentPlatform,setCurrentPlatform] = useState("Web");
    const [currentYear,setCurrentYear] = useState("2024");
    const [currentIndex,setCurrentIndex] = useState(0);
    const [bgVisible,setBgVisible] = useState(true);
    const projectRef = useRef([]);
    const listRef = useRef(null);
    const infoRef = useRef(null);
    const wrapperRef = useRef(null);
    const bgRef = useRef(null);
    const lenis = useLenis();
    const [screenWidth, setScreenWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

    useEffect(() => {
        if (!lenis) return;
        setTimeout(() => {
        lenis.scrollTo(0, {
            immediate: true
        });
        }, 1);
    },[lenis])

    useEffect(() => {
        if (typeof window == "undefined") return;
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useGSAP(() => {
        if (projectTransition) {
            gsap.to([bgRef.current,infoRef.current,projectRef.current.filter((el,i) => i !== clickedProject)], {
                opacity: 0,
                delay: 0.5,
                duration: 0.1,
                onComplete: () => {
                    setBgVisible(false);
                }
            })
        } else {
            gsap.set(bgRef.current, {
                opacity: 0.3
            })
            gsap.set([infoRef.current,projectRef.current], {
                opacity: 1
            })
        }
    },[projectTransition])

    useGSAP(() => {
        if (!loaded){
            gsap.set(listRef.current, {
                y: 200
            })
            gsap.set(infoRef.current, {
                y: 200
            })
        }
        if (loaded)
            gsap.to([listRef.current,infoRef.current], {
                y: 0,
                delay: 0.3,
                duration: 1,
                ease: "customEase"
            })
    },[loaded])

    useGSAP(() => {
        gsap.set(infoRef.current, {
            opacity: 0
        })
        const animation = (i) => {
            gsap.to(bgRef.current, {
                opacity: 0,
                duration: 0.3
            })
          gsap.to(infoRef.current, {
            css: {
                opacity: 1,
                filter: screenWidth > 768 ? "blur(10px) drop-shadow(0 0 20px #000)" : ""
            },
            duration: 0.1,
            onComplete: () => {
              setCurrentText(list[i].title);
                setCurrentPlatform(list[i].platform);
                setCurrentStack(list[i].stack);
                setCurrentYear(list[i].year);
                setCurrentIndex(i);

                gsap.to(bgRef.current, {
                    opacity: 0.3,
                    duration: 0.3
                })

                gsap.to(infoRef.current, {
                css: {
                    filter: "blur(0px) drop-shadow(0 0 20px #000)"
                },
                duration: 0.3
              });
            }
          });
        }
        let scrollTriggers = [];
        if (!loaded) return;
            projectRef.current.forEach((el,i) => {
                scrollTriggers[i] = ScrollTrigger.create({
                    trigger: el,
                    start: "top 50%",
                    end: "bottom 50%",
                    onEnter: () => {
                        animation(i);
                    },
                    onEnterBack: () => {
                        animation(i);
                    }
                })
            })

            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 700);

        return () => {
            scrollTriggers.forEach((el) => el.kill());
        }
    },[loaded])

    const addPadding = () => {
        listRef.current.style.paddingBottom = "300px";
    }

    useGSAP(() => {
        if (about) {
            gsap.to(wrapperRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    gsap.set(wrapperRef.current, {
                        display: "none"
                    })
                }
            })
        } else {
            gsap.to(wrapperRef.current, {
                opacity: 1,
                duration: 0.3,
            })
        }
    },[about])

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            {bgVisible && (
                <div className={styles.backgroundBlur} ref={bgRef}>
                    <img className={styles.background} src={list[currentIndex].image} />
                </div>
            )}
            <div className={styles.projectWrapper}>
                <div className={styles.projectList} ref={listRef}>
                    {list.map((project,i) => {
                        return (
                            <div key={i} ref={(el) => projectRef.current[i] = el} onClick={addPadding}>
                                <Project key={i} index={i} slug={project.slug} image={project.image} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.projectInfo} ref={infoRef}>
                <p className={styles.title} >{currentText}</p>
                <div className={styles.stack}>
                {currentStack.map((stack, i) => {
                    const IconComponent = {
                        HTML: FaHtml5,
                        CSS: FaCss3Alt,
                        JS: FaJs,
                        React: FaReact,
                        NodeJS: FaNodeJs,
                        ReactNative: TbBrandReactNative,
                    }[stack];

                    return IconComponent ? (
                        <span className={styles.stackIcon} key={i}>
                            {React.createElement(IconComponent)}
                        </span>
                    ) : null; // Render nothing if the icon is not found
                })}
                </div>
                <p className={styles.metadata}>{currentPlatform} - {currentYear}</p>
            </div>
        </div>
    )
}
