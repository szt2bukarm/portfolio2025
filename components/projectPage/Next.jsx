import styled from "styled-components"
import gsap from "gsap"
import { useRef } from "react"
import { CustomEase } from "gsap/all"
import { useStore } from "@/store"
import { useRouter } from "next/navigation"
gsap.registerPlugin(CustomEase)

const Wrapper = styled.div`
    position: relative;
    width: 100vw;
    min-height: 100%;
    margin-top: 50px;
`

const ImageWrapper = styled.div`
    width: 100vw;
    height: 60vh;
    filter: brightness(50%);
    transition: filter 0.5s cubic-bezier(.075,.82,.165,1);

    &:hover {
        cursor: pointer;
        filter: brightness(100%);
    }
`

const SeeNext = styled.p`
    font-size: var(--small2);
    font-family: "Mori-SemiBold";
    position: absolute;
    top: 38%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    z-index: 3;
    text-shadow: 0 0 10px #000;
    pointer-events: none;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const Title = styled.p`
    font-size: var(--medium);
    font-family: "Mori-SemiBold";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    z-index: 3;
    text-shadow: 0 0 10px #000;
    pointer-events: none;

    @media screen and (max-width: 768px) {
        font-size: var(--medium3);
        width: 90%;
        text-align: center;
    }
`

export default function Next({project,slug,image}) {
    const {setProjectTransition,projectTransition} = useStore();
    const wrapperRef = useRef(null);
    const textRef = useRef(null);
    gsap.registerEase("customEase","M0,0 C0.075,0.82 0.165,1 1,1")
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
        <Wrapper ref={wrapperRef} onClick={handleClick} style={{pointerEvents: projectTransition ? "none" : "auto"}}>
            <div ref={textRef}>
            <SeeNext>SEE NEXT</SeeNext>
            <Title>{project}</Title>
            </div>
            <ImageWrapper>
                <Image src={image} />
            </ImageWrapper>
        </Wrapper>
    )
}