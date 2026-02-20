import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import './BehindTheScenes.css'

const castData = [
  {
    id: 1,
    name: 'Millie Bobby Brown',
    character: 'Eleven / Jane Hopper',
    image: '👧',
    age: 'Started at age 12',
    funFacts: [
      'Shaved her head for the role in Season 1',
      'British actress putting on an American accent',
      'Named a UNICEF Goodwill Ambassador',
      'Also starred in Godzilla and Enola Holmes'
    ],
    awards: ['Emmy Nomination', 'SAG Award Nomination', 'MTV Award Winner']
  },
  {
    id: 2,
    name: 'Finn Wolfhard',
    character: 'Mike Wheeler',
    image: '🧒',
    age: 'Started at age 12',
    funFacts: [
      'Also starred in IT as Richie Tozier',
      'Member of the band The Aubreys',
      'Canadian actor from Vancouver',
      'Voices characters in animated films'
    ],
    awards: ['Screen Actors Guild Award', 'MTV Movie Award']
  },
  {
    id: 3,
    name: 'Gaten Matarazzo',
    character: 'Dustin Henderson',
    image: '😄',
    age: 'Started at age 13',
    funFacts: [
      'Has cleidocranial dysplasia, incorporated into the show',
      'Performed on Broadway before Stranger Things',
      'Hosts "Prank Encounters" on Netflix',
      'His signature lisp is natural'
    ],
    awards: ['SAG Award', 'Young Artist Award']
  },
  {
    id: 4,
    name: 'Caleb McLaughlin',
    character: 'Lucas Sinclair',
    image: '🧑',
    age: 'Started at age 14',
    funFacts: [
      'Broadway performer in "The Lion King"',
      'Advocates for social justice causes',
      'From New York City',
      'Trained dancer and singer'
    ],
    awards: ['NAACP Image Award', 'SAG Award']
  },
  {
    id: 5,
    name: 'Noah Schnapp',
    character: 'Will Byers',
    image: '👦',
    age: 'Started at age 11',
    funFacts: [
      'Twin sister named Chloe',
      'Voiced Charlie Brown in The Peanuts Movie',
      'Started his own hazelnut spread company (TBH)',
      'Attends the University of Pennsylvania'
    ],
    awards: ['MTV Award', 'Saturn Award Nomination']
  },
  {
    id: 6,
    name: 'Winona Ryder',
    character: 'Joyce Byers',
    image: '👩',
    age: 'Established actress before ST',
    funFacts: [
      'Iconic 80s/90s actress (Beetlejuice, Heathers, Edward Scissorhands)',
      'The show pays homage to films she starred in',
      'Named after her hometown Winona, Minnesota',
      'Golden Globe winner'
    ],
    awards: ['Golden Globe', 'SAG Award', 'Emmy Nomination']
  },
  {
    id: 7,
    name: 'David Harbour',
    character: 'Jim Hopper',
    image: '👨',
    age: 'Established actor before ST',
    funFacts: [
      'Gained and lost significant weight for different seasons',
      'Married Lily Allen in Las Vegas',
      'Also plays Red Guardian in Marvel films',
      'Dartmouth College graduate'
    ],
    awards: ['SAG Award', 'Critics\' Choice Award', 'Emmy Nomination']
  },
  {
    id: 8,
    name: 'Joe Keery',
    character: 'Steve Harrington',
    image: '💇',
    age: 'Joined cast at age 24',
    funFacts: [
      'His hair became iconic and has its own fan following',
      'Makes music under the name Djo',
      'Character was supposed to die in Season 1',
      'Originally auditioned for Jonathan'
    ],
    awards: ['MTV Award Nomination', 'Saturn Award']
  }
]

const productionFacts = [
  {
    category: '🎬 Creation',
    facts: [
      'Created by the Duffer Brothers (Matt and Ross)',
      'Originally titled "Montauk" and set in Long Island',
      'Rejected by 15-20 networks before Netflix picked it up',
      'Inspired by Steven Spielberg, Stephen King, and John Carpenter'
    ]
  },
  {
    category: '📍 Filming',
    facts: [
      'Primarily filmed in Atlanta, Georgia',
      'The Wheeler basement is on a soundstage in Atlanta',
      'Hawkins doesn\'t exist - it\'s based on various small Indiana towns',
      'The Upside Down sets use ash and fake snow'
    ]
  },
  {
    category: '🎵 Music',
    facts: [
      'Score composed by Kyle Dixon and Michael Stein (S U R V I V E)',
      'The synth-heavy score is all original composition',
      '"Running Up That Hill" became #1 after Season 4',
      'The soundtrack features authentic 80s hits'
    ]
  },
  {
    category: '👾 Special Effects',
    facts: [
      'Demogorgon is a combination of practical and CGI',
      'The Upside Down uses real sets with extensive post-production',
      'Eleven\'s nosebleeds are achieved with practical effects',
      'Season 4 Vecna is 90% practical makeup (7+ hours to apply)'
    ]
  },
  {
    category: '📊 Cultural Impact',
    facts: [
      'Most-watched English language series on Netflix',
      'Spawned merchandise, games, and stage productions',
      'Revived interest in 80s culture and music',
      'Each season premiere breaks Netflix viewing records'
    ]
  }
]

const BehindTheScenes = ({ onNavigate, onOpenSearch }) => {
  const [selectedCast, setSelectedCast] = useState(null)
  const [activeTab, setActiveTab] = useState('cast')

  return (
    <div className="bts-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="bts-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎬 BEHIND THE SCENES
        </motion.h1>

        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Meet the cast and discover production secrets
        </motion.p>

        {/* Tab Navigation */}
        <motion.div 
          className="bts-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button 
            className={`tab-btn ${activeTab === 'cast' ? 'active' : ''}`}
            onClick={() => setActiveTab('cast')}
          >
            👥 Cast & Characters
          </button>
          <button 
            className={`tab-btn ${activeTab === 'production' ? 'active' : ''}`}
            onClick={() => setActiveTab('production')}
          >
            🎥 Production Facts
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'cast' && (
            <motion.div
              key="cast"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="cast-section"
            >
              <div className="cast-grid">
                {castData.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className={`cast-card ${selectedCast?.id === member.id ? 'selected' : ''}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedCast(selectedCast?.id === member.id ? null : member)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="cast-avatar">{member.image}</div>
                    <div className="cast-info">
                      <h3>{member.name}</h3>
                      <p className="character-name">as {member.character}</p>
                      <span className="cast-age">{member.age}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Selected Cast Details */}
              <AnimatePresence>
                {selectedCast && (
                  <motion.div
                    className="cast-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="details-content">
                      <div className="details-left">
                        <div className="large-avatar">{selectedCast.image}</div>
                        <h2>{selectedCast.name}</h2>
                        <p className="character-role">as {selectedCast.character}</p>
                      </div>
                      
                      <div className="details-right">
                        <div className="fun-facts">
                          <h4>🎭 Fun Facts</h4>
                          <ul>
                            {selectedCast.funFacts.map((fact, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                {fact}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div className="awards-section">
                          <h4>🏆 Awards & Recognition</h4>
                          <div className="awards-list">
                            {selectedCast.awards.map((award, i) => (
                              <motion.span
                                key={i}
                                className="award-badge"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                              >
                                {award}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'production' && (
            <motion.div
              key="production"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="production-section"
            >
              <div className="production-grid">
                {productionFacts.map((category, index) => (
                  <motion.div
                    key={category.category}
                    className="production-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3>{category.category}</h3>
                    <ul>
                      {category.facts.map((fact, i) => (
                        <li key={i}>{fact}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Duffer Brothers Spotlight */}
              <motion.div 
                className="creators-spotlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3>👬 The Duffer Brothers</h3>
                <p>
                  Matt and Ross Duffer, born February 15, 1984, are the creative minds behind 
                  Stranger Things. The twin brothers from Durham, North Carolina drew inspiration 
                  from their love of 80s horror, sci-fi, and coming-of-age films. They wrote and 
                  directed many episodes of the series and created an intricate mythology that 
                  has captivated millions worldwide.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BehindTheScenes
