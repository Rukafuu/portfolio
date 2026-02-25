import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Github, Linkedin, ExternalLink } from 'lucide-react'
// @ts-ignore
import profilePic from '../assets/eu.png'

interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  style?: React.CSSProperties;
}

const Section = ({ children, id, className = "", style }: SectionProps) => {
  return (
    <motion.section
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="hud-corner top-left" />
      <div className="hud-corner top-right" />
      <div className="hud-corner bottom-left" />
      <div className="hud-corner bottom-right" />
      {children}
    </motion.section>
  )
}

interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
  tech: string[];
  repo?: string;
}

const ProjectCard = ({ title, description, link, tech, repo }: ProjectCardProps) => (
  <motion.div 
    className="hud-card" 
    style={{ marginBottom: '1rem', transition: '0.3s', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}
    whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 242, 254, 0.05)' }}
  >
    {link && (
      <div style={{ 
        position: 'absolute', 
        top: '12px', 
        right: '12px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px',
        background: 'rgba(0, 255, 157, 0.1)',
        padding: '2px 8px',
        borderRadius: '10px',
        border: '1px solid rgba(0, 255, 157, 0.3)',
        zIndex: 5
      }}>
        <motion.div 
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff9d' }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="mono" style={{ fontSize: '0.6rem', color: '#00ff9d', fontWeight: 'bold' }}>LIVE</span>
      </div>
    )}

    <div style={{ marginBottom: '1rem' }}>
      <h3 className="mono" style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '0.8rem' }}>{"> " + title}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: '1.4', minHeight: '3em' }}>{description}</p>
    </div>

    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: 1 }}>
        {tech.map((t: string) => (
          <span key={t} className="mono" style={{ fontSize: '0.65rem', padding: '0.1rem 0.5rem', border: '1px solid var(--primary)', borderRadius: '2px', color: 'var(--primary)', background: 'rgba(0, 242, 254, 0.05)' }}>{t}</span>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', paddingLeft: '1rem' }}>
        {repo && (
          <a href={repo} target="_blank" rel="noopener noreferrer" className="hover-link">
            <Github size={18} className="text-dim" />
          </a>
        )}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" title="Live Preview" className="hover-link">
            <ExternalLink size={18} className="text-dim" />
          </a>
        )}
      </div>
    </div>
  </motion.div>
)

export default function Overlay() {
  const { t } = useTranslation()

  return (
    <div className="overlay">
      {/* HERO SECTION */}
      <Section id="home">
        <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          <motion.div 
            style={{ flex: '0 0 280px', height: '350px', position: 'relative' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div style={{ 
              position: 'absolute', 
              inset: '10px', 
              border: '1px solid var(--primary)',
              zIndex: '2',
              pointerEvents: 'none'
            }} />
            <img 
              src={profilePic} 
              alt="Lucas Frischeisen" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.3) contrast(1.1)', position: 'relative', zIndex: '1' }} 
            />
            <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', background: 'var(--accent)', color: 'white', padding: '5px 10px', fontSize: '0.7rem', zIndex: '3' }} className="mono">
              USER_ID: 334099538
            </div>
          </motion.div>

          <div style={{ flex: '1', minWidth: '400px' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="mono" style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                {t('hero.initializing')}
              </h2>
            </motion.div>
            
            <motion.h1 
              style={{ fontSize: '5rem', lineHeight: '1', marginBottom: '1.5rem', fontWeight: '900' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              LUCAS <br /><span className="gradient-text">FRISCHEISEN</span>
            </motion.h1>
            
            <motion.p 
               style={{ fontSize: '1rem', color: 'var(--text-dim)', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: '1.6' }}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.5 }}
            >
              {t('hero.description')} <br />
              <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{t('hero.meta')}</span>
            </motion.p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#projects" className="hud-card mono" style={{ padding: '0.8rem 1.5rem', textDecoration: 'none', color: 'white', fontSize: '0.9rem', border: '1px solid var(--accent)' }}>
                {t('hero.explore')}
              </a>
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', marginLeft: '1rem' }}>
                 <a href="https://github.com/rukafuu" target="_blank"><Github size={20} className="text-dim" /></a>
                 <a href="https://linkedin.com/in/rukafuu" target="_blank"><Linkedin size={20} className="text-dim" /></a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* BIO SECTION */}
      <Section id="about">
        <div className="hud-card">
          <h2 className="gradient-text mono" style={{ fontSize: '2rem', marginBottom: '2rem' }}>{t('bio.title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem' }}>
            <div style={{ fontSize: '1rem', color: 'var(--text-dim)', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--primary)' }} className="mono">{"> "}</span>
                {t('bio.p1')}
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--primary)' }} className="mono">{"> "}</span>
                {t('bio.p2')}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="mono">
                <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
                    <h4 style={{ fontSize: '0.7rem', color: 'var(--accent)', marginBottom: '0.4rem' }}>// LANGUAGES</h4>
                    <p style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>PYTHON • JAVASCRIPT • TYPESCRIPT • SQL • HTML5 • CSS3</p>
                </div>
                <div style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '1rem' }}>
                    <h4 style={{ fontSize: '0.7rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>// FRAMEWORKS_LIBS</h4>
                    <p style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>REACT • NEXT.JS • VUE • NODE.JS • VITE • THREE.JS • TAILWIND</p>
                </div>
                <div style={{ borderLeft: '2px solid #ffffff', paddingLeft: '1rem' }}>
                    <h4 style={{ fontSize: '0.7rem', color: '#ffffff', marginBottom: '0.4rem' }}>// AI_COGNITIVE_TOOLS</h4>
                    <p style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>RVC • LLM (GEMINI/GPT) • XTTS • SEMANTIC_MEMORY • WEAVIATE</p>
                </div>
                <div style={{ borderLeft: '2px solid var(--text-dim)', paddingLeft: '1rem' }}>
                    <h4 style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>// INFRA_SYSTEMS</h4>
                    <p style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>GIT • DOCKER • WEBSOCKETS • VERCEL • LINUX</p>
                </div>
                
                <div style={{ marginTop: '1.5rem' }}>
                    <a href="mailto:lucas.frischeisen@gmail.com" className="hover-link" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.8rem' }}>{`> [ ${t('bio.contact')} ]`}</a>
                </div>
            </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS SECTION */}
      <Section id="projects" style={{ paddingBottom: '10rem' }}>
        <h2 className="gradient-text mono" style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>{t('projects.title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <ProjectCard 
            title="LiraOS" 
            description={t('projects.liraos')} 
            link="https://liraos.xyz/"
            repo="https://github.com/Rukafuu/LiraOS"
            tech={['React', 'Vite']}
          />
          <ProjectCard 
            title="Lira_Chat" 
            description={t('projects.lirachat')} 
            link="https://lirachat.vercel.app/"
            repo="https://github.com/Rukafuu/lirachat"
            tech={['Next.js', 'LLM']}
          />
          <ProjectCard 
            title="Dev_Dashboard" 
            description={t('projects.dashboard')} 
            link="https://lira-developer-dashboard.vercel.app/"
            repo="https://github.com/Rukafuu/lira-developer-dashboard"
            tech={['TS', 'WebSocket']}
          />
          <ProjectCard 
            title="FukkaVT" 
            description={t('projects.fukka')} 
            link="https://fukka-vtuber.vercel.app/"
            repo="https://github.com/Rukafuu/FukkaVT"
            tech={['Python', 'RVC']}
          />
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ 
        padding: '4rem 0', 
        textAlign: 'center', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: '5rem'
      }}>
        <p className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.8rem', letterSpacing: '1px' }}>
          {t('footer')}
        </p>
      </footer>
    </div>
  )
}
