import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './EasterEggs.css'

// Konami Code sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

// Secret codes - Original + Season 5 additions
const SECRET_CODES = {
  // Original codes
  '11': { name: 'Eleven\'s Number', description: 'You found Eleven!', icon: '🔮', reward: 'eleven-mode' },
  'updown': { name: 'Upside Down', description: 'The world flips...', icon: '🙃', reward: 'flip-world' },
  'friends': { name: 'Friends Don\'t Lie', description: 'The ultimate truth!', icon: '🤝', reward: 'friendship-glow' },
  'eggo': { name: 'Eggo Waffle', description: 'Eleven\'s favorite snack!', icon: '🧇', reward: 'eggo-rain' },
  'demogorgon': { name: 'Demogorgon Summoned', description: 'You called forth the monster!', icon: '👹', reward: 'demogorgon-scare' },
  // Season 5 codes
  'vecna': { name: 'Vecna\'s Clock', description: 'Time stops... bong bong bong bong', icon: '🕰️', reward: 'vecna-clock' },
  'eddie': { name: 'Eddie Lives', description: 'His spirit echoes in the Upside Down!', icon: '🦇', reward: 'eddie-guitar' },
  'hawkins': { name: 'Fallen Hawkins', description: 'The town that fell to darkness', icon: '🏚️', reward: 'hawkins-dust' },
  'compass': { name: 'Will\'s Compass', description: 'I\'m the compass now...', icon: '🧭', reward: 'compass-spin' },
  'heart': { name: 'Heart Circle', description: 'The power of combined love', icon: '❤️', reward: 'heart-circle' },
  'hopper': { name: 'Chief Hopper', description: 'A father\'s ultimate sacrifice', icon: '👮', reward: 'hopper-tribute' },
  '001': { name: 'One', description: 'The first subject... Henry Creel', icon: '1️⃣', reward: 'one-reveal' },
  'max': { name: 'Running Up That Hill', description: 'If I only could...', icon: '🎧', reward: 'max-run' },
  'steve': { name: 'Mom Steve', description: 'Best babysitter in Hawkins!', icon: '🦺', reward: 'steve-hair' },
  'dustin': { name: 'Dustin\'s Roar', description: 'Grrrrrr! Never tell me the odds!', icon: '🧢', reward: 'dustin-roar' }
}

const ACHIEVEMENTS = [
  { id: 'konami', name: 'Classic Gamer', icon: '🎮', description: 'Enter the Konami Code' },
  { id: 'eleven', name: 'Psychic', icon: '🔮', description: 'Find the 011 secret' },
  { id: 'explorer', name: 'Secret Hunter', icon: '🔍', description: 'Find 3 secrets' },
  { id: 'master', name: 'Easter Egg Master', icon: '👑', description: 'Find all secrets' }
]

export const useEasterEggs = () => {
  const [konamiIndex, setKonamiIndex] = useState(0)
  const [typedCode, setTypedCode] = useState('')
  const [activeEffect, setActiveEffect] = useState(null)
  const [foundSecrets, setFoundSecrets] = useState(() => {
    const saved = localStorage.getItem('st-easter-eggs')
    return saved ? JSON.parse(saved) : []
  })
  const [showNotification, setShowNotification] = useState(null)

  // Save found secrets
  useEffect(() => {
    localStorage.setItem('st-easter-eggs', JSON.stringify(foundSecrets))
  }, [foundSecrets])

  // Konami Code detection
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      
      // Check Konami code
      if (e.key === KONAMI_CODE[konamiIndex]) {
        const newIndex = konamiIndex + 1
        setKonamiIndex(newIndex)
        
        if (newIndex === KONAMI_CODE.length) {
          triggerSecret('konami')
          setKonamiIndex(0)
        }
      } else {
        setKonamiIndex(0)
      }

      // Check typed codes
      if (key.length === 1) {
        const newCode = typedCode + key
        setTypedCode(newCode.slice(-15)) // Keep last 15 chars

        // Check all secret codes
        Object.entries(SECRET_CODES).forEach(([code, secret]) => {
          if (newCode.endsWith(code)) {
            triggerSecret(code)
            setTypedCode('')
          }
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiIndex, typedCode])

  const triggerSecret = useCallback((secretId) => {
    const secret = secretId === 'konami' 
      ? { name: 'Konami Code', description: 'Classic cheat activated!', icon: '🎮', reward: 'konami-power' }
      : SECRET_CODES[secretId]

    if (!secret) return

    // Add to found secrets
    if (!foundSecrets.includes(secretId)) {
      setFoundSecrets(prev => [...prev, secretId])
    }

    // Show notification
    setShowNotification(secret)
    setTimeout(() => setShowNotification(null), 3000)

    // Apply visual effect
    setActiveEffect(secret.reward)
    setTimeout(() => setActiveEffect(null), 5000)
  }, [foundSecrets])

  const checkSecretClick = useCallback((element) => {
    // Can be called on specific elements for click-based secrets
  }, [])

  return {
    activeEffect,
    showNotification,
    foundSecrets,
    totalSecrets: Object.keys(SECRET_CODES).length + 1, // +1 for Konami
    triggerSecret,
    checkSecretClick
  }
}

// Easter Eggs Visual Effects Component
const EasterEggsEffects = ({ activeEffect, showNotification }) => {
  return (
    <>
      {/* Active Visual Effects */}
      <AnimatePresence>
        {activeEffect === 'eggo-rain' && (
          <div className="easter-egg-effect eggo-rain">
            {[...Array(20)].map((_, i) => (
              <motion.span
                key={i}
                className="falling-eggo"
                initial={{ y: -50, x: Math.random() * window.innerWidth, rotate: 0 }}
                animate={{ 
                  y: window.innerHeight + 50, 
                  rotate: 360,
                  transition: { 
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 2,
                    ease: 'linear'
                  }
                }}
              >
                🧇
              </motion.span>
            ))}
          </div>
        )}

        {activeEffect === 'flip-world' && (
          <motion.div 
            className="easter-egg-effect flip-world"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: -1 }}
            exit={{ scaleY: 1 }}
          />
        )}

        {activeEffect === 'demogorgon-scare' && (
          <motion.div 
            className="easter-egg-effect demogorgon-scare"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <span className="giant-emoji">👹</span>
          </motion.div>
        )}

        {activeEffect === 'friendship-glow' && (
          <div className="easter-egg-effect friendship-glow" />
        )}

        {activeEffect === 'konami-power' && (
          <div className="easter-egg-effect konami-power">
            <div className="power-lines" />
          </div>
        )}

        {activeEffect === 'eleven-mode' && (
          <div className="easter-egg-effect eleven-mode">
            <motion.div 
              className="nosebleed"
              animate={{ 
                y: [0, 50, 100],
                opacity: [1, 1, 0]
              }}
              transition={{ duration: 2, repeat: 3 }}
            />
          </div>
        )}

        {/* Season 5 Effects */}
        {activeEffect === 'vecna-clock' && (
          <motion.div 
            className="easter-egg-effect vecna-clock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="clock-overlay" />
            <span className="giant-clock">🕰️</span>
            <div className="clock-chimes">
              {[1, 2, 3, 4].map(i => (
                <motion.span 
                  key={i}
                  className="chime-text"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.5 }}
                >
                  BONG
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {activeEffect === 'eddie-guitar' && (
          <div className="easter-egg-effect eddie-guitar">
            <motion.span 
              className="giant-emoji guitar"
              animate={{ 
                rotate: [-10, 10, -10],
                scale: [1, 1.1, 1]
              }}
              transition={{ repeat: 5, duration: 0.3 }}
            >
              🎸
            </motion.span>
            <div className="lightning-bolts">
              {[...Array(8)].map((_, i) => (
                <motion.span 
                  key={i}
                  className="lightning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: i * 0.2, repeat: 2 }}
                >
                  ⚡
                </motion.span>
              ))}
            </div>
            <span className="eddie-quote">"This is for you, Chrissy!"</span>
          </div>
        )}

        {activeEffect === 'compass-spin' && (
          <div className="easter-egg-effect compass-spin">
            <motion.span 
              className="giant-emoji"
              animate={{ rotate: 360 * 5 }}
              transition={{ duration: 3, ease: 'easeOut' }}
            >
              🧭
            </motion.span>
          </div>
        )}

        {activeEffect === 'heart-circle' && (
          <div className="easter-egg-effect heart-circle">
            {[...Array(12)].map((_, i) => (
              <motion.span 
                key={i}
                className="floating-heart"
                style={{
                  left: `${50 + 35 * Math.cos((i * 30 * Math.PI) / 180)}%`,
                  top: `${50 + 35 * Math.sin((i * 30 * Math.PI) / 180)}%`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                ❤️
              </motion.span>
            ))}
            <motion.div 
              className="center-glow"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: 3, duration: 1 }}
            />
          </div>
        )}

        {activeEffect === 'hopper-tribute' && (
          <div className="easter-egg-effect hopper-tribute">
            <motion.div 
              className="hopper-silhouette"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4 }}
            />
            <span className="hopper-quote">"Keep the door open 3 inches..."</span>
          </div>
        )}

        {activeEffect === 'max-run' && (
          <div className="easter-egg-effect max-run">
            <motion.span 
              className="running-max"
              animate={{ 
                x: [window.innerWidth, -100],
                y: [Math.random() * 200, Math.random() * 200]
              }}
              transition={{ duration: 3, ease: 'linear' }}
            >
              🏃‍♀️
            </motion.span>
            <span className="music-notes">🎵 Running up that hill... 🎶</span>
          </div>
        )}

        {activeEffect === 'steve-hair' && (
          <div className="easter-egg-effect steve-hair">
            <motion.div 
              className="hair-product"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: 3 }}
            >
              💇‍♂️
            </motion.div>
            <span className="steve-tip">"4 pumps of Farrah Fawcett spray."</span>
          </div>
        )}

        {activeEffect === 'dustin-roar' && (
          <div className="easter-egg-effect dustin-roar">
            <motion.span 
              className="roar-text"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 1, 0] }}
              transition={{ duration: 1.5, repeat: 2 }}
            >
              GRRRRRR! 🦷
            </motion.span>
          </div>
        )}

        {activeEffect === 'hawkins-dust' && (
          <div className="easter-egg-effect hawkins-dust">
            {[...Array(30)].map((_, i) => (
              <motion.span
                key={i}
                className="ash-particle"
                initial={{ 
                  y: window.innerHeight + 50,
                  x: Math.random() * window.innerWidth,
                  opacity: 1
                }}
                animate={{ 
                  y: -50,
                  x: Math.random() * window.innerWidth,
                  opacity: 0
                }}
                transition={{ 
                  duration: 4 + Math.random() * 2,
                  delay: Math.random(),
                  ease: 'linear'
                }}
              >
                🔥
              </motion.span>
            ))}
          </div>
        )}

        {activeEffect === 'one-reveal' && (
          <motion.div 
            className="easter-egg-effect one-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span 
              className="one-number"
              animate={{ 
                color: ['#fff', '#ff0000', '#fff'],
                textShadow: ['0 0 10px #fff', '0 0 30px #ff0000', '0 0 10px #fff']
              }}
              transition={{ duration: 2, repeat: 2 }}
            >
              001
            </motion.span>
            <span className="one-quote">"I am the reason for your suffering..."</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="easter-egg-notification"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <span className="notif-icon">{showNotification.icon}</span>
            <div className="notif-content">
              <span className="notif-title">🎉 Secret Found!</span>
              <span className="notif-name">{showNotification.name}</span>
              <span className="notif-desc">{showNotification.description}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Easter Eggs Gallery Page Component
const EasterEggsGallery = ({ foundSecrets, totalSecrets }) => {
  const allSecrets = [
    // Original secrets
    { id: 'konami', name: 'Konami Code', icon: '🎮', hint: 'Up Up Down Down...', category: 'classic' },
    { id: '11', name: 'Eleven\'s Number', icon: '🔮', hint: 'Type her number', category: 'classic' },
    { id: 'updown', name: 'Upside Down', icon: '🙃', hint: 'Which way is up?', category: 'classic' },
    { id: 'friends', name: 'Friends Don\'t Lie', icon: '🤝', hint: 'A promise among friends', category: 'classic' },
    { id: 'eggo', name: 'Eggo Waffle', icon: '🧇', hint: 'Eleven\'s favorite', category: 'classic' },
    { id: 'demogorgon', name: 'Demogorgon', icon: '👹', hint: 'Name the monster', category: 'classic' },
    // Season 5 secrets
    { id: 'vecna', name: 'Vecna\'s Clock', icon: '🕰️', hint: 'The villain\'s name', category: 'season5' },
    { id: 'eddie', name: 'Eddie Lives', icon: '🦇', hint: 'The metalhead hero', category: 'season5' },
    { id: 'hawkins', name: 'Fallen Hawkins', icon: '🏚️', hint: 'The town name', category: 'season5' },
    { id: 'compass', name: 'Will\'s Compass', icon: '🧭', hint: 'Navigation tool', category: 'season5' },
    { id: 'heart', name: 'Heart Circle', icon: '❤️', hint: 'The final ritual', category: 'season5' },
    { id: 'hopper', name: 'Chief Hopper', icon: '👮', hint: 'The police chief', category: 'season5' },
    { id: '001', name: 'One', icon: '1️⃣', hint: 'The first subject', category: 'season5' },
    { id: 'max', name: 'Running Up That Hill', icon: '🎧', hint: 'Max\'s song name (first word)', category: 'season5' },
    { id: 'steve', name: 'Mom Steve', icon: '🦺', hint: 'The babysitter', category: 'season5' },
    { id: 'dustin', name: 'Dustin\'s Roar', icon: '🧢', hint: 'The smart one', category: 'season5' }
  ]

  const [filter, setFilter] = useState('all')
  const filteredSecrets = filter === 'all' 
    ? allSecrets 
    : allSecrets.filter(s => s.category === filter)

  return (
    <div className="easter-eggs-gallery">
      <h3>🥚 Easter Eggs ({foundSecrets.length}/{totalSecrets})</h3>
      
      <div className="secret-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({allSecrets.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'classic' ? 'active' : ''}`}
          onClick={() => setFilter('classic')}
        >
          Classic ({allSecrets.filter(s => s.category === 'classic').length})
        </button>
        <button 
          className={`filter-btn ${filter === 'season5' ? 'active' : ''}`}
          onClick={() => setFilter('season5')}
        >
          Season 5 ({allSecrets.filter(s => s.category === 'season5').length})
        </button>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${(foundSecrets.length / totalSecrets) * 100}%` }}
        />
        <span className="progress-text">
          {foundSecrets.length === totalSecrets 
            ? '🏆 All Secrets Found!' 
            : `${totalSecrets - foundSecrets.length} secrets remaining`}
        </span>
      </div>

      <div className="secrets-grid">
        {filteredSecrets.map(secret => {
          const found = foundSecrets.includes(secret.id)
          return (
            <div 
              key={secret.id}
              className={`secret-card ${found ? 'found' : 'locked'} ${secret.category}`}
            >
              <span className="secret-icon">{found ? secret.icon : '❓'}</span>
              <span className="secret-name">{found ? secret.name : '???'}</span>
              {!found && <span className="secret-hint">💡 {secret.hint}</span>}
              {found && <span className="found-badge">✓ Found</span>}
              <span className="category-badge">{secret.category === 'season5' ? 'S5' : '📺'}</span>
            </div>
          )
        })}
      </div>

      <div className="hint-box">
        <h4>💡 How to Find Secrets</h4>
        <p>Type keywords on your keyboard while on this site. Some hints:</p>
        <ul>
          <li>Character names and numbers</li>
          <li>Famous phrases from the show</li>
          <li>Monsters and locations</li>
          <li>Try the classic gamer code!</li>
        </ul>
      </div>
    </div>
  )
}

export { EasterEggsEffects, EasterEggsGallery }
export default EasterEggsEffects
