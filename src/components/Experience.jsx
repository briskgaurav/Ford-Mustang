"use client";

import { Canvas, useThree, extend } from "@react-three/fiber";
import React, { useEffect } from "react";
import Model from "./Model";
import { Environment, OrbitControls} from "@react-three/drei";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import * as THREE from "three";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

export default function Experience({
  data,
  cameraPos,
  setCameraPos,
  sliderStatus,
  setInfoDataState,
  infoDataState,
  EnviornmentConfig,
}) {
  return (
    <Canvas
      className="model"
      flat
      dpr={[1, 2]}
      shadows
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
        // toneMappingExposure: 1.2,
        outputEncoding: THREE.sRGBEncoding,
      }}
      camera={{
        fov: 55,
        position: [20, -50, 50],
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
        files={
          EnviornmentConfig.hdri
            ? "/images/skybox_night.jpg"
            : "/images/skybox_day.jpg"
        }
        background
        intensity={
          EnviornmentConfig.hdri
            ? EnviornmentConfig.intensityNight
            : EnviornmentConfig.intensityDay
        }
        environmentRotation={degToRad(-20)}
      />

      <directionalLight
        position={[10, 20, 10]}
        intensity={3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <ambientLight intensity={3} />

      <Model
        EnviornmentConfig={EnviornmentConfig}
        cameraPos={cameraPos}
        setCameraPos={setCameraPos}
        sliderStatus={sliderStatus}
        data={data}
        infoDataState={infoDataState}
        setInfoDataState={setInfoDataState}
      />

      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
          height={300}
        />
        
      </EffectComposer>

    </Canvas>
  );
}
