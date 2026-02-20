import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../context/AudioContext'
import './AudioControls.css'

const AudioControls = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    soundEnabled,
    setSoundEnabled,
    musicEnabled,
    setMusicEnabled,
    ambientEnabled,
    setAmbientEnabled,
    volume,
    setVolume,
    ambientType,
    setAmbientType,
    playClick,
    initAudioContext
  } = useAudio()

  const handleToggle = () => {
    initAudioContext() // Ensure audio context is ready
    playClick()
    setIsOpen(!isOpen)
  }

  const handleSoundToggle = () => {
    initAudioContext()
    setSoundEnabled(!soundEnabled)
    playClick()
  }

  const handleMusicToggle = () => {
    initAudioContext()
    setMusicEnabled(!musicEnabled)
    playClick()
  }

  const handleAmbientToggle = () => {
    initAudioContext()
    setAmbientEnabled(!ambientEnabled)
    playClick()
  }

  const handleAmbientTypeChange = (type) => {
    initAudioContext()
    setAmbientType(type)
    playClick()
  }

  return (
    <div className="audio-controls">
      <motion.button
        className="audio-toggle-btn"
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Audio Settings"
      >
        {soundEnabled || musicEnabled || ambientEnabled ? '🔊' : '🔇'}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="audio-panel"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
          >
            <h3 className="audio-panel-title">🎵 Audio Settings</h3>

            {/* Sound Effects Toggle */}
            <div className="audio-option">
              <span className="option-label">
                <span className="option-icon">🔔</span>
                Sound Effects
              </span>
              <button 
                className={`toggle-btn ${soundEnabled ? 'active' : ''}`}
                onClick={handleSoundToggle}
              >
                {soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Theme Music Toggle */}
            <div className="audio-option">
              <span className="option-label">
                <span className="option-icon">🎹</span>
                Synth Music
              </span>
              <button 
                className={`toggle-btn ${musicEnabled ? 'active' : ''}`}
                onClick={handleMusicToggle}
              >
                {musicEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Ambient Sound Toggle */}
            <div className="audio-option">
              <span className="option-label">
                <span className="option-icon">🌫️</span>
                Ambient Sounds
              </span>
              <button 
                className={`toggle-btn ${ambientEnabled ? 'active' : ''}`}
                onClick={handleAmbientToggle}
              >
                {ambientEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Ambient Type Selection */}
            {ambientEnabled && (
              <motion.div 
                className="ambient-types"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <button
                  className={`ambient-type-btn ${ambientType === 'upsideDown' ? 'active' : ''}`}
                  onClick={() => handleAmbientTypeChange('upsideDown')}
                >
                  🌀 Upside Down
                </button>
                <button
                  className={`ambient-type-btn ${ambientType === 'hawkinsLab' ? 'active' : ''}`}
                  onClick={() => handleAmbientTypeChange('hawkinsLab')}
                >
                  🔬 Hawkins Lab
                </button>
              </motion.div>
            )}

            {/* Volume Slider */}
            <div className="volume-control">
              <span className="option-label">
                <span className="option-icon">📢</span>
                Volume
              </span>
              <div className="volume-slider-container">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="volume-slider"
                />
                <span className="volume-value">{Math.round(volume * 100)}%</span>
              </div>
            </div>

            <p className="audio-hint">
              💡 Click anywhere to activate audio
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AudioControls
