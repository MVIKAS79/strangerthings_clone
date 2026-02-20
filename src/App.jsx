
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import './styles/theme.css'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AudioProvider } from './context/AudioContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { UserProvider } from './context/UserContext'
import { ToastProvider } from './components/Toast'
import Hero from './components/Hero'
import Characters from './components/Characters'
import Episodes from './components/Episodes'
import UpsideDown from './components/UpsideDown'
import EpisodeGuide from './components/EpisodeGuide'
import Timeline from './components/Timeline'
import Quotes from './components/Quotes'
import Soundtrack from './components/Soundtrack'
import Quiz from './components/Quiz'
import Trivia from './components/Trivia'
import FanArt from './components/FanArt'
import LoadingScreen from './components/LoadingScreen'
import ParticleBackground from './components/ParticleBackground'
import ThemeToggle from './components/ThemeToggle'
import CustomCursor from './components/CustomCursor'
import Search from './components/Search'
import AudioControls from './components/AudioControls'
import HawkinsMap from './components/HawkinsMap'
import CharacterRelationships from './components/CharacterRelationships'
import SeasonRecap from './components/SeasonRecap'
import BehindTheScenes from './components/BehindTheScenes'
import Profile from './components/Profile'
import Theories from './components/Theories'
import EasterEggs from './components/EasterEggs'
import Memorial from './components/Memorial'
import BestMoments from './components/BestMoments'
import RatingsChart from './components/RatingsChart'
import MobileNav from './components/MobileNav'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showSearch, setShowSearch] = useState(false)
  const { isLoading, setIsLoading, theme } = useTheme()

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowSearch(true)
      }
      if (e.key === 'Escape') {
        setShowSearch(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <CustomCursor />
      <ParticleBackground variant={theme === 'upside-down' ? 'upside-down' : 'normal'} />
      <EasterEggs />
      
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ThemeToggle />
          <AudioControls />
          
          <AnimatePresence>
            {showSearch && (
              <Search 
                onNavigate={handleNavigate} 
                onClose={() => setShowSearch(false)} 
              />
            )}
          </AnimatePresence>

          {currentPage === 'home' && <Hero onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'characters' && <Characters onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'episodes' && <Episodes onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'upsidedown' && <UpsideDown onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'episodeguide' && <EpisodeGuide onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'timeline' && <Timeline onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'quotes' && <Quotes onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'soundtrack' && <Soundtrack onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'quiz' && <Quiz onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'trivia' && <Trivia onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'fanart' && <FanArt onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'map' && <HawkinsMap onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'relationships' && <CharacterRelationships onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'recap' && <SeasonRecap onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'bts' && <BehindTheScenes onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'profile' && <Profile onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'theories' && <Theories onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'memorial' && <Memorial onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'moments' && <BestMoments onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          {currentPage === 'ratings' && <RatingsChart onNavigate={handleNavigate} onOpenSearch={() => setShowSearch(true)} />}
          
          {/* Mobile Navigation */}
          <MobileNav onNavigate={handleNavigate} />
        </>
      )}
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <FavoritesProvider>
          <UserProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </UserProvider>
        </FavoritesProvider>
      </AudioProvider>
    </ThemeProvider>
  )
}

export default App
