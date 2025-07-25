"use client";

import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import Model from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import * as THREE from "three";

export default function Experience({
  data,
  cameraPos,
  setCameraPos,
  sliderStatus,
  setInfoDataState,
  infoDataState,
  EnviornmentConfig,
}) {

  // useEffect(() => {
  //  console.log(EnviornmentConfig)
  // }, [EnviornmentConfig])
  
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
        minPolarAngle={
          sliderStatus === "Interior" ? Math.PI / 2.1 : Math.PI / 2.5
        }
        maxPolarAngle={
          sliderStatus === "Interior" ? Math.PI / 1.9 : Math.PI / 2.2
        }
        target={[0, 5, 0]}
        enableDamping={true}
        minAzimuthAngle={
          sliderStatus === "Interior" ? Math.PI / 1.5 : -Infinity
        }
        maxAzimuthAngle={
          sliderStatus === "Interior" ? -Math.PI / 1.5 : Infinity
        }
      />
      <Environment
        files={EnviornmentConfig.hdri ? "/images/skybox_night.jpg" : "/images/skybox_day.jpg"}
        background
        environmentIntensity={EnviornmentConfig.hdri ? EnviornmentConfig.intensityNight : EnviornmentConfig.intensityDay}
        environmentRotation={degToRad(-20)}
      />

      <directionalLight position={[10, 10, 5]} intensity={1} />

      <Model
        cameraPos={cameraPos}
        setCameraPos={setCameraPos}
        sliderStatus={sliderStatus}
        data={data}
        infoDataState={infoDataState}
        setInfoDataState={setInfoDataState}
      />
    </Canvas>
  );
}
