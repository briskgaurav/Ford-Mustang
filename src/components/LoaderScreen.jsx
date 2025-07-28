import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

export default function LoaderScreen({ isLoaded, progress }) {
  const circleRef = useRef(null)
  const containerRef = useRef(null)

  console.log(progress)
  useEffect(() => {
    const circle = circleRef.current
    const totalLength = 2 * Math.PI * 48
    circle.setAttribute('stroke-dasharray', totalLength)
  }, [])

  useEffect(() => {
    const circle = circleRef.current
    const totalLength = 2 * Math.PI * 48

    gsap.to(circle, {
      strokeDashoffset: totalLength - (progress / 100) * totalLength,
      duration: 0.3,
      ease: "power2.out"
    })
  }, [progress])

  useEffect(() => {
    if (isLoaded) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        onComplete: () => {
          setTimeout(() => {
            if (containerRef.current) containerRef.current.style.display = "none"
          }, 0)
        }
      })
    }
  }, [isLoaded])

  return (
    <div ref={containerRef} className='w-full h-screen bg-black  fixed top-0 left-0 z-[9999]'>
      <Image
        src="/images/Loader.jpg"
        alt="Background"
        width={1000}
        height={1000}
        className="absolute w-full h-full object-cover opacity-50"
      />
      <div className='w-full h-full flex items-end justify-start p-[3vw]'>
        <div className='w-[10vw] h-[10vw] relative flex items-center justify-center bg-white/10 backdrop-blur-[10px] border-2 border-white  rounded-full'>
          <svg className='w-[105%] h-[105%] absolute' viewBox='0 0 100 100'>
            <circle
              ref={circleRef}
              cx='50'
              cy='50'
              r='48'
              fill='none'
              stroke='white'
              strokeWidth='3'
              strokeLinecap='round'
              transform='rotate(-90 50 50)'
            />
          </svg>
          <p className='text-white text-md font-bold z-10'>{progress}%</p>
        </div>
      </div>
    </div>
  )
}
