import React, { useState } from "react";

export default function CameraPallette({ handleCamera, sliderStatus }) {

  const [activeCamera, setActiveCamera] = useState(null);
  const cameraAngles = [
    {
      number: 1,
      position: sliderStatus === 'Interior' ? { x: .8, y: .5, z: -3 } : { x: 0, y: 0, z: 70 },
      rotation: sliderStatus === 'Interior' ? { x: -0, y: 0, z: 0 } : { x: -102, y: 0, z: 0 },
    },
    {
      number: 2,
      position: sliderStatus === 'Interior' ? { x: -.8, y: -.5, z: -3 } : { x: 50, y: -15, z: 0 },
      rotation: sliderStatus === 'Interior' ? { x: -60, y: 45, z: 0 } : { x: -60, y: 45, z: 0 },
    },
    {
      number: 3,
      position: sliderStatus === 'Interior' ? { x: 2, y: 2, z: -10 } : { x: 0, y: 0, z: -70 },
      rotation: sliderStatus === 'Interior' ? { x: -60, y: -45, z: 0 } : { x: -60, y: -45, z: 0 },
    },
    {
      number: 4,
      position: sliderStatus === 'Interior' ? { x: -2, y: 2, z: -10 } : { x: -40, y: 10, z: 50 },
      rotation: sliderStatus === 'Interior' ? { x: -120, y: 0, z: 0 } : { x: -120, y: 0, z: 0 },
    },
  ];

  return (
    <div className="cameraPallete opacity-0 gap-[1vw] max-sm:gap-[3vw] max-sm:p-[3vw] absolute left-0 bottom-[0%] z-[2] flex items-center justify-center w-full">
      {cameraAngles.map((angle, index) => (
        <div
          key={index}
          className="w-[2.5vw] max-sm:w-[10vw] max-sm:p-[2vw] cursor-pointer flex items-center justify-center h-[2.5vw] max-sm:h-[10vw] border-2 border-white rounded-full"
          style={{
            backgroundColor: activeCamera === angle.number ? '#60A5FA' : '#FFFFFF'
          }}
          onClick={() => {
            handleCamera(angle.number, angle.position);
            setActiveCamera(angle.number);
          }}
        >
          <p className={`${activeCamera === angle.number ? 'text-white' : 'text-black'} font-bold`}>{angle.number}</p>
        </div>
      ))}
    </div>
  );
}
