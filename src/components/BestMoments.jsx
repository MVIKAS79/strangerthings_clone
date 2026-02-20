import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import './BestMoments.css'

const momentsData = [
  {
    id: 1,
    title: "Eleven Flips the Van",
    season: 1,
    episode: 7,
    description: "Eleven uses her powers to flip the government van chasing the boys, saving them from capture.",
    category: "action",
    icon: "🚐",
    votes: 15234
  },
  {
    id: 2,
    title: "Running Up That Hill - Max's Escape",
    season: 4,
    episode: 4,
    description: "Max escapes Vecna's curse by running towards her friends while Kate Bush plays. An instant iconic moment.",
    category: "emotional",
    icon: "🏃‍♀️",
    votes: 28456
  },
  {
    id: 3,
    title: "Eddie's Master of Puppets Solo",
    season: 4,
    episode: 9,
    description: "Eddie shreds Metallica in the Upside Down to distract the Demobats. The most metal moment in TV history.",
    category: "action",
    icon: "🎸",
    votes: 31245
  },
  {
    id: 4,
    title: "Dustin and Suzie's NeverEnding Story",
    season: 3,
    episode: 8,
    description: "In the most tense moment, Dustin and Suzie sing a duet while everyone waits for Planck's constant.",
    category: "funny",
    icon: "🎵",
    votes: 19876
  },
  {
    id: 5,
    title: "Hopper's Letter",
    season: 3,
    episode: 8,
    description: "Eleven reads Hopper's letter about keeping the door open three inches. Devastating.",
    category: "emotional",
    icon: "💌",
    votes: 24567
  },
  {
    id: 6,
    title: "The Snow Ball Dance",
    season: 2,
    episode: 9,
    description: "Mike and Eleven finally dance together at the Snow Ball while 'Every Breath You Take' plays.",
    category: "emotional",
    icon: "💃",
    votes: 18234
  },
  {
    id: 7,
    title: "Joyce's Christmas Lights",
    season: 1,
    episode: 3,
    description: "Joyce communicates with Will through Christmas lights. 'R-U-N' spelled in lights remains chilling.",
    category: "scary",
    icon: "💡",
    votes: 16789
  },
  {
    id: 8,
    title: "Steve vs Billy Basketball",
    season: 2,
    episode: 4,
    description: "The ultimate jock showdown. Billy dominates, establishing him as a threat.",
    category: "action",
    icon: "🏀",
    votes: 8234
  },
  {
    id: 9,
    title: "Eleven Closes the Gate",
    season: 2,
    episode: 9,
    description: "Eleven's most powerful moment in Season 2, screaming as she closes the gate to the Upside Down.",
    category: "action",
    icon: "🌀",
    votes: 21345
  },
  {
    id: 10,
    title: "Bob's Death",
    season: 2,
    episode: 8,
    description: "Bob Newby, Superhero, dies saving everyone. A gut-wrenching loss.",
    category: "emotional",
    icon: "💔",
    votes: 14567
  },
  {
    id: 11,
    title: "Eddie's Last Stand",
    season: 4,
    episode: 9,
    description: "Eddie decides not to run, fighting the Demobats until the end. 'I didn't run away this time.'",
    category: "emotional",
    icon: "⚔️",
    votes: 27890
  },
  {
    id: 12,
    title: "Vecna's Origin Reveal",
    season: 4,
    episode: 7,
    description: "Henry Creel is One. One is Vecna. Mind = blown.",
    category: "twist",
    icon: "🤯",
    votes: 25678
  },
  {
    id: 13,
    title: "Will's True Sight Reveal",
    season: 5,
    episode: 3,
    description: "Will discovers he can see through the Upside Down, becoming the team's compass.",
    category: "twist",
    icon: "👁️",
    votes: 18234
  },
  {
    id: 14,
    title: "Max Awakens from Coma",
    season: 5,
    episode: 4,
    description: "Eleven rescues Max's mind from Vecna's prison. Their emotional reunion had everyone crying.",
    category: "emotional",
    icon: "💕",
    votes: 22456
  },
  {
    id: 15,
    title: "Eddie and Steve Guitar Duet",
    season: 5,
    episode: 5,
    description: "Eddie's spirit plays Fade to Black with Steve in the Upside Down. A beautiful farewell.",
    category: "emotional",
    icon: "🎸",
    votes: 26789
  },
  {
    id: 16,
    title: "The Heart Circle",
    season: 5,
    episode: 7,
    description: "All friends channel their love through Will to power Eleven. Peak found family moment.",
    category: "emotional",
    icon: "❤️",
    votes: 29876
  },
  {
    id: 17,
    title: "Hopper's Sacrifice",
    season: 5,
    episode: 8,
    description: "Hopper destroys the Heart of the Upside Down. 'Go. Save the world. I'll hold the door.'",
    category: "emotional",
    icon: "🚪",
    votes: 34567
  },
  {
    id: 18,
    title: "Eleven Contains Vecna",
    season: 5,
    episode: 8,
    description: "Instead of killing Vecna, Eleven absorbs him, proving she's not a monster. The ultimate victory.",
    category: "action",
    icon: "⚡",
    votes: 31234
  },
  {
    id: 19,
    title: "Steve's 'Six Kids' Speech",
    season: 4,
    episode: 6,
    description: "Steve tells Nancy about his dream of six kids. The whole fandom held their breath for his survival.",
    category: "funny",
    icon: "👶",
    votes: 12345
  },
  {
    id: 20,
    title: "Will's Confession to Mike",
    season: 5,
    episode: 3,
    description: "Will finally opens up about his feelings. Mike's supportive response was perfect.",
    category: "emotional",
    icon: "🌈",
    votes: 23456
  }
]

const categories = ['all', 'emotional', 'action', 'funny', 'scary', 'twist']
const categoryEmojis = {
  all: '🌟',
  emotional: '😢',
  action: '💥',
  funny: '😂',
  scary: '😱',
  twist: '🤯'
}

const BestMoments = ({ onNavigate, onOpenSearch }) => {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('votes')
  const [userVotes, setUserVotes] = useState(() => {
    const saved = localStorage.getItem('st-moment-votes')
    return saved ? JSON.parse(saved) : {}
  })
  const [selectedMoment, setSelectedMoment] = useState(null)

  const handleVote = (momentId) => {
    setUserVotes(prev => {
      const newVotes = { ...prev, [momentId]: !prev[momentId] }
      localStorage.setItem('st-moment-votes', JSON.stringify(newVotes))
      return newVotes
    })
  }

  const filteredMoments = momentsData
    .filter(m => filter === 'all' || m.category === filter)
    .sort((a, b) => {
      if (sortBy === 'votes') {
        const aVotes = a.votes + (userVotes[a.id] ? 1 : 0)
        const bVotes = b.votes + (userVotes[b.id] ? 1 : 0)
        return bVotes - aVotes
      }
      if (sortBy === 'season') return a.season - b.season || a.episode - b.episode
      return 0
    })

  const getVoteCount = (moment) => {
    return moment.votes + (userVotes[moment.id] ? 1 : 0)
  }

  const getRank = (moment) => {
    const sorted = [...momentsData].sort((a, b) => getVoteCount(b) - getVoteCount(a))
    return sorted.findIndex(m => m.id === moment.id) + 1
  }

  return (
    <div className="best-moments-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="moments-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🏆 BEST MOMENTS
        </motion.h1>

        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Vote for your favorite moments across all seasons!
        </motion.p>

        {/* Controls */}
        <motion.div 
          className="moments-controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="filter-group">
            <span className="filter-label">Category:</span>
            <div className="filter-buttons">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {categoryEmojis[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-group">
            <span className="sort-label">Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="votes">Most Votes</option>
              <option value="season">Season Order</option>
            </select>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div 
          className="podium"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[1, 0, 2].map((idx) => {
            const sorted = [...momentsData].sort((a, b) => getVoteCount(b) - getVoteCount(a))
            const moment = sorted[idx]
            if (!moment) return null
            const positions = ['🥈', '🥇', '🥉']
            const heights = ['120px', '160px', '100px']
            
            return (
              <div 
                key={moment.id}
                className={`podium-spot rank-${idx + 1}`}
                style={{ '--podium-height': heights[idx] }}
                onClick={() => setSelectedMoment(moment)}
              >
                <div className="podium-medal">{positions[idx]}</div>
                <div className="podium-icon">{moment.icon}</div>
                <div className="podium-title">{moment.title}</div>
                <div className="podium-votes">{getVoteCount(moment).toLocaleString()} votes</div>
                <div className="podium-base"></div>
              </div>
            )
          })}
        </motion.div>

        {/* Moments List */}
        <div className="moments-list">
          {filteredMoments.map((moment, index) => (
            <motion.div
              key={moment.id}
              className={`moment-card ${userVotes[moment.id] ? 'voted' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              onClick={() => setSelectedMoment(moment)}
            >
              <div className="moment-rank">#{getRank(moment)}</div>
              <div className="moment-icon">{moment.icon}</div>
              
              <div className="moment-info">
                <h3>{moment.title}</h3>
                <p className="moment-meta">
                  Season {moment.season}, Episode {moment.episode}
                </p>
                <span className={`moment-category ${moment.category}`}>
                  {categoryEmojis[moment.category]} {moment.category}
                </span>
              </div>

              <div className="moment-votes">
                <span className="vote-count">{getVoteCount(moment).toLocaleString()}</span>
                <span className="vote-label">votes</span>
              </div>

              <button 
                className={`vote-btn ${userVotes[moment.id] ? 'voted' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleVote(moment.id)
                }}
              >
                {userVotes[moment.id] ? '❤️' : '🤍'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Selected Moment Modal */}
        <AnimatePresence>
          {selectedMoment && (
            <motion.div 
              className="moment-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMoment(null)}
            >
              <motion.div 
                className="moment-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-btn" onClick={() => setSelectedMoment(null)}>×</button>
                
                <div className="modal-header">
                  <span className="modal-rank">#{getRank(selectedMoment)}</span>
                  <span className="modal-icon">{selectedMoment.icon}</span>
                  <h2>{selectedMoment.title}</h2>
                </div>

                <div className="modal-content">
                  <p className="modal-meta">
                    Season {selectedMoment.season}, Episode {selectedMoment.episode}
                  </p>
                  <p className="modal-description">{selectedMoment.description}</p>
                  
                  <span className={`modal-category ${selectedMoment.category}`}>
                    {categoryEmojis[selectedMoment.category]} {selectedMoment.category}
                  </span>

                  <div className="modal-votes">
                    <span className="vote-count">{getVoteCount(selectedMoment).toLocaleString()}</span>
                    <span className="vote-label">fans voted for this moment</span>
                  </div>

                  <button 
                    className={`vote-btn large ${userVotes[selectedMoment.id] ? 'voted' : ''}`}
                    onClick={() => handleVote(selectedMoment.id)}
                  >
                    {userVotes[selectedMoment.id] ? '❤️ You Voted!' : '🤍 Vote for This Moment'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BestMoments
