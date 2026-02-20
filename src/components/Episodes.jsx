import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Episodes.css'
import Navbar from './Navbar'

const Episodes = ({ onNavigate, onOpenSearch }) => {
  const [episodes, setEpisodes] = useState(() => {
    const saved = localStorage.getItem('strangerthings_episodes')
    return saved ? JSON.parse(saved) : []
  })
  const [selectedEpisode, setSelectedEpisode] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newEpisode, setNewEpisode] = useState({
    title: '',
    season: '1',
    episode: '1',
    description: '',
    thumbnail: '',
    videoUrl: ''
  })
  const fileInputRef = useRef(null)
  const thumbnailInputRef = useRef(null)
  const videoRef = useRef(null)

  // Save episodes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('strangerthings_episodes', JSON.stringify(episodes))
  }, [episodes])

  const seasons = [
    { number: 1, episodes: 8 },
    { number: 2, episodes: 9 },
    { number: 3, episodes: 8 },
    { number: 4, episodes: 9 }
  ]

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check if it's a video file
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Create object URL for the video file
    const videoUrl = URL.createObjectURL(file)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    setTimeout(() => {
      setNewEpisode(prev => ({ ...prev, videoUrl, fileName: file.name }))
      setIsUploading(false)
      setUploadProgress(100)
    }, 2000)
  }

  const handleThumbnailSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    const thumbnailUrl = URL.createObjectURL(file)
    setNewEpisode(prev => ({ ...prev, thumbnail: thumbnailUrl }))
  }

  const handleAddEpisode = () => {
    if (!newEpisode.title || !newEpisode.videoUrl) {
      alert('Please provide a title and upload a video')
      return
    }

    const episode = {
      id: Date.now(),
      ...newEpisode,
      addedDate: new Date().toISOString()
    }

    setEpisodes(prev => [...prev, episode])
    setNewEpisode({
      title: '',
      season: '1',
      episode: '1',
      description: '',
      thumbnail: '',
      videoUrl: ''
    })
    setShowUploadModal(false)
    setUploadProgress(0)
  }

  const handleDeleteEpisode = (episodeId) => {
    if (confirm('Are you sure you want to delete this episode?')) {
      setEpisodes(prev => prev.filter(ep => ep.id !== episodeId))
      if (selectedEpisode?.id === episodeId) {
        setSelectedEpisode(null)
      }
    }
  }

  const getEpisodesBySeason = (seasonNum) => {
    return episodes.filter(ep => ep.season === String(seasonNum))
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
    <div className="episodes-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="episodes-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          STRANGER THINGS EPISODES
        </motion.h1>

        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Upload and watch your favorite episodes - No subscription needed!
        </motion.p>

        {/* Upload Button */}
        <motion.button 
          className="upload-btn"
          onClick={() => setShowUploadModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="upload-icon">📤</span>
          Upload Episode
        </motion.button>

        {/* Video Player */}
        <AnimatePresence>
          {selectedEpisode && (
            <motion.div 
              className="video-player-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="video-player-container">
                <button 
                  className="close-player-btn"
                  onClick={() => setSelectedEpisode(null)}
                >
                  ✕
                </button>
                <video
                  ref={videoRef}
                  src={selectedEpisode.videoUrl}
                  controls
                  autoPlay
                  className="video-player"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="video-info">
                  <h2>S{selectedEpisode.season}:E{selectedEpisode.episode} - {selectedEpisode.title}</h2>
                  <p>{selectedEpisode.description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Episodes by Season */}
        <motion.div 
          className="seasons-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {seasons.map(season => (
            <motion.div 
              key={season.number}
              className="season-section"
              variants={itemVariants}
            >
              <h2 className="season-title">Season {season.number}</h2>
              
              {getEpisodesBySeason(season.number).length > 0 ? (
                <div className="episodes-grid">
                  {getEpisodesBySeason(season.number).map(episode => (
                    <motion.div
                      key={episode.id}
                      className="episode-card"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="episode-thumbnail"
                        onClick={() => setSelectedEpisode(episode)}
                      >
                        {episode.thumbnail ? (
                          <img src={episode.thumbnail} alt={episode.title} />
                        ) : (
                          <div className="thumbnail-placeholder">
                            <span>▶</span>
                          </div>
                        )}
                        <div className="play-overlay">
                          <span>▶</span>
                        </div>
                      </div>
                      <div className="episode-details">
                        <h3>E{episode.episode}: {episode.title}</h3>
                        <p>{episode.description || 'No description available'}</p>
                        <button 
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteEpisode(episode.id)
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="no-episodes">
                  <p>No episodes uploaded for Season {season.number}</p>
                  <button 
                    className="upload-season-btn"
                    onClick={() => {
                      setNewEpisode(prev => ({ ...prev, season: String(season.number) }))
                      setShowUploadModal(true)
                    }}
                  >
                    + Add Episode
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Upload Modal */}
        <AnimatePresence>
          {showUploadModal && (
            <motion.div 
              className="upload-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="modal-content upload-modal-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <button 
                  className="close-btn"
                  onClick={() => {
                    setShowUploadModal(false)
                    setUploadProgress(0)
                    setNewEpisode({
                      title: '',
                      season: '1',
                      episode: '1',
                      description: '',
                      thumbnail: '',
                      videoUrl: ''
                    })
                  }}
                >
                  ✕
                </button>

                <h2>Upload New Episode</h2>

                <div className="upload-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Season</label>
                      <select 
                        value={newEpisode.season}
                        onChange={(e) => setNewEpisode(prev => ({ ...prev, season: e.target.value }))}
                      >
                        {seasons.map(s => (
                          <option key={s.number} value={s.number}>Season {s.number}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Episode #</label>
                      <select 
                        value={newEpisode.episode}
                        onChange={(e) => setNewEpisode(prev => ({ ...prev, episode: e.target.value }))}
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>Episode {i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Episode Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Chapter One: The Vanishing of Will Byers"
                      value={newEpisode.title}
                      onChange={(e) => setNewEpisode(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      placeholder="Episode description..."
                      value={newEpisode.description}
                      onChange={(e) => setNewEpisode(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label>Thumbnail (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={thumbnailInputRef}
                      onChange={handleThumbnailSelect}
                      style={{ display: 'none' }}
                    />
                    <button 
                      className="file-select-btn"
                      onClick={() => thumbnailInputRef.current?.click()}
                    >
                      {newEpisode.thumbnail ? '✅ Thumbnail Selected' : '📷 Select Thumbnail'}
                    </button>
                    {newEpisode.thumbnail && (
                      <img src={newEpisode.thumbnail} alt="Thumbnail preview" className="thumbnail-preview" />
                    )}
                  </div>

                  <div className="form-group">
                    <label>Video File</label>
                    <input
                      type="file"
                      accept="video/*"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                    />
                    <button 
                      className="file-select-btn video-btn"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? '⏳ Processing...' : newEpisode.videoUrl ? '✅ Video Ready' : '🎬 Select Video File'}
                    </button>
                    
                    {isUploading && (
                      <div className="upload-progress">
                        <div 
                          className="progress-bar"
                          style={{ width: `${uploadProgress}%` }}
                        />
                        <span>{uploadProgress}%</span>
                      </div>
                    )}

                    {newEpisode.fileName && (
                      <p className="file-name">📁 {newEpisode.fileName}</p>
                    )}
                  </div>

                  <button 
                    className="submit-btn"
                    onClick={handleAddEpisode}
                    disabled={isUploading || !newEpisode.videoUrl || !newEpisode.title}
                  >
                    Add Episode
                  </button>
                </div>
              </motion.div>
              <div className="modal-backdrop" onClick={() => setShowUploadModal(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Episodes
