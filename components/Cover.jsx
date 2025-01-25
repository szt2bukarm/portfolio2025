import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { useStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { useGLTF } from "@react-three/drei";
gsap.registerPlugin(CustomEase);
import styles from "./Cover.module.css";

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
  const {setModel} = useStore();
  const {setLoaded,loaded,lowerCover,setLowerCover} = useStore();
  const coverRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  let scene;
  if(typeof window !== "undefined") {
     scene = useGLTF("model.glb").scene;
  }
  const [hideLoader,setHideLoader] = useState(loaded);
  gsap.registerEase("customEase", "M0,0 C0.075,0.82 0.165,1 1,1");

  useEffect(() => {
    if (scene) setModel(scene)
  },[scene])

    useEffect(() => {
        if (lowerCover) {
            setHideLoader(false);
            setTimeout(() => {
                gsap.set(coverRef.current, {
                    top: window.innerHeight * 1.3
                })
                gsap.to(coverRef.current, {
                  top: 0,
                  duration: 0.5,
                  ease: "customEase",
                  onComplete: () => {
                    router.push("/")
                    setTimeout(() => {
                        setHideLoader(true);
                        setLowerCover(false);
                    }, 1000);
                  }
                })
            }, 1);
        }
    },[lowerCover])

  useEffect(() => {
    if (lowerCover || loaded) return;
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
          top: 0
        });
        gsap.to(coverRef.current, {
          top: window.innerHeight * -1.3,
          duration: 1,
          delay: 0.25,
          ease: "customEase",
          onComplete: () => setProgress(100),
        });
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (loaded) {
      gsap.to(coverRef.current, {
        top: window.innerHeight * -1.3,
        duration: 1,
        delay: 0.25,
        ease: "customEase",
      });
    }
  },[pathname])

  return (
    <>
    {!hideLoader && (
        <div className={styles.wrapper} ref={coverRef}>
        </div>
    )}
    </>
  );
}
