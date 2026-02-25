import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Laptop } from 'lucide-react'

export default function StaticHUD() {
  const { t } = useTranslation()

  return (
    <>
      <div style={{ position: 'fixed', top: '20px', left: '40px', zIndex: 1000 }} className="mono">
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{t('status')}</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{t('mission')}</span>
         </div>
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: '0.5rem', color: 'var(--primary)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 242, 254, 0.1)', padding: '5px 10px', borderRadius: '4px', border: '1px solid rgba(0, 242, 254, 0.2)' }}
         >
            <Laptop size={12} /> {t('scroll')}
         </motion.div>
      </div>
    </>
  )
}
