import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import './RatingsChart.css'

const episodeRatings = {
  season1: [
    { ep: 1, title: "The Vanishing of Will Byers", rating: 8.4 },
    { ep: 2, title: "The Weirdo on Maple Street", rating: 8.3 },
    { ep: 3, title: "Holly, Jolly", rating: 8.5 },
    { ep: 4, title: "The Body", rating: 8.7 },
    { ep: 5, title: "The Flea and the Acrobat", rating: 8.5 },
    { ep: 6, title: "The Monster", rating: 8.6 },
    { ep: 7, title: "The Bathtub", rating: 8.9 },
    { ep: 8, title: "The Upside Down", rating: 9.3 }
  ],
  season2: [
    { ep: 1, title: "MADMAX", rating: 8.4 },
    { ep: 2, title: "Trick or Treat, Freak", rating: 8.3 },
    { ep: 3, title: "The Pollywog", rating: 8.3 },
    { ep: 4, title: "Will the Wise", rating: 8.6 },
    { ep: 5, title: "Dig Dug", rating: 8.5 },
    { ep: 6, title: "The Spy", rating: 8.5 },
    { ep: 7, title: "The Lost Sister", rating: 6.1 },
    { ep: 8, title: "The Mind Flayer", rating: 9.2 },
    { ep: 9, title: "The Gate", rating: 9.4 }
  ],
  season3: [
    { ep: 1, title: "Suzie, Do You Copy?", rating: 8.3 },
    { ep: 2, title: "The Mall Rats", rating: 8.1 },
    { ep: 3, title: "The Case of the Missing Lifeguard", rating: 8.3 },
    { ep: 4, title: "The Sauna Test", rating: 8.8 },
    { ep: 5, title: "The Flayed", rating: 8.6 },
    { ep: 6, title: "E Pluribus Unum", rating: 8.8 },
    { ep: 7, title: "The Bite", rating: 9.0 },
    { ep: 8, title: "The Battle of Starcourt", rating: 9.3 }
  ],
  season4: [
    { ep: 1, title: "The Hellfire Club", rating: 8.7 },
    { ep: 2, title: "Vecna's Curse", rating: 8.6 },
    { ep: 3, title: "The Monster and the Superhero", rating: 8.4 },
    { ep: 4, title: "Dear Billy", rating: 9.5 },
    { ep: 5, title: "The Nina Project", rating: 8.4 },
    { ep: 6, title: "The Dive", rating: 8.6 },
    { ep: 7, title: "The Massacre at Hawkins Lab", rating: 9.4 },
    { ep: 8, title: "Papa", rating: 8.9 },
    { ep: 9, title: "The Piggyback", rating: 9.3 }
  ],
  season5: [
    { ep: 1, title: "The Crawl", rating: 9.1 },
    { ep: 2, title: "The Reunion", rating: 8.8 },
    { ep: 3, title: "The Compass", rating: 9.2 },
    { ep: 4, title: "The Awakening", rating: 9.6 },
    { ep: 5, title: "The Echo", rating: 9.4 },
    { ep: 6, title: "The Heart", rating: 9.0 },
    { ep: 7, title: "The Circle", rating: 9.5 },
    { ep: 8, title: "The Beginning", rating: 9.8 }
  ]
}

const seasonColors = {
  season1: '#e74c3c',
  season2: '#9b59b6',
  season3: '#3498db',
  season4: '#c0392b',
  season5: '#2ecc71'
}

const seasonNames = {
  season1: 'Season 1 (1983)',
  season2: 'Season 2 (1984)',
  season3: 'Season 3 (1985)',
  season4: 'Season 4 (1986)',
  season5: 'Season 5 (1988)'
}

const RatingsChart = ({ onNavigate, onOpenSearch }) => {
  const [selectedSeason, setSelectedSeason] = useState('all')
  const [hoveredEpisode, setHoveredEpisode] = useState(null)
  const [viewMode, setViewMode] = useState('chart') // 'chart' or 'list'

  const getSeasonAverage = (season) => {
    const eps = episodeRatings[season]
    return (eps.reduce((sum, e) => sum + e.rating, 0) / eps.length).toFixed(2)
  }

  const getAllEpisodes = () => {
    let all = []
    Object.entries(episodeRatings).forEach(([season, episodes]) => {
      episodes.forEach(ep => {
        all.push({ ...ep, season })
      })
    })
    return all
  }

  const getHighestRated = () => {
    const all = getAllEpisodes()
    return all.sort((a, b) => b.rating - a.rating).slice(0, 5)
  }

  const getLowestRated = () => {
    const all = getAllEpisodes()
    return all.sort((a, b) => a.rating - b.rating).slice(0, 3)
  }

  const getRatingColor = (rating) => {
    if (rating >= 9.5) return '#2ecc71'
    if (rating >= 9.0) return '#27ae60'
    if (rating >= 8.5) return '#f1c40f'
    if (rating >= 8.0) return '#f39c12'
    if (rating >= 7.0) return '#e67e22'
    return '#e74c3c'
  }

  const maxRating = 10
  const minRating = 6

  return (
    <div className="ratings-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="ratings-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📊 EPISODE RATINGS
        </motion.h1>

        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          IMDb ratings for every episode across all seasons
        </motion.p>

        {/* Season Stats */}
        <motion.div 
          className="season-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {Object.keys(episodeRatings).map(season => (
            <div 
              key={season}
              className={`stat-card ${selectedSeason === season ? 'active' : ''}`}
              style={{ '--season-color': seasonColors[season] }}
              onClick={() => setSelectedSeason(selectedSeason === season ? 'all' : season)}
            >
              <div className="stat-season">{season.replace('season', 'S')}</div>
              <div className="stat-avg">{getSeasonAverage(season)}</div>
              <div className="stat-label">avg rating</div>
              <div className="stat-eps">{episodeRatings[season].length} eps</div>
            </div>
          ))}
        </motion.div>

        {/* View Toggle */}
        <motion.div 
          className="view-toggle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button 
            className={viewMode === 'chart' ? 'active' : ''}
            onClick={() => setViewMode('chart')}
          >
            📈 Chart View
          </button>
          <button 
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            📋 List View
          </button>
        </motion.div>

        {/* Chart View */}
        {viewMode === 'chart' && (
          <motion.div 
            className="chart-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="chart-y-axis">
              {[10, 9, 8, 7, 6].map(val => (
                <div key={val} className="y-label">{val}</div>
              ))}
            </div>
            
            <div className="chart-area">
              {Object.entries(episodeRatings)
                .filter(([season]) => selectedSeason === 'all' || selectedSeason === season)
                .map(([season, episodes]) => (
                  <div key={season} className="season-group">
                    <div className="season-label" style={{ color: seasonColors[season] }}>
                      {season.replace('season', 'S')}
                    </div>
                    <div className="bars-container">
                      {episodes.map((ep, idx) => {
                        const height = ((ep.rating - minRating) / (maxRating - minRating)) * 100
                        return (
                          <div 
                            key={`${season}-${ep.ep}`}
                            className="bar-wrapper"
                            onMouseEnter={() => setHoveredEpisode({ ...ep, season })}
                            onMouseLeave={() => setHoveredEpisode(null)}
                          >
                            <motion.div 
                              className="bar"
                              style={{ 
                                '--bar-color': seasonColors[season],
                                backgroundColor: getRatingColor(ep.rating)
                              }}
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ delay: 0.6 + idx * 0.05 }}
                            />
                            <div className="bar-label">E{ep.ep}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
            </div>

            {/* Tooltip */}
            {hoveredEpisode && (
              <div className="chart-tooltip">
                <div className="tooltip-title">{hoveredEpisode.title}</div>
                <div className="tooltip-meta">
                  {hoveredEpisode.season.replace('season', 'Season ')} Episode {hoveredEpisode.ep}
                </div>
                <div className="tooltip-rating" style={{ color: getRatingColor(hoveredEpisode.rating) }}>
                  ⭐ {hoveredEpisode.rating}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <motion.div 
            className="list-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Object.entries(episodeRatings)
              .filter(([season]) => selectedSeason === 'all' || selectedSeason === season)
              .map(([season, episodes]) => (
                <div key={season} className="season-list">
                  <h3 style={{ color: seasonColors[season] }}>{seasonNames[season]}</h3>
                  <div className="episodes-list">
                    {episodes.map(ep => (
                      <div key={`${season}-${ep.ep}`} className="episode-row">
                        <span className="ep-number">E{ep.ep}</span>
                        <span className="ep-title">{ep.title}</span>
                        <div className="ep-rating-bar">
                          <div 
                            className="ep-rating-fill"
                            style={{ 
                              width: `${(ep.rating / 10) * 100}%`,
                              backgroundColor: getRatingColor(ep.rating)
                            }}
                          />
                        </div>
                        <span className="ep-rating" style={{ color: getRatingColor(ep.rating) }}>
                          {ep.rating}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </motion.div>
        )}

        {/* Highlights */}
        <motion.div 
          className="highlights-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="highlight-card best">
            <h3>🏆 Highest Rated Episodes</h3>
            <div className="highlight-list">
              {getHighestRated().map((ep, idx) => (
                <div key={idx} className="highlight-item">
                  <span className="rank">#{idx + 1}</span>
                  <span className="title">{ep.title}</span>
                  <span className="season" style={{ color: seasonColors[ep.season] }}>
                    {ep.season.replace('season', 'S')}E{ep.ep}
                  </span>
                  <span className="rating" style={{ color: getRatingColor(ep.rating) }}>
                    {ep.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="highlight-card worst">
            <h3>📉 Lowest Rated Episodes</h3>
            <div className="highlight-list">
              {getLowestRated().map((ep, idx) => (
                <div key={idx} className="highlight-item">
                  <span className="rank">#{idx + 1}</span>
                  <span className="title">{ep.title}</span>
                  <span className="season" style={{ color: seasonColors[ep.season] }}>
                    {ep.season.replace('season', 'S')}E{ep.ep}
                  </span>
                  <span className="rating" style={{ color: getRatingColor(ep.rating) }}>
                    {ep.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div 
          className="fun-facts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3>📌 Fun Facts</h3>
          <div className="facts-grid">
            <div className="fact">
              <span className="fact-icon">🏆</span>
              <span className="fact-text">
                "The Beginning" (S5E8) is the highest-rated episode at <strong>9.8</strong>
              </span>
            </div>
            <div className="fact">
              <span className="fact-icon">📉</span>
              <span className="fact-text">
                "The Lost Sister" (S2E7) is the lowest-rated at <strong>6.1</strong>
              </span>
            </div>
            <div className="fact">
              <span className="fact-icon">⭐</span>
              <span className="fact-text">
                Season 5 has the highest average rating at <strong>{getSeasonAverage('season5')}</strong>
              </span>
            </div>
            <div className="fact">
              <span className="fact-icon">🎬</span>
              <span className="fact-text">
                <strong>42</strong> total episodes across 5 seasons
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RatingsChart
