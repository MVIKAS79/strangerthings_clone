import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { characters } from '../data/characters'
import { episodeGuide } from '../data/episodeGuide'
import { quotes } from '../data/quotes'
import './Search.css'

const Search = ({ onNavigate, onClose }) => {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Search results
  const results = useMemo(() => {
    if (!query.trim()) return { characters: [], episodes: [], quotes: [] }

    const searchTerm = query.toLowerCase()

    const matchedCharacters = characters.filter(c =>
      c.name.toLowerCase().includes(searchTerm) ||
      c.role.toLowerCase().includes(searchTerm) ||
      c.actor.toLowerCase().includes(searchTerm)
    ).slice(0, 5)

    const matchedEpisodes = []
    Object.values(episodeGuide).forEach(season => {
      season.episodes.forEach(ep => {
        if (
          ep.title.toLowerCase().includes(searchTerm) ||
          ep.summary.toLowerCase().includes(searchTerm)
        ) {
          matchedEpisodes.push({ ...ep, season: season.title })
        }
      })
    })

    const matchedQuotes = quotes.filter(q =>
      q.text.toLowerCase().includes(searchTerm) ||
      q.character.toLowerCase().includes(searchTerm)
    ).slice(0, 5)

    return {
      characters: matchedCharacters.slice(0, 5),
      episodes: matchedEpisodes.slice(0, 5),
      quotes: matchedQuotes.slice(0, 5)
    }
  }, [query])

  const totalResults = results.characters.length + results.episodes.length + results.quotes.length

  const handleCharacterClick = (character) => {
    onNavigate('characters')
    onClose()
  }

  const handleEpisodeClick = () => {
    onNavigate('episodeguide')
    onClose()
  }

  const handleQuoteClick = () => {
    onNavigate('quotes')
    onClose()
  }

  return (
    <motion.div 
      className="search-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="search-modal"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="search-input-container">
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search characters, episodes, quotes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button className="close-search" onClick={onClose}>✕</button>
        </div>

        {/* Quick Filters */}
        {query && (
          <div className="search-tabs">
            <button 
              className={`search-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All ({totalResults})
            </button>
            <button 
              className={`search-tab ${activeTab === 'characters' ? 'active' : ''}`}
              onClick={() => setActiveTab('characters')}
            >
              👤 Characters ({results.characters.length})
            </button>
            <button 
              className={`search-tab ${activeTab === 'episodes' ? 'active' : ''}`}
              onClick={() => setActiveTab('episodes')}
            >
              📺 Episodes ({results.episodes.length})
            </button>
            <button 
              className={`search-tab ${activeTab === 'quotes' ? 'active' : ''}`}
              onClick={() => setActiveTab('quotes')}
            >
              💬 Quotes ({results.quotes.length})
            </button>
          </div>
        )}

        {/* Results */}
        <div className="search-results">
          {!query && (
            <div className="search-hint">
              <span className="hint-icon">💡</span>
              <p>Try searching for "Eleven", "Demogorgon", or "Friends don't lie"</p>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="no-results">
              <span className="no-results-icon">😕</span>
              <p>No results found for "{query}"</p>
            </div>
          )}

          {/* Characters */}
          {(activeTab === 'all' || activeTab === 'characters') && results.characters.length > 0 && (
            <div className="result-section">
              <h3 className="section-title">👤 Characters</h3>
              {results.characters.map(char => (
                <motion.div 
                  key={char.id}
                  className="result-item"
                  onClick={() => handleCharacterClick(char)}
                  whileHover={{ x: 5 }}
                >
                  <div className="result-avatar">
                    <img 
                      src={char.image} 
                      alt={char.name}
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <span className="avatar-fallback">{char.name.charAt(0)}</span>
                  </div>
                  <div className="result-info">
                    <span className="result-title">{char.name}</span>
                    <span className="result-subtitle">{char.role} • {char.actor}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Episodes */}
          {(activeTab === 'all' || activeTab === 'episodes') && results.episodes.length > 0 && (
            <div className="result-section">
              <h3 className="section-title">📺 Episodes</h3>
              {results.episodes.map((ep, i) => (
                <motion.div 
                  key={i}
                  className="result-item"
                  onClick={handleEpisodeClick}
                  whileHover={{ x: 5 }}
                >
                  <div className="result-icon">📺</div>
                  <div className="result-info">
                    <span className="result-title">{ep.title}</span>
                    <span className="result-subtitle">{ep.season} • ⭐ {ep.rating}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Quotes */}
          {(activeTab === 'all' || activeTab === 'quotes') && results.quotes.length > 0 && (
            <div className="result-section">
              <h3 className="section-title">💬 Quotes</h3>
              {results.quotes.map(quote => (
                <motion.div 
                  key={quote.id}
                  className="result-item quote-result"
                  onClick={handleQuoteClick}
                  whileHover={{ x: 5 }}
                >
                  <div className="result-icon">💬</div>
                  <div className="result-info">
                    <span className="result-title">"{quote.text}"</span>
                    <span className="result-subtitle">— {quote.character}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Keyboard Hint */}
        <div className="keyboard-hint">
          Press <kbd>ESC</kbd> to close
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Search
