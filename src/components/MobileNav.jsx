import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './MobileNav.css'

const MobileNav = ({ sections, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.mobile-nav')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  // Close menu on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId)
    setIsOpen(false)
    if (onNavigate) {
      onNavigate(sectionId)
    }
  }

  const menuSections = sections || [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'characters', label: 'Characters', icon: '👥' },
    { id: 'episodes', label: 'Episodes', icon: '📺' },
    { id: 'timeline', label: 'Timeline', icon: '📅' },
    { id: 'quotes', label: 'Quotes', icon: '💬' },
    { id: 'soundtrack', label: 'Soundtrack', icon: '🎵' },
    { id: 'quiz', label: 'Quiz', icon: '❓' },
    { id: 'trivia', label: 'Trivia', icon: '🧠' },
    { id: 'explore', label: 'Explore', icon: '🗺️', submenu: [
      { id: 'hawkins-map', label: 'Hawkins Map', icon: '📍' },
      { id: 'relationships', label: 'Relationships', icon: '💕' },
      { id: 'behind-scenes', label: 'Behind the Scenes', icon: '🎬' },
      { id: 'season-recap', label: 'Season Recap', icon: '📖' },
      { id: 'theories', label: 'Theory Tracker', icon: '🔮' },
      { id: 'memorial', label: 'Memorial', icon: '🕯️' },
      { id: 'best-moments', label: 'Best Moments', icon: '⭐' },
      { id: 'ratings', label: 'Episode Ratings', icon: '📊' }
    ]},
    { id: 'community', label: 'Community', icon: '👤', submenu: [
      { id: 'profile', label: 'Profile', icon: '🎖️' },
      { id: 'easter-eggs', label: 'Easter Eggs', icon: '🥚' },
      { id: 'fan-art', label: 'Fan Art', icon: '🎨' }
    ]}
  ]

  const [expandedSubmenu, setExpandedSubmenu] = useState(null)

  const toggleSubmenu = (id) => {
    setExpandedSubmenu(expandedSubmenu === id ? null : id)
  }

  return (
    <nav className="mobile-nav">
      {/* Hamburger Button */}
      <button 
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="mobile-nav-header">
              <span className="mobile-nav-title">
                <span className="stranger">STRANGER</span>
                <span className="things">THINGS</span>
              </span>
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Menu Items */}
            <div className="mobile-nav-items">
              {menuSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  className="nav-item-wrapper"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {section.submenu ? (
                    <>
                      <button
                        className={`nav-item has-submenu ${expandedSubmenu === section.id ? 'expanded' : ''}`}
                        onClick={() => toggleSubmenu(section.id)}
                      >
                        <span className="nav-icon">{section.icon}</span>
                        <span className="nav-label">{section.label}</span>
                        <span className="submenu-arrow">
                          {expandedSubmenu === section.id ? '▼' : '▶'}
                        </span>
                      </button>
                      <AnimatePresence>
                        {expandedSubmenu === section.id && (
                          <motion.div
                            className="submenu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {section.submenu.map((subItem) => (
                              <button
                                key={subItem.id}
                                className={`nav-item submenu-item ${activeSection === subItem.id ? 'active' : ''}`}
                                onClick={() => handleNavigate(subItem.id)}
                              >
                                <span className="nav-icon">{subItem.icon}</span>
                                <span className="nav-label">{subItem.label}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <button
                      className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                      onClick={() => handleNavigate(section.id)}
                    >
                      <span className="nav-icon">{section.icon}</span>
                      <span className="nav-label">{section.label}</span>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mobile-nav-footer">
              <div className="footer-lights">
                {['red', 'yellow', 'blue', 'green', 'orange'].map((color, i) => (
                  <span 
                    key={color} 
                    className={`light ${color}`}
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
              <span className="footer-text">The Upside Down awaits...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions (Bottom Bar) */}
      <div className="mobile-quick-actions">
        <button 
          className={`quick-btn ${activeSection === 'home' ? 'active' : ''}`}
          onClick={() => handleNavigate('home')}
        >
          <span className="quick-icon">🏠</span>
          <span className="quick-label">Home</span>
        </button>
        <button 
          className={`quick-btn ${activeSection === 'characters' ? 'active' : ''}`}
          onClick={() => handleNavigate('characters')}
        >
          <span className="quick-icon">👥</span>
          <span className="quick-label">Cast</span>
        </button>
        <button 
          className={`quick-btn ${activeSection === 'episodes' ? 'active' : ''}`}
          onClick={() => handleNavigate('episodes')}
        >
          <span className="quick-icon">📺</span>
          <span className="quick-label">Watch</span>
        </button>
        <button 
          className={`quick-btn ${activeSection === 'quiz' ? 'active' : ''}`}
          onClick={() => handleNavigate('quiz')}
        >
          <span className="quick-icon">❓</span>
          <span className="quick-label">Quiz</span>
        </button>
        <button 
          className="quick-btn menu-btn"
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
        >
          <span className="quick-icon">☰</span>
          <span className="quick-label">More</span>
        </button>
      </div>
    </nav>
  )
}

export default MobileNav
