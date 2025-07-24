import Image from "next/image";
import React from "react";
import NavbarSlider from "./NavbarSlider";

export default function Interface({ sliderStatus, setSliderStatus }) {
  return (
    <div className="h-fit absolute p-[2vw] px-[5vw] flex items-center justify-between inset-0 z-[999] w-full">
      <div className="w-full flex items-center justify-start">
        <div className="h-[5vw]  w-[8vw]">
          <Image
            src={"/images/ford.png"}
            alt="logo"
            height={1000}
            width={1000}
          />
        </div>
      </div>

      {/* NAV */}
      <NavbarSlider
        sliderStatus={sliderStatus}
        setSliderStatus={setSliderStatus}
      />
      <div className="w-full flex items-center justify-end">
        <p className="underline text-blue-900 cursor-pointer text-sm">
          Contact
        </p>
      </div>
    </div>
  );
}
