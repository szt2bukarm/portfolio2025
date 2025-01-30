'use client'
import { useStore } from "@/store"
import { useEffect, useRef } from "react"
import { CustomEase,ScrollTrigger } from "gsap/all"
import gsap from "gsap"
import Info from "@/components/projectPage/Info"
import Next from "@/components/projectPage/Next"
import Cover from "@/components/Cover"
import { useLenis } from "@studio-freight/react-lenis"
import Name from "@/components/Name"
gsap.registerPlugin(CustomEase)
gsap.registerPlugin(ScrollTrigger)
import styles from '../../public/ProjectPage.module.css'
import { useGSAP } from "@gsap/react"



export default function Benjo() {
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
            duration: 0.3
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
            delay: 0.3,
            height: "0vh",
            ease: "customEase",
        })
    })


    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <Cover />
            <Name />
            <div className={styles.imageWrapper} ref={imageRef}>
                <img className={styles.image} src="benjomobile.webp" alt="" />
            </div>
            <Info title={"Benjo - iOS"} description={"Benjo is a music streaming app which takes Spotify metadata and matches it with the corresponding song on YouTube, this time built for mobile."} stack={["JS","React Native","NodeJS","Express","MongoDB","Reanimated"]} year={"2024"} platform={"Mobile"} />
            
            <div ref={videoRef} style={{display:"block",width: "96%",height:"900px",borderRadius: "100px",overflow: "hidden",marginInline: "auto",pointerEvents:"none"}}>
            <iframe style={{width: "100%",height: "100%"}} src="https://player.vimeo.com/video/1048207311?h=cf7d4db334&app_id=58479&muted=1&autoplay=1&loop=1&background=1" className="embed-content" frameBorder={0} ></iframe>
            </div>

            <Next project={"Benjo"} slug={"benjo"} image={"benjo.webp"} />
        </div>
    )   
}