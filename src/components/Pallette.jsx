import React from "react";

export default function Pallette({ handleColors }) {
  const color = ["#6F7073", "#52667B", "#353535"];
  return (
    <div className="pallete gap-[1vw] opacity-0 absolute left-0 bottom-0 z-[2] flex items-center justify-center w-full">
      {color.map((col, index) => (
        <div
          key={index}
          onClick={() => handleColors(col)}
          className="w-[1.5vw] cursor-pointer h-[1.5vw] border-white border-2 rounded-full"
          style={{ backgroundColor: col }}
        ></div>
      ))}
    </div>
  );
}
