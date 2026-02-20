import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import { timeline } from '../data/timeline'
import './Timeline.css'

const Timeline = ({ onNavigate, onOpenSearch }) => {
  const [activeEvent, setActiveEvent] = useState(null)
  const timelineRef = useRef(null)

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'origin': return '#9b59b6'
      case 'dark': return '#e74c3c'
      case 'main': return '#3498db'
      case 'lab': return '#2ecc71'
      case 'creature': return '#e67e22'
      default: return '#95a5a6'
    }
  }

  const getEventTypeIcon = (type) => {
    switch(type) {
      case 'origin': return '🌟'
      case 'dark': return '💀'
      case 'main': return '⚡'
      case 'lab': return '🔬'
      case 'creature': return '👹'
      default: return '📌'
    }
  }

  return (
    <div className="timeline-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="timeline-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ⏳ HAWKINS TIMELINE
        </motion.h1>

        <motion.p 
          className="timeline-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          The complete chronological history of events in the Stranger Things universe
        </motion.p>

        {/* Legend */}
        <motion.div 
          className="timeline-legend"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {['origin', 'main', 'dark', 'lab', 'creature'].map(type => (
            <div key={type} className="legend-item">
              <span 
                className="legend-dot" 
                style={{ background: getEventTypeColor(type) }}
              />
              <span className="legend-label">{getEventTypeIcon(type)} {type}</span>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="timeline" ref={timelineRef}>
          {timeline.map((period, periodIndex) => (
            <motion.div 
              key={period.year}
              className="timeline-period"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: periodIndex * 0.1 }}
            >
              <div className="period-year">
                <span>{period.year}</span>
              </div>

              <div className="period-events">
                {period.events.map((event, eventIndex) => (
                  <motion.div
                    key={eventIndex}
                    className={`timeline-event ${activeEvent === `${periodIndex}-${eventIndex}` ? 'active' : ''}`}
                    style={{ '--event-color': getEventTypeColor(event.type) }}
                    onClick={() => setActiveEvent(
                      activeEvent === `${periodIndex}-${eventIndex}` ? null : `${periodIndex}-${eventIndex}`
                    )}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div 
                      className="event-dot"
                      style={{ background: getEventTypeColor(event.type) }}
                    />
                    <div className="event-content">
                      <div className="event-icon">{getEventTypeIcon(event.type)}</div>
                      <h3 className="event-title">{event.title}</h3>
                      {activeEvent === `${periodIndex}-${eventIndex}` && (
                        <motion.p 
                          className="event-description"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                        >
                          {event.description}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upside Down Connection */}
        <motion.div 
          className="upside-down-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="note-icon">🌀</span>
          <p>The Upside Down exists parallel to our timeline, a dark mirror dimension where Vecna waits...</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Timeline
