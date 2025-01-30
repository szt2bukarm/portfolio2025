'use client'
import { useStore } from "@/store"
import { useEffect, useRef } from "react"
import { CustomEase,ScrollTrigger } from "gsap/all"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Info from "@/components/projectPage/Info"
import Images from "@/components/projectPage/Images"
import Features from "@/components/projectPage/Features"
import Next from "@/components/projectPage/Next"
import Cover from "@/components/Cover"
import Links from "@/components/projectPage/Links"
import { useLenis } from "@studio-freight/react-lenis"
import Name from "@/components/Name"
gsap.registerPlugin(CustomEase)
gsap.registerPlugin(ScrollTrigger)
import styles from '../../public/ProjectPage.module.css'

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
        <div className={styles.wrapper} ref={wrapperRef}>
            <Cover />
            <Name />
            <div className={styles.imageWrapper} ref={imageRef}>
                <img className={styles.image} src="benjo.webp" alt="" />
            </div>
            {/* <Title title={"Benjo"} stack={["HTML", "CSS", "JS","React","NodeJS"]} year={"2024"} platform={"Web"} /> */}
            <Info title={"Benjo"} description={"Benjo is a music streaming app which takes Spotify metadata and matches it with the corresponding song on YouTube."} stack={["HTML", "CSS", "JS","React","NodeJS","Express","MongoDB","GSAP"]} year={"2024"} platform={"Web"} />
            <Images images={["benjo1.webp","benjo2.webp","benjo3.webp"]} />
            <Features features={["Music playback","User authentication","Search","Abilty to like tracks/albums","Ability to create playlists","Abilty to correct tracks in case of invalid indexing","Music recommendation using the Last.FM API"]} />
            
            <div ref={videoRef} style={{display:"block",width: "98%",height:"50vw",marginInline: "auto",pointerEvents:"none"}}>
            <iframe style={{width: "100%",height: "100%"}} src="https://player.vimeo.com/video/1048192700?h=b2349190ff&app_id=58479&muted=1&autoplay=1&loop=1&background=1" class="embed-content" frameBorder={0} ></iframe>
            </div>
            <Links frontend={"https://github.com/szt2bukarm/Benjov2/"} backend={"https://github.com/szt2bukarm/BenjoAPI"} demo={"https://benjov2.netlify.app/"} />

            <Next project={"UNO"} slug={"uno"} image={"uno.webp"} />
        </div>
    )   
}