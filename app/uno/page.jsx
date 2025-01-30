'use client'
import { useStore } from "@/store"
import { useEffect, useRef } from "react"
import { CustomEase,ScrollTrigger } from "gsap/all"
import gsap from "gsap"
import Info from "@/components/projectPage/Info"
import Images from "@/components/projectPage/Images"
import Features from "@/components/projectPage/Features"
import Next from "@/components/projectPage/Next"
import Links from "@/components/projectPage/Links"
import Cover from "@/components/Cover"
import { useLenis } from "@studio-freight/react-lenis"
import Name from "@/components/Name"
gsap.registerPlugin(CustomEase)
gsap.registerPlugin(ScrollTrigger)
import styles from '../../public/ProjectPage.module.css'
import { useGSAP } from "@gsap/react"


export default function Uno() {
    const lenis = useLenis();
    gsap.registerEase("customEase","M0,0 C0.075,0.82 0.165,1 1,1")
    const {setProjectTransition,projectTransition,about} = useStore();
    const imageRef = useRef(null);
    const videoRef = useRef(null);
    const wrapperRef = useRef(null);

    useGSAP(() => {
        if (!about) return;
        gsap.to(wrapperRef.current, {
            opacity: 0,
            duration: 0.5
        })
    },[about])
    
    useEffect(() => {
        if (!lenis) return;
        setTimeout(() => {
            lenis.scrollTo(0, {
                immediate: true
            });
            lenis.stop();
            setTimeout(() => {
                lenis.start();
            }, 500);
        }, 10);
    },[lenis])
    
    useEffect(() => {
        document.title = "Benjo | Bukvic Armin"
    },[])

    useEffect(() => {
        if (projectTransition) {
            lenis.stop();
        }
    }, [projectTransition])
    

    useGSAP(() => {
        setProjectTransition(false);
        gsap.to(imageRef.current, {
            duration: 0.5,
            delay: 0.5,
            height: "0vh",
            ease: "customEase",
        })
    })

    useGSAP(() => {
        gsap.fromTo(
            videoRef.current,
            {
                opacity: 0,
                y: 20,
            },
            {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
                trigger: videoRef.current,
                start: "top 70%",
                end: "top 70%",
                toggleActions: "play none none reverse",
                
            }
        })
    })

    useEffect(() => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 600);
    },[])


    return (
        <div className={styles.container} ref={wrapperRef}>
            <Cover />
            <Name />
            <div className={styles.imageWrapper} ref={imageRef}>
                <img className={styles.image} src="uno.webp" alt="" />
            </div>
            <Info title={"UNO"} description={"A recreation of the popular card game UNO written in React. Multiplayer games are also supported through the use of Socket.io."} stack={["HTML", "CSS", "JS","React","NodeJS","GSAP","Socket.io"]} year={"2024"} platform={"Web"} />
            <Images images={["uno1.webp","uno2.webp","uno3.webp"]} />
            <Features features={["UNO gameplay","Multiplayer","2-8 player bot game","2-8 player multiplayer game"]} />
            
            <div ref={videoRef} style={{display:"block",width: "98%",height:"50vw",marginInline: "auto",pointerEvents:"none"}}>
            <iframe style={{width: "100%",height: "100%"}} src="https://player.vimeo.com/video/1048192761?h=e877b91123&app_id=58479&muted=1&autoplay=1&loop=1&background=1" class="embed-content" frameBorder={0} ></iframe>
            </div>
            <Links frontend={"https://github.com/szt2bukarm/uno"} backend={"https://github.com/szt2bukarm/uno-server"} demo={"https://szt2bukarm.github.io/uno-prod/"} />

            <Next project={"Benjo - iOS"} slug={"benjomobile"} image={"benjomobile.webp"} />
        </div>
    )   
}