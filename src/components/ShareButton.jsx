import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ShareButton.css'

const ShareButton = ({ 
  title = 'Stranger Things Fan Site',
  text = 'Check out this awesome Stranger Things content!',
  url = window.location.href,
  type = 'default',
  data = null // For sharing specific content like quiz results
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  // Generate share text based on type
  const getShareText = () => {
    if (type === 'quiz' && data) {
      return `I got ${data.character} on the Stranger Things Character Quiz! 🔮 Which character are you?`
    }
    if (type === 'trivia' && data) {
      return `I scored ${data.score}/${data.total} on the Stranger Things Trivia! 🧠 Can you beat my score?`
    }
    if (type === 'quote' && data) {
      return `"${data.text}" - ${data.character} 💬 #StrangerThings`
    }
    return text
  }

  const shareText = getShareText()

  // Share URLs for different platforms
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(shareText)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${url}`)}`
  }

  // Native share API
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: url
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err)
        }
      }
    } else {
      setShowMenu(true)
    }
  }

  // Copy to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Open share URL
  const handleShare = (platform) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    setShowMenu(false)
  }

  const shareOptions = [
    { id: 'twitter', icon: '🐦', label: 'Twitter/X', color: '#1DA1F2' },
    { id: 'facebook', icon: '📘', label: 'Facebook', color: '#4267B2' },
    { id: 'whatsapp', icon: '💬', label: 'WhatsApp', color: '#25D366' },
    { id: 'telegram', icon: '✈️', label: 'Telegram', color: '#0088cc' },
    { id: 'reddit', icon: '🤖', label: 'Reddit', color: '#FF4500' },
    { id: 'email', icon: '📧', label: 'Email', color: '#EA4335' }
  ]

  return (
    <div className="share-button-container">
      <motion.button
        className="share-btn"
        onClick={handleNativeShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Share"
      >
        <span className="share-icon">📤</span>
        <span className="share-text">Share</span>
      </motion.button>

      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div 
              className="share-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
            />
            <motion.div 
              className="share-menu"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
            >
              <div className="share-menu-header">
                <h4>Share</h4>
                <button className="close-btn" onClick={() => setShowMenu(false)}>✕</button>
              </div>

              <div className="share-preview">
                <p>{shareText}</p>
              </div>

              <div className="share-options">
                {shareOptions.map(option => (
                  <button
                    key={option.id}
                    className="share-option"
                    onClick={() => handleShare(option.id)}
                    style={{ '--share-color': option.color }}
                  >
                    <span className="option-icon">{option.icon}</span>
                    <span className="option-label">{option.label}</span>
                  </button>
                ))}
              </div>

              <div className="share-link-section">
                <span className="link-label">Or copy link:</span>
                <div className="link-input-group">
                  <input type="text" value={url} readOnly />
                  <button 
                    className={`copy-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopyLink}
                  >
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Specialized share components
export const ShareQuizResult = ({ character, description }) => (
  <ShareButton 
    type="quiz"
    data={{ character, description }}
    title="Stranger Things Character Quiz Result"
  />
)

export const ShareTriviaScore = ({ score, total }) => (
  <ShareButton 
    type="trivia"
    data={{ score, total }}
    title="Stranger Things Trivia Score"
  />
)

export const ShareQuote = ({ text, character }) => (
  <ShareButton 
    type="quote"
    data={{ text, character }}
    title="Stranger Things Quote"
  />
)

export default ShareButton
