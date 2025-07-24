"use client";
import Configurator from "@/components/Configurator";
import Experience from "@/components/Experience";
import Interface from "@/components/Interface";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";
import RaScreen from "@/components/RaScreen";

export default function Page() {
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
      Info: false,
      [button]: isTogglingOn,
    });

    // Animate panels
    gsap.to(".pallete", {
      y: button === "Color" && isTogglingOn ? -110 : 0,
      opacity: button === "Color" && isTogglingOn ? 1 : 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.to(".envPallete", {
      y: button === "Scene" && isTogglingOn ? -110 : 0,
      opacity: button === "Scene" && isTogglingOn ? 1 : 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(".cameraPallete", {
      y: button === "Video" && isTogglingOn ? -110 : 0,
      opacity: button === "Video" && isTogglingOn ? 1 : 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const [sliderStatus, setSliderStatus] = useState("Exterior");
  useEffect(() => {
    if (sliderStatus === "RA") {
      gsap.to(".ra", {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [sliderStatus]);

  return (
    <div className="h-screen relative w-full">
      {sliderStatus === "RA" && <RaScreen />}
      <Interface
        sliderStatus={sliderStatus}
        setSliderStatus={setSliderStatus}
      />
      <Configurator
        handleConfigButton={handleConfigButton}
        setData={setData}
        data={data}
        sliderStatus={sliderStatus}
        setCameraPos={setCameraPos}
        cameraPos={cameraPos}
      />

      <Experience
        cameraPos={cameraPos}
        setCameraPos={setCameraPos}
        data={data}
        sliderStatus={sliderStatus}
        setSliderStatus={setSliderStatus}
      />
    </div>
  );
}
