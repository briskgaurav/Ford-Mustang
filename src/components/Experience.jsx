"use client";

import { Canvas } from "@react-three/fiber";
import React from "react";
import Model from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import * as THREE from "three";

export default function Experience({ data }) {
  return (
    <Canvas
      className="model"
      flat
      shadows
      gl={{ toneMapping: THREE.ACESFilmicToneMapping, outputEncoding: THREE.sRGBEncoding }}
      camera={{
        fov: 55,
        position: [0, -50, 50],
        rotation: [degToRad(-102), 0, 0],
      }}
    >
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 5, 0]}
      />
      <Environment
        files="/images/skybox_day.jpg"
        background
      environmentIntensity={.6}
      />

      <directionalLight position={[10, 10, 5]} intensity={3} />

      <Model data={data} />
    </Canvas>
  );
}
