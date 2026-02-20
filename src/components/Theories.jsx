import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import './Theories.css'

const theories = [
  {
    id: 1,
    title: 'Will Byers Has Powers',
    category: 'Character Theory',
    icon: '🔮',
    credibility: 'confirmed',
    summary: 'Will developed supernatural abilities from his time in the Upside Down.',
    details: 'CONFIRMED IN SEASON 5! Will\'s connection to the Mind Flayer gave him the ability to sense and ultimately communicate with the Upside Down. In the final season, Will became the key to locating Vecna\'s heart and guiding the team through the merged dimensions. His powers weren\'t offensive like Eleven\'s, but his role as "the compass" proved essential to victory.',
    evidence: [
      '✅ Will became the team\'s guide in the Upside Down',
      '✅ He could sense Vecna\'s location and emotions',
      '✅ His drawings showed the path to victory',
      '✅ The Mind Flayer connection was weaponized for good',
      '✅ His "True Sight" ability was revealed'
    ],
    votes: 8543,
    verdict: 'confirmed'
  },
  {
    id: 2,
    title: 'Eleven Will Defeat Vecna With Her Emotions',
    category: 'Plot Theory',
    icon: '❤️',
    credibility: 'confirmed',
    summary: 'Love and positive emotions were the key to defeating Vecna.',
    details: 'CONFIRMED! The finale showed Eleven defeating Vecna not by matching his rage with her own, but by accepting her trauma while embracing her connections to her found family. The iconic "heart circle" scene where all her friends projected their love through Will\'s connection gave Eleven the strength to contain Vecna within herself rather than destroy him - a fate worse than death for him.',
    evidence: [
      '✅ The "heart circle" ritual in the final episode',
      '✅ Eleven chose containment over destruction',
      '✅ Mike\'s declaration of love was key',
      '✅ Hopper\'s sacrifice was motivated by love'
    ],
    votes: 7234,
    verdict: 'confirmed'
  },
  {
    id: 3,
    title: 'The Upside Down is Stuck in 1983',
    category: 'Lore Theory',
    icon: '⏰',
    credibility: 'confirmed',
    summary: 'The Upside Down was frozen in the moment the first gate opened.',
    details: 'FULLY EXPLAINED IN S5! The finale revealed that when Eleven banished Henry to the void, her traumatic memory of that day (November 6, 1983) created the template for the entire dimension. The Upside Down is literally Eleven\'s nightmare made manifest, which is why her emotional state could ultimately control and seal it.',
    evidence: [
      '✅ Will\'s exposition confirmed the theory',
      '✅ The dimension was Eleven\'s creation',
      '✅ Her healing closed the dimension forever',
      '✅ The Duffer Brothers called this "the biggest reveal"'
    ],
    votes: 12453,
    verdict: 'confirmed'
  },
  {
    id: 4,
    title: 'Hopper and Joyce Will Get Married',
    category: 'Romance Theory',
    icon: '💒',
    credibility: 'partial',
    summary: 'Hopper and Joyce\'s romance was finally realized, but not as fans expected.',
    details: 'BITTERSWEET ENDING. Hopper and Joyce did share a wedding scene in the finale - but it was revealed to be a flash-forward vision shown by Will before Hopper\'s sacrifice. They confessed their love and exchanged vows moments before Hopper destroyed the Heart. The epilogue shows Joyce wearing his hat, honoring his memory.',
    evidence: [
      '✅ They confessed their love',
      '⚠️ Wedding happened but Hopper didn\'t survive',
      '✅ Joyce adopted Eleven officially',
      '💔 Hopper\'s sacrifice was heartbreaking'
    ],
    votes: 9876,
    verdict: 'partial'
  },
  {
    id: 5,
    title: 'Steve Harrington Will Die',
    category: 'Character Theory',
    icon: '💀',
    credibility: 'debunked',
    summary: 'Steve survived! The six-kids dream came true.',
    details: 'SUBVERTED! In a twist that delighted fans, Steve not only survived but the epilogue montage showed him years later with a family. The Duffer Brothers confirmed they always planned to let Steve live, knowing fans expected his death. His "death fake-out" scene with the Demobats in Episode 6 had everyone terrified, though.',
    evidence: [
      '❌ Steve survived the entire series',
      '✅ He ended up with a family (unclear if 6 kids!)',
      '✅ His protective arc was completed positively',
      '🎉 The Duffers trolled fans beautifully'
    ],
    votes: 6234,
    verdict: 'debunked'
  },
  {
    id: 6,
    title: 'Will Is In Love With Mike',
    category: 'Character Theory',
    icon: '🌈',
    credibility: 'confirmed',
    summary: 'Will\'s feelings for Mike were confirmed and he found his own happiness.',
    details: 'CONFIRMED AND RESOLVED. Season 5 gave Will a beautiful arc where he finally confessed his feelings to Mike. While Mike gently explained his love for Eleven, their friendship remained stronger than ever. The epilogue showed Will happy and confident, finally accepting himself. Noah Schnapp called it "the closure Will deserved."',
    evidence: [
      '✅ Will confessed to Mike in Episode 3',
      '✅ Jonathan\'s supportive brother moment happened',
      '✅ Will was shown happy in the epilogue',
      '✅ LGBTQ+ representation done with care'
    ],
    votes: 15678,
    verdict: 'confirmed'
  },
  {
    id: 7,
    title: 'Vecna Will Win (Initially)',
    category: 'Plot Theory',
    icon: '⚡',
    credibility: 'confirmed',
    summary: 'Season 5 began with Hawkins merged with the Upside Down.',
    details: 'CONFIRMED! The two-year time skip showed Hawkins as a quarantine zone, partially merged with the Upside Down. Vecna\'s "Fallen Hawkins" was the setting for the first half of the season. The military had evacuated survivors but our heroes snuck back in for the final mission. It was even darker than fans predicted.',
    evidence: [
      '✅ Time skip to 1988 showed merged Hawkins',
      '✅ "Fallen Hawkins" setting was incredible',
      '✅ Military evacuation happened',
      '✅ Stakes were higher than ever'
    ],
    votes: 5432,
    verdict: 'confirmed'
  },
  {
    id: 8,
    title: 'Eleven Created the Upside Down',
    category: 'Lore Theory',
    icon: '🌀',
    credibility: 'confirmed',
    summary: 'Eleven\'s trauma literally created the dimension when she banished Henry.',
    details: 'THE BIG REVEAL! The finale confirmed that when young Eleven banished Henry/001 through the first gate, her fear and trauma shaped the void into the Upside Down. The Mind Flayer was Henry\'s rage given form, while the frozen 1983 Hawkins was Eleven\'s fear. By healing her trauma and accepting her past, Eleven could finally close the dimension forever.',
    evidence: [
      '✅ Will explained the connection in Episode 7',
      '✅ Eleven\'s healing sealed the dimension',
      '✅ The Upside Down was her nightmare',
      '✅ Henry corrupted what Eleven created'
    ],
    votes: 8765,
    verdict: 'confirmed'
  },
  {
    id: 9,
    title: 'Eddie Would Return as an Upside Down Entity',
    category: 'Character Theory',
    icon: '🦇',
    credibility: 'confirmed',
    summary: 'Eddie Munson appeared as a spirit guide in the Upside Down.',
    details: 'FAN FAVORITE CONFIRMED! Eddie appeared in Episode 5 as a ghostly guide when Steve was separated from the group. Though not truly "alive," the Upside Down\'s nature allowed Eddie to exist as an echo. His guitar scene with Steve brought fans to tears, and he helped guide the team to Vecna\'s lair.',
    evidence: [
      '✅ Eddie appeared in Episodes 5-6',
      '✅ Guitar duet with Steve was iconic',
      '✅ He remained a helpful spirit',
      '✅ Joseph Quinn returned for filming'
    ],
    votes: 18234,
    verdict: 'confirmed'
  },
  {
    id: 10,
    title: 'Max Would Fully Recover',
    category: 'Character Theory',
    icon: '💪',
    credibility: 'confirmed',
    summary: 'Max awakened from her coma and joined the final battle.',
    details: 'EMOTIONAL PAYOFF! Max remained in her coma for the first three episodes, with Lucas barely leaving her side. Her awakening in Episode 4, triggered by Eleven entering her mind to retrieve her, was one of the season\'s most emotional moments. Though physically weakened, Max\'s strategic mind proved crucial in the finale.',
    evidence: [
      '✅ Max woke up in Episode 4',
      '✅ Eleven rescued her mind from Vecna',
      '✅ Lucas never gave up on her',
      '✅ She helped plan the final assault'
    ],
    votes: 14567,
    verdict: 'confirmed'
  }
]

const categories = ['All', 'Character Theory', 'Plot Theory', 'Lore Theory', 'Romance Theory']
const credibilityColors = {
  confirmed: '#2ecc71',
  partial: '#f39c12',
  debunked: '#e74c3c',
  high: '#3498db',
  medium: '#f39c12',
  low: '#e74c3c'
}

const Theories = ({ onNavigate, onOpenSearch }) => {
  const [selectedTheory, setSelectedTheory] = useState(null)
  const [filter, setFilter] = useState('All')
  const [sortBy, setSortBy] = useState('votes')
  const [userVotes, setUserVotes] = useState(() => {
    const saved = localStorage.getItem('st-theory-votes')
    return saved ? JSON.parse(saved) : {}
  })

  const handleVote = (theoryId) => {
    setUserVotes(prev => {
      const newVotes = { ...prev, [theoryId]: !prev[theoryId] }
      localStorage.setItem('st-theory-votes', JSON.stringify(newVotes))
      return newVotes
    })
  }

  const filteredTheories = theories
    .filter(t => filter === 'All' || t.category === filter)
    .sort((a, b) => {
      if (sortBy === 'votes') return b.votes - a.votes
      if (sortBy === 'credibility') {
        const order = { confirmed: 4, high: 3, medium: 2, low: 1 }
        return order[b.credibility] - order[a.credibility]
      }
      return 0
    })

  return (
    <div className="theories-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="theories-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🔮 THEORY TRACKER
        </motion.h1>

        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          How did fan theories hold up? See what was confirmed, debunked, or partially true!
        </motion.p>

        {/* Filters */}
        <motion.div 
          className="theories-filters"
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
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="sort-group">
            <span className="filter-label">Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="votes">Most Popular</option>
              <option value="credibility">Credibility</option>
            </select>
          </div>
        </motion.div>

        {/* Theories Grid */}
        <div className="theories-grid">
          {filteredTheories.map((theory, index) => (
            <motion.div
              key={theory.id}
              className={`theory-card ${selectedTheory?.id === theory.id ? 'selected' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedTheory(selectedTheory?.id === theory.id ? null : theory)}
            >
              <div className="theory-header">
                <span className="theory-icon">{theory.icon}</span>
                <div className="theory-badges">
                  <span 
                    className="credibility-badge"
                    style={{ background: credibilityColors[theory.credibility] }}
                  >
                    {theory.credibility}
                  </span>
                  <span className="category-badge">{theory.category}</span>
                </div>
              </div>

              <h3 className="theory-title">{theory.title}</h3>
              <p className="theory-summary">{theory.summary}</p>

              <div className="theory-footer">
                <button 
                  className={`vote-btn ${userVotes[theory.id] ? 'voted' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleVote(theory.id)
                  }}
                >
                  👍 {theory.votes + (userVotes[theory.id] ? 1 : 0)}
                </button>
                <span className="expand-hint">
                  {selectedTheory?.id === theory.id ? 'Click to collapse' : 'Click for details'}
                </span>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {selectedTheory?.id === theory.id && (
                  <motion.div
                    className="theory-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className="theory-full-details">{theory.details}</p>
                    
                    <div className="evidence-section">
                      <h4>📋 Evidence</h4>
                      <ul>
                        {theory.evidence.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Submit Theory CTA */}
        <motion.div 
          className="submit-theory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3>🎯 The Final Verdict</h3>
          <p>Season 5 delivered an epic conclusion! How did your predictions hold up?</p>
          <div className="theory-prompt">
            <span>🏆</span>
            <span>Most fan theories were confirmed! The Duffer Brothers truly listened to the fans.</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Theories
