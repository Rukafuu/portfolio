import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, Monitor, Server, Cloud } from 'lucide-react';
// @ts-ignore
import profilePic from '../../assets/eu.png';

interface OverlayUIProps {
  sectionKey: string;
}

const LANGUAGES = [
  { code: 'en', label: 'ENGLISH', native: 'UNITED_STATES', flag: '🇺🇸' },
  { code: 'pt', label: 'PORTUGUÊS', native: 'BRASIL', flag: '🇧🇷' },
  { code: 'es', label: 'ESPAÑOL', native: 'ESPAÑA', flag: '🇪🇸' },
  { code: 'de', label: 'DEUTSCH', native: 'DEUTSCHLAND', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', native: '日本', flag: '🇯🇵' },
];

export const OverlayUI: React.FC<OverlayUIProps> = ({ sectionKey }) => {
  const { t, i18n } = useTranslation();

  if (sectionKey === 'none') return null;

  const isFinale = sectionKey === 'finale';
  const isLanguage = sectionKey === 'language';
  const isIntro = sectionKey === 'intro';
  const isTutorial = sectionKey === 'tutorial';
  const isPluto = sectionKey === 'pluto_legend';

  const getArray = (path: string): any[] => {
      const res = t(path, { returnObjects: true });
      return Array.isArray(res) ? res : [];
  };

  const getObject = (path: string): any => {
      return t(path, { returnObjects: true }) || {};
  };

  const content = {
      title: t(`solar.${sectionKey}.title`) || sectionKey.toUpperCase(),
      body: t(`solar.${sectionKey}.body`) || "",
      meta: t(`solar.${sectionKey}.meta`) || "",
      tech: getArray(`solar.${sectionKey}.tech`),
      stacks: getObject(`solar.${sectionKey}.stacks`),
      cards: getArray(`solar.${sectionKey}.cards`),
      links: getArray(`solar.${sectionKey}.links`),
      steps: getArray(`solar.${sectionKey}.steps`),
  };

  const handleLangChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="overlay-ui" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: window.innerWidth < 768 ? 'flex-start' : 'center',
      alignItems: isFinale ? 'center' : 'flex-start',
      padding: 'var(--hud-padding)',
      paddingTop: window.innerWidth < 768 ? '80px' : '0'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${sectionKey}-${i18n.language}`}
          initial={{ opacity: 0, y: isFinale ? 50 : 0, x: isFinale ? 0 : -50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: isFinale ? -50 : 0, x: isFinale ? 0 : 50 }}
          transition={{ duration: isFinale ? 2 : 0.5 }}
          style={{ 
              pointerEvents: 'auto', 
              width: isFinale ? '100%' : 'auto',
              maxWidth: isFinale ? '100%' : '650px',
              textAlign: isFinale ? 'center' : 'left'
          }}
        >
          {isIntro ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'clamp(1.5rem, 5vw, 3rem)', 
                flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                textAlign: window.innerWidth < 768 ? 'center' : 'left'
              }}>
                  <motion.div 
                    style={{ 
                        width: 'clamp(150px, 30vw, 220px)', 
                        height: 'clamp(190px, 40vw, 280px)', 
                        position: 'relative', 
                        border: '1px solid var(--primary)',
                        margin: window.innerWidth < 768 ? '0 auto' : '0'
                    }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                      <img src={profilePic} alt="Lucas" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                      <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--primary)', color: 'black', padding: '2px 8px', fontSize: '0.6rem' }} className="mono">
                        ID_CORE: 334099538
                      </div>
                  </motion.div>
                  <div style={{ flex: 1, minWidth: window.innerWidth < 768 ? '100%' : '350px' }}>
                    <h2 className="mono" style={{ color: 'var(--accent)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{content.meta}</h2>
                    <h1 className="gradient-text mono" style={{ fontSize: 'var(--title-size)', marginBottom: '1rem', lineHeight: 1 }}>{content.title}</h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: 'var(--body-size)', maxWidth: '600px', marginBottom: '2rem' }}>{content.body}</p>
                    <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mono" style={{ color: 'var(--primary)', fontSize: '0.9rem', border: '1px solid var(--primary)', display: 'inline-block', padding: '10px 20px' }}
                    >
                         [ {t('solar.intro.hint') || 'PRESS_SPACE_TO_INITIALIZE'} ]
                    </motion.div>
                  </div>
              </div>
          ) : isFinale ? (
            <div className="mono" style={{ color: 'white', textShadow: '0 0 20px var(--primary)', padding: '0 10%' }}>
                <h1 style={{ fontSize: 'var(--title-size)', letterSpacing: 'clamp(4px, 2vw, 10px)', marginBottom: '2rem' }}>{content.title}</h1>
                <p style={{ fontSize: 'var(--body-size)', opacity: 0.8, whiteSpace: 'pre-line' }}>{content.body}</p>
                <div style={{ marginTop: '3rem', fontSize: '0.7rem', opacity: 0.5 }}>
                    CREATED BY LUCAS FRISCHEISEN • 2026<br/>
                    THANKS FOR VISITING THE ECOSYSTEM
                </div>
            </div>
          ) : (
            <div className="hud-card">
              <h1 className="gradient-text mono" style={{ fontSize: 'var(--title-size)', marginBottom: '1rem', fontStyle: isPluto ? 'italic' : 'normal', lineHeight: 1.1 }}>
                {content.title}
              </h1>
              <p style={{ color: 'var(--text-dim)', fontSize: 'var(--body-size)', lineHeight: '1.5', marginBottom: isLanguage ? '2rem' : '1.2rem' }}>
                {content.body}
              </p>

              {isPluto && Object.keys(content.stacks).length > 0 && (
                  <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(0, 242, 254, 0.2)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div className="mono" style={{ color: 'var(--accent)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                          <Code2 size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> SYSTEM_CORE_ARCHITECTURE:
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {/* Front-end Stack */}
                        <div style={{ padding: '1rem', background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.1)' }}>
                            <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--primary)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Monitor size={14} /> FRONT_LAYER
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {(content.stacks.front || []).map((s: string) => (
                                    <span key={s} className="mono" style={{ fontSize: '0.65rem', border: '1px solid rgba(0, 242, 254, 0.3)', padding: '2px 6px', color: 'white' }}>{s}</span>
                                ))}
                            </div>
                        </div>

                        {/* Back-end Stack */}
                        <div style={{ padding: '1rem', background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.1)' }}>
                            <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--primary)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Server size={14} /> BACK_LAYER
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {(content.stacks.back || []).map((s: string) => (
                                    <span key={s} className="mono" style={{ fontSize: '0.65rem', border: '1px solid rgba(0, 242, 254, 0.3)', padding: '2px 6px', color: 'white' }}>{s}</span>
                                ))}
                            </div>
                        </div>

                        {/* Infra Stack */}
                        <div style={{ padding: '1rem', background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.1)' }}>
                            <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--primary)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Cloud size={14} /> INFRA_LAYER
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {(content.stacks.infra || []).map((s: string) => (
                                    <span key={s} className="mono" style={{ fontSize: '0.65rem', border: '1px solid rgba(0, 242, 254, 0.3)', padding: '2px 6px', color: 'white' }}>{s}</span>
                                ))}
                            </div>
                        </div>
                      </div>
                  </div>
              )}

              {isTutorial && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {content.steps.map((step: any, idx: number) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '1.5rem', 
                                padding: '12px', 
                                background: 'rgba(0, 242, 254, 0.05)', 
                                borderLeft: '2px solid var(--primary)' 
                            }}
                          >
                            <div className="mono" style={{ 
                                minWidth: '100px', 
                                color: 'var(--primary)', 
                                fontSize: '0.7rem', 
                                background: 'rgba(0, 242, 254, 0.1)',
                                padding: '4px 8px',
                                textAlign: 'center',
                                border: '1px solid rgba(0, 242, 254, 0.3)'
                            }}>
                                {step.key}
                            </div>
                            <div style={{ color: 'var(--text-dim)', fontSize: 'var(--body-size)' }}>
                                {step.desc}
                            </div>
                          </motion.div>
                      ))}
                  </div>
              )}

              {isLanguage && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.8rem' }}>
                      {LANGUAGES.map(lang => (
                            <motion.button
                              key={lang.code}
                              whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleLangChange(lang.code)}
                              className="mono"
                              style={{
                                  background: i18n.language === lang.code ? 'var(--primary)' : 'rgba(0, 242, 254, 0.05)',
                                  color: i18n.language === lang.code ? 'black' : 'var(--primary)',
                                  border: `1px solid ${i18n.language === lang.code ? 'var(--primary)' : 'rgba(0, 242, 254, 0.2)'}`,
                                  padding: '15px',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  display: 'flex',
                                  position: 'relative',
                                  overflow: 'hidden'
                              }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: 'var(--body-size)', fontWeight: 'bold' }}>{lang.label}</span>
                                    <span style={{ fontSize: '0.6rem', opacity: 0.6, marginTop: '2px' }}>{lang.native}</span>
                                </div>
                            </motion.button>
                      ))}
                  </div>
              )}

              {content.tech.length > 0 && !isPluto && (
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                      {content.tech.map(t => (
                          <span key={t} className="mono" style={{ fontSize: '0.75rem', border: '1px solid var(--primary)', padding: '4px 10px', borderRadius: '2px', color: 'var(--primary)', background: 'rgba(0, 242, 254, 0.05)' }}>
                              {t}
                          </span>
                      ))}
                  </div>
              )}

              {content.cards.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                  {content.cards.map((card, idx) => (
                    <div key={card.title} style={{ padding: '1.5rem', background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.1)', position: 'relative' }}>
                      <h3 className="mono" style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '0.4rem' }}>{card.title}</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1.2rem', lineHeight: '1.4' }}>{card.description}</p>
                      
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        {content.links[idx * 2] && (
                          <a href={content.links[idx * 2].url} target="_blank" className="hover-link mono" style={{ fontSize: '0.65rem', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                             <Github size={12} /> {content.links[idx * 2].label.split('_')[1] || 'REPO'}
                          </a>
                        )}
                        {content.links[idx * 2 + 1] && (
                          <a href={content.links[idx * 2 + 1].url} target="_blank" className="hover-link mono" style={{ fontSize: '0.65rem', color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                             <ExternalLink size={12} /> {content.links[idx * 2 + 1].label.split('_')[1] || 'LIVE'}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {content.cards.length === 0 && !isTutorial && !isPluto && content.links.length > 0 && (
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                  {content.links.map(link => (
                    <a key={link.label} href={link.url} target="_blank" className="hover-link mono" style={{ 
                        color: 'var(--primary)', 
                        textDecoration: 'none', 
                        fontSize: '0.8rem',
                        border: '1px solid rgba(0, 242, 254, 0.3)',
                        padding: '6px 12px',
                        background: 'rgba(0, 242, 254, 0.05)',
                        whiteSpace: 'nowrap'
                    }}>
                      {`[ ${link.label} ]`}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
