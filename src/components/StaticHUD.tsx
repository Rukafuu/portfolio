import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MousePointer2 } from 'lucide-react'



export default function StaticHUD() {
  const { t } = useTranslation()

  return (
    <>
      {/* HUD HEADER - TO REMAIN FIXED */}
      <div style={{ position: 'fixed', top: '20px', left: '40px', zIndex: 1000 }} className="mono">
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{t('status')}</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{t('mission')}</span>
         </div>
         <div style={{ marginTop: '0.5rem', color: 'var(--primary)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MousePointer2 size={12} /> {t('scroll')}
         </div>
      </div>
    </>
  )
}

