import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const Navbar = ({ onNavigate, onOpenSearch }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showExploreMenu, setShowExploreMenu] = useState(false)

  const mainLinks = [
    { key: 'home', label: 'Home' },
    { key: 'characters', label: 'Characters' },
    { key: 'episodeguide', label: 'Episodes' },
    { key: 'upsidedown', label: 'Upside Down' }
  ]

  const exploreLinks = [
    { key: 'map', label: '🗺️ Hawkins Map', desc: 'Interactive location map' },
    { key: 'relationships', label: '💕 Relationships', desc: 'Character connections' },
    { key: 'recap', label: '📖 Season Recap', desc: 'Story summaries' },
    { key: 'bts', label: '🎬 Behind the Scenes', desc: 'Cast & production' },
    { key: 'theories', label: '🔮 Theory Tracker', desc: 'What was confirmed?' },
    { key: 'memorial', label: '🕯️ Memorial', desc: 'Tribute to the fallen' },
    { key: 'moments', label: '⭐ Best Moments', desc: 'Vote for favorites' },
    { key: 'ratings', label: '📊 Episode Ratings', desc: 'IMDb scores & stats' },
    { key: 'profile', label: '👤 Profile', desc: 'Your stats & favorites' }
  ]

  const moreLinks = [
    { key: 'timeline', label: '⏳ Timeline', desc: 'Complete story timeline' },
    { key: 'quotes', label: '💬 Quotes', desc: 'Memorable quotes' },
    { key: 'soundtrack', label: '🎵 Soundtrack', desc: '80s hits from the show' },
    { key: 'quiz', label: '🔮 Character Quiz', desc: 'Which character are you?' },
    { key: 'trivia', label: '🧠 Trivia', desc: 'Test your knowledge' },
    { key: 'fanart', label: '🎨 Fan Art', desc: 'Community gallery' },
    { key: 'episodes', label: '📺 Watch', desc: 'Stream episodes' }
  ]

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div 
        className="nav-logo"
        onClick={() => onNavigate && onNavigate('home')}
        style={{ cursor: onNavigate ? 'pointer' : 'default' }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onNavigate && onNavigate('home')}
        aria-label="Go to home page"
      >
        STRANGER THINGS
      </div>

      <ul className="nav-links" role="menubar">
        {mainLinks.map(link => (
          <li 
            key={link.key}
            onClick={() => onNavigate && onNavigate(link.key)} 
            style={{ cursor: onNavigate ? 'pointer' : 'default' }}
            role="menuitem"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate && onNavigate(link.key)}
          >
            {link.label}
          </li>
        ))}
        
        <li 
          className="more-menu-trigger"
          onMouseEnter={() => setShowExploreMenu(true)}
          onMouseLeave={() => setShowExploreMenu(false)}
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={showExploreMenu}
        >
          Explore ▾
          <AnimatePresence>
            {showExploreMenu && (
              <motion.div 
                className="more-menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                role="menu"
              >
                {exploreLinks.map(link => (
                  <div 
                    key={link.key}
                    className="more-menu-item"
                    onClick={(e) => {
                      e.stopPropagation()
                      onNavigate && onNavigate(link.key)
                      setShowExploreMenu(false)
                    }}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onNavigate && onNavigate(link.key)
                        setShowExploreMenu(false)
                      }
                    }}
                  >
                    <span className="menu-item-label">{link.label}</span>
                    <span className="menu-item-desc">{link.desc}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </li>
        
        <li 
          className="more-menu-trigger"
          onMouseEnter={() => setShowMoreMenu(true)}
          onMouseLeave={() => setShowMoreMenu(false)}
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={showMoreMenu}
        >
          More ▾
          <AnimatePresence>
            {showMoreMenu && (
              <motion.div 
                className="more-menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                role="menu"
              >
                {moreLinks.map(link => (
                  <div 
                    key={link.key}
                    className="more-menu-item"
                    onClick={(e) => {
                      e.stopPropagation()
                      onNavigate && onNavigate(link.key)
                      setShowMoreMenu(false)
                    }}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onNavigate && onNavigate(link.key)
                        setShowMoreMenu(false)
                      }
                    }}
                  >
                    <span className="menu-item-label">{link.label}</span>
                    <span className="menu-item-desc">{link.desc}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      </ul>

      <button 
        className="search-btn"
        onClick={() => onOpenSearch && onOpenSearch()}
        title="Search (Ctrl+K)"
        aria-label="Open search"
      >
        🔍
      </button>
    </nav>
  )
}

export default Navbar
