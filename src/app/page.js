"use client";
import Configurator from "@/components/Configurator";
import Experience from "@/components/Experience";
import Interface from "@/components/Interface";
import React, { useState } from "react";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";

export default function page() {
  const [cameraPos, setCameraPos] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [configButton, setConfigButtons] = useState({
    Color: false,
    Scene: false,
    Video: false,
    Info: false,
  });
  const [data, setData] = useState({
    color: "#52667B",
    Env: "1",
    video: [
      {
        id: "view1",
        cameraAngles: {
          x: cameraPos.x,
          y: cameraPos.y,
          z: cameraPos.z,
        },
      },
    ],
    info: "1",
  });

  const handleConfigButton = (button) => {
    const isTogglingOn = !configButton[button];

    // Toggle only the clicked button
    setConfigButtons({
      Color: false,
      Scene: false,
      Video: false,
      [button]: isTogglingOn,
    });

    // Animate panels
    gsap.to(".pallete", {
      y: button === "Color" && isTogglingOn ? -110 : 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.to(".envPallete", {
      y: button === "Scene" && isTogglingOn ? -110 : 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(".cameraPallete", {
      y: button === "Video" && isTogglingOn ? -110 : 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="h-screen relative w-full">
      <Interface />
      <Configurator
        handleConfigButton={handleConfigButton}
        setData={setData}
        data={data}
        setCameraPos={setCameraPos}

      />

      <Experience
        cameraPos={cameraPos}
        setCameraPos={setCameraPos}
        data={data}
      />
    </div>
  );
}
