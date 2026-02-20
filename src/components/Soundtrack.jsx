import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import { soundtrack } from '../data/soundtrack'
import './Soundtrack.css'

const Soundtrack = ({ onNavigate, onOpenSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState('season1')
  const [playingTrack, setPlayingTrack] = useState(null)

  const categories = {
    season1: { title: 'Season 1 (1983)', icon: '🎵' },
    season2: { title: 'Season 2 (1984)', icon: '🎵' },
    season3: { title: 'Season 3 (1985)', icon: '🎵' },
    season4: { title: 'Season 4 (1986)', icon: '🎵' },
    originalScore: { title: 'Original Score', icon: '🎼' }
  }

  const currentTracks = soundtrack[selectedCategory]

  const searchOnSpotify = (track) => {
    const query = encodeURIComponent(`${track.title} ${track.artist}`)
    window.open(`https://open.spotify.com/search/${query}`, '_blank')
  }

  const searchOnYouTube = (track) => {
    const query = encodeURIComponent(`${track.title} ${track.artist}`)
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank')
  }

  return (
    <div className="soundtrack-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="soundtrack-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎵 SOUNDTRACK
        </motion.h1>

        <motion.p 
          className="soundtrack-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          The iconic music that defined each season of Stranger Things
        </motion.p>

        {/* Category Tabs */}
        <motion.div 
          className="category-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {Object.entries(categories).map(([key, value]) => (
            <button
              key={key}
              className={`category-tab ${selectedCategory === key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(key)}
            >
              <span className="tab-icon">{value.icon}</span>
              <span className="tab-title">{value.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Track List */}
        <motion.div 
          className="track-list"
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {currentTracks.map((track, index) => (
            <motion.div
              key={index}
              className={`track-card ${playingTrack === index ? 'playing' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setPlayingTrack(playingTrack === index ? null : index)}
            >
              <div className="track-number">{String(index + 1).padStart(2, '0')}</div>
              
              <div className="track-info">
                <h3 className="track-title">{track.title}</h3>
                <p className="track-artist">{track.artist}</p>
              </div>

              <div className="track-scene">
                <span className="scene-label">🎬</span>
                <span className="scene-text">{track.scene}</span>
              </div>

              <div className="track-actions">
                <button 
                  className="action-btn spotify"
                  onClick={(e) => {
                    e.stopPropagation()
                    searchOnSpotify(track)
                  }}
                  title="Search on Spotify"
                >
                  <span>🎧</span>
                </button>
                <button 
                  className="action-btn youtube"
                  onClick={(e) => {
                    e.stopPropagation()
                    searchOnYouTube(track)
                  }}
                  title="Search on YouTube"
                >
                  <span>▶️</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Track */}
        {selectedCategory === 'season4' && (
          <motion.div 
            className="featured-track"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="featured-badge">⭐ MOST ICONIC</div>
            <div className="featured-content">
              <div className="featured-art">🏃‍♀️🎵</div>
              <div className="featured-info">
                <h2>Running Up That Hill</h2>
                <p className="featured-artist">Kate Bush</p>
                <p className="featured-fact">
                  This 1985 song resurged to #1 on charts worldwide in 2022 after being featured 
                  as Max's lifeline song in Season 4, becoming one of the biggest viral moments in TV history.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div 
          className="soundtrack-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="stat">
            <span className="stat-value">{currentTracks.length}</span>
            <span className="stat-label">Tracks</span>
          </div>
          <div className="stat">
            <span className="stat-value">80s</span>
            <span className="stat-label">Era</span>
          </div>
          <div className="stat">
            <span className="stat-value">💜</span>
            <span className="stat-label">Nostalgia</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Soundtrack
