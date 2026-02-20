import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import './SeasonRecap.css'

const seasonData = [
  {
    id: 1,
    title: 'Season 1: The Vanishing of Will Byers',
    year: '1983',
    tagline: 'When the lights begin to flicker...',
    episodes: 8,
    color: '#e74c3c',
    poster: '🌲',
    summary: 'When young Will Byers vanishes in the small town of Hawkins, Indiana, his friends Mike, Dustin, and Lucas search for answers while a mysterious girl with supernatural powers emerges from a government laboratory.',
    keyEvents: [
      { emoji: '👻', text: 'Will Byers disappears into the Upside Down' },
      { emoji: '🔬', text: 'Eleven escapes from Hawkins Lab' },
      { emoji: '💡', text: 'Joyce communicates with Will through lights' },
      { emoji: '👹', text: 'The Demogorgon terrorizes Hawkins' },
      { emoji: '🚪', text: 'The Gate to the Upside Down is opened' },
      { emoji: '💪', text: 'Eleven sacrifices herself to defeat the Demogorgon' },
    ],
    characters: ['Eleven', 'Mike', 'Dustin', 'Lucas', 'Will', 'Joyce', 'Hopper', 'Nancy', 'Jonathan', 'Steve'],
    villain: 'The Demogorgon',
    casualties: ['Barb', 'Benny']
  },
  {
    id: 2,
    title: 'Season 2: The Shadow Monster',
    year: '1984',
    tagline: 'Some doors can\'t be closed...',
    episodes: 9,
    color: '#9b59b6',
    poster: '🎃',
    summary: 'A year after Will\'s rescue, he begins experiencing terrifying visions of a massive shadow creature. As the Mind Flayer sets its sights on Hawkins, Eleven must choose between her newfound family and discovering her origins.',
    keyEvents: [
      { emoji: '🌫️', text: 'Will begins having visions of the Mind Flayer' },
      { emoji: '👧', text: 'Max Mayfield joins the group' },
      { emoji: '🔥', text: 'Eleven discovers her past with Kali (Eight)' },
      { emoji: '🧟', text: 'Will becomes possessed by the Mind Flayer' },
      { emoji: '🐕', text: 'Dustin befriends D\'Artagnan (Dart)' },
      { emoji: '🚪', text: 'Eleven closes the Gate to the Upside Down' },
    ],
    characters: ['Eleven', 'Mike', 'Dustin', 'Lucas', 'Will', 'Max', 'Bob', 'Billy', 'Hopper', 'Nancy', 'Jonathan', 'Steve'],
    villain: 'The Mind Flayer',
    casualties: ['Bob Newby']
  },
  {
    id: 3,
    title: 'Season 3: The Mall',
    year: '1985',
    tagline: 'One summer can change everything...',
    episodes: 8,
    color: '#3498db',
    poster: '🛒',
    summary: 'Summer 1985 brings a new mall to Hawkins, but beneath Starcourt Mall lies a Russian base intent on reopening the Gate. As relationships evolve, the Mind Flayer returns with a terrifying new plan.',
    keyEvents: [
      { emoji: '🛒', text: 'Starcourt Mall opens in Hawkins' },
      { emoji: '🇷🇺', text: 'Russian scientists work to reopen the Gate' },
      { emoji: '🍦', text: 'Scoops Troop forms: Steve, Robin, Dustin, Erica' },
      { emoji: '🧟', text: 'The Mind Flayer possesses Billy' },
      { emoji: '👹', text: 'The Flayed create a physical Mind Flayer form' },
      { emoji: '💔', text: 'Hopper sacrifices himself to close the Gate' },
    ],
    characters: ['Eleven', 'Mike', 'Dustin', 'Lucas', 'Will', 'Max', 'Robin', 'Hopper', 'Joyce', 'Nancy', 'Jonathan', 'Steve', 'Billy'],
    villain: 'The Mind Flayer / Russians',
    casualties: ['Billy Hargrove', 'Alexei']
  },
  {
    id: 4,
    title: 'Season 4: Vecna\'s Curse',
    year: '1986',
    tagline: 'Every ending has a beginning...',
    episodes: 9,
    color: '#c0392b',
    poster: '⏰',
    summary: 'Separated across the globe, our heroes face their greatest threat yet: Vecna, a powerful being from the Upside Down with a personal connection to Eleven. As terrifying murders plague Hawkins, the truth about the Upside Down\'s origins is finally revealed.',
    keyEvents: [
      { emoji: '👁️', text: 'Vecna begins killing Hawkins teens' },
      { emoji: '🏚️', text: 'The Creel House mystery is uncovered' },
      { emoji: '🇷🇺', text: 'Hopper is revealed to be alive in Russia' },
      { emoji: '🧠', text: 'Eleven\'s past with Henry/One is revealed' },
      { emoji: '🎵', text: 'Music becomes a weapon against Vecna' },
      { emoji: '🌀', text: 'Four gates open, splitting Hawkins' },
    ],
    characters: ['Eleven', 'Mike', 'Dustin', 'Lucas', 'Will', 'Max', 'Robin', 'Hopper', 'Joyce', 'Nancy', 'Jonathan', 'Steve', 'Eddie', 'Vecna'],
    villain: 'Vecna/Henry Creel/001',
    casualties: ['Eddie Munson', 'Jason Carver']
  },
  {
    id: 5,
    title: 'Season 5: The Final Battle',
    year: '2025',
    tagline: 'Where it all began, it must end...',
    episodes: 8,
    color: '#2c3e50',
    poster: '⚔️',
    summary: 'The final chapter sees Hawkins fully merged with the Upside Down as Vecna\'s plan reaches completion. With Max in a coma and the town in ruins, Eleven and her friends must journey into the heart of darkness for one last stand. Old allies return, sacrifices are made, and the true origin of the Upside Down is finally revealed in an epic conclusion eight years in the making.',
    keyEvents: [
      { emoji: '🌑', text: 'Hawkins merges with the Upside Down after a two-year time skip' },
      { emoji: '💀', text: 'Will\'s true connection to the Mind Flayer is revealed - he becomes the key' },
      { emoji: '⚡', text: 'Eleven regains her full powers through her connection to her friends' },
      { emoji: '🦇', text: 'The gang enters the Upside Down for a final assault on Vecna\'s lair' },
      { emoji: '❤️', text: 'Max awakens from her coma to help in the final battle' },
      { emoji: '🔥', text: 'Eddie appears as an Upside Down spirit to help Steve' },
      { emoji: '💔', text: 'Hopper sacrifices himself to destroy the Heart of the Upside Down' },
      { emoji: '⭐', text: 'Eleven defeats Vecna by absorbing and containing him within herself' },
      { emoji: '🌅', text: 'The Upside Down is permanently sealed - Hawkins begins to heal' },
    ],
    characters: ['Eleven', 'Mike', 'Dustin', 'Lucas', 'Will', 'Max', 'Robin', 'Hopper', 'Joyce', 'Nancy', 'Jonathan', 'Steve', 'Murray', 'Vecna'],
    villain: 'Vecna / The Mind Flayer',
    casualties: ['Hopper (sacrifices himself)', 'Dr. Owens', 'Murray Bauman']
  }
]

const SeasonRecap = ({ onNavigate, onOpenSearch }) => {
  const [selectedSeason, setSelectedSeason] = useState(null)
  const [expandedEvent, setExpandedEvent] = useState(null)

  return (
    <div className="season-recap-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="recap-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📺 SEASON RECAPS
        </motion.h1>

        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Relive the complete story of Stranger Things
        </motion.p>

        {/* Season Cards */}
        <div className="seasons-grid">
          {seasonData.map((season, index) => (
            <motion.div
              key={season.id}
              className={`season-card ${selectedSeason?.id === season.id ? 'selected' : ''} ${season.upcoming ? 'upcoming' : ''}`}
              style={{ '--season-color': season.color }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setSelectedSeason(selectedSeason?.id === season.id ? null : season)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="season-poster">
                <span className="poster-emoji">{season.poster}</span>
                <span className="season-number">S{season.id}</span>
              </div>
              
              <div className="season-info">
                <span className="season-year">{season.year}</span>
                <h3 className="season-title">{season.title}</h3>
                <p className="season-tagline">{season.tagline}</p>
                <div className="season-meta">
                  <span>📺 {season.episodes} Episodes</span>
                  <span>👹 {season.villain}</span>
                </div>
              </div>

              {season.upcoming && (
                <div className="upcoming-badge">COMING SOON</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Expanded Season Details */}
        <AnimatePresence>
          {selectedSeason && (
            <motion.div
              className="season-details"
              style={{ '--season-color': selectedSeason.color }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="details-header">
                <h2>{selectedSeason.title}</h2>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedSeason(null)}
                >
                  ✕
                </button>
              </div>

              <p className="season-summary">{selectedSeason.summary}</p>

              <div className="details-grid">
                {/* Key Events */}
                <div className="key-events">
                  <h3>🔑 Key Events</h3>
                  <div className="events-timeline">
                    {selectedSeason.keyEvents.map((event, i) => (
                      <motion.div
                        key={i}
                        className="timeline-event"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="event-emoji">{event.emoji}</span>
                        <span className="event-text">{event.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Characters & Casualties */}
                <div className="season-sidebar">
                  <div className="sidebar-section">
                    <h3>👥 Main Characters</h3>
                    <div className="character-tags">
                      {selectedSeason.characters.map((char, i) => (
                        <motion.span
                          key={i}
                          className="character-tag"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="sidebar-section">
                    <h3>👹 Villain</h3>
                    <div className="villain-badge" style={{ background: selectedSeason.color }}>
                      {selectedSeason.villain}
                    </div>
                  </div>

                  {selectedSeason.casualties && selectedSeason.casualties[0] !== 'TBD' && (
                    <div className="sidebar-section casualties">
                      <h3>💀 Casualties</h3>
                      <div className="casualty-list">
                        {selectedSeason.casualties.map((name, i) => (
                          <span key={i} className="casualty-name">{name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Story Progress */}
        <motion.div 
          className="story-progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h4>Story Progress</h4>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '80%' }}>
              <span>Season 4 Complete</span>
            </div>
          </div>
          <p className="progress-text">
            4 of 5 seasons released • Final season coming 2024/2025
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default SeasonRecap
