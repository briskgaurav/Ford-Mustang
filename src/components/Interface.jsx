import Image from "next/image";
import React from "react";
import NavbarSlider from "./NavbarSlider";

export default function Interface({
  sliderStatus,
  setSliderStatus,
  infoDataState,
}) {
  return (
    <div className="h-fit absolute p-[2vw] px-[5vw]  max-sm:px-[6vw] max-sm:p-[10vw] flex items-center max-sm:gap-[10vw] max-sm:flex-col justify-between inset-0 z-[800] w-full">
      <div className="w-full flex items-center justify-start max-sm:justify-center">
        <div className="h-[5vw] max-sm:h-fit max-sm:w-[30vw]  w-[8vw]">
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
        infoDataState={infoDataState}
        sliderStatus={sliderStatus}
        setSliderStatus={setSliderStatus}
      />
      <div className="w-full flex max-sm:hidden items-center justify-end">
        <p className="underline text-blue-900 cursor-pointer text-sm">
          Contact
        </p>
      </div>
    </div>
  );
}
