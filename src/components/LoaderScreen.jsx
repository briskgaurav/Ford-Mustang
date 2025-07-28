import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function LoaderScreen({ isLoaded }) {
  const circleRef = useRef(null)
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const circle = circleRef.current
    const totalLength = 2 * Math.PI * 48
    circle.setAttribute('stroke-dasharray', totalLength)
    circle.setAttribute('stroke-dashoffset', totalLength)

    const obj = { value: totalLength }

    const tl = gsap.timeline()

    tl.to(obj, {
      value: 0,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        circle.setAttribute('stroke-dashoffset', obj.value)
        const percent = Math.round(((totalLength - obj.value) / totalLength) * 100)
        setProgress(percent)
      }
    })

    return () => tl.kill()
  }, [])

  // When loaded, animate to 100 and fade out
  useEffect(() => {
    if (isLoaded) {
      const circle = circleRef.current
      const totalLength = 2 * Math.PI * 48

      gsap.to(circle, {
        strokeDashoffset: 0,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => {
          setProgress(100)
        }
      })

      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = "none"
        }
      })
    }
  }, [isLoaded])

  return (
    <div ref={containerRef} className='w-full h-screen bg-black fixed top-0 left-0 z-[9999]'>
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
