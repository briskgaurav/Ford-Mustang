"use client";

import { Canvas } from "@react-three/fiber";
import React from "react";
import Model from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import * as THREE from "three";

export default function Experience({ data, cameraPos, setCameraPos, sliderStatus }) {
  return (
    <Canvas
      className="model"
      flat
      shadows
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        outputEncoding: THREE.sRGBEncoding,
      }}
      camera={{
        fov: 55,
        position: [20, -50, 50],
        rotation: [degToRad(-0), 0, 0],
      }}
    >
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={sliderStatus === "Interior" ? Math.PI / 2.1 : Math.PI / 2.5}
        maxPolarAngle={sliderStatus === "Interior" ? Math.PI / 1.9 : Math.PI / 2.2}
        target={[0, 5, 0]}
        enableDamping={true}
        
        
        minAzimuthAngle={sliderStatus === "Interior" ? Math.PI / 1.5 : -Infinity}
        maxAzimuthAngle={sliderStatus === "Interior" ? -Math.PI/1.5: Infinity}
      />
      <Environment
        files="/images/skybox_day.jpg"
        background
        environmentIntensity={0.6}
      />

      <directionalLight position={[10, 10, 5]} intensity={3} />

      <Model cameraPos={cameraPos} setCameraPos={setCameraPos} sliderStatus={sliderStatus} data={data} />
    </Canvas>
  );
}
