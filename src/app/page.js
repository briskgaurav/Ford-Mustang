"use client";
import React, { useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import Configurator from "@/components/Configurator";
import Experience from "@/components/Experience";
import Interface from "@/components/Interface";
import RaScreen from "@/components/RaScreen";
import InfoPopup from "@/components/InfoPopup";
import LoaderScreen from "@/components/LoaderScreen";
import useWebsiteLoader from "@/hooks/UseWebsiteLoader";
import { infoData } from "@/Functions/data";

export default function Page() {
  const { isLoaded, progress } = useWebsiteLoader();

  const [EnviornmentConfig, setEnviornmentConfig] = useState({
    hdri: false,
    light: false,
    intensityDay: 0.6,
    intensityNight: 4,
  });

  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, z: 0 });
  const [infoDataState, setInfoDataState] = useState(infoData);
  const [sliderStatus, setSliderStatus] = useState("Exterior");

  const [configButton, setConfigButtons] = useState({
    Color: false,
    Scene: false,
    Video: false,
    Info: false,
  });

  const [data, setData] = useState({
    color: "#C0C0C0",
    Env: "1",
    video: [
      {
        id: "view1",
        cameraAngles: { x: 0, y: 0, z: 0 },
      },
    ],
    info: false,
  });

  const handleConfigButton = useCallback((button) => {
    const isOn = !configButton[button];

    // Reset all buttons except the clicked one
    setConfigButtons({
      Color: false,
      Scene: false,
      Video: false,
      Info: false,
      [button]: isOn,
    });

    // Info toggle animation
    if (button === "Info") {
      gsap.to([".pallete", ".envPallete", ".cameraPallete"], {
        y: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setData((prev) => ({ ...prev, info: isOn }));
        },
      });
    } else {
      setData((prev) => ({ ...prev, info: false }));
    }

    const animations = {
      Color: ".pallete",
      Scene: ".envPallete",
      Video: ".cameraPallete",
    };

    Object.entries(animations).forEach(([key, selector]) => {
      gsap.to(selector, {
        y: button === key && isOn ? -110 : 0,
        opacity: button === key && isOn ? 1 : 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    });
  }, [configButton]);

  useEffect(() => {
    if (sliderStatus === "RA") {
      gsap.to(".ra", { opacity: 1, duration: 1, ease: "power2.inOut" });
    }
  }, [sliderStatus]);

  return (
    <>
      <LoaderScreen isLoaded={isLoaded} progress={progress} />

      <div className="relative h-screen w-full">
        {sliderStatus === "RA" && <RaScreen />}

        <Interface
          sliderStatus={sliderStatus}
          setSliderStatus={setSliderStatus}
          infoDataState={infoDataState}
        />

        <Configurator
          EnviornmentConfig={EnviornmentConfig}
          setEnviornmentConfig={setEnviornmentConfig}
          handleConfigButton={handleConfigButton}
          setData={setData}
          data={data}
          sliderStatus={sliderStatus}
          setCameraPos={setCameraPos}
          cameraPos={cameraPos}
        />

        <InfoPopup
          infoDataState={infoDataState}
          setInfoDataState={setInfoDataState}
        />

        <Experience
          cameraPos={cameraPos}
          EnviornmentConfig={EnviornmentConfig}
          setInfoDataState={setInfoDataState}
          infoDataState={infoDataState}
          setCameraPos={setCameraPos}
          data={data}
          sliderStatus={sliderStatus}
          setSliderStatus={setSliderStatus}
        />
      </div>
    </>
  );
}
