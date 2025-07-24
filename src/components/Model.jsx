"use client";
import { useGLTF, Center, useTexture } from "@react-three/drei";
import React, { useEffect } from "react";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import { applyBodyColor } from "@/Functions/ApplyBodyColor";
import { useThree } from "@react-three/fiber";
import gsap, { Expo } from 'gsap';

export default function Model({ data, cameraPos, setCameraPos }) {
  const { camera } = useThree();
  const { color, Env, video, info } = data;
  const mustangData = useGLTF("/model/car.glb");
  const { nodes, materials, scene } = mustangData;

  // console.log(nodes)
  useEffect(() => {
    setCameraPos({
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    });
  }, []);



  useEffect(() => {
    gsap.to(camera.position, {
      x: cameraPos.x,
      y: cameraPos.y, 
      z: cameraPos.z,
      duration: 2,
      ease: Expo,
    });
  }, [cameraPos]);


  useEffect(() => {
    if (!materials) return;

    applyBodyColor("ColorPrincipal", materials, color);
    applyBodyColor("ColorPrincipal2", materials, color);
  }, [color, materials]);

  return (
    <Center>
      <group rotation={[0, degToRad(0), 0]} scale={12} position={[0, -5, 0]}>
        {/* Renders full model */}
        <primitive object={scene} />
      </group>
    </Center>
  );
}
