import Image from "next/image";
import React, { useState } from "react";
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

export default function Configurator({ handleConfigButton, setData,data}) {

  
  const handleColors = (colorCode)=>{
    setData({...data, color:colorCode})
  }
  const handleCamera = (CameraNumber)=>{

  }
  return (
    <>
      <div className="absolute z-[10] left-0 pt-[1vw] pb-[.5vw] bottom-0 h-fit w-full bg-[#EBEBEB] shadow-2xl shadow-black backdrop-blur-md flex gap-[2.5vw] items-center justify-center">
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
            <p className="text-blue-900 font-semibold text-sm">
              {button.title}
            </p>
          </div>
        ))}
      </div>
     <Pallette handleColors={handleColors} />
     <EnvironmentPallette  />
     <CameraPallette />
    </>
  );
}
