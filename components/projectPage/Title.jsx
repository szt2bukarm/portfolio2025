import React, { useEffect, useRef } from "react"
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs } from 'react-icons/fa'
import { TbBrandReactNative } from "react-icons/tb"
import { useStore } from "@/store"
import gsap from "gsap"
import { CustomEase } from "gsap/all"
import styles from './Title.module.css'

gsap.registerPlugin(CustomEase)

export default function Title({ title, stack, year, platform }) {
    gsap.registerEase("customEase", "M0,0 C0.075,0.82 0.165,1 1,1")
    const titleRef = useRef(null)
    const stackRef = useRef([])
    const metaRef = useRef(null)
    const wrapperRef = useRef(null)
    const { loaded } = useStore()

    useEffect(() => {
        if (!loaded) return
        gsap.set(wrapperRef.current, { opacity: 1, delay: 0.1 })
        gsap.set([titleRef.current, metaRef.current], { y: 110 })
        gsap.set(stackRef.current, { opacity: 0 })
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
        gsap.to([titleRef.current, metaRef.current], {
            y: -120,
            duration: 1.3,
            delay: 2.5,
            ease: "customEase",
        })
        gsap.to(wrapperRef.current, {
            display: "none",
            delay: 2.15,
        })
        gsap.to(stackRef.current, {
            opacity: 0,
            stagger: 0.05,
            duration: 0.3,
            delay: 2.5,
            ease: "customEase",
        })
    }, [loaded])

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <div className={styles.textWrapper}>
                <p ref={titleRef} className={styles.titleText}>{title}</p>
            </div>
            <div className={styles.textWrapper}>
                <p ref={metaRef} className={styles.metadata}>
                    {platform} | {year}
                </p>
            </div>
            <div className={styles.stackWrapper}>
                {stack.map((stack, i) => {
                    const IconComponent = {
                        HTML: FaHtml5,
                        CSS: FaCss3Alt,
                        JS: FaJs,
                        React: FaReact,
                        NodeJS: FaNodeJs,
                        ReactNative: TbBrandReactNative,
                    }[stack]

                    return IconComponent ? (
                        <span key={i} ref={(el) => (stackRef.current[i] = el)} className={styles.stackIcon}>
                            {React.createElement(IconComponent)}
                        </span>
                    ) : null
                })}
            </div>
        </div>
    )
}
