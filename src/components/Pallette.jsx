import React, { useState } from "react";

export default function Pallette({ handleColors }) {
  const color = ["#808080", "#FF0000", "#FFD700", "#FFFFFF", "#C0C0C0", "#0BBBB6", "#E48D19", "#596F87"];
  const [activeColor, setActiveColor] = useState('#FFFFFF');
  return (
    <div className="pallete gap-[1vw] max-sm:gap-[3vw] max-sm:p-[3vw] opacity-0 absolute left-0 bottom-0 z-[2] flex items-center justify-center w-full">
      {color.map((col, index) => (
        <div
          key={index}
          onClick={() => {
            handleColors(col);
            setActiveColor(col);
          }}
          className="w-[1.5vw] max-sm:w-[8vw] cursor-pointer h-[1.5vw] max-sm:h-[8vw] border-2 rounded-full"
          style={{ 
            backgroundColor: col,
            borderColor: activeColor === col ? 'black' : 'white'
          }}
        ></div>
      ))}
    </div>
  );
}
