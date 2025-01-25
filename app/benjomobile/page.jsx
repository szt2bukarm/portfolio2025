'use client'
import Title from "@/components/projectPage/Title"
import { useStore } from "@/store"
import { useEffect, useRef } from "react"
import styled from "styled-components"
import { CustomEase,ScrollTrigger } from "gsap/all"
import gsap from "gsap"
import Info from "@/components/projectPage/Info"
import Next from "@/components/projectPage/Next"
import Cover from "@/components/Cover"
import { useRouter } from "next/navigation"
import { useLenis } from "@studio-freight/react-lenis"
import Name from "@/components/Name"
gsap.registerPlugin(CustomEase)
gsap.registerPlugin(ScrollTrigger)

const Wrapper = styled.div`
    width: 100vw;
    min-height: 100%;
    background-color: #000;
`


const ImageWrapper = styled.div`
    width: 100vw;
    height: 60vh;
    filter: brightness(50%);
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export default function Benjo() {
    const lenis = useLenis();
    gsap.registerEase("customEase","M0,0 C0.075,0.82 0.165,1 1,1")
    const {setProjectTransition,projectTransition,about} = useStore();
    const imageRef = useRef(null);
    const videoRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (about) {
            gsap.to(wrapperRef.current, {
                opacity: 0,
                duration: 0.5
            })
        }
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
        }, 3000);
        }, 10);
    },[lenis])

    useEffect(() => {
        document.title = "Benjo - iOS | Bukvic Armin"
      }, []);


    useEffect(() => {
        if (projectTransition) {
            lenis.stop();
        }
    }, [projectTransition])
    
    useEffect(() => {
        setProjectTransition(false);
            gsap.to(imageRef.current, {
                duration: 0.5,
                delay: 2.5,
                height: "0vh",
                ease: "customEase",
            })
    }, [])

    useEffect(() => {
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
                delay: 3.3
            })    
    },[])


    return (
        <Wrapper ref={wrapperRef}>
            <Cover />
            <Name />
            <ImageWrapper ref={imageRef}>
                <Image src="benjomobile.jpg" alt="" />
            </ImageWrapper>
            <Title title={"Benjo - iOS"} stack={["JS","ReactNative","NodeJS"]} year={"2024"} platform={"Mobile"} />
            <Info title={"Benjo - iOS"} description={"Benjo is a music streaming app which takes Spotify metadata and matches it with the corresponding song on YouTube, this time built for mobile."} stack={["JS","React Native","NodeJS","Express","MongoDB","Reanimated"]} year={"2024"} platform={"Mobile"} />
            {/* <Images images={["benjo1.png","benjo2.png","benjo3.png"]} /> */}
            {/* <Features features={["Music playback","User authentication","Search","Abilty to like tracks/albums","Ability to create playlists","Abilty to correct tracks in case of invalid indexing","Music recommendation using the Last.FM API"]} /> */}
            
            <div ref={videoRef} style={{display:"block",width: "96%",height:"900px",borderRadius: "100px",overflow: "hidden",marginInline: "auto",pointerEvents:"none"}}>
            <iframe style={{width: "100%",height: "100%"}} src="https://player.vimeo.com/video/1048207311?h=cf7d4db334&app_id=58479&muted=1&autoplay=1&loop=1&background=1" class="embed-content" frameBorder={0} ></iframe>
            </div>

            <Next project={"Benjo"} slug={"benjo"} image={"benjo.jpg"} />
        </Wrapper>
    )   
}