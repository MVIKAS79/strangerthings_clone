import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import { useUser } from '../context/UserContext'
import { useFavorites } from '../context/FavoritesContext'
import './Profile.css'

const avatarOptions = ['👤', '🧑', '👧', '👦', '🧒', '👨', '👩', '🦸', '🧙', '👽', '🤖', '👻', '💀', '🎃']
const characterOptions = ['Eleven', 'Mike', 'Dustin', 'Lucas', 'Will', 'Max', 'Steve', 'Nancy', 'Hopper', 'Joyce']
const seasonOptions = ['Season 1', 'Season 2', 'Season 3', 'Season 4']

const Profile = ({ onNavigate, onOpenSearch }) => {
  const { user, stats, isLoggedIn, createProfile, updateProfile, logout, deleteAccount, achievements: allAchievements } = useUser()
  const { favorites, getTotalCount, clearAllFavorites } = useFavorites()
  
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    avatar: '👤',
    favoriteCharacter: '',
    favoriteSeason: ''
  })

  const handleCreateProfile = () => {
    if (formData.name.trim()) {
      createProfile(formData)
      setIsEditing(false)
    }
  }

  const handleUpdateProfile = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  const startEditing = () => {
    if (user) {
      setFormData({
        name: user.name,
        avatar: user.avatar,
        favoriteCharacter: user.favoriteCharacter || '',
        favoriteSeason: user.favoriteSeason || ''
      })
    }
    setIsEditing(true)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="profile-page">
      <Navbar onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
      
      <div className="profile-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          👤 YOUR PROFILE
        </motion.h1>

        {!isLoggedIn && !isEditing ? (
          <motion.div 
            className="no-profile"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="no-profile-content">
              <span className="big-emoji">👋</span>
              <h2>Welcome, Stranger!</h2>
              <p>Create a profile to track your quiz results, trivia scores, and unlock achievements.</p>
              <button className="create-profile-btn" onClick={() => setIsEditing(true)}>
                Create Profile
              </button>
            </div>
          </motion.div>
        ) : isEditing ? (
          <motion.div 
            className="profile-form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>{user ? 'Edit Profile' : 'Create Your Profile'}</h2>
            
            <div className="form-group">
              <label>Choose Avatar</label>
              <div className="avatar-options">
                {avatarOptions.map(avatar => (
                  <button
                    key={avatar}
                    className={`avatar-option ${formData.avatar === avatar ? 'selected' : ''}`}
                    onClick={() => setFormData({...formData, avatar})}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                maxLength={20}
              />
            </div>

            <div className="form-group">
              <label>Favorite Character</label>
              <select
                value={formData.favoriteCharacter}
                onChange={(e) => setFormData({...formData, favoriteCharacter: e.target.value})}
              >
                <option value="">Select character</option>
                {characterOptions.map(char => (
                  <option key={char} value={char}>{char}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Favorite Season</label>
              <select
                value={formData.favoriteSeason}
                onChange={(e) => setFormData({...formData, favoriteSeason: e.target.value})}
              >
                <option value="">Select season</option>
                {seasonOptions.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button 
                className="save-btn"
                onClick={user ? handleUpdateProfile : handleCreateProfile}
                disabled={!formData.name.trim()}
              >
                {user ? 'Save Changes' : 'Create Profile'}
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Profile Header */}
            <motion.div 
              className="profile-header"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="profile-avatar">{user.avatar}</div>
              <div className="profile-info">
                <h2>{user.name}</h2>
                <div className="profile-meta">
                  {user.favoriteCharacter && (
                    <span>❤️ {user.favoriteCharacter}</span>
                  )}
                  {user.favoriteSeason && (
                    <span>📺 {user.favoriteSeason}</span>
                  )}
                </div>
                <p className="joined-date">Joined {formatDate(stats.joinedAt)}</p>
              </div>
              <button className="edit-btn" onClick={startEditing}>✏️ Edit</button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              className="stats-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-card">
                <span className="stat-icon">🔮</span>
                <span className="stat-value">{stats.quizzesTaken}</span>
                <span className="stat-label">Quizzes Taken</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🧠</span>
                <span className="stat-value">{stats.triviaGamesPlayed}</span>
                <span className="stat-label">Trivia Games</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🏆</span>
                <span className="stat-value">{stats.triviaHighScore}</span>
                <span className="stat-label">High Score</span>
              </div>
              <div className="stat-card">
                <span className="stat-icon">⭐</span>
                <span className="stat-value">{getTotalCount()}</span>
                <span className="stat-label">Favorites</span>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div 
              className="achievements-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3>🏅 Achievements</h3>
              <div className="achievements-grid">
                {Object.values(allAchievements).map((achievement, i) => {
                  const unlocked = stats.achievements.find(a => a.id === achievement.id)
                  return (
                    <motion.div
                      key={achievement.id}
                      className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                    >
                      <span className="achievement-icon">{achievement.icon}</span>
                      <div className="achievement-info">
                        <span className="achievement-name">{achievement.name}</span>
                        <span className="achievement-desc">{achievement.description}</span>
                      </div>
                      {unlocked && (
                        <span className="unlock-date">
                          ✓ {formatDate(unlocked.unlockedAt)}
                        </span>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Recent Quiz Results */}
            {stats.quizResults.length > 0 && (
              <motion.div 
                className="quiz-history"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3>📊 Recent Quiz Results</h3>
                <div className="quiz-results-list">
                  {stats.quizResults.slice(-5).reverse().map((result, i) => (
                    <div key={i} className="quiz-result-item">
                      <span className="result-character">{result.character}</span>
                      <span className="result-date">{formatDate(result.date)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Favorites Summary */}
            <motion.div 
              className="favorites-summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3>⭐ Your Favorites</h3>
              <div className="favorites-grid">
                {Object.entries(favorites).map(([category, items]) => (
                  <div key={category} className="favorites-category">
                    <span className="category-name">{category}</span>
                    <span className="category-count">{items.length}</span>
                  </div>
                ))}
              </div>
              {getTotalCount() > 0 && (
                <button 
                  className="clear-favorites-btn"
                  onClick={clearAllFavorites}
                >
                  Clear All Favorites
                </button>
              )}
            </motion.div>

            {/* Account Actions */}
            <motion.div 
              className="account-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button className="logout-btn" onClick={logout}>
                🚪 Logout
              </button>
              <button 
                className="delete-btn"
                onClick={() => setShowDeleteConfirm(true)}
              >
                🗑️ Delete Account
              </button>
            </motion.div>
          </>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div 
              className="delete-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="delete-modal"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h3>⚠️ Delete Account?</h3>
                <p>This will permanently delete all your data, including quiz results, achievements, and favorites.</p>
                <div className="modal-actions">
                  <button 
                    className="confirm-delete"
                    onClick={() => {
                      deleteAccount()
                      setShowDeleteConfirm(false)
                    }}
                  >
                    Yes, Delete Everything
                  </button>
                  <button 
                    className="cancel-delete"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
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

export default Profile
