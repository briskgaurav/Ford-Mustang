import Image from "next/image";
import React, { useState } from "react";

export default function EnvironmentPallette({
  EnviornmentConfig,
  setEnviornmentConfig,
}) {
  const [hdriButton, setHdriButton] = useState(false);
  const [lightButton, setLightButton] = useState(false);

  const buttons = [
    {
      activeImg: "/images/EnvButtons/abstract-active.png",
      inactiveImg: "/images/EnvButtons/abstract.png",
      name: "Abstract",
      id: "abstract",
    },
    {
      activeImg: "/images/EnvButtons/landscape-active.png",
      inactiveImg: "/images/EnvButtons/landscape.png",
      name: "Landscape",
      id: "landscape",
    },
    {
      activeImg: "/images/EnvButtons/lights-active.png",
      inactiveImg: "/images/EnvButtons/lights.png",
      name: "Lights",
      id: "lights",
    },
  ];

  return (
    <div className="envPallete gap-[1vw] opacity-0 absolute left-0 bottom-0 z-[2] flex items-center justify-center max-md:gap-[2vw] max-sm:gap-[0vw] w-full">
      {/* Hdri Buttons */}
      <div className="flex flex-col items-center gap-1">
        <div
          className="w-[2.5vw] max-sm:w-[15vw] max-md:w-[10vw] max-sm:p-[2vw] cursor-pointer h-[2.5vw] max-sm:h-[15vw] max-md:h-[10vw] rounded-full"
          onClick={() => {
            setHdriButton(!hdriButton);
            setEnviornmentConfig({ ...EnviornmentConfig, hdri: !hdriButton });
          }}
        >
          <Image
            src={hdriButton ? buttons[0].activeImg : buttons[0].inactiveImg}
            alt={buttons[0].name}
            height={100}
            width={100}
          />
        </div>
        <p className="text-white max-md:text-lg text-xs">Abstract</p>
      </div>
      {/* 
      <div
        className="w-[2.5vw] cursor-pointer h-[2.5vw] rounded-full"
        onClick={() => setActiveButton(1)} 
      >
        <Image
          src={activeButton === 1 ? buttons[1].activeImg : buttons[1].inactiveImg}
          alt={buttons[1].name}
          height={100}
          width={100}
        />
      </div> */}

      {/* Light Buttons */}
      <div className="flex flex-col items-center gap-1">
        <div
          className="w-[2.5vw] max-sm:w-[15vw] max-md:w-[10vw] max-sm:p-[2vw] cursor-pointer h-[2.5vw] max-sm:h-[15vw] max-md:h-[10vw] rounded-full"
          onClick={() => {
            setLightButton(!lightButton);
            setEnviornmentConfig({ ...EnviornmentConfig, light: !lightButton });
          }}
        >
          <Image
            src={lightButton ? buttons[2].activeImg : buttons[2].inactiveImg}
            alt={buttons[2].name}
            height={100}
            width={100}
          />
        </div>
        <p className="text-white max-md:text-lg text-xs">Lights</p>
      </div>
    </div>
  );
}
