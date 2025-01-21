import styled from "styled-components"
import gsap from "gsap"
import { CustomEase } from "gsap/all"
import { useRef } from "react"
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { useLenis } from "@studio-freight/react-lenis";
gsap.registerPlugin("CustomEase");

const Wrapper = styled.div`
    width: 50vw;
    height: 650px;
    z-index: 1;
    border-radius: 20px;
    overflow: hidden;

    @media screen and (max-width: 768px) {
        width: 90vw;
        height: 400px;
    }
    `

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`



export default function Project({index,slug,image}) {
    const lenis = useLenis();
    const Router = useRouter();
    const {setProjectTransition,projectTransition,setClickedProject} = useStore();
    gsap.registerEase("customEase","M0,0 C0.075,0.82 0.165,1 1,1")
    const wrapperRef = useRef(null);
    
    const handleClick = () => {
        if (projectTransition) return;
        lenis.stop();
        setClickedProject(index);
        setProjectTransition(true);
        // window.history.pushState(null, "", "/" + slug);
        gsap.to(wrapperRef.current, {
            scale: 0.98,
            filter: "brightness(200%)",
            duration: 0.1,
            onComplete: () => {
                gsap.to(wrapperRef.current, {
                    scale: 1,
                    filter: "brightness(100%)",
                    duration: 0.2
                })
            }
        })
        wrapperRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        })



        gsap.to(wrapperRef.current, {
            width: "100vw",
            height: "60vh",
            borderRadius: 0,
            filter: "brightness(50%)",
            duration: 1,
            ease: "customEase",
            delay: 1,
            onUpdate: () => {
                wrapperRef.current.scrollIntoView({
                  behavior: "auto",
                  block: "start",
                  inline: "nearest",
                });
              },
            onComplete: () => {
                Router.push(slug);
            }
        })
    }


    return (
        <Wrapper ref={wrapperRef} onClick={handleClick}>
            <Image src={image} />
        </Wrapper>
    )
}