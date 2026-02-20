import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { theme, toggleTheme, isUpsideDown } = useTheme()

  return (
    <motion.button 
      className={`theme-toggle ${isUpsideDown ? 'upside-down' : ''}`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isUpsideDown ? 'Return to Normal World' : 'Enter the Upside Down'}
    >
      <div className="toggle-track">
        <motion.div 
          className="toggle-thumb"
          animate={{ x: isUpsideDown ? 28 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
        <span className="toggle-icon left">☀️</span>
        <span className="toggle-icon right">🌙</span>
      </div>
      <span className="toggle-label">
        {isUpsideDown ? 'UPSIDE DOWN' : 'NORMAL'}
      </span>
    </motion.button>
  )
}

export default ThemeToggle
