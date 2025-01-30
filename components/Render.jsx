import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStore } from "@/store";
import styles from "./Render.module.css";

const Model = ({ rotation }) => {
    const {model} = useStore();
    const modelRef = useRef();

  useEffect(() => {
    // Set the roughness for all meshes in the model
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.roughness = 1; // Adjust roughness as needed
        child.material.metalness = 0;
      }
    });
  }, [model]);

  useFrame((state,delta) => {
    if (modelRef.current) {
        modelRef.current.rotation.y += delta/3
    }
  })

  return (
    <primitive
      ref={modelRef}
      object={model}
      scale={[1, 1, 1]} // Adjust scale if necessary
    />
  );
};

export default function Render() {
    const wrapperRef = useRef(null);

    useGSAP(() => {
        gsap.to(wrapperRef.current, {
            opacity: 1,
            duration: 0.3,
            delay: 0.5
        })
    })

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
    <Canvas>
      <PerspectiveCamera
        makeDefault
        position={[0, 0.6, 2.2]}
      />
      <ambientLight intensity={3} />
      <Model />
    </Canvas>
    </div>
  );
}
