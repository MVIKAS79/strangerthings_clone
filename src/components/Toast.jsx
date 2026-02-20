import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Toast.css'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random()
    const newToast = {
      id,
      type: toast.type || 'info',
      title: toast.title || '',
      message: toast.message || '',
      icon: toast.icon || getDefaultIcon(toast.type),
      duration: toast.duration || 4000,
      ...toast
    }

    setToasts(prev => [...prev, newToast])

    // Auto remove
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showAchievement = useCallback((achievement) => {
    addToast({
      type: 'achievement',
      title: '🏆 Achievement Unlocked!',
      message: achievement.name,
      description: achievement.description,
      icon: achievement.icon || '🎖️',
      duration: 5000
    })
  }, [addToast])

  const showSuccess = useCallback((message, title = 'Success') => {
    addToast({ type: 'success', title, message })
  }, [addToast])

  const showError = useCallback((message, title = 'Error') => {
    addToast({ type: 'error', title, message })
  }, [addToast])

  const showInfo = useCallback((message, title = 'Info') => {
    addToast({ type: 'info', title, message })
  }, [addToast])

  const showWarning = useCallback((message, title = 'Warning') => {
    addToast({ type: 'warning', title, message })
  }, [addToast])

  return (
    <ToastContext.Provider value={{ 
      addToast, 
      removeToast, 
      showAchievement,
      showSuccess,
      showError,
      showInfo,
      showWarning
    }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

const getDefaultIcon = (type) => {
  switch (type) {
    case 'success': return '✅'
    case 'error': return '❌'
    case 'warning': return '⚠️'
    case 'achievement': return '🏆'
    default: return 'ℹ️'
  }
}

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

const Toast = ({ toast, onClose }) => {
  return (
    <motion.div
      className={`toast toast-${toast.type}`}
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="toast-icon">{toast.icon}</div>
      <div className="toast-content">
        <div className="toast-title">{toast.title}</div>
        <div className="toast-message">{toast.message}</div>
        {toast.description && (
          <div className="toast-description">{toast.description}</div>
        )}
      </div>
      <button className="toast-close" onClick={onClose}>×</button>
      
      {toast.type === 'achievement' && (
        <motion.div 
          className="achievement-sparkles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="sparkle"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100]
              }}
              transition={{ 
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              ✨
            </motion.span>
          ))}
        </motion.div>
      )}
      
      <motion.div 
        className="toast-progress"
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: toast.duration / 1000, ease: 'linear' }}
      />
    </motion.div>
  )
}

export default ToastProvider
