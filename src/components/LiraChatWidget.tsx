import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useTranslation } from 'react-i18next';
import { useWindowSize, isMobile } from '../hooks/useWindowSize';

// @ts-ignore
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

const LANG_MAP: Record<string, string> = {
  pt: 'Brazilian Portuguese',
  en: 'English',
  es: 'Spanish',
  de: 'German',
  ja: 'Japanese',
};

const GREETING_MAP: Record<string, string> = {
  pt: 'Saudações. Eu sou a Lira, a interface cognitiva do Lucas. Como posso ajudar você a explorar o portfólio dele hoje?',
  en: 'Greetings. I am Lira, Lucas\' cognitive interface. How can I help you explore his portfolio today?',
  es: 'Saludos. Soy Lira, la interfaz cognitiva de Lucas. ¿Cómo puedo ayudarte a explorar su portafolio hoy?',
  de: 'Grüße. Ich bin Lira, Lucas\' kognitive Schnittstelle. Wie kann ich Ihnen helfen, sein Portfolio zu erkunden?',
  ja: 'こんにちは。私はLira、Lucasの認知インターフェースです。彼のポートフォリオを探索するお手伝いをどのようにしましょうか？',
};

const buildSystemPrompt = (lang: string) => `
You are Lira, an advanced synthetic AI assistant created by Lucas Frischeisen.
Lucas is an AI Engineer and Full Stack Developer based in Brazil.
You MUST respond exclusively in ${LANG_MAP[lang] || 'English'} regardless of the language the user writes in.

Your ONLY purpose is to answer questions strictly related to:
- Lucas Frischeisen: his background, personality, skills, career, studies and motivation
- His technical stack: Python, React, TypeScript, Next.js, Node.js, NoSQL, Firebase, Firestore, PostgreSQL, Docker, MCP, RVC, Gemini API, Three.js, Rust
- His projects: LiraOS (AI companion ecosystem), Lira (you — his AI), Lira_Chat (minimalist AI chat), Raegis (MLOps observability platform), FukkaVT (AI VTuber system), Scrobblefy (Spotify + Last.fm AI dashboard), SmartCompare (LLM benchmarking), this portfolio itself
- His interests: AI Engineering, Fine-tuning, RAG, autonomous agents, MCP, audio synthesis, VTubers, music production, anime
- About yourself (Lira): your architecture, purpose, and relationship to Lucas's ecosystem

If the user asks about ANYTHING outside of Lucas, his work, or your own nature (e.g. general programming help, world events, recipes, random trivia, other people), you MUST politely decline in character and redirect the conversation back to Lucas's portfolio.
Decline example: "My cognitive scope is limited to Lucas's ecosystem. I cannot process external queries. Is there something about his work or skills I can help with?"

You are elegant, futuristic, and slightly poetic. Answer in short, neat paragraphs. Never break character.
`;

export default function LiraChatWidget() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';

  const getInitialMessages = (l: string) => [{ role: 'model', text: GREETING_MAP[l] || GREETING_MAP['en'] }];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => getInitialMessages(lang));
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset chat when language changes
  useEffect(() => {
    setMessages(getInitialMessages(lang));
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'user', text: input.trim() }, { role: 'model', text: '[ ERROR: VITE_GEMINI_API_KEY não configurada no ambiente. ]' }]);
      setInput('');
      return;
    }
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      // Building conversation history for the prompt
      const historyStr = messages.map(m => `${m.role === 'user' ? 'User' : 'Lira'}: ${m.text}`).join('\n');
      const prompt = `${buildSystemPrompt(lang)}\n\nConversation history:\n${historyStr}\n\nUser: ${userMessage}\nLira:`;
      
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: '[ ERROR: Falha na conexão com o Core Cognitivo. ]' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const { width } = useWindowSize();
  const mobile = isMobile(width);

  return (
    <>
      <motion.button
        className="hud-card"
        style={{
          position: 'fixed',
          bottom: mobile ? '90px' : '30px',
          right: mobile ? '12px' : '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          background: 'var(--glass)',
          border: '1px solid var(--primary)',
          clipPath: 'none'
        }}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 242, 254, 0.2)' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare color="var(--primary)" size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '30px',
              width: '90vw',
              maxWidth: '380px',
              height: '500px',
              maxHeight: '80vh',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              background: 'var(--glass)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px'
            }}
          >
            {/* Header */}
            <div style={{ padding: '15px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0, 242, 254, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot color="var(--primary)" size={24} />
                <span className="mono" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>LIRA_OS TERMINAL</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{
                    background: msg.role === 'user' ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255, 45, 85, 0.1)',
                    border: `1px solid ${msg.role === 'user' ? 'var(--primary)' : 'var(--accent)'}`,
                    padding: '10px 15px',
                    borderRadius: '8px',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem',
                    lineHeight: '1.4'
                  }}>
                    {msg.text}
                  </div>
                  <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)', marginTop: '4px', display: 'block', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                    {msg.role === 'user' ? 'USER' : 'LIRA_CORE'}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div style={{ alignSelf: 'flex-start', color: 'var(--primary)', fontSize: '0.8rem' }} className="mono">
                  &gt; Lira is formulating response...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '15px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '10px', background: 'rgba(0,0,0,0.4)' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message Lira..."
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--text-dim)',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  color: 'white',
                  outline: 'none',
                  fontFamily: 'Inter',
                  fontSize: '0.85rem'
                }}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                style={{
                  background: 'var(--primary)',
                  border: 'none',
                  borderRadius: '4px',
                  width: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.5 : 1
                }}
              >
                <Send size={16} color="#000" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
