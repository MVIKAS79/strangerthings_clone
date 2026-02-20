import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import { quizQuestions, characterResults } from '../data/quizData'
import './Quiz.css'

const Quiz = ({ onNavigate, onOpenSearch }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizStarted, setQuizStarted] = useState(false)

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    
    // Add points to characters
    const newScores = { ...scores }
    Object.entries(answer.points).forEach(([character, points]) => {
      newScores[character] = (newScores[character] || 0) + points
    })
    setScores(newScores)

    // Move to next question after delay
    setTimeout(() => {
      setSelectedAnswer(null)
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResult(true)
      }
    }, 500)
  }

  const getResult = () => {
    let maxScore = 0
    let resultCharacter = 'eleven'
    
    Object.entries(scores).forEach(([character, score]) => {
      if (score > maxScore) {
        maxScore = score
        resultCharacter = character
      }
    })
    
    return characterResults[resultCharacter] || characterResults.eleven
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScores({})
    setShowResult(false)
    setSelectedAnswer(null)
    setQuizStarted(false)
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="quiz-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="quiz-container">
        {!quizStarted ? (
          <motion.div 
            className="quiz-intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1 className="quiz-title">🔮 CHARACTER QUIZ</h1>
            <p className="quiz-description">
              Discover which Stranger Things character matches your personality!
              Answer {quizQuestions.length} questions to find out.
            </p>
            <div className="quiz-characters">
              {['🧠', '🚲', '👽', '🎸', '📷', '⚡'].map((emoji, i) => (
                <motion.span 
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
            <motion.button 
              className="start-btn"
              onClick={() => setQuizStarted(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Quiz
            </motion.button>
          </motion.div>
        ) : !showResult ? (
          <motion.div 
            className="quiz-questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Progress Bar */}
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
              <span className="progress-text">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                className="question-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <h2 className="question-text">
                  {quizQuestions[currentQuestion].question}
                </h2>

                <div className="answers-grid">
                  {quizQuestions[currentQuestion].answers.map((answer, index) => (
                    <motion.button
                      key={index}
                      className={`answer-btn ${selectedAnswer === answer ? 'selected' : ''}`}
                      onClick={() => handleAnswer(answer)}
                      disabled={selectedAnswer !== null}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {answer.text}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            className="quiz-result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="result-title">You are...</h2>
            
            <motion.div 
              className="result-character"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="result-image">
                <img 
                  src={getResult().image} 
                  alt={getResult().name}
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="result-image-fallback">
                  {getResult().name.charAt(0)}
                </div>
              </div>
              
              <h1 className="result-name">{getResult().name}</h1>
              
              <div className="result-traits">
                {getResult().traits.map((trait, i) => (
                  <span key={i} className="trait-tag">{trait}</span>
                ))}
              </div>
              
              <p className="result-description">{getResult().description}</p>
            </motion.div>

            <div className="result-actions">
              <motion.button 
                className="restart-btn"
                onClick={restartQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Take Quiz Again
              </motion.button>
              <motion.button 
                className="share-btn"
                onClick={() => {
                  navigator.clipboard.writeText(`I'm ${getResult().name} from Stranger Things! Take the quiz to find out which character you are! 🎬`)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📋 Copy Result
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Quiz
