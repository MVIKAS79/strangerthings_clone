import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import './FanArt.css'

const FanArt = ({ onNavigate, onOpenSearch }) => {
  const [artworks, setArtworks] = useState(() => {
    const saved = localStorage.getItem('st-fanart')
    return saved ? JSON.parse(saved) : []
  })
  const [selectedArt, setSelectedArt] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [newArt, setNewArt] = useState({ title: '', artist: '', image: '' })
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewArt(prev => ({ ...prev, image: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    if (!newArt.title || !newArt.artist || !newArt.image) return

    const artwork = {
      id: Date.now(),
      ...newArt,
      date: new Date().toLocaleDateString(),
      likes: 0
    }

    const updated = [artwork, ...artworks]
    setArtworks(updated)
    localStorage.setItem('st-fanart', JSON.stringify(updated))
    setNewArt({ title: '', artist: '', image: '' })
    setShowUploadForm(false)
  }

  const handleLike = (id, e) => {
    e.stopPropagation()
    const updated = artworks.map(art => 
      art.id === id ? { ...art, likes: art.likes + 1 } : art
    )
    setArtworks(updated)
    localStorage.setItem('st-fanart', JSON.stringify(updated))
  }

  const handleDelete = (id, e) => {
    e.stopPropagation()
    if (confirm('Delete this artwork?')) {
      const updated = artworks.filter(art => art.id !== id)
      setArtworks(updated)
      localStorage.setItem('st-fanart', JSON.stringify(updated))
      setSelectedArt(null)
    }
  }

  return (
    <div className="fanart-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="fanart-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎨 FAN ART GALLERY
        </motion.h1>

        <motion.p 
          className="fanart-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Share your Stranger Things fan art with the community!
        </motion.p>

        {/* Upload Button */}
        <motion.button 
          className="upload-btn"
          onClick={() => setShowUploadForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📤 Upload Your Art
        </motion.button>

        {/* Upload Form Modal */}
        <AnimatePresence>
          {showUploadForm && (
            <motion.div 
              className="upload-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUploadForm(false)}
            >
              <motion.div 
                className="upload-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <h2>Upload Fan Art</h2>
                
                <div className="upload-form">
                  <div 
                    className="image-upload-area"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {newArt.image ? (
                      <img src={newArt.image} alt="Preview" />
                    ) : (
                      <div className="upload-placeholder">
                        <span className="upload-icon">🖼️</span>
                        <span>Click to select image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*"
                      hidden
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Artwork Title"
                    value={newArt.title}
                    onChange={(e) => setNewArt(prev => ({ ...prev, title: e.target.value }))}
                  />

                  <input
                    type="text"
                    placeholder="Artist Name"
                    value={newArt.artist}
                    onChange={(e) => setNewArt(prev => ({ ...prev, artist: e.target.value }))}
                  />

                  <div className="form-actions">
                    <button className="cancel-btn" onClick={() => setShowUploadForm(false)}>
                      Cancel
                    </button>
                    <button 
                      className="submit-btn" 
                      onClick={handleUpload}
                      disabled={!newArt.title || !newArt.artist || !newArt.image}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Grid */}
        {artworks.length > 0 ? (
          <motion.div 
            className="gallery-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {artworks.map((art, index) => (
              <motion.div
                key={art.id}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedArt(art)}
                whileHover={{ scale: 1.03 }}
              >
                <img src={art.image} alt={art.title} />
                <div className="gallery-item-overlay">
                  <h3>{art.title}</h3>
                  <p>by {art.artist}</p>
                  <div className="item-actions">
                    <button 
                      className="like-btn"
                      onClick={(e) => handleLike(art.id, e)}
                    >
                      ❤️ {art.likes}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="empty-gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="empty-icon">🎨</span>
            <h3>No artwork yet</h3>
            <p>Be the first to share your Stranger Things fan art!</p>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedArt && (
            <motion.div 
              className="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArt(null)}
            >
              <motion.div 
                className="lightbox"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={e => e.stopPropagation()}
              >
                <button className="close-lightbox" onClick={() => setSelectedArt(null)}>×</button>
                <img src={selectedArt.image} alt={selectedArt.title} />
                <div className="lightbox-info">
                  <h2>{selectedArt.title}</h2>
                  <p className="lightbox-artist">by {selectedArt.artist}</p>
                  <p className="lightbox-date">Uploaded: {selectedArt.date}</p>
                  <div className="lightbox-actions">
                    <button 
                      className="like-btn large"
                      onClick={(e) => handleLike(selectedArt.id, e)}
                    >
                      ❤️ {selectedArt.likes} Likes
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={(e) => handleDelete(selectedArt.id, e)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FanArt
