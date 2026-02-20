import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { characters } from '../data/characters'
import './Characters.css'
import Navbar from './Navbar'

const Characters = ({ onNavigate, onOpenSearch }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [imageErrors, setImageErrors] = useState({})

  const handleImageError = (characterId) => {
    setImageErrors(prev => ({ ...prev, [characterId]: true }))
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  return (
    <div className="characters-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="characters-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          STRANGER THINGS CHARACTERS
        </motion.h1>

        {/* Character Grid */}
        <motion.div 
          className="characters-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {characters.map((character) => (
            <motion.div
              key={character.id}
              className={`character-card ${selectedCharacter?.id === character.id ? 'selected' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCharacter(selectedCharacter?.id === character.id ? null : character)}
            >
              <div className="character-image-wrapper">
                {!imageErrors[character.id] ? (
                  <img 
                    src={character.image} 
                    alt={character.name}
                    className="character-image-img"
                    onError={() => handleImageError(character.id)}
                  />
                ) : (
                  <div className="character-image-fallback">{getInitials(character.name)}</div>
                )}
              </div>
              <div className="character-info">
                <h3>{character.name}</h3>
                <p className="role">{character.role}</p>
                <p className="actor">by {character.actor}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Character Details Modal */}
        {selectedCharacter && (
          <motion.div 
            className="character-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.div className="modal-content">
              <button 
                className="close-btn"
                onClick={() => setSelectedCharacter(null)}
              >
                ✕
              </button>

              <div className="modal-header">
                <div className="modal-image">
                  {!imageErrors[selectedCharacter.id] ? (
                    <img 
                      src={selectedCharacter.image} 
                      alt={selectedCharacter.name}
                      className="modal-image-img"
                      onError={() => handleImageError(selectedCharacter.id)}
                    />
                  ) : (
                    <div className="modal-image-fallback">{getInitials(selectedCharacter.name)}</div>
                  )}
                </div>
                <div className="modal-title">
                  <h1>{selectedCharacter.name}</h1>
                  <p className="modal-role">{selectedCharacter.role}</p>
                </div>
              </div>

              <div className="modal-body">
                <div className="description">
                  <h3>About</h3>
                  <p>{selectedCharacter.description}</p>
                </div>

                <div className="details-grid">
                  <div className="detail-item">
                    <strong>Age:</strong>
                    <p>{selectedCharacter.age}</p>
                  </div>
                  <div className="detail-item">
                    <strong>Portrayed By:</strong>
                    <p>{selectedCharacter.actor}</p>
                  </div>
                  <div className="detail-item">
                    <strong>Appearances:</strong>
                    <p>{selectedCharacter.details.season}</p>
                  </div>
                </div>

                <div className="abilities">
                  <h3>Abilities & Skills</h3>
                  <p>{selectedCharacter.details.abilities}</p>
                </div>

                <div className="relationship">
                  <h3>Character Connection</h3>
                  <p>{selectedCharacter.details.relationship}</p>
                </div>

                <div className="notable-actions">
                  <h3>Notable Actions</h3>
                  <p>{selectedCharacter.details.notableActions}</p>
                </div>
              </div>
            </motion.div>

            {/* Backdrop */}
            <motion.div 
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelectedCharacter(null)}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Characters
