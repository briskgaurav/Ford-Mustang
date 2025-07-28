"use client";
import Configurator from "@/components/Configurator";
import Experience from "@/components/Experience";
import Interface from "@/components/Interface";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import RaScreen from "@/components/RaScreen";
import { infoData } from "@/Functions/data";
import InfoPopup from "@/components/InfoPopup";
import LoaderScreen from "@/components/LoaderScreen";
import useWebsiteLoader from "@/hooks/UseWebsiteLoader";

export default function Page() {
  const { isLoaded } = useWebsiteLoader(); // ✅ important

  const [EnviornmentConfig, setEnviornmentConfig] = useState({
    hdri: false,
    light: false,
    intensityDay: 0.6,
    intensityNight: 4,
  });

  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, z: 0 });
  const [infoDataState, setInfoDataState] = useState(infoData);

  const [configButton, setConfigButtons] = useState({
    Color: false,
    Scene: false,
    Video: false,
    Info: false,
  });

  const [data, setData] = useState({
    color: "#000000",
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
    info: false,
  });

  const handleConfigButton = (button) => {
    const isTogglingOn = !configButton[button];

    setConfigButtons({
      Color: false,
      Scene: false,
      Video: false,
      Info: false,
      [button]: isTogglingOn,
    });

    if (button === "Info") {
      gsap.to([".pallete", ".envPallete", ".cameraPallete"], {
        y: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setData((prev) => ({
            ...prev,
            info: isTogglingOn,
          }));
        },
      });
    }

    setData((prev) => ({
      ...prev,
      info: false,
    }));

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
    <>
      {/* ✅ Pass isLoaded here */}
      <LoaderScreen isLoaded={isLoaded} />

      <div className="h-screen relative w-full">
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
