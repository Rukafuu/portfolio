import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      status: "[ STATUS: ONLINE ]",
      mission: "MISSION_CONTROL: RESKYUME_OS_v2.0",
      scroll: "PRESS [SPACE] TO ADVANCE // [BACKSPACE] TO RETURN",
      initialized: "[ CLICK ANYWHERE TO INITIALIZE AUDIO ]",
      solar: {
        intro: {
          title: "LUCAS FRISCHEISEN",
          body: "Full Stack Developer & AI Engineer. Specialized in building high-performance interactive interfaces and autonomous synthetic systems.",
          meta: "CUSTOM_VANILLA_THREEJS_BUILD // VITE_REACT_19",
          hint: "PRESS_SPACE_TO_INITIALIZE_ENGINE"
        },
        language: {
          title: "SELECT INTERFACE LANGUAGE",
          body: "Please select your preferred linguistic protocol to begin the deep dive into my professional ecosystem."
        },
        tutorial: {
          title: "NAVIGATION GUIDE",
          body: "Establish a synchronization protocol with the mission architecture using these primary inputs:",
          steps: [
              { key: "SPACE", desc: "Advance to the next technical sector" },
              { key: "BACKSPACE", desc: "Return to the previous professional node" },
              { key: "MOUSE_DRAG", desc: "Inspect 3D celestial architectures" },
              { key: "SCROLL", desc: "Adjust proximity to active data nodes" }
          ]
        },
        mercury: {
          title: "FRONT-END CORE",
          body: "The inner layer of my tech stack. Lightweight, high-performance libraries used to create responsive and fluid user experiences.",
          tech: ["Three.js", "React 19", "GSAP", "Zustand"]
        },
        venus: {
          title: "APPLICATION STACK",
          body: "Robust frameworks used for enterprise-grade deployments, ensuring stability and modern developer experience at scale.",
          tech: ["Next.js 15", "TypeScript", "TailwindCSS", "Framer Motion", "Node.js"]
        },
        earth_flyby: {
          title: "SYSTEM OVERVIEW",
          body: "Accelerating through core modules. This portfolio is built as a custom 3D engine using Vanilla Three.js and Vite."
        },
        mars: {
          title: "BACK-END & INFRA",
          body: "Scalable infrastructure and logic layers. Orchestrating data flow and secure communication protocols.",
          tech: ["Python", "Go", "Docker", "PostgreSQL", "Supabase"],
          cards: [
            { title: "RVC Inference", description: "High-performance voice cloning API with GPU acceleration." },
            { title: "Distributed Systems", description: "Design of load-balanced microservices for AI task processing." }
          ]
        },
        jupiter: {
          title: "AI & COGNITIVE SOLUTIONS",
          body: "Integrating Large Language Models and custom neural agents into production environments and user workflows.",
          tech: ["Gemini 1.5 Pro", "LangChain", "Vector Databases", "Prompt Engineering"],
          cards: [
            { title: "LiraOS Core", description: "Humanized AI interface and autonomous memory systems." },
            { title: "Lira_Chat", description: "Intelligent minimalist chat interface with deep AI integration." }
          ],
          links: [
              { label: "REPO_LIRAOS", url: "https://github.com/Rukafuu/LiraOS" },
              { label: "LIVE_LIRAOS", url: "https://liraos.xyz/" },
              { label: "REPO_LIRACHAT", url: "https://github.com/Rukafuu/lirachat" },
              { label: "LIVE_LIRACHAT", url: "https://lirachat.vercel.app/" }
          ]
        },
        saturn: {
          title: "CREATIVE & MULTIMEDIA",
          body: "Synthetic art and sound engineering. Combining procedural generation with programmatic audio execution.",
          tech: ["Web Audio API", "SASS", "Gulp", "Procedural Geometry"],
          cards: [
              { title: "FukkaVT Infrastructure", description: "Advanced VTuber system with real-time voice conversion." },
              { title: "Dev_Dashboard", description: "Real-time cognitive telemetry monitoring and memory logs." }
          ],
          links: [
              { label: "REPO_FUKKAVT", url: "https://github.com/Rukafuu/FukkaVT" },
              { label: "LIVE_FUKKAVT", url: "https://fukka-vtuber.vercel.app/" },
              { label: "REPO_DASHBOARD", url: "https://github.com/Rukafuu/lira-developer-dashboard" },
              { label: "LIVE_DASHBOARD", url: "https://lira-developer-dashboard.vercel.app/" }
          ]
        },
        uranus: {
          title: "REACH OUT",
          body: "Looking for high-impact collaborations or technical leadership. Let's establish a synchronization protocol.",
          links: [
            { label: "PERFIL_GITHUB", url: "https://github.com/rukafuu" },
            { label: "LINKEDIN", url: "https://linkedin.com/in/rukafuu" }
          ]
        },
        neptune: {
          title: "DEPLOYMENTS & LOGS",
          body: "Explore the live instances and technical repositories of the major ecosystem components in the Lucas Frischeisen cloud.",
          links: [
              { label: "REPO_MOTOR_PORTFOLIO", url: "https://github.com/Rukafuu/portfolio-premium" },
              { label: "REPO_HUB_CENTRAL", url: "https://github.com/Rukafuu/Rukafuu" }
          ]
        },
        pluto_legend: {
          title: "PERSONAL PHILOSOPHY",
          body: "\"The dream is not simply to build machines that think, but to build experiences that feel. We are stardust made of code.\"",
          stacks: {
              front: ["React", "Vue", "Three.js", "Vite", "HTML/CSS", "TypeScript"],
              back: ["Node.js", "Python", "API Design", "MCP", "PostgreSQL"],
              infra: ["Cloud", "GCP", "Architecture"]
          }
        },
        finale: {
          title: "JOURNEY_COMPLETE",
          body: "Transmitting all mission logs to local storage.\nThank you for exploring this digital architecture.\nSystem resetting to origin..."
        }
      }
    }
  },
  pt: {
    translation: {
      status: "[ STATUS: ONLINE ]",
      mission: "CONTROLE_DA_MISSÃO: RESKYUME_OS_v2.0",
      scroll: "PRESSIONE [ESPAÇO] PARA AVANÇAR // [BACKSPACE] PARA VOLTAR",
      initialized: "[ CLIQUE EM QUALQUER LUGAR PARA INICIALIZAR O ÁUDIO ]",
      solar: {
        intro: {
          title: "LUCAS FRISCHEISEN",
          body: "Desenvolvedor Full Stack & Engenheiro de IA. Especializado na criação de interfaces interativas de alta performance e sistemas sintéticos autônomos.",
          meta: "BUILD_VANILLA_THREEJS_CUSTOM // VITE_REACT_19",
          hint: "PRESSIONE_ESPACO_PARA_INICIALIZAR"
        },
        language: {
          title: "SELECIONE O IDIOMA DA INTERFACE",
          body: "Por favor, selecione seu protocolo linguístico preferido para iniciar o mergulho profundo em meu ecossistema profissional."
        },
        tutorial: {
          title: "GUIA DE NAVEGAÇÃO",
          body: "Estabeleça um protocolo de sincronização com a arquitetura da missão usando estas entradas principais:",
          steps: [
              { key: "ESPAÇO", desc: "Avançar para o próximo setor técnico" },
              { key: "BACKSPACE", desc: "Voltar para o nó profissional anterior" },
              { key: "ARRASTAR", desc: "Inspecionar arquiteturas celestes em 3D" },
              { key: "SCROLL", desc: "Ajustar proximidade aos nós de dados ativos" }
          ]
        },
        mercury: {
          title: "NÚCLEO FRONT-END",
          body: "A camada interna da minha stack técnica. Bibliotecas leves e de alta performance usadas para criar experiências de usuário responsivas e fluidas.",
          tech: ["Three.js", "React 19", "GSAP", "Zustand"]
        },
        venus: {
          title: "STACK DE APLICAÇÃO",
          body: "Frameworks robustos usados para implantações de nível empresarial, garantindo estabilidade e uma experiência moderna de desenvolvimento em escala.",
          tech: ["Next.js 15", "TypeScript", "TailwindCSS", "Framer Motion", "Node.js"]
        },
        earth_flyby: {
          title: "VISÃO GERAL DO SISTEMA",
          body: "Acelerando através dos módulos principais. Este portfólio foi construído como um motor 3D customizado usando Vanilla Three.js e Vite."
        },
        mars: {
          title: "BACK-END e INFRA",
          body: "Infraestrutura escalável e camadas de lógica. Orquestrando o fluxo de dados e protocolos de comunicação seguros.",
          tech: ["Python", "Go", "Docker", "PostgreSQL", "Supabase"],
          cards: [
            { title: "RVC Inference", description: "API de clonagem de voz de alta performance com aceleração por GPU." },
            { title: "Sistemas Distribuídos", description: "Design de microsserviços com balanceamento de carga para processamento de tarefas de IA." }
          ]
        },
        jupiter: {
          title: "SOLUÇÕES DE IA e COGNIÇÃO",
          body: "Integrando Modelos de Linguagem de Grande Escala (LLMs) e agentes neurais customizados em ambientes de produção e fluxos de trabalho.",
          tech: ["Gemini 1.5 Pro", "LangChain", "Bancos de Dados Vetoriais", "Engenharia de Prompt"],
          cards: [
            { title: "LiraOS Core", description: "Interface de IA humanizada e sistemas de memória autônoma." },
            { title: "Lira_Chat", description: "Interface de chat inteligente e minimalista com integração profunda de IA." }
          ],
          links: [
              { label: "REPO_LIRAOS", url: "https://github.com/Rukafuu/LiraOS" },
              { label: "LIVE_LIRAOS", url: "https://liraos.xyz/" },
              { label: "REPO_LIRACHAT", url: "https://github.com/Rukafuu/lirachat" },
              { label: "LIVE_LIRACHAT", url: "https://lirachat.vercel.app/" }
          ]
        },
        saturn: {
          title: "CRIATIVIDADE e MULTIMÍDIA",
          body: "Arte sintética e engenharia de som. Combinando geração procedural com execução programática de áudio.",
          tech: ["Web Audio API", "SASS", "Gulp", "Geometria Procedural"],
          cards: [
              { title: "Infra FukkaVT", description: "Sistema VTuber avançado com conversão de voz em tempo real." },
              { title: "Dev_Dashboard", description: "Monitoramento de telemetria cognitiva e logs de memória em tempo real." }
          ],
          links: [
              { label: "REPO_FUKKAVT", url: "https://github.com/Rukafuu/FukkaVT" },
              { label: "LIVE_FUKKAVT", url: "https://fukka-vtuber.vercel.app/" },
              { label: "REPO_DASHBOARD", url: "https://github.com/Rukafuu/lira-developer-dashboard" },
              { label: "LIVE_DASHBOARD", url: "https://lira-developer-dashboard.vercel.app/" }
          ]
        },
        uranus: {
          title: "CONTATO",
          body: "Buscando colaborações de alto impacto ou liderança técnica. Vamos estabelecer um protocolo de sincronização.",
          links: [
            { label: "PERFIL_GITHUB", url: "https://github.com/rukafuu" },
            { label: "LINKEDIN", url: "https://linkedin.com/in/rukafuu" }
          ]
        },
        neptune: {
          title: "DEPLOYS E LOGS",
          body: "Explore as instâncias ao vivo e os repositórios técnicos dos principais componentes da nuvem Lucas Frischeisen.",
          links: [
              { label: "REPO_MOTOR_PORTFOLIO", url: "https://github.com/Rukafuu/portfolio-premium" },
              { label: "REPO_HUB_CENTRAL", url: "https://github.com/Rukafuu/Rukafuu" }
          ]
        },
        pluto_legend: {
          title: "FILOSOFIA PESSOAL",
          body: "\"O sonho não é apenas construir máquinas que pensam, mas construir experiências que sentem. Somos poeira estelar feita de código.\"",
          stacks: {
              front: ["React", "Vue", "Three.js", "Vite", "HTML/CSS", "TypeScript"],
              back: ["Node.js", "Python", "API Design", "MCP", "PostgreSQL"],
              infra: ["Cloud", "GCP", "Architecture"]
          }
        },
        finale: {
          title: "JORNADA CONCLUÍDA",
          body: "Transmitindo todos os registros da missão para o armazenamento local.\nObrigado por explorar esta arquitetura digital.\nReiniciando o sistema para a origem..."
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
