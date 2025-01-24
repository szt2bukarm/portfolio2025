'use client'
import Projects from "@/components/projects/Projects";
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CustomEase from "gsap/CustomEase";
import gsap from "gsap";
import { useStore } from "@/store";
import Cover from "@/components/Cover";
import About from "@/components/About";
import { usePathname, useRouter } from "next/navigation";
gsap.registerPlugin(CustomEase);

const Name = styled.p`
  font-size: var(--small5);
  letter-spacing: 3px;
  font-family: "Mori-SemiBold";
  position: fixed;
  top: 20px;
  left: 20px;
  color: #fff;
  z-index: 3;
`;

const AboutButton = styled.p`
  font-size: var(--small5);
  letter-spacing: 3px;
  font-family: "Mori-SemiBold";
  position: fixed;
  top: 20px;
  right: 20px;
  color: #fff;
  z-index: 3;
  transition: color 0.3s ease;

  &:hover {
    cursor: pointer;
    color: #c5c5c5;
  }
`;

export default function PageWrapper({children}) {
  const pathname = usePathname();
  gsap.registerEase("customEase", "M0,0 C0.075,0.82 0.165,1 1,1");
  const nameRef = useRef(null);
  const { loaded, setAbout, about } = useStore();
  const aboutRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!loaded) {
      gsap.set(nameRef.current, {
        y: window.innerHeight * 0.7,
      });
    } else {
      gsap.to(nameRef.current, {
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "customEase",
      });
    }
  }, [loaded]);

  const handleAboutClick = () => {
    setAbout(true);
    gsap.to(aboutRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        router.push(pathname === "/about" ? "/" : "/about");
      },
    });
  };

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#000";
    if (pathname !== "/about") {
      gsap.to(aboutRef.current, {
        opacity: 1,
        duration: 0.3,
      })
    }
  }, [pathname]);

  return (
    <div>
      <Cover />
      {pathname == "/" && 
      <Name ref={nameRef}>BUKVIC ARMIN</Name>
      }
      <AboutButton ref={aboutRef} onClick={handleAboutClick}>
        ABOUT
      </AboutButton>
      {pathname === "/" ? <Projects /> : children}
    </div>
  );
}
