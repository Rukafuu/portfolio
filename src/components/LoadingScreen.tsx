import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const { progress, active } = useProgress()
  const [shown, setShown] = useState(true)

  useEffect(() => {
    if (progress === 100 && !active) {
      setTimeout(() => setShown(false), 1500)
    }
  }, [progress, active])

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1000,
            background: '#050816',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mono" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              [ INITIALIZING_SYSTEM_CORE ]
            </h2>
            <div style={{ width: '300px', height: '4px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
              <motion.div 
                style={{ 
                  height: '100%', 
                  background: 'var(--primary)', 
                  boxShadow: '0 0 10px var(--primary)' 
                }} 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div style={{ marginTop: '1rem', color: 'var(--primary)', fontSize: '0.8rem' }}>
              LOADING_DATA: {Math.round(progress)}%
            </div>
            <div style={{ marginTop: '0.5rem', color: 'var(--text-dim)', fontSize: '0.6rem' }}>
              BOOTING_LIRA_OS_V2.0.4.5...
            </div>
          </div>
          
          <div className="hud-corner top-left" />
          <div className="hud-corner top-right" />
          <div className="hud-corner bottom-left" />
          <div className="hud-corner bottom-right" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
