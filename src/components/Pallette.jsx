import React, { useState } from "react";

export default function Pallette({ handleColors }) {
  const color = ["#000000", "#FFFFFF", "#FF0000", "#066FEF", "#C0C0C0", "#808080", "#FFD700", "#800000"];
  const [activeColor, setActiveColor] = useState('#FFFFFF');
  return (
    <div className="pallete gap-[1vw] opacity-0 absolute left-0 bottom-0 z-[2] flex items-center justify-center w-full">
      {color.map((col, index) => (
        <div
          key={index}
          onClick={() => {
            handleColors(col);
            setActiveColor(col);
          }}
          className="w-[1.5vw] cursor-pointer h-[1.5vw] border-2 rounded-full"
          style={{ 
            backgroundColor: col,
            borderColor: activeColor === col ? 'black' : 'white'
          }}
        ></div>
      ))}
    </div>
  );
}
