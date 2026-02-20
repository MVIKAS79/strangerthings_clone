import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import './CharacterRelationships.css'

// Character nodes data
const characters = [
  { id: 'eleven', name: 'Eleven', x: 50, y: 30, color: '#e74c3c', group: 'main' },
  { id: 'mike', name: 'Mike Wheeler', x: 35, y: 25, color: '#3498db', group: 'party' },
  { id: 'dustin', name: 'Dustin Henderson', x: 25, y: 40, color: '#2ecc71', group: 'party' },
  { id: 'lucas', name: 'Lucas Sinclair', x: 20, y: 55, color: '#f39c12', group: 'party' },
  { id: 'will', name: 'Will Byers', x: 30, y: 65, color: '#9b59b6', group: 'party' },
  { id: 'max', name: 'Max Mayfield', x: 15, y: 70, color: '#e67e22', group: 'party' },
  { id: 'nancy', name: 'Nancy Wheeler', x: 55, y: 50, color: '#1abc9c', group: 'teens' },
  { id: 'jonathan', name: 'Jonathan Byers', x: 45, y: 60, color: '#34495e', group: 'teens' },
  { id: 'steve', name: 'Steve Harrington', x: 65, y: 45, color: '#e91e63', group: 'teens' },
  { id: 'robin', name: 'Robin Buckley', x: 75, y: 50, color: '#00bcd4', group: 'teens' },
  { id: 'hopper', name: 'Jim Hopper', x: 70, y: 25, color: '#795548', group: 'adults' },
  { id: 'joyce', name: 'Joyce Byers', x: 60, y: 70, color: '#ff5722', group: 'adults' },
  { id: 'billy', name: 'Billy Hargrove', x: 85, y: 65, color: '#673ab7', group: 'antagonist' },
  { id: 'vecna', name: 'Vecna/Henry', x: 85, y: 30, color: '#c0392b', group: 'antagonist' },
]

// Relationships between characters
const relationships = [
  { from: 'eleven', to: 'mike', type: 'romantic', label: 'Boyfriend/Girlfriend' },
  { from: 'eleven', to: 'hopper', type: 'family', label: 'Adopted Father' },
  { from: 'mike', to: 'nancy', type: 'family', label: 'Siblings' },
  { from: 'mike', to: 'dustin', type: 'friend', label: 'Best Friends' },
  { from: 'mike', to: 'lucas', type: 'friend', label: 'Best Friends' },
  { from: 'mike', to: 'will', type: 'friend', label: 'Best Friends' },
  { from: 'dustin', to: 'lucas', type: 'friend', label: 'Best Friends' },
  { from: 'dustin', to: 'steve', type: 'friend', label: 'Mentor/Friend' },
  { from: 'dustin', to: 'will', type: 'friend', label: 'Best Friends' },
  { from: 'lucas', to: 'will', type: 'friend', label: 'Best Friends' },
  { from: 'lucas', to: 'max', type: 'romantic', label: 'Boyfriend/Girlfriend' },
  { from: 'will', to: 'jonathan', type: 'family', label: 'Brothers' },
  { from: 'will', to: 'joyce', type: 'family', label: 'Mother/Son' },
  { from: 'jonathan', to: 'joyce', type: 'family', label: 'Mother/Son' },
  { from: 'jonathan', to: 'nancy', type: 'romantic', label: 'Boyfriend/Girlfriend' },
  { from: 'nancy', to: 'steve', type: 'ex', label: 'Ex-Boyfriend/Ex-Girlfriend' },
  { from: 'steve', to: 'robin', type: 'friend', label: 'Best Friends' },
  { from: 'hopper', to: 'joyce', type: 'romantic', label: 'Love Interest' },
  { from: 'max', to: 'billy', type: 'family', label: 'Step-Siblings' },
  { from: 'eleven', to: 'vecna', type: 'enemy', label: 'Nemesis' },
  { from: 'max', to: 'eleven', type: 'friend', label: 'Best Friends' },
  { from: 'robin', to: 'nancy', type: 'friend', label: 'Friends' },
]

const relationshipColors = {
  romantic: '#e74c3c',
  family: '#3498db',
  friend: '#2ecc71',
  enemy: '#c0392b',
  ex: '#95a5a6'
}

const CharacterRelationships = ({ onNavigate, onOpenSearch }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [filter, setFilter] = useState('all')
  const [hoveredRelationship, setHoveredRelationship] = useState(null)
  const svgRef = useRef(null)

  const getFilteredRelationships = () => {
    if (filter === 'all') return relationships
    return relationships.filter(rel => rel.type === filter)
  }

  const getCharacterRelationships = (charId) => {
    return relationships.filter(rel => rel.from === charId || rel.to === charId)
  }

  const getConnectedCharacters = (charId) => {
    const connected = new Set()
    relationships.forEach(rel => {
      if (rel.from === charId) connected.add(rel.to)
      if (rel.to === charId) connected.add(rel.from)
    })
    return connected
  }

  const filteredRelationships = getFilteredRelationships()
  const connectedChars = selectedCharacter ? getConnectedCharacters(selectedCharacter.id) : null

  return (
    <div className="relationships-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="relationships-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🕸️ CHARACTER RELATIONSHIPS
        </motion.h1>

        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Explore the connections between the characters of Hawkins
        </motion.p>

        {/* Filter Controls */}
        <motion.div 
          className="relationship-filters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {['all', 'romantic', 'family', 'friend', 'enemy'].map(type => (
            <button
              key={type}
              className={`filter-btn ${filter === type ? 'active' : ''}`}
              onClick={() => setFilter(type)}
              style={{ '--filter-color': relationshipColors[type] || '#fff' }}
            >
              {type === 'all' && '👥 '}
              {type === 'romantic' && '❤️ '}
              {type === 'family' && '👨‍👩‍👧 '}
              {type === 'friend' && '🤝 '}
              {type === 'enemy' && '⚔️ '}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Relationship Web */}
        <motion.div 
          className="relationship-web"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <svg 
            ref={svgRef}
            className="web-svg" 
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connection Lines */}
            {filteredRelationships.map((rel, i) => {
              const fromChar = characters.find(c => c.id === rel.from)
              const toChar = characters.find(c => c.id === rel.to)
              if (!fromChar || !toChar) return null

              const isHighlighted = selectedCharacter && 
                (rel.from === selectedCharacter.id || rel.to === selectedCharacter.id)
              const isDimmed = selectedCharacter && !isHighlighted

              return (
                <g key={`${rel.from}-${rel.to}`}>
                  <motion.line
                    x1={fromChar.x}
                    y1={fromChar.y}
                    x2={toChar.x}
                    y2={toChar.y}
                    stroke={relationshipColors[rel.type]}
                    strokeWidth={isHighlighted ? 0.8 : 0.3}
                    strokeOpacity={isDimmed ? 0.1 : isHighlighted ? 1 : 0.5}
                    strokeDasharray={rel.type === 'enemy' ? '2,1' : 'none'}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    onMouseEnter={() => setHoveredRelationship(rel)}
                    onMouseLeave={() => setHoveredRelationship(null)}
                    style={{ cursor: 'pointer' }}
                  />
                </g>
              )
            })}

            {/* Character Nodes */}
            {characters.map((char, i) => {
              const isSelected = selectedCharacter?.id === char.id
              const isConnected = connectedChars?.has(char.id)
              const isDimmed = selectedCharacter && !isSelected && !isConnected

              return (
                <motion.g
                  key={char.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: isSelected ? 1.3 : 1, 
                    opacity: isDimmed ? 0.3 : 1 
                  }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedCharacter(isSelected ? null : char)}
                >
                  {/* Glow effect */}
                  <circle
                    cx={char.x}
                    cy={char.y}
                    r={isSelected ? 4 : 2.5}
                    fill={char.color}
                    opacity={0.3}
                    filter="blur(2px)"
                  />
                  {/* Main node */}
                  <circle
                    cx={char.x}
                    cy={char.y}
                    r={isSelected ? 3 : 2}
                    fill={char.color}
                    stroke="white"
                    strokeWidth={0.3}
                  />
                  {/* Label */}
                  <text
                    x={char.x}
                    y={char.y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize={isSelected ? 2.5 : 2}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                  >
                    {char.name.split(' ')[0]}
                  </text>
                </motion.g>
              )
            })}
          </svg>

          {/* Hover Tooltip */}
          <AnimatePresence>
            {hoveredRelationship && (
              <motion.div
                className="relationship-tooltip"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <span style={{ color: relationshipColors[hoveredRelationship.type] }}>
                  {hoveredRelationship.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Selected Character Details */}
        <AnimatePresence>
          {selectedCharacter && (
            <motion.div
              className="character-details-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <div className="details-header">
                <div 
                  className="character-avatar"
                  style={{ background: selectedCharacter.color }}
                >
                  {selectedCharacter.name.charAt(0)}
                </div>
                <div>
                  <h2>{selectedCharacter.name}</h2>
                  <span className="character-group">
                    {selectedCharacter.group.charAt(0).toUpperCase() + selectedCharacter.group.slice(1)}
                  </span>
                </div>
              </div>

              <div className="character-relationships-list">
                <h3>Connections</h3>
                {getCharacterRelationships(selectedCharacter.id).map((rel, i) => {
                  const otherCharId = rel.from === selectedCharacter.id ? rel.to : rel.from
                  const otherChar = characters.find(c => c.id === otherCharId)
                  
                  return (
                    <motion.div
                      key={i}
                      className="relationship-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span 
                        className="rel-badge"
                        style={{ background: relationshipColors[rel.type] }}
                      >
                        {rel.type}
                      </span>
                      <span className="rel-character">{otherChar?.name}</span>
                      <span className="rel-label">{rel.label}</span>
                    </motion.div>
                  )
                })}
              </div>

              <button 
                className="close-details-btn"
                onClick={() => setSelectedCharacter(null)}
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <motion.div 
          className="relationship-legend"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h4>Relationship Types</h4>
          <div className="legend-items">
            {Object.entries(relationshipColors).map(([type, color]) => (
              <div key={type} className="legend-item">
                <span className="legend-line" style={{ background: color }} />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CharacterRelationships
