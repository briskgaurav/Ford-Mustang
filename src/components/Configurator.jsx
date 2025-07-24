import Image from "next/image";
import React, { useEffect, useState } from "react";
import Pallette from "./Pallette";
import EnvironmentPallette from "./EnvironmentPallette";
import CameraPallette from "./CameraPallette";

const buttonsArray = [
  {
    img: "/images/color.png",
    title: "Color",
  },
  {
    img: "/images/env.png",
    title: "Scene",
  },
  {
    img: "/images/vid.png",
    title: "Video",
  },
  {
    img: "/images/info.png",
    title: "Info",
  },
];

export default function Configurator({
  handleConfigButton,
  setData,
  data,
  setCameraPos,
  sliderStatus,
}) {
  const handleColors = (colorCode) => {
    setData({ ...data, color: colorCode });
  };

  const handleCamera = (cameraNumber, positions) => {
    setCameraPos(positions);
    setData({
      ...data,
      video: [{ id: `view${cameraNumber}`, cameraAngles: positions }],
    });
    // console.log(data);
  };
  const handleInteriorCamera = () => {
    if (sliderStatus === "Interior") {
      setCameraPos({
        x:0,
        y:-2,
        z:-2,
      });
    }
    if(sliderStatus === 'Exterior'){
      setCameraPos({
        x:0,
        y:0,
        z:70,
      });
    }
  };

  useEffect(() => {
    handleInteriorCamera();
  }, [sliderStatus]);

  return (
    <>
      <div
        className={`absolute z-[10] ${
          sliderStatus === "Interior"
            ? "pointer-events-none backdrop-blur-xs bg-white/20"
            : "pointer-events-auto"
        } left-0 pt-[1vw] pb-[.5vw] bottom-0 h-fit w-full bg-[#EBEBEB] shadow-2xl shadow-black backdrop-blur-md flex transition-all duration-2000 gap-[2.5vw] items-center justify-center`}
      >
        {buttonsArray.map((button, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center justify-center"
          >
            <div
              onClick={() => handleConfigButton(button.title)}
              className="w-[3vw] cursor-pointer h-[3vw]"
            >
              <Image
                alt={button.title}
                className="h-full w-full object-contain"
                src={button.img}
                height={100}
                width={100}
              />
            </div>
            <p className={` ${sliderStatus==='Interior' ? 'text-white' : 'text-blue-900'}  font-semibold text-sm`}>
              {button.title}
            </p>
          </div>
        ))}
      </div>
      <Pallette handleColors={handleColors} />
      <EnvironmentPallette />
      <CameraPallette handleCamera={handleCamera} />
    </>
  );
}
