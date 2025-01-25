'use client'
import gsap from "gsap"
import { useStore } from "@/store"
import { useEffect, useRef, useState } from "react"
import styled, { keyframes } from "styled-components";
import { useLenis } from "@studio-freight/react-lenis";
import Name from "@/components/Name";
import { usePathname } from "next/navigation";
import Render from "@/components/Render";
import styles from './About.module.css'

export default function About() {
    const {setAbout} = useStore();
    const wrapperRef = useRef(null);
    const text1Ref = useRef([]);
    const text2Ref = useRef([]);
    const frontendRef = useRef([]);
    const backendRef = useRef([]);
    const AboutText1 = "I am Bukvic Armin, a 22 year old semi-self taught Fullstack developer, always looking to make user experiences that stand out."
    const AboutText2 = "In my opinion it is always good to craft UIs/UXs that stand out from the rest, that are pleasing to look at and use, and that is something that I am aiming to achieve in all of my work."
    const Frontend = ["HTML/CSS","React","Next.JS","GSAP","Learning Three.JS"]
    const Backend = ["Node.JS","Express.JS","MongoDB","Know some mySQL","Websockets (socket.io)"]

    useEffect(() => {
            document.documentElement.style.backgroundColor = "#000000";
            gsap.set(wrapperRef.current, {
                opacity: 0,
            })
            gsap.set([text1Ref.current,text2Ref.current,frontendRef.current,backendRef.current], {
                opacity: 0
            })
            gsap.to(wrapperRef.current, {
                opacity: 1,
                duration: 0.3,
                delay: 0.3,
            })
            gsap.to([text1Ref.current], {
                opacity: 1,
                duration: 0.1,
                stagger: 0.01,
                delay: 0.3
            })
            gsap.to([text2Ref.current], {
                opacity: 1,
                duration: 0.1,
                stagger: 0.01,
                delay: 0.5
            })
            gsap.to(frontendRef.current, {
                opacity: 1,
                duration: 0.1,
                stagger: 0.02,
                delay: 0.7
            })
            gsap.to(backendRef.current, {
                opacity: 1,
                duration: 0.1,
                stagger: 0.02,
                delay: 0.9
            })
        }    
    ,[])

    useEffect(() => {
        setTimeout(() => {
            setAbout(false);
        }, 500);
    },[])

    return (
        <>
        <Name />
        <div className={styles.wrapper} ref={wrapperRef}>
            <div className={styles.auroraEffect} />
            {/* <Scroll> */}
            <Render />
            <div className={styles.aboutMe}>
                <div className={styles.subTitle}>ABOUT</div>
                <div className={styles.subText}>{AboutText1.split(" ").map((word, index) => <span ref={(el) => text1Ref.current[index] = el} key={index}>{word} </span>)}</div><br></br>
                <div className={styles.subText}>{AboutText2.split(" ").map((word, index) => <span ref={(el) => text2Ref.current[index] = el} key={index}>{word} </span>)}</div>
            </div>
            <div className={styles.skillsWrapper}>
            <div className={styles.skills}>
                <div className={styles.subTitle}>SKILLS | Frontend</div>
                {Frontend.map((skill, index) => <p className={styles.subText} ref={(el) => frontendRef.current[index] = el} key={index}>{skill}</p>)}
            </div>
            <div className={styles.skills}>
                <div className={styles.subTitle}>SKILLS | Backend</div>
                {Backend.map((skill, index) => <p className={styles.subText} ref={(el) => backendRef.current[index] = el} key={index}>{skill}</p>)}
            </div>
            </div>
            <div className={styles.contact}>
                <div className={styles.subTitle}>CONTACT</div>
                <a className={styles.link} href="https://linkedin.com/in/%C3%A1rmin-bukvity-0652261b8/" target="_blank">LinkedIn</a>
                <a className={styles.link} href="https://github.com/szt2bukarm" target="_blank">GitHub</a>
                <a className={styles.link} href="mailto:bukvicarmin@gmail.com">Email</a>
            </div>
            {/* </Scroll> */}
        </div>
        </>
    )
}