import React, { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('st-favorites')
    return saved ? JSON.parse(saved) : {
      characters: [],
      episodes: [],
      quotes: [],
      locations: [],
      songs: []
    }
  })

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('st-favorites', JSON.stringify(favorites))
  }, [favorites])

  // Add to favorites
  const addFavorite = (category, item) => {
    setFavorites(prev => {
      const categoryItems = prev[category] || []
      // Check if already exists
      if (categoryItems.some(fav => fav.id === item.id)) {
        return prev
      }
      return {
        ...prev,
        [category]: [...categoryItems, { ...item, addedAt: new Date().toISOString() }]
      }
    })
  }

  // Remove from favorites
  const removeFavorite = (category, itemId) => {
    setFavorites(prev => ({
      ...prev,
      [category]: (prev[category] || []).filter(item => item.id !== itemId)
    }))
  }

  // Toggle favorite
  const toggleFavorite = (category, item) => {
    if (isFavorite(category, item.id)) {
      removeFavorite(category, item.id)
    } else {
      addFavorite(category, item)
    }
  }

  // Check if item is favorite
  const isFavorite = (category, itemId) => {
    return (favorites[category] || []).some(item => item.id === itemId)
  }

  // Get all favorites for a category
  const getFavorites = (category) => {
    return favorites[category] || []
  }

  // Get total favorites count
  const getTotalCount = () => {
    return Object.values(favorites).reduce((total, items) => total + items.length, 0)
  }

  // Clear all favorites
  const clearAllFavorites = () => {
    setFavorites({
      characters: [],
      episodes: [],
      quotes: [],
      locations: [],
      songs: []
    })
  }

  // Clear favorites for a category
  const clearCategory = (category) => {
    setFavorites(prev => ({
      ...prev,
      [category]: []
    }))
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getFavorites,
    getTotalCount,
    clearAllFavorites,
    clearCategory
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
