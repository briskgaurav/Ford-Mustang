import Image from "next/image";
import React, { useEffect, useCallback, useState } from "react";
import Pallette from "./Pallette";
import EnvironmentPallette from "./EnvironmentPallette";
import CameraPallette from "./CameraPallette";

const buttonsArray = [
  { img: "/images/color.png", title: "Color" },
  { img: "/images/env.png", title: "Scene" },
  { img: "/images/vid.png", title: "Video" },
  { img: "/images/info.png", title: "Info" },
];

export default function Configurator({
  handleConfigButton,
  setData,
  data,
  setCameraPos,
  sliderStatus,
  EnviornmentConfig,
  setEnviornmentConfig,
}) {
  const [activeButton, setActiveButton] = useState({ state: false, id: null });

  // ✅ Set car body color
  const handleColors = useCallback((colorCode) => {
    setData((prev) => ({ ...prev, color: colorCode }));
  }, [setData]);

  // ✅ Update camera from camera palette
  const handleCamera = useCallback((cameraNumber, positions) => {
    const safePosition = positions || { x: 0, y: 0, z: 70 };
    setCameraPos(safePosition);
    setData((prev) => ({
      ...prev,
      video: [{ id: `view${cameraNumber}`, cameraAngles: safePosition }],
    }));
  }, [setCameraPos, setData]);

  // ✅ Auto-handle camera position based on current slider tab
  useEffect(() => {
    if (sliderStatus === "Interior") {
      setCameraPos({ x: 0.8, y: 0.5, z: -3 });
    } else if (sliderStatus === "Exterior") {
      setCameraPos({ x: 0, y: 0, z: 70 });
    } else {
      console.warn("Unhandled sliderStatus:", sliderStatus);
    }
  }, [sliderStatus, setCameraPos]);

  return (
    <>
      {/* Toolbar */}
      <div
        className={`absolute z-[10] left-0 bottom-0 pt-[1vw] pb-[.5vw] w-full shadow-2xl backdrop-blur-md flex gap-[2.5vw] items-center justify-center transition-colors duration-500 ${
          sliderStatus === "Interior" || EnviornmentConfig.hdri
            ? "bg-white/20"
            : "bg-[#EBEBEB]"
        }`}
      >
        {buttonsArray.map((button, index) => {
          const isActive = activeButton.state && activeButton.id === button.title;

          return (
            <div key={index} className="flex flex-col gap-2 items-center justify-center">
              <button
                onClick={() => {
                  handleConfigButton(button.title);
                  setActiveButton((prev) =>
                    prev.id === button.title
                      ? { state: !prev.state, id: button.title }
                      : { state: true, id: button.title }
                  );
                }}
                className={`w-[3vw] h-[3vw] p-[.6vw] rounded-full border border-black flex items-center justify-center transition-colors duration-300 cursor-pointer ${
                  isActive ? "bg-blue-400" : "bg-white"
                }`}
              >
                <Image
                  alt={button.title}
                  className="h-full w-full object-contain"
                  src={button.img}
                  height={200}
                  width={200}
                />
              </button>
              <p
                className={`font-semibold text-sm transition-colors duration-300 ${
                  sliderStatus === "Interior" ? "text-white" : "text-black"
                }`}
              >
                {button.title === "Video" ? "Views" : button.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Panels */}
      <Pallette handleColors={handleColors} />
      <EnvironmentPallette
        EnviornmentConfig={EnviornmentConfig}
        setEnviornmentConfig={setEnviornmentConfig}
      />
      <CameraPallette
        handleCamera={handleCamera}
        sliderStatus={sliderStatus}
      />
    </>
  );
}
