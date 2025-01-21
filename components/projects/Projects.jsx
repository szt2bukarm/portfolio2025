import styled from "styled-components"
import Project from "./Project"
import gsap from "gsap"
import React, { useEffect, useRef, useState } from "react"
import { FaHtml5,FaCss3Alt,FaJs,FaReact,FaNodeJs } from 'react-icons/fa'
import { TbBrandReactNative } from "react-icons/tb";
import { CustomEase,ScrollTrigger } from "gsap/all"
import { useStore } from "@/store"
import { useRouter } from "next/navigation"
import { useLenis } from "@studio-freight/react-lenis"
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CustomEase)


const Wrapper = styled.div`
    position: relative;
    width: 100vw;
    min-height: 100%;
    background-color: #000;
`

const BackgroundBlur = styled.div`
    position: fixed;
    top: 0;
    filter: blur(30px);
    opacity: 0.3;
    width: 100vw;
    /* height: 100vh; */
    /* height: 100dvh; */
    overflow: hidden;
    z-index: 0;
`

const BackgroundImage = styled.img`
    width: 100%;
    height: 100%;
    scale: 1.5;
    object-fit: cover;
`

const ProjectWrapper = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
    padding-block: calc(50vh - 325px); 
    /* padding-block: calc(50dvh - 325px); */
    background-color: #0000008a;

    @media screen and (max-width: 768px) {
        padding-block: calc(50vh - 200px);
        /* padding-block: calc(50dvh - 200px); */
    }

`

const ProjectList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 200px;
    /* padding-bottom: 300px; */
    perspective: 300px;

    @media screen and (max-width: 768px) {
        gap: 20px;
    }
`

const ProjectInfo = styled.div`
    height: 100vh;
    width: 100%;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 0 20px #000);
    z-index: 2;
    text-align: center;
    font-family: "Mori-SemiBold";
    pointer-events: none;
    padding-inline: 20px;
`

const Title = styled.p`
    font-size: var(--medium);
    color: #fff;

    @media screen and (max-width: 768px) {
        font-size: var(--medium2);
    }
`

const StackIcon = styled.span`
    font-size: var(--small2);
    width: var(--small2);
    height: var(--small2);
    color: #fff;
    z-index: 2;
`

const Stack = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
`

const Metadata = styled.p`
    font-size: var(--small4);
    color: #fff;
`

const list = [
    {
        title: "Benjo",
        image: "benjo.png",
        stack: ["HTML","CSS","JS","React","NodeJS"],
        platform: "web",
        year: "2024",
        slug: "benjo"
    },
    {
        title: "UNO",
        image: "uno.png",
        stack: ["HTML","CSS","JS","React","NodeJS"],
        platform: "web",
        year: "2024",
        slug: "uno"
    },
    {
        title: "Benjo - iOS",
        image: "benjomobile.png",
        stack: ["JS","ReactNative","NodeJS"],
        platform: "mobile",
        year: "2024",
        slug: "benjomobile"
    }
]

export default function Projects() {
    const router = useRouter();
    gsap.registerEase("customEase","M0,0 C0.075,0.82 0.165,1 1,1")
    const {projectTransition,clickedProject,setProjectTransition,loaded,about} = useStore();
    const [tilt,setTilt] = useState();
    const [currentText,setCurrentText] = useState("Benjo");
    const [currentStack,setCurrentStack] = useState(["HTML","CSS","JS","React","NodeJS"]);
    const [currentPlatform,setCurrentPlatform] = useState("Web");
    const [currentYear,setCurrentYear] = useState("2024");
    const [currentIndex,setCurrentIndex] = useState(0);
    const [lastScrollX, setLastScrollX] = useState(0);
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

    useEffect(() => {
        if (projectTransition) {
            gsap.to([bgRef.current,infoRef.current,projectRef.current.filter((el,i) => i !== clickedProject)], {
                opacity: 0,
                delay: 0.5,
                duration: 0.2,
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

    useEffect(() => {
        gsap.set(projectRef.current,{
            transform: 'rotateX(0deg)',
            delay: 0.9
        })
        gsap.set(projectRef.current,{
            transform: 'rotateX(0deg)',
        })
    },[])

    const handleScroll = (e) => {
        if (screenWidth < 768) return;
        const currentScrollX = document.documentElement.scrollTop;
        const scrollDirection = currentScrollX - lastScrollX;

        projectRef.current.forEach((el,i) => {
            const skewValue = scrollDirection > 0 ? scrollDirection  * 0.1: 1 * scrollDirection * 0.1;
            gsap.to(el, {
                transform: 'rotateX(' + skewValue *-1 + 'deg)',
                duration: 0.5,
                // ease: "power1.out",
                perspective: 1000
            });
        })
        setLastScrollX(currentScrollX);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    })

    useEffect(() => {
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
                delay: 1,
                duration: 1,
                ease: "customEase"
            })
    },[loaded])

    useEffect(() => {
            let lastIndex = 0;
            ScrollTrigger.create({
                trigger: listRef.current,
                start: screenWidth < 768 ? "top-=500 top" : "top-=400 top",
                end: screenWidth < 768 ? "bottom-=170 bottom" : "bottom-=600 bottom",
                onUpdate: (self) => {
                    const progress = self.progress;
                    const index = Math.floor(progress * (list.length - 1));
            
                    if (index !== lastIndex) {
                      lastIndex = index;
                        gsap.to(bgRef.current, {
                            opacity: 0,
                            duration: 0.3
                        })
                      gsap.to(infoRef.current, {
                        css: {
                            // transform: 'translate(-50%, -91%)'
                            filter: screenWidth > 768 ? "blur(10px) drop-shadow(0 0 20px #000)" : ""
                        },
                        duration: 0.1,
                        onComplete: () => {
                          setCurrentText(list[index].title);
                            setCurrentPlatform(list[index].platform);
                            setCurrentStack(list[index].stack);
                            setCurrentYear(list[index].year);
                            setCurrentIndex(index);
    
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
                }        
            })
    },[])

    const addPadding = () => {
        listRef.current.style.paddingBottom = "300px";
    }

    useEffect(() => {
        if (about) {
            gsap.to(wrapperRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    gsap.set(wrapperRef.current, {
                        display: "none"
                    })
                }
            })
        } else {
            gsap.set(wrapperRef.current, {
                display: "block"
            })
            gsap.set(projectRef.current, {
                transform: 'rotateX(0deg)'
            })
            gsap.to(wrapperRef.current, {
                opacity: 1,
                duration: 0.5,
            })
        }
    },[about])

    return (
        <Wrapper ref={wrapperRef}>
            {bgVisible && (
                <BackgroundBlur ref={bgRef}>
                    <BackgroundImage src={list[currentIndex].image} />
                </BackgroundBlur>
            )}
            <ProjectWrapper>
                <ProjectList ref={listRef}>
                    {list.map((project,i) => {
                        return (
                            <div key={i} ref={(el) => projectRef.current[i] = el} onClick={addPadding}>
                                <Project key={i} index={i} slug={project.slug} image={project.image} />
                            </div>
                        )
                    })}
                </ProjectList>
            </ProjectWrapper>
            <ProjectInfo ref={infoRef}>
                <Title >{currentText}</Title>
                <Stack>
                {currentStack.map((stack, i) => {
                    const IconComponent = {
                        HTML: FaHtml5,
                        CSS: FaCss3Alt,
                        JS: FaJs,
                        React: FaReact,
                        NodeJS: FaNodeJs,
                        ReactNative: TbBrandReactNative,
                    }[stack]; // Dynamically retrieve the icon component

                    return IconComponent ? (
                        <StackIcon key={i}>
                            {React.createElement(IconComponent)}
                        </StackIcon>
                    ) : null; // Render nothing if the icon is not found
                })}
                </Stack>
                <Metadata>{currentPlatform} - {currentYear}</Metadata>
            </ProjectInfo>
        </Wrapper>
    )
}
