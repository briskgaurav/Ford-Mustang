"use client";
import Configurator from "@/components/Configurator";
import Experience from "@/components/Experience";
import Interface from "@/components/Interface";
import React, { useState } from "react";
import gsap from "gsap";

export default function page() {
  const [configButton, setConfigButtons] = useState({
    Color: false,
    Scene: false,
    Video: false,
    Info: false,
  });
  const [data, setData] = useState({
    color: "#52667B",
    Env: "1",
    video: "1",
    info: "1",
  });

  // console.log(data)
  const handleConfigButton = (button) => {
    const isTogglingOn = !configButton[button];
  
    // Toggle only the clicked button
    setConfigButtons({
      Color: false,
      Scene: false,
      Video:false,
      [button]: isTogglingOn,
    });
  
    // Animate panels
    gsap.to(".pallete", {
      y: button === "Color" && isTogglingOn ? -110 : 0,
      duration: .5,
      ease: "power2.inOut",
    });
  
    gsap.to(".envPallete", {
      y: button === "Scene" && isTogglingOn ? -110 : 0,
      duration: .5,
      ease: "power2.inOut",
    });
    gsap.to(".cameraPallete", {
      y: button === "Video" && isTogglingOn ? -110 : 0,
      duration: .5,
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
      />

      <Experience data={data} />
    </div>
  );
}
