import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const LoadingScreen = ({ onComplete }) => {
  const [currentLetter, setCurrentLetter] = useState(0)
  const [message, setMessage] = useState('')
  const title = 'STRANGER THINGS'
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  useEffect(() => {
    // Flickering alphabet effect
    const letterInterval = setInterval(() => {
      setCurrentLetter(prev => (prev + 1) % alphabet.length)
    }, 100)

    // Type out message
    const messages = ['ENTERING HAWKINS...', 'THE UPSIDE DOWN AWAITS...']
    let msgIndex = 0
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= messages[msgIndex].length) {
        setMessage(messages[msgIndex].substring(0, charIndex))
        charIndex++
      } else {
        msgIndex = (msgIndex + 1) % messages.length
        charIndex = 0
      }
    }, 100)

    return () => {
      clearInterval(letterInterval)
      clearInterval(typeInterval)
    }
  }, [])

  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-content">
        {/* Christmas lights */}
        <div className="christmas-lights">
          {alphabet.split('').map((letter, index) => (
            <div 
              key={letter}
              className={`light-bulb ${index === currentLetter ? 'active' : ''}`}
              style={{ 
                '--delay': `${index * 0.1}s`,
                '--hue': `${(index * 14) % 360}`
              }}
            >
              <span className="bulb-letter">{letter}</span>
              <div className="bulb-glow"></div>
            </div>
          ))}
        </div>

        {/* Title */}
        <motion.h1 
          className="loading-title"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {title.split('').map((char, index) => (
            <motion.span
              key={index}
              className="title-letter"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.8 + index * 0.05,
                type: 'spring'
              }}
              style={{ '--flicker-delay': `${Math.random() * 2}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Loading message */}
        <motion.p 
          className="loading-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {message}<span className="cursor">|</span>
        </motion.p>

        {/* Progress bar */}
        <motion.div 
          className="loading-bar-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div 
            className="loading-bar"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Flickering background effect */}
      <div className="flicker-overlay"></div>
    </motion.div>
  )
}

export default LoadingScreen
