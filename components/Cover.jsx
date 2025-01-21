import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { useStore } from "@/store";
gsap.registerPlugin(CustomEase);

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  z-index: 5;
  background-color: #161616;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  rotate: 180deg;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-family: Arial, sans-serif;
`;

const Loader = styled.p`
    font-size: var(--medium);
    font-family: "Mori-SemiBold";
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(180deg);
`

const fileNames = [
  "benjo.jpg",
  "uno.jpg",
  "benjomobile.jpg",
  "benjo1.png",
  "uno1.png",
  "benjo2.png",
  "uno2.png",
  "benjo3.png",
  "uno3.png",
];


export default function Cover() {
  const [progress, setProgress] = useState(0);
  const {setLoaded,loaded,lowerCover} = useStore();
  const coverRef = useRef(null);
  const [hideLoader,setHideLoader] = useState(loaded);
  gsap.registerEase("customEase", "M0,0 C0.075,0.82 0.165,1 1,1");


    useEffect(() => {
        if (lowerCover) {
            setHideLoader(false);
            setTimeout(() => {
                gsap.set(coverRef.current, {
                    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                })
                gsap.to(coverRef.current, {
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                    duration: 1,
                    ease: "customEase",
                })
            }, 1);
        }
    },[lowerCover])

  useEffect(() => {
    if (lowerCover) return;
    const preloadImages = async () => {
      const totalFiles = fileNames.length;
      let loadedFiles = 0;

      const updateProgress = () => {
        loadedFiles += 1;
        setProgress(Math.floor((loadedFiles / totalFiles) * 100));
      };

      const promises = fileNames.map((fileName) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = fileName;
          img.onload = () => {
            updateProgress();
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load ${fileName}`);
            updateProgress();
            resolve(); // Resolve even on error to avoid blocking the animation
          };
        });
      });

      try {
        await Promise.all(promises);
        setLoaded(true);
        gsap.set(coverRef.current, {
          clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
        });
        gsap.to(coverRef.current, {
          clipPath: "polygon(100% 100%, 0 100%, 0 100%, 100% 100%)",
          duration: 1,
          delay: 1,
          ease: "customEase",
          onComplete: () => setProgress(100),
        });
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    preloadImages();
  }, []);

  return (
    <>
    {!hideLoader && (
        <Wrapper ref={coverRef}>
            {!lowerCover && <Loader>{progress}%</Loader>}
        </Wrapper>
    )}
    </>
  );
}
