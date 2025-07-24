import Image from "next/image";
import React from "react";

export default function EnvironmentPallette() {
  const buttons = [
    {
      img: "/images/EnvButtons/abstract.png",
      name: "Abstract",
      id: "abstract",
    },
    {
      img: "/images/EnvButtons/landscape.png",
      name: "Landscape",
      id: "landscape",
    },
    {
      img: "/images/EnvButtons/lights.png",
      name: "Lights",
      id: "lights",
    },
  ];
  return (
    <div className="envPallete gap-[1vw] opacity-0 absolute left-0 bottom-0 z-[2] flex items-center justify-center w-full">
      {buttons.map((col, index) => (
        <div
          key={index}
          className="w-[2.5vw] cursor-pointer h-[2.5vw] rounded-full"

        >
          <Image src={col.img} alt={col.name} height={100} width={100} />
        </div>
      ))}
    </div>
  );
}
