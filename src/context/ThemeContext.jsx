import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('stranger-things-theme')
    return savedTheme || 'normal'
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    localStorage.setItem('stranger-things-theme', theme)
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'normal' ? 'upside-down' : 'normal')
  }

  const value = {
    theme,
    toggleTheme,
    isLoading,
    setIsLoading,
    isUpsideDown: theme === 'upside-down'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
