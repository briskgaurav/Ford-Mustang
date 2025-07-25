import image1 from '../../public/images/InfoImages/brakes.webp'
import image2 from '../../public/images/InfoImages/exhaust.webp'
import image3 from '../../public/images/InfoImages/front.webp'
import image4 from '../../public/images/InfoImages/front2.webp'


export const infoData = [
  
  {
    isOpened: false,
    id: 1,
    title: "High-performance Brembo® Brakes",
    description:
      "Brembo® high-performance brakes are the most powerful brakes in the world. These are the brakes used in Formula 1 cars and high-end racing cars.",
    image: image1,
    cameraPosition: { x: 50, y: 10, z: 0 }
  },
  {
    isOpened: false,
    id: 2,
    title: "Dual exhaust with four chrome tips and active valve control",
    description:
      "The New Mustang GT Performance features a dual exhaust with four chrome tips, active valve control and four selectable modes: Quiet, Normal, Sport and Track.",
    image: image2,
    cameraPosition: { x: 20, y: 10, z: -58 },
  },
  
  {
    isOpened: false,
    id: 3,
    title: "Line Lock",
    description:
      "The New Mustang GT Performance features Line Lock* functionality. The electronic rear tire warming system locks the front brakes and allows.",
    image: image3,
    cameraPosition: { x: -40, y: 0, z: -30 },
  },
  {
    isOpened: false,
    id: 4,
    title: "5.0L Coyote V8 Engine",
    description:
      "With a new intake system consisting of two 80mm throttle bodies, the famous 5.0L Coyote V8 engine in its fourth generation can produce an incredible 488 HP of power and 564 Nm of torque.",
    image: image4,
    cameraPosition: { x: 0, y: 0, z: 50 }
  },
];
