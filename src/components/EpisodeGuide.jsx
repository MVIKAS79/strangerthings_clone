import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import { episodeGuide } from '../data/episodeGuide'
import './EpisodeGuide.css'

const EpisodeGuide = ({ onNavigate, onOpenSearch }) => {
  const [selectedSeason, setSelectedSeason] = useState('season1')
  const [selectedEpisode, setSelectedEpisode] = useState(null)

  const seasons = Object.keys(episodeGuide)
  const currentSeason = episodeGuide[selectedSeason]

  const getRatingColor = (rating) => {
    if (rating >= 9) return '#2ecc71'
    if (rating >= 8) return '#f1c40f'
    return '#e74c3c'
  }

  return (
    <div className="episode-guide-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="episode-guide-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📺 EPISODE GUIDE
        </motion.h1>

        {/* Season Tabs */}
        <motion.div 
          className="season-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {seasons.map((season) => (
            <button
              key={season}
              className={`season-tab ${selectedSeason === season ? 'active' : ''}`}
              onClick={() => {
                setSelectedSeason(season)
                setSelectedEpisode(null)
              }}
            >
              {episodeGuide[season].title}
              <span className="season-year">{episodeGuide[season].year}</span>
            </button>
          ))}
        </motion.div>

        {/* Episode List */}
        <motion.div 
          className="episodes-list"
          key={selectedSeason}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentSeason.episodes.map((episode, index) => (
            <motion.div
              key={episode.number}
              className={`episode-card ${selectedEpisode?.number === episode.number ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedEpisode(selectedEpisode?.number === episode.number ? null : episode)}
            >
              <div className="episode-header">
                <div className="episode-number">E{String(episode.number).padStart(2, '0')}</div>
                <div className="episode-main">
                  <h3 className="episode-title">{episode.title}</h3>
                  <div className="episode-meta">
                    <span className="air-date">📅 {episode.airDate}</span>
                    <span className="runtime">⏱️ {episode.runtime}</span>
                    <span 
                      className="rating"
                      style={{ color: getRatingColor(episode.rating) }}
                    >
                      ⭐ {episode.rating}
                    </span>
                  </div>
                </div>
                <div className="expand-icon">{selectedEpisode?.number === episode.number ? '−' : '+'}</div>
              </div>

              <AnimatePresence>
                {selectedEpisode?.number === episode.number && (
                  <motion.div
                    className="episode-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="episode-summary">{episode.summary}</p>
                    <div className="episode-credits">
                      <span>🎬 Director: {episode.director}</span>
                      <span>✍️ Writer: {episode.writer}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Season Stats */}
        <motion.div 
          className="season-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="stat">
            <span className="stat-value">{currentSeason.episodes.length}</span>
            <span className="stat-label">Episodes</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {(currentSeason.episodes.reduce((sum, ep) => sum + ep.rating, 0) / currentSeason.episodes.length).toFixed(1)}
            </span>
            <span className="stat-label">Avg Rating</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {Math.max(...currentSeason.episodes.map(ep => ep.rating))}
            </span>
            <span className="stat-label">Top Rated</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default EpisodeGuide
