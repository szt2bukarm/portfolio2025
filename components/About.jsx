import gsap from "gsap"
import { useStore } from "@/store"
import { useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components";
import { useLenis } from "@studio-freight/react-lenis";

// Define keyframes for the aurora animation
const auroraAnimation = keyframes`
  50% {
    background-position: 50% 50%;
  }
`;

// Styled-component for the aurora effect
const AuroraEffect = styled.div`
  --white: #fff;
  --black: #000;
  --color1: rgba(181, 59, 246, 0.56);
  --color2: rgba(129, 149, 248, 0.53);
  --color3: rgba(147, 239, 253, 0.5);
  --color4: rgba(195, 181, 253, 0.46);
  --color5: rgba(170, 96, 250, 0.5);
  --transparent: rgba(0, 0, 0, 0);

  --white-gradient: repeating-linear-gradient(
    110deg,
    var(--white) 0%,
    var(--white) 7%,
    var(--transparent) 10%,
    var(--transparent) 12%,
    var(--white) 16%
  );
  --dark-gradient: repeating-linear-gradient(
    110deg,
    var(--black) 0%,
    var(--black) 7%,
    var(--transparent) 10%,
    var(--transparent) 12%,
    var(--black) 16%
  );
  --aurora: repeating-linear-gradient(
    110deg,
    var(--color1) 10%,
    var(--color2) 15%,
    var(--color3) 20%,
    var(--color4) 25%,
    var(--color5) 30%
  );

  position: fixed;
  inset: -10px;
  background-image: var(--white-gradient), var(--aurora);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
  opacity: 0.3;
  filter: blur(10px) invert(1);
  pointer-events: none;
  will-change: transform;
  mask-image: radial-gradient(
    ellipse at 100% 0%,
    black 10%,
    var(--transparent) 70%
  );

  &.dark {
    background-image: var(--dark-gradient), var(--aurora);
    filter: blur(10px) invert(0);
  }

  &::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: var(--white-gradient), var(--aurora);
    background-size: 200%, 100%;
    background-attachment: fixed;
    mix-blend-mode: difference;
    animation: ${auroraAnimation} 60s infinite linear;
  }

  &.dark::after {
    background-image: var(--dark-gradient), var(--aurora);
  }
`;

const Wrapper = styled.div`
    /* top: 0; */
    margin-top: 150px;
    width: 100vw;
    padding: 20px;
    height: 200vh;
    /* min-height: 100dvh; */
    display: none;
    z-index: 5;
`

// const Content = styled.div`
//     /* height: calc(100dvh - 200px); */
//     width: 100%;
//     overflow-x: hidden;
//     overflow-y: scroll;
// `

const SubTitle = styled.p`
    font-size: var(--small5);
    font-family: "Mori-Regular";
    color: #c5c5c5;
    margin-bottom: 5px;
`

const SubText = styled.p`
    font-size: var(--small4);
    font-family: "Mori-Regular";
    color: #ffffff;
`

const AboutMe = styled.div`
    width: 520px;
    text-align: justify;
    margin-bottom: 50px;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

const Skills = styled.div`
    width: 250px;
    margin-bottom: 50px;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

const SkillsWrapper = styled.div`
    display: flex;
    gap: 20px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`

const Contact = styled.div`
    width: 500px;

    @media screen and (max-width: 768px) {
        width: 100%;

    }
`

const Link = styled.a`
    font-size: var(--small4);
    font-family: "Mori-Regular";
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    margin-right: 20px;

    &:hover {
        text-decoration: underline;
    }

    @media screen and (max-width: 768px) {
        display: block;
    }
`

const Scroll = styled.div`
    width: 100%;
    height: calc(100vh - 300px);
    overflow-y: scroll;
`

export default function About() {
    const {about} = useStore();
    const lenis = useLenis();
    const wrapperRef = useRef(null);
    const text1Ref = useRef([]);
    const text2Ref = useRef([]);
    const frontendRef = useRef([]);
    const backendRef = useRef([]);
    const auroraRef = useRef(null);
    const AboutText1 = "I am Bukvic Armin, a 22 year old semi-self taught Fullstack developer, always looking to make user experiences that stand out."
    const AboutText2 = "In my opinion it is always good to craft UIs/UXs that stand out from the rest, that are pleasing to look at and use, and that is something that I am aiming to achieve in all of my work."
    const Frontend = ["HTML/CSS","React","Next.JS","GSAP","Learning Three.JS"]
    const Backend = ["Node.JS","Express.JS","MongoDB","Know some mySQL","Websockets (socket.io)"]


    
    useEffect(() => {
        if (about) {
            gsap.set(wrapperRef.current, {
                display: "block",
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
        } else {
            gsap.to(wrapperRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    gsap.set(wrapperRef.current, {
                        display: "none",
                    })
                }
            })
        }
    })

    return (
        <Wrapper ref={wrapperRef}>
            <AuroraEffect />
            <Scroll>
            <AboutMe>
                <SubTitle>ABOUT</SubTitle>
                <SubText>{AboutText1.split(" ").map((word, index) => <span ref={(el) => text1Ref.current[index] = el} key={index}>{word} </span>)}</SubText><br></br>
                <SubText>{AboutText2.split(" ").map((word, index) => <span ref={(el) => text2Ref.current[index] = el} key={index}>{word} </span>)}</SubText>
            </AboutMe>
            <SkillsWrapper>
            <Skills>
                <SubTitle>SKILLS | Frontend</SubTitle>
                {Frontend.map((skill, index) => <SubText ref={(el) => frontendRef.current[index] = el} key={index}>{skill}</SubText>)}
            </Skills>
            <Skills>
                <SubTitle>SKILLS | Backend</SubTitle>
                {Backend.map((skill, index) => <SubText ref={(el) => backendRef.current[index] = el} key={index}>{skill}</SubText>)}
            </Skills>
            </SkillsWrapper>
            <Contact>
                <SubTitle>CONTACT</SubTitle>
                <Link href="https://linkedin.com/in/%C3%A1rmin-bukvity-0652261b8/" target="_blank">LinkedIn</Link>
                <Link href="https://github.com/szt2bukarm" target="_blank">GitHub</Link>
                <Link href="https://www.instagram.com/arminbukvic/" target="_blank">Instagram</Link>
                <Link href="https://facebook.com/armin.bukvic.39" target="_blank">Facebook</Link>
                <Link href="mailto:bukvicarmin@gmail.com">Email</Link>
            </Contact>
            </Scroll>
        </Wrapper>
    )
}