import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  // Initialize user data from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('st-user')
    return saved ? JSON.parse(saved) : null
  })

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('st-user-stats')
    return saved ? JSON.parse(saved) : {
      quizzesTaken: 0,
      quizResults: [],
      triviaGamesPlayed: 0,
      triviaHighScore: 0,
      totalTriviaCorrect: 0,
      pagesVisited: [],
      achievements: [],
      joinedAt: null,
      lastVisit: null
    }
  })

  // Save to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('st-user', JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('st-user-stats', JSON.stringify(stats))
  }, [stats])

  // Create/update user profile
  const createProfile = (profileData) => {
    const newUser = {
      id: Date.now(),
      name: profileData.name,
      avatar: profileData.avatar || '👤',
      favoriteCharacter: profileData.favoriteCharacter || null,
      favoriteSeason: profileData.favoriteSeason || null,
      createdAt: new Date().toISOString()
    }
    setUser(newUser)
    setStats(prev => ({
      ...prev,
      joinedAt: new Date().toISOString()
    }))
  }

  // Update profile
  const updateProfile = (updates) => {
    setUser(prev => prev ? { ...prev, ...updates } : null)
  }

  // Record quiz result
  const recordQuizResult = (quizResult) => {
    setStats(prev => ({
      ...prev,
      quizzesTaken: prev.quizzesTaken + 1,
      quizResults: [
        ...prev.quizResults.slice(-9), // Keep last 10 results
        {
          ...quizResult,
          date: new Date().toISOString()
        }
      ]
    }))
    // Check for achievements
    checkAchievements('quiz', quizResult)
  }

  // Record trivia game
  const recordTriviaGame = (score, totalQuestions) => {
    setStats(prev => ({
      ...prev,
      triviaGamesPlayed: prev.triviaGamesPlayed + 1,
      triviaHighScore: Math.max(prev.triviaHighScore, score),
      totalTriviaCorrect: prev.totalTriviaCorrect + score
    }))
    // Check for achievements
    checkAchievements('trivia', { score, totalQuestions })
  }

  // Track page visit
  const trackPageVisit = (page) => {
    setStats(prev => {
      const visits = prev.pagesVisited.includes(page) 
        ? prev.pagesVisited 
        : [...prev.pagesVisited, page]
      return {
        ...prev,
        pagesVisited: visits,
        lastVisit: new Date().toISOString()
      }
    })
    // Check for explorer achievement
    checkAchievements('explore', { page })
  }

  // Achievement system
  const achievements = {
    firstQuiz: { id: 'firstQuiz', name: 'First Steps', description: 'Complete your first character quiz', icon: '🎯' },
    quizMaster: { id: 'quizMaster', name: 'Quiz Master', description: 'Complete 5 character quizzes', icon: '🏆' },
    triviaRookie: { id: 'triviaRookie', name: 'Trivia Rookie', description: 'Play your first trivia game', icon: '🎮' },
    triviaChamp: { id: 'triviaChamp', name: 'Trivia Champion', description: 'Score 100% in a trivia game', icon: '👑' },
    explorer: { id: 'explorer', name: 'Hawkins Explorer', description: 'Visit all pages', icon: '🗺️' },
    devoted: { id: 'devoted', name: 'Devoted Fan', description: 'Return 5 days in a row', icon: '❤️' },
    collector: { id: 'collector', name: 'Collector', description: 'Add 10 items to favorites', icon: '⭐' }
  }

  const checkAchievements = (type, data) => {
    const newAchievements = []

    setStats(prev => {
      const currentAchievements = prev.achievements.map(a => a.id)

      // Quiz achievements
      if (type === 'quiz') {
        if (!currentAchievements.includes('firstQuiz')) {
          newAchievements.push(achievements.firstQuiz)
        }
        if (prev.quizzesTaken >= 4 && !currentAchievements.includes('quizMaster')) {
          newAchievements.push(achievements.quizMaster)
        }
      }

      // Trivia achievements
      if (type === 'trivia') {
        if (!currentAchievements.includes('triviaRookie')) {
          newAchievements.push(achievements.triviaRookie)
        }
        if (data.score === data.totalQuestions && !currentAchievements.includes('triviaChamp')) {
          newAchievements.push(achievements.triviaChamp)
        }
      }

      // Explorer achievement
      if (type === 'explore') {
        const allPages = ['home', 'characters', 'episodes', 'upsidedown', 'timeline', 'quotes', 'soundtrack', 'quiz', 'trivia']
        const visitedPages = [...prev.pagesVisited, data.page]
        if (allPages.every(p => visitedPages.includes(p)) && !currentAchievements.includes('explorer')) {
          newAchievements.push(achievements.explorer)
        }
      }

      if (newAchievements.length > 0) {
        return {
          ...prev,
          achievements: [
            ...prev.achievements,
            ...newAchievements.map(a => ({
              ...a,
              unlockedAt: new Date().toISOString()
            }))
          ]
        }
      }

      return prev
    })

    return newAchievements
  }

  // Add achievement manually
  const addAchievement = (achievementId) => {
    if (!achievements[achievementId]) return
    
    setStats(prev => {
      if (prev.achievements.some(a => a.id === achievementId)) return prev
      
      return {
        ...prev,
        achievements: [
          ...prev.achievements,
          {
            ...achievements[achievementId],
            unlockedAt: new Date().toISOString()
          }
        ]
      }
    })
  }

  // Logout
  const logout = () => {
    setUser(null)
  }

  // Delete account
  const deleteAccount = () => {
    setUser(null)
    setStats({
      quizzesTaken: 0,
      quizResults: [],
      triviaGamesPlayed: 0,
      triviaHighScore: 0,
      totalTriviaCorrect: 0,
      pagesVisited: [],
      achievements: [],
      joinedAt: null,
      lastVisit: null
    })
    localStorage.removeItem('st-user')
    localStorage.removeItem('st-user-stats')
  }

  const value = {
    user,
    stats,
    isLoggedIn: !!user,
    createProfile,
    updateProfile,
    recordQuizResult,
    recordTriviaGame,
    trackPageVisit,
    addAchievement,
    achievements,
    logout,
    deleteAccount
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
