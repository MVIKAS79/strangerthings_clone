import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import { triviaQuestions } from '../data/triviaData'
import './Trivia.css'

const Trivia = ({ onNavigate, onOpenSearch }) => {
  const [gameState, setGameState] = useState('menu') // menu, playing, finished
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [timeLeft, setTimeLeft] = useState(15)
  const [difficulty, setDifficulty] = useState('all')
  const [questions, setQuestions] = useState([])
  const [streak, setStreak] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('st-trivia-highscore') || '0')
  })

  // Filter and shuffle questions based on difficulty
  const startGame = () => {
    let filtered = difficulty === 'all' 
      ? [...triviaQuestions]
      : triviaQuestions.filter(q => q.difficulty === difficulty)
    
    // Shuffle
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]]
    }
    
    setQuestions(filtered.slice(0, 15)) // 15 questions per game
    setCurrentQuestion(0)
    setScore(0)
    setStreak(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setTimeLeft(15)
    setGameState('playing')
  }

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || selectedAnswer !== null) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout()
          return 15
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState, selectedAnswer, currentQuestion])

  const handleTimeout = () => {
    setIsCorrect(false)
    setStreak(0)
    setTimeout(nextQuestion, 1500)
  }

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    const correct = answerIndex === questions[currentQuestion].correct
    setIsCorrect(correct)

    if (correct) {
      const timeBonus = Math.floor(timeLeft / 3)
      const streakBonus = streak >= 3 ? 5 : 0
      const points = 10 + timeBonus + streakBonus
      setScore(prev => prev + points)
      setStreak(prev => prev + 1)
    } else {
      setStreak(0)
    }

    setTimeout(nextQuestion, 1500)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
      setTimeLeft(15)
    } else {
      finishGame()
    }
  }

  const finishGame = () => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('st-trivia-highscore', score.toString())
    }
    setGameState('finished')
  }

  const getGrade = () => {
    const percentage = (score / (questions.length * 15)) * 100
    if (percentage >= 90) return { grade: 'S', text: 'LEGENDARY! 🏆', color: '#f1c40f' }
    if (percentage >= 75) return { grade: 'A', text: 'Excellent! ⭐', color: '#2ecc71' }
    if (percentage >= 60) return { grade: 'B', text: 'Good Job! 👍', color: '#3498db' }
    if (percentage >= 45) return { grade: 'C', text: 'Not Bad! 📚', color: '#9b59b6' }
    return { grade: 'D', text: 'Keep Trying! 💪', color: '#e74c3c' }
  }

  return (
    <div className="trivia-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="trivia-container">
        {gameState === 'menu' && (
          <motion.div 
            className="trivia-menu"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1 className="trivia-title">🧠 TRIVIA CHALLENGE</h1>
            <p className="trivia-description">
              Test your Stranger Things knowledge! Answer questions quickly for bonus points.
            </p>

            <div className="high-score">
              <span className="high-score-label">🏆 High Score</span>
              <span className="high-score-value">{highScore}</span>
            </div>

            <div className="difficulty-selector">
              <h3>Select Difficulty</h3>
              <div className="difficulty-options">
                {[
                  { value: 'all', label: 'Mixed', icon: '🎲' },
                  { value: 'easy', label: 'Easy', icon: '🟢' },
                  { value: 'medium', label: 'Medium', icon: '🟡' },
                  { value: 'hard', label: 'Hard', icon: '🔴' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    className={`difficulty-btn ${difficulty === opt.value ? 'active' : ''}`}
                    onClick={() => setDifficulty(opt.value)}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <motion.button 
              className="start-game-btn"
              onClick={startGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎮 Start Game
            </motion.button>
          </motion.div>
        )}

        {gameState === 'playing' && questions.length > 0 && (
          <motion.div 
            className="trivia-game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Game Header */}
            <div className="game-header">
              <div className="game-stat">
                <span className="stat-label">Score</span>
                <span className="stat-value">{score}</span>
              </div>
              <div className="game-timer" style={{ '--progress': `${(timeLeft / 15) * 100}%` }}>
                <span className={timeLeft <= 5 ? 'critical' : ''}>{timeLeft}</span>
              </div>
              <div className="game-stat">
                <span className="stat-label">Streak</span>
                <span className="stat-value streak">{streak >= 3 ? `🔥 ${streak}` : streak}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="game-progress">
              <div className="progress-dots">
                {questions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`progress-dot ${i === currentQuestion ? 'current' : ''} ${i < currentQuestion ? 'done' : ''}`}
                  />
                ))}
              </div>
              <span className="progress-label">Question {currentQuestion + 1} of {questions.length}</span>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                className="trivia-question"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className={`difficulty-badge ${questions[currentQuestion].difficulty}`}>
                  {questions[currentQuestion].difficulty}
                </div>
                <h2 className="question-text">{questions[currentQuestion].question}</h2>

                <div className="options-grid">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`option-btn 
                        ${selectedAnswer === index ? (isCorrect ? 'correct' : 'wrong') : ''}
                        ${selectedAnswer !== null && index === questions[currentQuestion].correct ? 'correct' : ''}
                      `}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                      whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="option-text">{option}</span>
                    </motion.button>
                  ))}
                </div>

                {isCorrect !== null && (
                  <motion.div 
                    className={`answer-feedback ${isCorrect ? 'correct' : 'wrong'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {isCorrect ? '✓ Correct!' : `✗ Wrong! The answer was: ${questions[currentQuestion].options[questions[currentQuestion].correct]}`}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {gameState === 'finished' && (
          <motion.div 
            className="trivia-results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="results-title">Game Over!</h2>
            
            <div className="grade-display" style={{ '--grade-color': getGrade().color }}>
              <span className="grade">{getGrade().grade}</span>
              <span className="grade-text">{getGrade().text}</span>
            </div>

            <div className="final-score">
              <span className="final-score-label">Final Score</span>
              <span className="final-score-value">{score}</span>
              {score > highScore - score && score === highScore && (
                <span className="new-record">🎉 NEW RECORD!</span>
              )}
            </div>

            <div className="results-stats">
              <div className="result-stat">
                <span className="result-stat-value">{questions.length}</span>
                <span className="result-stat-label">Questions</span>
              </div>
              <div className="result-stat">
                <span className="result-stat-value">{Math.round((score / (questions.length * 15)) * 100)}%</span>
                <span className="result-stat-label">Accuracy</span>
              </div>
            </div>

            <div className="results-actions">
              <motion.button 
                className="play-again-btn"
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Play Again
              </motion.button>
              <motion.button 
                className="menu-btn"
                onClick={() => setGameState('menu')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📋 Main Menu
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Trivia
