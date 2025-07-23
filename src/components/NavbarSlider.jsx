import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function NavbarSlider() {
  const [active, setActive] = useState("Exterior");

  const handleSlider = (text) => {
    setActive(text);
    
    const positions = {
      Interior: "95%",
      RA: "188%", 
      Exterior: "-.5%"
    };

    gsap.to(".navbarSlider", {
      x: positions[text],
      duration: 0.2
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[80%] relative flex items-center h-fit">
        <div className="bg-[#066FEF] navbarSlider rounded-full z-[1] absolute w-[35%] h-[7.5vh]"></div>
        <div className="h-full py-[.5vw] gap-2 flex items-center justify-between w-full border bg-[#ececec] border-black rounded-full">
          {["Exterior", "Interior", "RA"].map((item, i) => (
            <p
              key={i}
              onClick={() => handleSlider(item)}
              className={`text-black w-full text-center z-[2] cursor-pointer tracking-wide ${
                active === item ? "text-white" : ""
              }`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
