"use client";
import { useGLTF, Center, useTexture } from "@react-three/drei";
import React, { useEffect } from "react";
import { degToRad } from "three/src/math/MathUtils";
import * as THREE from "three";

export default function Model({ data }) {
  const { color, Env, video, info } = data;
  const mustangData = useGLTF("/model/Mustang.glb");
  const {nodes, materials, scene} = mustangData;
  const texture = useTexture("/images/skybox_day.jpg");
  console.log(mustangData);
  useEffect(() => {
    if (!materials) return;
  
    const applyBodyColor = (name) => {
      const mat = materials[name];
      if (mat && mat instanceof THREE.MeshStandardMaterial) {
        // Upgrade to MeshPhysicalMaterial if not already
        const newMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(color),
          metalness: 0.9,
          roughness: 0.05,
          clearcoat: 1.0,
          clearcoatRoughness: 0.03,
          reflectivity: 1.0,
          envMapIntensity: 2.0,
          ior: 1.5,
          transmission: 0, // set > 0 for glass-like
        });
    
        // Copy other existing values if needed
        Object.assign(mat, newMaterial);
      }
    };
    
    applyBodyColor("ColorPrincipal");
    applyBodyColor("ColorPrincipal2");
  
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
