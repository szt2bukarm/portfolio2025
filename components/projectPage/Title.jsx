import styled from "styled-components"
import { FaHtml5,FaCss3Alt,FaJs,FaReact,FaNodeJs } from 'react-icons/fa'
import { TbBrandReactNative } from "react-icons/tb";
import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { useStore } from "@/store";
gsap.registerPlugin(CustomEase)

const Wrapper = styled.div`
    width: 100vw;
    min-height: 40vh;
    min-height: 40dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    opacity: 0;

    @media screen and (max-width: 768px) {
        min-height: 30vh;
        min-height: 30dvh;
    }
`

const TextWrapper = styled.div`
    min-height: 100%;
    overflow: hidden;
`

const TitleText = styled.p`
    font-size: var(--medium);
    font-family: "Mori-SemiBold";
    color: #fff;

    @media screen and (max-width: 768px) {
        font-size: var(--medium3);
    }
`

const StackWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const StackIcon = styled.span`
    font-size: var(--small2);
    width: var(--small2);
    height: var(--small2);
    color: #fff;
`


const Metadata = styled.p`
    font-size: var(--small4);
    font-family: "Mori-SemiBold";
    color: #fff;
`

export default function Title({title,stack,year,platform}) {
    gsap.registerEase("customEase","M0,0 C0.075,0.82 0.165,1 1,1")
    const titleRef = useRef(null);
    const stackRef = useRef([]);
    const metaRef = useRef(null);
    const wrapperRef = useRef(null);
    const {loaded} = useStore();

    useEffect(() => {
        console.log(loaded)
        if (!loaded) return
        gsap.set(wrapperRef.current, {
            opacity: 1,
            delay: 0.1
        })
        gsap.set([titleRef.current,metaRef.current], {
            y: 110,
        })
        gsap.set(stackRef.current, {
            opacity: 0,
        })
        gsap.to(titleRef.current, {
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: "customEase",
        })
        gsap.to(metaRef.current, {
            y: 0,
            duration: 1,
            delay: 0.6,
            ease: "customEase",
        })
        gsap.to(stackRef.current, {
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            delay: 1,
            ease: "customEase",
        })


        gsap.to([titleRef.current,metaRef.current], {
            y: -120,
            duration: 1.3,
            delay: 2.5,
            ease: "customEase",
        })
        gsap.to(wrapperRef.current, {
            display: "none",
            delay: 2.15
        })
        gsap.to(stackRef.current, {
            opacity: 0,
            stagger: 0.05,
            duration: 0.3,
            delay: 2.5,
            ease: "customEase",
        })
       
    },[loaded])

    return (
        <Wrapper ref={wrapperRef}>
            <TextWrapper>
            <TitleText ref={titleRef}>{title}</TitleText>
            </TextWrapper>
            <TextWrapper>
            <Metadata ref={metaRef}>{platform} | {year}</Metadata>
            </TextWrapper>
            <StackWrapper>
            {stack.map((stack, i) => {
                    const IconComponent = {
                        HTML: FaHtml5,
                        CSS: FaCss3Alt,
                        JS: FaJs,
                        React: FaReact,
                        NodeJS: FaNodeJs,
                        ReactNative: TbBrandReactNative,
                    }[stack]; 

                    return IconComponent ? (
                        <StackIcon key={i} ref={(el) => stackRef.current[i] = el}>
                            {React.createElement(IconComponent)}
                        </StackIcon>
                    ) : null;
                })}
            </StackWrapper>
        </Wrapper>
    )
}