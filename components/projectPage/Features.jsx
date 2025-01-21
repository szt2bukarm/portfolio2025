import styled from "styled-components"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const Wrapper = styled.div`
    width: 96%;
    min-height: 100%;
    margin-inline: auto;
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    flex-direction: column;
    margin-bottom: 10px;
`

const Title = styled.p`
    font-size: var(--small5);
    font-family: "Mori-SemiBold";
    color: #c5c5c5;
    margin-bottom: 5px;
`

const Feature = styled.p`
    font-size: var(--small4);
    font-family: "Mori-Regular";
    color: #fff;
    margin-block: 5px;
    /* text-align: center; */
`

const FeatureList = styled.div`
    display: flex;
    column-gap: 60px;
    flex-wrap: wrap;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`

export default function Features({features}) {
    const wrapperRef = useRef(null);
    const featureRef = useRef([]);
    useEffect(() => {
        setTimeout(() => {
            gsap.fromTo(
                wrapperRef.current,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top 70%",
                        end: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                }
            )
    
            gsap.fromTo(
                featureRef.current,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top 70%",
                        end: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                }
            )    
        }, 3300);
    },[])

    return (
        <Wrapper ref={wrapperRef}>
            <Title>FEATURES</Title>
            <FeatureList>
            {features.map((feature,i) => <Feature ref={(el) => featureRef.current[i] = el} key={i}>{feature}</Feature>)}
            </FeatureList>
        </Wrapper>
    )
}