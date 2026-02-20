import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import { quotes } from '../data/quotes'
import './Quotes.css'

const Quotes = ({ onNavigate, onOpenSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('all')
  const [selectedCharacter, setSelectedCharacter] = useState('all')
  const [copiedId, setCopiedId] = useState(null)

  // Get unique characters
  const characters = useMemo(() => {
    const chars = [...new Set(quotes.map(q => q.character))]
    return chars.sort()
  }, [])

  // Filter quotes
  const filteredQuotes = useMemo(() => {
    return quotes.filter(quote => {
      const matchesSearch = searchTerm === '' || 
        quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.character.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSeason = selectedSeason === 'all' || quote.season === parseInt(selectedSeason)
      const matchesCharacter = selectedCharacter === 'all' || quote.character === selectedCharacter
      return matchesSearch && matchesSeason && matchesCharacter
    })
  }, [searchTerm, selectedSeason, selectedCharacter])

  const copyToClipboard = (quote) => {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.character}`)
    setCopiedId(quote.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="quotes-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="quotes-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          💬 MEMORABLE QUOTES
        </motion.h1>

        {/* Filters */}
        <motion.div 
          className="quotes-filters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search quotes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-selects">
            <select 
              value={selectedSeason} 
              onChange={(e) => setSelectedSeason(e.target.value)}
            >
              <option value="all">All Seasons</option>
              <option value="1">Season 1</option>
              <option value="2">Season 2</option>
              <option value="3">Season 3</option>
              <option value="4">Season 4</option>
            </select>

            <select 
              value={selectedCharacter} 
              onChange={(e) => setSelectedCharacter(e.target.value)}
            >
              <option value="all">All Characters</option>
              {characters.map(char => (
                <option key={char} value={char}>{char}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results count */}
        <motion.p 
          className="results-count"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Showing {filteredQuotes.length} of {quotes.length} quotes
        </motion.p>

        {/* Quotes Grid */}
        <motion.div 
          className="quotes-grid"
          layout
        >
          <AnimatePresence>
            {filteredQuotes.map((quote, index) => (
              <motion.div
                key={quote.id}
                className="quote-card"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03 }}
              >
                <div className="quote-marks">"</div>
                <p className="quote-text">{quote.text}</p>
                <div className="quote-footer">
                  <div className="quote-character">
                    <span className="character-name">— {quote.character}</span>
                    <span className="quote-episode">S{quote.season}: {quote.episode}</span>
                  </div>
                  <button 
                    className={`copy-btn ${copiedId === quote.id ? 'copied' : ''}`}
                    onClick={() => copyToClipboard(quote)}
                  >
                    {copiedId === quote.id ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                {quote.context && (
                  <p className="quote-context">💡 {quote.context}</p>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredQuotes.length === 0 && (
          <motion.div 
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="no-results-icon">🔍</span>
            <p>No quotes found matching your search.</p>
            <button onClick={() => {
              setSearchTerm('')
              setSelectedSeason('all')
              setSelectedCharacter('all')
            }}>
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Quotes
