"use client";
import { useGLTF, Center, Html } from "@react-three/drei";
import React, { useEffect } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { applyBodyColor } from "@/Functions/ApplyBodyColor";
import { useThree } from "@react-three/fiber";
import gsap, { Expo } from "gsap";
import * as THREE from "three";

useGLTF.preload("/model/car.glb");

export default function Model({
  data,
  cameraPos,
  sliderStatus,
  setInfoDataState,
  infoDataState,
}) {
  const { camera } = useThree();
  const { color, Env, video, info } = data;
  const mustangData = useGLTF("/model/car.glb");
  const { nodes, materials, scene } = mustangData;
  const openedInfo = infoDataState.find((info) => info.isOpened);
  const currentIndex = infoDataState.indexOf(openedInfo);
  const currentCameraPosition = openedInfo
    ? infoDataState[currentIndex].cameraPosition
    : null;

  // position for Camera Config Button
  useEffect(() => {
    if (openedInfo === true) return;
    gsap.to(camera.position, {
      x: cameraPos.x,
      y: cameraPos.y,
      z: cameraPos.z,
      duration: 1.5,
      ease: Expo,
    });

    gsap.to(camera, {
      fov: sliderStatus === "Interior" ? 60 : 55,
      duration: 1.5,
      ease: Expo,
      onUpdate: () => {
        camera.updateProjectionMatrix();
      },
    });
  }, [cameraPos, sliderStatus]);

  // Position for info Camera Button
  useEffect(() => {
    gsap.to(camera.position, {
      x: currentCameraPosition ? currentCameraPosition.x : 20,
      y: currentCameraPosition ? currentCameraPosition.y : -50,
      z: currentCameraPosition ? currentCameraPosition.z : 50,
      duration: 1.5,
      ease: Expo,
    });
  }, [currentCameraPosition]);

  useEffect(() => {
    if (!materials) return;

    applyBodyColor("ColorPrincipal", materials, color);
    applyBodyColor("ColorPrincipal2", materials, color);
  }, [color, materials]);

  const handleInfo = (currentIndex) => {
    setInfoDataState(
      infoDataState.map((item, index) => {
        if (index === currentIndex) {
          return { ...item, isOpened: true };
        }
        return item;
      })
    );
  };
  return (
    <Center>
      <group rotation={[0, degToRad(0), 0]} scale={12} position={[0, -5, 0]}>
        {/* Renders full model */}
        <primitive object={scene} />

        {info === true &&
          openedInfo === undefined &&
          sliderStatus === "Exterior" && (
            <>
              {/* tire */}
              <Html occlude center position={[1, 0.3, 0]}>
                <div onClick={() => handleInfo(0)} className="button-style">
                  +
                </div>
              </Html>
              <Html occlude center position={[0.6, 0.4, -3.8]}>
                <div onClick={() => handleInfo(1)} className="button-style">
                  +
                </div>
              </Html>
              <Html occlude center position={[-0, 0.1, 0.8]}>
                <div onClick={() => handleInfo(2)} className="button-style">
                  +
                </div>
              </Html>
              <Html occlude center position={[-1, 0.3, -2.8]}>
                <div onClick={() => handleInfo(3)} className="button-style">
                  +
                </div>
              </Html>
            </>
          )}
      </group>
    </Center>
  );
}
