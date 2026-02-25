import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Laptop } from 'lucide-react'

export default function StaticHUD() {
  const { t } = useTranslation()

  return (
    <>
      <div style={{ position: 'fixed', top: '15px', left: 'clamp(15px, 5vw, 40px)', zIndex: 1000 }} className="mono">
         <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: 'clamp(0.7rem, 2vw, 1rem)' }}>{t('status')}</span>
            <span style={{ color: 'var(--text-dim)', fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)' }}>{t('mission')}</span>
         </div>
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: '0.5rem', color: 'var(--primary)', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 242, 254, 0.1)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(0, 242, 254, 0.2)', width: 'fit-content' }}
         >
            <Laptop size={11} /> {t('scroll')}
         </motion.div>
      </div>
    </>
  )
}
