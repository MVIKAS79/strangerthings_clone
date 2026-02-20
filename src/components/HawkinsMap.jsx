import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import './HawkinsMap.css'

// Hawkins locations data
const locations = [
  {
    id: 'lab',
    name: 'Hawkins National Laboratory',
    x: 75,
    y: 25,
    icon: '🔬',
    description: 'Department of Energy facility where Dr. Brenner conducted experiments on children with psychic abilities. The source of the gate to the Upside Down.',
    season: 'All',
    events: ['Eleven\'s escape', 'Opening of the Gate', 'Will\'s rescue'],
    danger: 'extreme'
  },
  {
    id: 'byers',
    name: 'Byers House',
    x: 30,
    y: 40,
    icon: '🏠',
    description: 'Home of Joyce, Jonathan, and Will Byers. Site of the Christmas lights communication and multiple supernatural encounters.',
    season: 'All',
    events: ['Alphabet wall communication', 'Will\'s possession', 'Bob\'s sacrifice planning'],
    danger: 'high'
  },
  {
    id: 'wheeler',
    name: 'Wheeler House',
    x: 55,
    y: 35,
    icon: '🏡',
    description: 'Home of the Wheeler family. The basement served as Eleven\'s first safe haven.',
    season: 'All',
    events: ['Eleven hides in basement', 'Party meetings', 'D&D campaigns'],
    danger: 'moderate'
  },
  {
    id: 'school',
    name: 'Hawkins Middle School',
    x: 45,
    y: 55,
    icon: '🏫',
    description: 'Where Mike, Dustin, Lucas, and Will attend school. The AV room became their base of operations.',
    season: 'All',
    events: ['AV Club meetings', 'Snow Ball dance', 'Demogorgon attack'],
    danger: 'moderate'
  },
  {
    id: 'arcade',
    name: 'Palace Arcade',
    x: 60,
    y: 65,
    icon: '🕹️',
    description: 'Local arcade where the kids play video games. Where they first meet Max.',
    season: '2-3',
    events: ['Meeting Max', 'Dig Dug high scores', 'Keith\'s domain'],
    danger: 'low'
  },
  {
    id: 'mall',
    name: 'Starcourt Mall',
    x: 85,
    y: 60,
    icon: '🛒',
    description: 'New mall that opened in 1985. Secret Russian base hidden underneath. Scoops Ahoy ice cream shop.',
    season: '3',
    events: ['Russian base discovery', 'Mind Flayer battle', 'Scoops Troop formation'],
    danger: 'extreme'
  },
  {
    id: 'quarry',
    name: 'Sattler Quarry',
    x: 20,
    y: 20,
    icon: '⛰️',
    description: 'Quarry outside Hawkins. Site where Eleven used her powers to save Mike from bullies.',
    season: '1',
    events: ['Eleven saves Mike', 'Troy\'s confrontation', 'Eleven revealed'],
    danger: 'moderate'
  },
  {
    id: 'cabin',
    name: 'Hopper\'s Cabin',
    x: 15,
    y: 50,
    icon: '🛖',
    description: 'Remote cabin in the woods where Hopper hid Eleven for a year. Their secret home.',
    season: '2-3',
    events: ['Eleven\'s training', 'Father-daughter bond', 'Mind Flayer confrontation'],
    danger: 'high'
  },
  {
    id: 'library',
    name: 'Hawkins Public Library',
    x: 50,
    y: 45,
    icon: '📚',
    description: 'Local library where Nancy and Jonathan researched the Upside Down.',
    season: '1-2',
    events: ['Research sessions', 'Murray\'s investigation files'],
    danger: 'low'
  },
  {
    id: 'police',
    name: 'Hawkins Police Station',
    x: 40,
    y: 60,
    icon: '🚔',
    description: 'Where Chief Hopper works. Central hub for investigating strange occurrences.',
    season: 'All',
    events: ['Investigation headquarters', 'Hopper\'s office', 'Flo\'s domain'],
    danger: 'low'
  },
  {
    id: 'cemetery',
    name: 'Hawkins Cemetery',
    x: 25,
    y: 75,
    icon: '🪦',
    description: 'Final resting place for Hawkins residents. Site of Barbara\'s memorial.',
    season: '2-4',
    events: ['Barbara\'s funeral', 'Billy\'s burial', 'Memorial services'],
    danger: 'moderate'
  },
  {
    id: 'creel',
    name: 'Creel House',
    x: 70,
    y: 45,
    icon: '🏚️',
    description: 'Abandoned Victorian mansion. Home to the Creel family tragedy and connected to Vecna.',
    season: '4',
    events: ['Creel family murders', 'Victor\'s story', 'Vecna\'s origin'],
    danger: 'extreme'
  },
  {
    id: 'gate',
    name: 'Gate Location',
    x: 80,
    y: 35,
    icon: '🌀',
    description: 'The rift between our world and the Upside Down. Source of all supernatural activity.',
    season: 'All',
    events: ['Demogorgon entry', 'Mind Flayer invasion', 'Vecna\'s curse'],
    danger: 'extreme'
  }
]

const HawkinsMap = ({ onNavigate, onOpenSearch }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [filter, setFilter] = useState('all')

  const getDangerColor = (danger) => {
    switch (danger) {
      case 'extreme': return '#e74c3c'
      case 'high': return '#e67e22'
      case 'moderate': return '#f1c40f'
      case 'low': return '#2ecc71'
      default: return '#95a5a6'
    }
  }

  const filteredLocations = filter === 'all' 
    ? locations 
    : locations.filter(loc => loc.danger === filter)

  return (
    <div className="hawkins-map-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="map-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🗺️ HAWKINS, INDIANA
        </motion.h1>

        <motion.p 
          className="map-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Click on locations to explore key places from the series
        </motion.p>

        {/* Filter Controls */}
        <motion.div 
          className="map-filters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="filter-label">Filter by danger level:</span>
          <div className="filter-buttons">
            {['all', 'extreme', 'high', 'moderate', 'low'].map(level => (
              <button
                key={level}
                className={`filter-btn ${filter === level ? 'active' : ''}`}
                onClick={() => setFilter(level)}
                style={{ 
                  '--danger-color': level === 'all' ? '#fff' : getDangerColor(level) 
                }}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Interactive Map */}
        <motion.div 
          className="map-area"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Map Background */}
          <div className="map-background">
            {/* Grid Lines */}
            <div className="map-grid" />
            
            {/* Town Label */}
            <div className="town-label">HAWKINS</div>
            
            {/* Roads */}
            <svg className="map-roads" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Main roads */}
              <path d="M0,50 L100,50" className="main-road" />
              <path d="M50,0 L50,100" className="main-road" />
              <path d="M20,20 L80,80" className="secondary-road" />
              <path d="M20,80 L80,20" className="secondary-road" />
              {/* Highway */}
              <path d="M0,30 Q30,40 50,35 T100,45" className="highway" />
            </svg>

            {/* Location Markers */}
            {filteredLocations.map((location, index) => (
              <motion.div
                key={location.id}
                className={`location-marker ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                  '--danger-color': getDangerColor(location.danger)
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                onClick={() => setSelectedLocation(location)}
                whileHover={{ scale: 1.2, zIndex: 100 }}
              >
                <span className="marker-icon">{location.icon}</span>
                <span className="marker-pulse" />
                <span className="marker-name">{location.name}</span>
              </motion.div>
            ))}

            {/* Upside Down Overlay (for extreme danger locations) */}
            <div className="upside-down-tendrils" />
          </div>
        </motion.div>

        {/* Location Details Panel */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              className="location-details"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <button 
                className="close-btn"
                onClick={() => setSelectedLocation(null)}
              >
                ✕
              </button>

              <div className="location-header">
                <span className="location-icon">{selectedLocation.icon}</span>
                <div>
                  <h2>{selectedLocation.name}</h2>
                  <div 
                    className="danger-badge"
                    style={{ background: getDangerColor(selectedLocation.danger) }}
                  >
                    {selectedLocation.danger.toUpperCase()} DANGER
                  </div>
                </div>
              </div>

              <p className="location-description">
                {selectedLocation.description}
              </p>

              <div className="location-meta">
                <div className="meta-item">
                  <span className="meta-label">📺 Seasons</span>
                  <span className="meta-value">{selectedLocation.season}</span>
                </div>
              </div>

              <div className="location-events">
                <h3>🔑 Key Events</h3>
                <ul>
                  {selectedLocation.events.map((event, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {event}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <motion.div 
          className="map-legend"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h4>Danger Levels</h4>
          <div className="legend-items">
            {['extreme', 'high', 'moderate', 'low'].map(level => (
              <div key={level} className="legend-item">
                <span 
                  className="legend-color"
                  style={{ background: getDangerColor(level) }}
                />
                <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HawkinsMap
