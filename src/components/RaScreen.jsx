import Image from "next/image";
import React from "react";

export default function RaScreen() {
  return (
    <div className="h-screen ra opacity-0 flex items-center justify-center w-full absolute bg-blue-500/10 backdrop-blur-xs border border-white/20 shadow-lg z-[100]">
      <div className="h-fit w-[22vw] max-sm:w-[80vw] max-sm:p-[4vw] p-[2vw] bg-white rounded-xl max-sm:rounded-2xl">
        <div className="h-fit border p-1 border-black max-sm:rounded-2xl rounded-lg w-full">
          <Image
            src={"/images/qr.png"}
            height={500}
            width={500}
            className="h-full w-full object-cover"
            alt="qr"
          />
        </div>
        <p className="text-black text-md max-sm:mt-[3vw] mt-[1vw] max-sm:leading-[1] text-center">
          Made By Gaurav Verma - Creative Developer at Enigma Digital ❤️
          <a
            href="https://weareenigma.com/"
            className="block text-blue-500 cursor-pointer mt-[.5vw]"
          >
            Scan QR
          </a>
        </p>
      </div>
    </div>
  );
}
