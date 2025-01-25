import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { DirectionalLight } from "three";
import gsap from "gsap";
import styled from "styled-components";
import { useStore } from "@/store";

const Wrapper = styled.div`
    width: 50vw;
    height: 100vh;
    position: absolute;
    left: 50vw;
    top: 0;
    pointer-events: none;

    @media screen and (max-width: 1100px) {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 100vw;
        height: 70vh;
}`

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
//   const { x, y, z } = useControls("Camera Position", {
//     x: { value: 5, min: -10, max: 10 },
//     y: { value: 5, min: -10, max: 10 },
//     z: { value: 5, min: -10, max: 10 },
//   });

//   const rotation = useControls("Model Rotation", {
//     x: { value: 0, min: 0, max: Math.PI * 2 },
//     y: { value: 0, min: 0, max: Math.PI * 2 },
//     z: { value: 0, min: 0, max: Math.PI * 2 },
//   });

    const wrapperRef = useRef(null);

    useEffect(() => {
        gsap.to(wrapperRef.current, {
            opacity: 1,
            duration: 0.3,
            delay: 0.5
        })
    })

  return (
    <Wrapper ref={wrapperRef}>
    <Canvas>
      <PerspectiveCamera
        makeDefault
        position={[0, 0.6, 2.2]}
      />
      {/* <directionalLight position={[-0.8, 0.8, 2.5]} intensity={1} /> */}
      <ambientLight intensity={3} />
      <Model />
    </Canvas>
    </Wrapper>
  );
}
