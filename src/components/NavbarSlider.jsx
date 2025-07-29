import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NavbarSlider({
  sliderStatus,
  setSliderStatus,
  infoDataState,
}) {
  const sliderRef = useRef(null);

  const openedInfo = infoDataState.find((info) => info.isOpened);

  useEffect(() => {
    if (sliderRef.current) {
      if (openedInfo) {
        // Animate out (hide)
        gsap.to(sliderRef.current, {
          opacity: 0,
          y: 50,
          pointerEvents: "none",
          duration: .8,
          ease: "power2.out",
        });
      } else {
        // Animate in (show)
        gsap.to(sliderRef.current, {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: .8,
          ease: "power2.out",
        });
      }
    }
  }, [openedInfo]);

  const handleSlider = (text) => {
    setSliderStatus(text);

    const positions = {
      Interior: "95%",
      RA: "188%",
      Exterior: "-.5%",
    };

    gsap.to(".navbarSlider", {
      x: positions[text],
      duration: 0.2,
    });
  };

  return (
    <div ref={sliderRef} className="w-full flex  items-center justify-center opacity-1 translate-y-0">
      <div className="w-[80%] max-sm:w-[90%] relative flex items-center h-fit">
        <div className="bg-[#066FEF] navbarSlider rounded-full z-[1] absolute w-[35%] h-[7.5vh] max-sm:h-[5vh]"></div>
        <div className="h-full py-[.5vw] gap-2 flex items-center justify-between w-full border bg-[#ececec] border-black rounded-full">
          {["Exterior", "Interior", "RA"].map((item, i) => (
            <p
              key={i}
              onClick={() => handleSlider(item)}
              className={`text-black w-full text-center z-[2] cursor-pointer tracking-wide ${
                sliderStatus === item ? "text-white" : ""
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
