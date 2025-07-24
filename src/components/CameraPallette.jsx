import React from "react";

export default function CameraPallette({ handleCamera, sliderStatus }) {
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
    <div className="cameraPallete opacity-0 gap-[1vw] absolute left-0 bottom-[0%] z-[2] flex items-center justify-center w-full">
      {cameraAngles.map((angle, index) => (
        <div
          key={index}
          className="w-[2.5vw] cursor-pointer flex items-center justify-center h-[2.5vw] bg-white border border-blue-900 rounded-full"
          onClick={() => handleCamera(angle.number, angle.position)}
        >
          <p className="text-blue-900 font-bold">{angle.number}</p>
        </div>
      ))}
    </div>
  );
}
