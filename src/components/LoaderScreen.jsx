import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LoaderScreen({ isLoaded, progress }) {
  const circleRef = useRef(null)
  const containerRef = useRef(null)

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
          }, 1000)
        }
      })
    }
  }, [isLoaded])

  return (
    <div ref={containerRef} className='w-full h-screen fixed top-0 left-0 z-[9999]'>
      <img
        src="/images/Loader.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover opacity-80"
      />
      <div className='w-full h-full flex items-center justify-center'>
        <div className='w-[10vw] h-[10vw] relative flex items-center justify-center bg-white/20 border-2 border-white backdrop-blur-sm rounded-full'>
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
