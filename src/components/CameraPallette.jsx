import React from "react";

export default function CameraPallette() {
  const color = [1,2,3,4];
  return (
    <div className="cameraPallete gap-[1vw] absolute left-0 bottom-[0%] z-[2] flex items-center justify-center w-full">
      {color.map((col, index) => (
        <div
          key={index}
          className="w-[2.5vw] cursor-pointer flex items-center justify-center h-[2.5vw] bg-white border border-blue-900 rounded-full"
         
        >
          <p className="text-blue-900 font-bold">{col}</p>
        </div>
      ))}
    </div>
  );
}
