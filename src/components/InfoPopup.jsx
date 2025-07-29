import React, { useState, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function InfoPopup({ infoDataState, setInfoDataState }) {
  const openedInfo = infoDataState.find((info) => info.isOpened);

  if (!openedInfo) return null;

  const currentIndex = infoDataState.indexOf(openedInfo);

  useEffect(() => {
    // Smooth fade transition for content
    gsap.fromTo(
      ".info-popup-content",
      { opacity: 0 },
      { opacity: 1, duration: 0.1, ease: "linear" }
    );
  }, [currentIndex]);

  const handleLeft = () => {
    const newIndex =
      currentIndex === 0 ? infoDataState.length - 1 : currentIndex - 1;
    setInfoDataState(
      infoDataState.map((item, i) => ({
        ...item,
        isOpened: i === newIndex,
      }))
    );
  };

  const handleRight = () => {
    const newIndex =
      currentIndex === infoDataState.length - 1 ? 0 : currentIndex + 1;
    setInfoDataState(
      infoDataState.map((item, i) => ({
        ...item,
        isOpened: i === newIndex,
      }))
    );
  };

  const handleClose = () => {
    setInfoDataState(
      infoDataState.map((item) => ({
        ...item,
        isOpened: false,
      }))
    );
  };

  return (
    <div className="w-full select-none info-box bg-blue-500/5 backdrop-blur-xs transition-all duration-300 absolute inset-0 flex items-center justify-center z-[88]">
      <div className="min-h-[60vh] relative h-[60vh] bg-white rounded-xl shadow-lg w-[25%] max-sm:w-[80%] max-sm:h-fit max-sm:p-[4vw]  p-[1.5vw] flex flex-col justify-between">
        <span
          onClick={handleClose}
          className="text-gray-700 hover:text-black text-xl absolute right-0 top-0 p-[.5vw] max-sm:p-[2vw] max-sm:bg-white max-sm:rounded-full pointer-events-auto max-sm:top-[-10%]"
        >
          <svg
            className="w-[1vw] max-sm:w-[10vw] h-[1vw] max-sm:h-[5vw] cursor-pointer"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        {/* Image Container - Fixed height to avoid layout shift */}
        <div className="info-popup-content h-[30vh] w-full overflow-hidden rounded-xl bg-gray-200">
          <Image
            height={200}
            width={200}
            src={openedInfo.image}
            alt={openedInfo.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Text Section - Fixed spacing and height */}
        <div className="info-popup-content flex-1 py-3 max-sm:p-[3vw]">
          <h2 className="text-lg max-sm:text-[5vw] max-sm:leading-[1] max-sm:mb-[3vw] text-black font-bold mb-1">
            {openedInfo.title}
          </h2>
          <div
            className="overflow-y-auto"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <p className="text-black text-sm max-sm:text-md">{openedInfo.description}</p>
          </div>
        </div>

        {/* Controls - Arrows + Progress */}
        <div className="flex items-center justify-evenly max-sm:px-[2vw] max-sm:justify-between max-sm:mt-[2vw] mt-[1vw] gap-4">
          <button
            onClick={handleLeft}
            className="w-8 h-8 border cursor-pointer border-black rounded-full flex items-center justify-center text-black"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex gap-2">
            {infoDataState.map((_, i) => (
              <span
                key={i}
                className={`h-[.15vw] w-[1.5vw] max-sm:h-[2vw] max-sm:w-[8vw] rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-blue-400" : "bg-gray-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleRight}
            className="w-8 h-8 border cursor-pointer border-black rounded-full flex items-center justify-center text-black"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
