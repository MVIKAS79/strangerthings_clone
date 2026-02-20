import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import './Memorial.css'

const fallenHeroes = [
  {
    id: 1,
    name: 'Jim Hopper',
    title: 'Chief of Police',
    seasons: '1-5',
    death: 'Season 5',
    cause: 'Sacrificed himself to destroy the Heart of the Upside Down',
    quote: '"Go. Save the world. I\'ll hold the door."',
    legacy: 'From a broken man drowning in grief to the ultimate protector. Hopper became a father to Eleven, a partner to Joyce, and a hero to Hawkins. His sacrifice closed the Upside Down forever.',
    actor: 'David Harbour',
    traits: ['Protective', 'Brave', 'Father Figure', 'Hero'],
    memorialFlowers: '💐',
    survived: false
  },
  {
    id: 2,
    name: 'Eddie Munson',
    title: 'Dungeon Master of Hellfire Club',
    seasons: '4',
    death: 'Season 4',
    cause: 'Fought Demobats to buy time for the others',
    quote: '"I didn\'t run away this time, right?"',
    legacy: 'The metalhead who was branded a freak and accused of murder became one of the greatest heroes Hawkins ever knew. His guitar solo echoed through the Upside Down as a battle cry.',
    actor: 'Joseph Quinn',
    traits: ['Brave', 'Musical', 'Loyal', 'Misunderstood Hero'],
    memorialFlowers: '🎸',
    spirit: true
  },
  {
    id: 3,
    name: 'Barbara "Barb" Holland',
    title: 'Nancy\'s Best Friend',
    seasons: '1',
    death: 'Season 1',
    cause: 'Taken by the Demogorgon at Steve\'s pool party',
    quote: '"Are you sure about this?"',
    legacy: 'Barb was the loyal friend who deserved so much better. Her death became Nancy\'s driving force and a symbol of the innocent victims of the Upside Down.',
    actor: 'Shannon Purser',
    traits: ['Loyal', 'Sensible', 'Caring', 'Friend'],
    memorialFlowers: '🌸'
  },
  {
    id: 4,
    name: 'Bob Newby',
    title: 'Superhero',
    seasons: '2',
    death: 'Season 2',
    cause: 'Killed by Demodogs while helping others escape Hawkins Lab',
    quote: '"Easy peasy."',
    legacy: 'Bob brought light into Joyce\'s life when she needed it most. A true nerd at heart, his knowledge of tech and his courage saved lives. He died a superhero.',
    actor: 'Sean Astin',
    traits: ['Kind', 'Smart', 'Brave', 'Superhero'],
    memorialFlowers: '🦸'
  },
  {
    id: 5,
    name: 'Billy Hargrove',
    title: 'Lifeguard',
    seasons: '2-3',
    death: 'Season 3',
    cause: 'Sacrificed himself to protect Eleven from the Mind Flayer',
    quote: '"I\'m sorry."',
    legacy: 'Billy was a product of abuse and anger, but in his final moments, Max\'s words reached him. He chose to be better, to protect rather than destroy. His sacrifice saved Eleven.',
    actor: 'Dacre Montgomery',
    traits: ['Redeemed', 'Protective', 'Tragic', 'Brother'],
    memorialFlowers: '🏊',
    redeemed: true
  },
  {
    id: 6,
    name: 'Alexei',
    title: 'Russian Scientist',
    seasons: '3',
    death: 'Season 3',
    cause: 'Shot by Grigori at the Fourth of July Fair',
    quote: '"I like strawberry."',
    legacy: 'Alexei defected from the Russians and helped Joyce and Hopper understand the threat. His childlike wonder at American life (especially Slurpees) made his death devastating.',
    actor: 'Alec Utgoff',
    traits: ['Innocent', 'Smart', 'Endearing', 'Ally'],
    memorialFlowers: '🍓'
  },
  {
    id: 7,
    name: 'Benny Hammond',
    title: 'Diner Owner',
    seasons: '1',
    death: 'Season 1, Episode 1',
    cause: 'Killed by Hawkins Lab agents for helping Eleven',
    quote: '"Hey, you\'re okay."',
    legacy: 'Benny was the first person to show kindness to Eleven after her escape. His murder showed the ruthlessness of Hawkins Lab and the danger El faced.',
    actor: 'Chris Sullivan',
    traits: ['Kind', 'Generous', 'First Ally', 'Innocent'],
    memorialFlowers: '🍔'
  },
  {
    id: 8,
    name: 'Dr. Sam Owens',
    title: 'DOE Scientist',
    seasons: '2-5',
    death: 'Season 5',
    cause: 'Killed protecting Eleven during the final battle',
    quote: '"She\'s not a weapon. She\'s a child."',
    legacy: 'Unlike Brenner, Dr. Owens genuinely cared for Eleven\'s wellbeing. He helped restore her powers and protected her until the very end.',
    actor: 'Paul Reiser',
    traits: ['Protective', 'Ethical', 'Ally', 'Father Figure'],
    memorialFlowers: '🔬'
  },
  {
    id: 9,
    name: 'Murray Bauman',
    title: 'Conspiracy Theorist',
    seasons: '2-5',
    death: 'Season 5',
    cause: 'Fell holding off Demogorgons during the final assault',
    quote: '"It\'s not paranoia if they\'re really out to get you."',
    legacy: 'Murray went from a kooky conspiracy theorist to a crucial ally. His knowledge of Russian and his bunker became invaluable. He died proving all his theories right.',
    actor: 'Brett Gelman',
    traits: ['Eccentric', 'Resourceful', 'Brave', 'Vindicated'],
    memorialFlowers: '📻'
  }
]

const Memorial = ({ onNavigate, onOpenSearch }) => {
  const [selectedHero, setSelectedHero] = useState(null)
  const [candlesLit, setCandlesLit] = useState({})
  const [filter, setFilter] = useState('all')

  const toggleCandle = (heroId) => {
    setCandlesLit(prev => ({
      ...prev,
      [heroId]: !prev[heroId]
    }))
  }

  const filteredHeroes = fallenHeroes.filter(hero => {
    if (filter === 'all') return true
    if (filter === 'sacrificed') return hero.cause.toLowerCase().includes('sacrific')
    if (filter === 'season5') return hero.death === 'Season 5'
    if (filter === 'redeemed') return hero.redeemed
    return true
  })

  return (
    <div className="memorial-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="memorial-container">
        <motion.div 
          className="memorial-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">🕯️ IN MEMORIAM</h1>
          <p className="page-subtitle">
            Honoring the heroes who gave everything to protect Hawkins
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="memorial-filters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {['all', 'sacrificed', 'season5', 'redeemed'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' && '🌟 All Heroes'}
              {f === 'sacrificed' && '💪 Sacrificed'}
              {f === 'season5' && '5️⃣ Season 5'}
              {f === 'redeemed' && '🔄 Redeemed'}
            </button>
          ))}
        </motion.div>

        {/* Candle Counter */}
        <motion.div 
          className="candle-counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="candle-icon">🕯️</span>
          <span className="candle-count">
            {Object.values(candlesLit).filter(Boolean).length} candles lit by fans
          </span>
        </motion.div>

        {/* Memorial Grid */}
        <div className="memorial-grid">
          {filteredHeroes.map((hero, index) => (
            <motion.div
              key={hero.id}
              className={`memorial-card ${candlesLit[hero.id] ? 'lit' : ''} ${hero.spirit ? 'spirit' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setSelectedHero(hero)}
            >
              <div className="memorial-flower">{hero.memorialFlowers}</div>
              
              <h3 className="hero-name">{hero.name}</h3>
              <p className="hero-title">{hero.title}</p>
              
              <div className="hero-seasons">
                Seasons {hero.seasons}
              </div>
              
              <p className="hero-cause">"{hero.cause}"</p>
              
              <div className="hero-traits">
                {hero.traits.map(trait => (
                  <span key={trait} className="trait-tag">{trait}</span>
                ))}
              </div>
              
              <button 
                className={`candle-btn ${candlesLit[hero.id] ? 'lit' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleCandle(hero.id)
                }}
              >
                {candlesLit[hero.id] ? '🕯️ Candle Lit' : '🕯️ Light a Candle'}
              </button>

              {hero.spirit && (
                <div className="spirit-badge">👻 Returns as Spirit</div>
              )}
              {hero.redeemed && (
                <div className="redeemed-badge">🔄 Redeemed</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Selected Hero Modal */}
        <AnimatePresence>
          {selectedHero && (
            <motion.div 
              className="memorial-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHero(null)}
            >
              <motion.div 
                className="memorial-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-btn" onClick={() => setSelectedHero(null)}>×</button>
                
                <div className="modal-header">
                  <span className="modal-flower">{selectedHero.memorialFlowers}</span>
                  <h2>{selectedHero.name}</h2>
                  <p className="modal-title">{selectedHero.title}</p>
                </div>

                <div className="modal-content">
                  <div className="modal-section">
                    <h4>Final Words</h4>
                    <blockquote className="hero-quote">{selectedHero.quote}</blockquote>
                  </div>

                  <div className="modal-section">
                    <h4>Legacy</h4>
                    <p>{selectedHero.legacy}</p>
                  </div>

                  <div className="modal-section">
                    <h4>How They Fell</h4>
                    <p className="death-description">{selectedHero.cause}</p>
                    <p className="death-time">Death: {selectedHero.death}</p>
                  </div>

                  <div className="modal-section">
                    <h4>Portrayed By</h4>
                    <p className="actor-name">{selectedHero.actor}</p>
                  </div>

                  <div className="modal-traits">
                    {selectedHero.traits.map(trait => (
                      <span key={trait} className="trait-tag">{trait}</span>
                    ))}
                  </div>
                </div>

                <button 
                  className={`candle-btn large ${candlesLit[selectedHero.id] ? 'lit' : ''}`}
                  onClick={() => toggleCandle(selectedHero.id)}
                >
                  {candlesLit[selectedHero.id] ? '🕯️ Candle Lit - Thank You' : '🕯️ Light a Candle in Their Memory'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Memorial Quote */}
        <motion.div 
          className="memorial-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <blockquote>
            "For Barb. For Bob. For Eddie. For everyone we've lost. Let's finish this."
            <cite>— Nancy Wheeler, Season 5</cite>
          </blockquote>
        </motion.div>
      </div>
    </div>
  )
}

export default Memorial
