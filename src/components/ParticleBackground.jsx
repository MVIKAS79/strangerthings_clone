import React, { useEffect, useRef } from 'react'
import './ParticleBackground.css'

const ParticleBackground = ({ variant = 'normal' }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = () => {
      const isUpsideDown = variant === 'upside-down'
      return {
        x: Math.random() * canvas.width,
        y: isUpsideDown ? canvas.height + 10 : -10,
        size: Math.random() * 3 + 1,
        speedY: isUpsideDown ? -(Math.random() * 2 + 0.5) : Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: isUpsideDown 
          ? `hsl(${Math.random() * 60 + 180}, 70%, 50%)` // Blue/cyan for upside down
          : `hsl(${Math.random() * 30}, 100%, 50%)`, // Red/orange for normal
        flickerSpeed: Math.random() * 0.02 + 0.01,
        flickerOffset: Math.random() * Math.PI * 2
      }
    }

    const initParticles = () => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < particleCount; i++) {
        const p = createParticle()
        p.y = Math.random() * canvas.height // Random initial position
        particles.push(p)
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, index) => {
        // Update position
        p.y += p.speedY
        p.x += p.speedX

        // Flicker effect
        const flicker = Math.sin(Date.now() * p.flickerSpeed + p.flickerOffset)
        const currentOpacity = p.opacity + flicker * 0.2

        // Draw particle with glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace(')', `, ${currentOpacity})`)
        ctx.shadowBlur = 15
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.shadowBlur = 0

        // Reset particle if out of bounds
        const isUpsideDown = variant === 'upside-down'
        if (isUpsideDown && p.y < -10) {
          particles[index] = createParticle()
        } else if (!isUpsideDown && p.y > canvas.height + 10) {
          particles[index] = createParticle()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      initParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [variant])

  return <canvas ref={canvasRef} className="particle-canvas" />
}

export default ParticleBackground
