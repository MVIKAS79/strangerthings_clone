import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './UpsideDown.css'
import Navbar from './Navbar'

const UpsideDown = ({ onNavigate, onOpenSearch }) => {
  const [particles, setParticles] = useState([])
  const [showSecret, setShowSecret] = useState(false)

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)
  }, [])

  const facts = [
    {
      title: "The Gate",
      description: "The first gate to the Upside Down was accidentally opened by Eleven when she made contact with the Demogorgon during an experiment at Hawkins Lab.",
      icon: "🌀"
    },
    {
      title: "Toxic Atmosphere",
      description: "The air in the Upside Down is filled with floating spores and particles that are toxic to humans. Prolonged exposure can be fatal.",
      icon: "☠️"
    },
    {
      title: "The Mind Flayer",
      description: "A massively intelligent entity that controls the hive mind of the Upside Down, including all Demogorgons and Demodogs.",
      icon: "🕷️"
    },
    {
      title: "Mirror Dimension",
      description: "The Upside Down is an exact mirror of our world, frozen in time from November 6, 1983 - the day the first gate opened.",
      icon: "🪞"
    },
    {
      title: "Vecna's Origin",
      description: "Henry Creel, also known as One, was banished to the Upside Down by Eleven and transformed into Vecna, becoming its master.",
      icon: "👁️"
    },
    {
      title: "The Vines",
      description: "Organic tendrils spread throughout the Upside Down, connecting everything to the Mind Flayer's hive mind consciousness.",
      icon: "🌿"
    }
  ]

  return (
    <div className="upside-down-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      {/* Floating particles */}
      <div className="particles-container">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="upside-down-container">
        <motion.h1 
          className="upside-title"
          initial={{ opacity: 0, rotateX: 180 }}
          animate={{ opacity: 1, rotateX: 180 }}
          transition={{ duration: 1 }}
        >
          THE UPSIDE DOWN
        </motion.h1>

        <motion.p 
          className="upside-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          A dark dimension that exists parallel to the human world
        </motion.p>

        {/* Interactive Portal */}
        <motion.div 
          className="portal-container"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <div className="portal" onClick={() => setShowSecret(!showSecret)}>
            <div className="portal-ring ring-1"></div>
            <div className="portal-ring ring-2"></div>
            <div className="portal-ring ring-3"></div>
            <div className="portal-center">
              <span>ENTER</span>
            </div>
          </div>
          <p className="portal-hint">Click the portal to reveal secrets...</p>
        </motion.div>

        {/* Secret Message */}
        <motion.div 
          className={`secret-message ${showSecret ? 'visible' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showSecret ? 1 : 0, y: showSecret ? 0 : 20 }}
        >
          <p>"Friends don't lie."</p>
          <p className="secret-author">- Eleven</p>
        </motion.div>

        {/* Facts Grid */}
        <motion.div 
          className="facts-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              className="fact-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 0, 0, 0.5)"
              }}
            >
              <span className="fact-icon">{fact.icon}</span>
              <h3>{fact.title}</h3>
              <p>{fact.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Warning Section */}
        <motion.div 
          className="warning-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="warning-box">
            <span className="warning-icon">⚠️</span>
            <div className="warning-text">
              <h3>CLASSIFIED INFORMATION</h3>
              <p>Access to Upside Down research is restricted by Hawkins National Laboratory. 
                 Unauthorized entry may result in exposure to hostile entities.</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          className="timeline-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <h2>Timeline of Events</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">Nov 1983</div>
              <div className="timeline-content">
                <h4>The First Gate Opens</h4>
                <p>Will Byers disappears into the Upside Down</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">Oct 1984</div>
              <div className="timeline-content">
                <h4>The Mind Flayer Attacks</h4>
                <p>Will becomes possessed by the shadow monster</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">Jul 1985</div>
              <div className="timeline-content">
                <h4>Battle of Starcourt</h4>
                <p>The gate is closed, Hopper presumed dead</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">Mar 1986</div>
              <div className="timeline-content">
                <h4>Vecna's Curse</h4>
                <p>Four gates open, Hawkins is split apart</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UpsideDown
