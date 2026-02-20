import React, { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Check if touch device
    if ('ontouchstart' in window) return

    document.body.classList.add('custom-cursor-enabled')

    const moveCursor = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`
        ringRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsHovering(isClickable)
    }

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('custom-cursor-enabled')
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${isHovering ? 'hover' : ''}`} />
    </>
  )
}

export default CustomCursor
