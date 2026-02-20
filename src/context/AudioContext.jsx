import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'

const AudioContext = createContext()

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

// Sound URLs - using free synth sounds and 80s-style audio
const SOUNDS = {
  // UI Click Effects
  click: 'data:audio/wav;base64,UklGRl9vT19teleQXNpZ25hdHVyZT0+',
  hover: 'data:audio/wav;base64,UklGRhwMAABXQVZFZm10',
  
  // Retro sounds (these will be generated programmatically)
  typewriter: null,
  synthClick: null,
  
  // Ambient sounds
  upsideDownAmbient: null,
  hawkinsLabHum: null,
  
  // Theme music
  synthTheme: null
}

// Generate retro 80s-style sound effects using Web Audio API
const generateSound = (audioCtx, type) => {
  const oscillator = audioCtx.createOscillator()
  const gainNode = audioCtx.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)
  
  switch (type) {
    case 'click':
      oscillator.type = 'square'
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.1)
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1)
      oscillator.start(audioCtx.currentTime)
      oscillator.stop(audioCtx.currentTime + 0.1)
      break
      
    case 'hover':
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime)
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05)
      oscillator.start(audioCtx.currentTime)
      oscillator.stop(audioCtx.currentTime + 0.05)
      break
      
    case 'typewriter':
      oscillator.type = 'sawtooth'
      oscillator.frequency.setValueAtTime(2000, audioCtx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.03)
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.03)
      oscillator.start(audioCtx.currentTime)
      oscillator.stop(audioCtx.currentTime + 0.03)
      break
      
    case 'synthSuccess':
      oscillator.type = 'triangle'
      oscillator.frequency.setValueAtTime(400, audioCtx.currentTime)
      oscillator.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 0.15)
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3)
      oscillator.start(audioCtx.currentTime)
      oscillator.stop(audioCtx.currentTime + 0.3)
      break
      
    case 'synthError':
      oscillator.type = 'sawtooth'
      oscillator.frequency.setValueAtTime(300, audioCtx.currentTime)
      oscillator.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.2)
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2)
      oscillator.start(audioCtx.currentTime)
      oscillator.stop(audioCtx.currentTime + 0.2)
      break
      
    case 'portal':
      oscillator.type = 'sine'
      const lfo = audioCtx.createOscillator()
      const lfoGain = audioCtx.createGain()
      lfo.type = 'sine'
      lfo.frequency.value = 5
      lfoGain.gain.value = 200
      lfo.connect(lfoGain)
      lfoGain.connect(oscillator.frequency)
      lfo.start(audioCtx.currentTime)
      oscillator.frequency.setValueAtTime(200, audioCtx.currentTime)
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1)
      oscillator.start(audioCtx.currentTime)
      oscillator.stop(audioCtx.currentTime + 1)
      lfo.stop(audioCtx.currentTime + 1)
      break
  }
}

// Create ambient sound using oscillators
const createAmbientSound = (audioCtx, type, gainNode) => {
  const oscillators = []
  
  if (type === 'upsideDown') {
    // Low droning bass
    const bass = audioCtx.createOscillator()
    bass.type = 'sine'
    bass.frequency.value = 40
    
    // Eerie high pitch
    const high = audioCtx.createOscillator()
    high.type = 'sine'
    high.frequency.value = 2000
    
    // LFO for modulation
    const lfo = audioCtx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.1
    
    const lfoGain = audioCtx.createGain()
    lfoGain.gain.value = 10
    
    lfo.connect(lfoGain)
    lfoGain.connect(bass.frequency)
    
    // Filter for atmosphere
    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 800
    filter.Q.value = 10
    
    bass.connect(filter)
    high.connect(gainNode)
    filter.connect(gainNode)
    
    // High gain much lower
    const highGain = audioCtx.createGain()
    highGain.gain.value = 0.02
    high.disconnect()
    high.connect(highGain)
    highGain.connect(gainNode)
    
    bass.start()
    high.start()
    lfo.start()
    
    oscillators.push(bass, high, lfo)
  } else if (type === 'hawkinsLab') {
    // Fluorescent light hum (60Hz)
    const hum = audioCtx.createOscillator()
    hum.type = 'sawtooth'
    hum.frequency.value = 60
    
    // Electrical buzz
    const buzz = audioCtx.createOscillator()
    buzz.type = 'square'
    buzz.frequency.value = 120
    
    const buzzGain = audioCtx.createGain()
    buzzGain.gain.value = 0.02
    
    const humGain = audioCtx.createGain()
    humGain.gain.value = 0.05
    
    hum.connect(humGain)
    buzz.connect(buzzGain)
    humGain.connect(gainNode)
    buzzGain.connect(gainNode)
    
    hum.start()
    buzz.start()
    
    oscillators.push(hum, buzz)
  }
  
  return oscillators
}

// Create synth theme music
const createSynthTheme = (audioCtx, masterGain) => {
  const nodes = []
  
  // Arpeggiator pattern (80s synth style)
  const notes = [196, 233.08, 293.66, 349.23, 392, 349.23, 293.66, 233.08] // G3, Bb3, D4, F4, G4...
  let noteIndex = 0
  
  const osc = audioCtx.createOscillator()
  osc.type = 'sawtooth'
  
  const filter = audioCtx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 2000
  filter.Q.value = 5
  
  const noteGain = audioCtx.createGain()
  noteGain.gain.value = 0
  
  osc.connect(filter)
  filter.connect(noteGain)
  noteGain.connect(masterGain)
  
  osc.start()
  nodes.push(osc)
  
  // Arpeggiator loop
  const playNote = () => {
    const now = audioCtx.currentTime
    osc.frequency.setValueAtTime(notes[noteIndex], now)
    noteGain.gain.setValueAtTime(0.15, now)
    noteGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
    
    noteIndex = (noteIndex + 1) % notes.length
  }
  
  const interval = setInterval(playNote, 250)
  
  // Pad synth for atmosphere
  const pad = audioCtx.createOscillator()
  pad.type = 'triangle'
  pad.frequency.value = 98 // G2
  
  const padFilter = audioCtx.createBiquadFilter()
  padFilter.type = 'lowpass'
  padFilter.frequency.value = 400
  
  const padGain = audioCtx.createGain()
  padGain.gain.value = 0.1
  
  pad.connect(padFilter)
  padFilter.connect(padGain)
  padGain.connect(masterGain)
  
  pad.start()
  nodes.push(pad)
  
  return { nodes, interval }
}

export const AudioProvider = ({ children }) => {
  // Settings
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('st-sound-enabled')
    return saved !== null ? JSON.parse(saved) : true
  })
  
  const [musicEnabled, setMusicEnabled] = useState(() => {
    const saved = localStorage.getItem('st-music-enabled')
    return saved !== null ? JSON.parse(saved) : false
  })
  
  const [ambientEnabled, setAmbientEnabled] = useState(() => {
    const saved = localStorage.getItem('st-ambient-enabled')
    return saved !== null ? JSON.parse(saved) : false
  })
  
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('st-volume')
    return saved !== null ? parseFloat(saved) : 0.5
  })
  
  const [ambientType, setAmbientType] = useState('upsideDown')
  
  // Refs
  const audioContextRef = useRef(null)
  const masterGainRef = useRef(null)
  const ambientOscillatorsRef = useRef([])
  const ambientGainRef = useRef(null)
  const musicNodesRef = useRef(null)
  const musicIntervalRef = useRef(null)
  
  // Initialize Audio Context
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      audioContextRef.current = new AudioContextClass()
      
      // Master gain
      masterGainRef.current = audioContextRef.current.createGain()
      masterGainRef.current.gain.value = volume
      masterGainRef.current.connect(audioContextRef.current.destination)
      
      // Ambient gain
      ambientGainRef.current = audioContextRef.current.createGain()
      ambientGainRef.current.gain.value = 0.15
      ambientGainRef.current.connect(masterGainRef.current)
    }
    
    // Resume if suspended
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }
    
    return audioContextRef.current
  }, [volume])
  
  // Play sound effect
  const playSound = useCallback((type) => {
    if (!soundEnabled) return
    
    const ctx = initAudioContext()
    generateSound(ctx, type)
  }, [soundEnabled, initAudioContext])
  
  // Play click sound
  const playClick = useCallback(() => playSound('click'), [playSound])
  
  // Play hover sound  
  const playHover = useCallback(() => playSound('hover'), [playSound])
  
  // Play typewriter sound
  const playTypewriter = useCallback(() => playSound('typewriter'), [playSound])
  
  // Play success sound
  const playSuccess = useCallback(() => playSound('synthSuccess'), [playSound])
  
  // Play error sound
  const playError = useCallback(() => playSound('synthError'), [playSound])
  
  // Play portal sound (for entering Upside Down)
  const playPortal = useCallback(() => playSound('portal'), [playSound])
  
  // Start ambient sound
  const startAmbient = useCallback((type = 'upsideDown') => {
    if (!ambientEnabled) return
    
    const ctx = initAudioContext()
    
    // Stop existing ambient
    ambientOscillatorsRef.current.forEach(osc => {
      try { osc.stop() } catch (e) {}
    })
    
    const oscillators = createAmbientSound(ctx, type, ambientGainRef.current)
    ambientOscillatorsRef.current = oscillators
    setAmbientType(type)
  }, [ambientEnabled, initAudioContext])
  
  // Stop ambient sound
  const stopAmbient = useCallback(() => {
    ambientOscillatorsRef.current.forEach(osc => {
      try { osc.stop() } catch (e) {}
    })
    ambientOscillatorsRef.current = []
  }, [])
  
  // Start theme music
  const startMusic = useCallback(() => {
    if (!musicEnabled) return
    
    const ctx = initAudioContext()
    
    // Stop existing music
    if (musicNodesRef.current) {
      musicNodesRef.current.nodes.forEach(node => {
        try { node.stop() } catch (e) {}
      })
      clearInterval(musicNodesRef.current.interval)
    }
    
    const musicGain = ctx.createGain()
    musicGain.gain.value = 0.3
    musicGain.connect(masterGainRef.current)
    
    const { nodes, interval } = createSynthTheme(ctx, musicGain)
    musicNodesRef.current = { nodes, interval }
  }, [musicEnabled, initAudioContext])
  
  // Stop theme music
  const stopMusic = useCallback(() => {
    if (musicNodesRef.current) {
      musicNodesRef.current.nodes.forEach(node => {
        try { node.stop() } catch (e) {}
      })
      clearInterval(musicNodesRef.current.interval)
      musicNodesRef.current = null
    }
  }, [])
  
  // Update volume
  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = volume
    }
    localStorage.setItem('st-volume', volume.toString())
  }, [volume])
  
  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('st-sound-enabled', JSON.stringify(soundEnabled))
  }, [soundEnabled])
  
  useEffect(() => {
    localStorage.setItem('st-music-enabled', JSON.stringify(musicEnabled))
  }, [musicEnabled])
  
  useEffect(() => {
    localStorage.setItem('st-ambient-enabled', JSON.stringify(ambientEnabled))
  }, [ambientEnabled])
  
  // Handle music toggle
  useEffect(() => {
    if (musicEnabled) {
      startMusic()
    } else {
      stopMusic()
    }
  }, [musicEnabled, startMusic, stopMusic])
  
  // Handle ambient toggle
  useEffect(() => {
    if (ambientEnabled) {
      startAmbient(ambientType)
    } else {
      stopAmbient()
    }
  }, [ambientEnabled, startAmbient, stopAmbient, ambientType])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMusic()
      stopAmbient()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [stopMusic, stopAmbient])
  
  const value = {
    // Settings
    soundEnabled,
    setSoundEnabled,
    musicEnabled,
    setMusicEnabled,
    ambientEnabled,
    setAmbientEnabled,
    volume,
    setVolume,
    ambientType,
    setAmbientType,
    
    // Sound effects
    playClick,
    playHover,
    playTypewriter,
    playSuccess,
    playError,
    playPortal,
    
    // Ambient
    startAmbient,
    stopAmbient,
    
    // Music
    startMusic,
    stopMusic,
    
    // Initialize (needed for user interaction requirement)
    initAudioContext
  }
  
  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}
