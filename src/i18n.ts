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
          title: "CREATIVATIVE & MULTIMEDIA",
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
              { label: "REPO_MOTOR_PORTFOLIO", url: "https://github.com/Rukafuu/portfolio" },
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
          body: "Acelerando através dos módulos principais. Este portafolio foi construído como um motor 3D customizado usando Vanilla Three.js e Vite."
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
              { label: "REPO_MOTOR_PORTFOLIO", url: "https://github.com/Rukafuu/portfolio" },
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
  },
  es: {
    translation: {
      status: "[ ESTADO: ONLINE ]",
      mission: "CONTROL_DE_MISIÓN: RESKYUME_OS_v2.0",
      scroll: "PRESIONA [ESPACIO] PARA AVANZAR // [BACKSPACE] PARA VOLVER",
      initialized: "[ HAZ CLIC EN CUALQUIER LUGAR PARA INICIAR EL AUDIO ]",
      solar: {
        intro: {
          title: "LUCAS FRISCHEISEN",
          body: "Desarrollador Full Stack e Ingeniero de IA. Especializado en crear interfaces interactivas de alto rendimiento y sistemas sintéticos autónomos.",
          meta: "BUILD_VANILLA_THREEJS_CUSTOM // VITE_REACT_19",
          hint: "PRESIONA_ESPACIO_PARA_INICIALIZAR"
        },
        language: {
          title: "SELECCIONA EL IDIOMA DE LA INTERFAZ",
          body: "Por favor, selecciona tu protocolo lingüístico preferido para comenzar la inmersión profunda en mi ecosistema profesional."
        },
        tutorial: {
          title: "GUÍA DE NAVEGACIÓN",
          body: "Establece un protocolo de sincronización con la arquitectura de la misión usando estas entradas principales:",
          steps: [
              { key: "ESPACIO", desc: "Avanzar al siguiente sector técnico" },
              { key: "BORRAR", desc: "Regresar al nodo profesional anterior" },
              { key: "ARRASTRAR", desc: "Inspeccionar arquitecturas celestes en 3D" },
              { key: "SCROLL", desc: "Ajustar proximidad a los nodos de datos activos" }
          ]
        },
        mercury: {
          title: "NÚCLEO FRONT-END",
          body: "La capa interna de mi stack técnico. Bibliotecas ligeras y de alto rendimiento utilizadas para crear experiencias de usuario fluidas.",
          tech: ["Three.js", "React 19", "GSAP", "Zustand"]
        },
        venus: {
          title: "STACK DE APLICACIÓN",
          body: "Frameworks robustos utilizados para despliegues de nivel empresarial, garantizando estabilidad y una experiencia moderna.",
          tech: ["Next.js 15", "TypeScript", "TailwindCSS", "Framer Motion", "Node.js"]
        },
        earth_flyby: {
          title: "VISIÓN GENERAL",
          body: "Acelerando a través de los módulos principales. Este portafolio está construido con un motor 3D personalizado usando Vanilla Three.js."
        },
        mars: {
          title: "BACK-END e INFRA",
          body: "Infraestructura escalable y capas de lógica. Orquestando el flujo de datos y protocolos de comunicación seguros.",
          tech: ["Python", "Go", "Docker", "PostgreSQL", "Supabase"],
          cards: [
            { title: "RVC Inference", description: "API de clonación de voz de alto rendimiento con aceleración por GPU." },
            { title: "Sistemas Distribuidos", description: "Diseño de microservicios con balance de carga para tareas de IA." }
          ]
        },
        jupiter: {
          title: "IA y SOLUCIONES COGNITIVAS",
          body: "Integrando modelos de lenguaje (LLMs) y agentes neuronales personalizados en entornos de producción.",
          tech: ["Gemini 1.5 Pro", "LangChain", "Bases de Datos Vectoriales", "Prompt Engineering"],
          cards: [
            { title: "LiraOS Core", description: "Interfaz de IA humanizada e sistemas de memória autónoma." },
            { title: "Lira_Chat", description: "Interfaz de chat inteligente y minimalista con integración profunda de IA." }
          ],
          links: [
              { label: "REPO_LIRAOS", url: "https://github.com/Rukafuu/LiraOS" },
              { label: "LIVE_LIRAOS", url: "https://liraos.xyz/" },
              { label: "REPO_LIRACHAT", url: "https://github.com/Rukafuu/lirachat" },
              { label: "LIVE_LIRACHAT", url: "https://lirachat.vercel.app/" }
          ]
        },
        saturn: {
          title: "CREATIVIDAD y MULTIMEDIA",
          body: "Arte sintético e ingeniería de sonido. Combinando generación procedural con ejecución programática de audio.",
          tech: ["Web Audio API", "SASS", "Gulp", "Geometría Procedural"],
          cards: [
              { title: "Infra FukkaVT", description: "Sistema VTuber avanzado con conversión de voz en tiempo real." },
              { title: "Dev_Dashboard", description: "Monitoreo de telemetría cognitiva y logs de memoria en tiempo real." }
          ],
          links: [
              { label: "REPO_FUKKAVT", url: "https://github.com/Rukafuu/FukkaVT" },
              { label: "LIVE_FUKKAVT", url: "https://fukka-vtuber.vercel.app/" },
              { label: "REPO_DASHBOARD", url: "https://github.com/Rukafuu/lira-developer-dashboard" },
              { label: "LIVE_DASHBOARD", url: "https://lira-developer-dashboard.vercel.app/" }
          ]
        },
        uranus: {
          title: "CONTACTO",
          body: "¿Buscas colaboraciones de alto impacto o liderazgo técnico? Establezcamos un protocolo de sincronización.",
          links: [
            { label: "PERFIL_GITHUB", url: "https://github.com/rukafuu" },
            { label: "LINKEDIN", url: "https://linkedin.com/in/rukafuu" }
          ]
        },
        neptune: {
          title: "DESPLIEGUES",
          body: "Explora las instancias en vivo y los repositorios técnicos de los principales componentes en la nube de Lucas Frischeisen.",
          links: [
            { label: "REPO_MOTOR_PORTFOLIO", url: "https://github.com/Rukafuu/portfolio" },
            { label: "REPO_HUB_CENTRAL", url: "https://github.com/Rukafuu/Rukafuu" }
          ]
        },
        pluto_legend: {
          title: "FILOSOFÍA PERSONAL",
          body: "\"El sueño no es simplemente construir máquinas que piensen, sino construir experiencias que sientan. Somos polvo de estrellas hecho de código.\"",
          stacks: {
              front: ["React", "Vue", "Three.js", "Vite", "HTML/CSS", "TypeScript"],
              back: ["Node.js", "Python", "API Design", "MCP", "PostgreSQL"],
              infra: ["Cloud", "GCP", "Architecture"]
          }
        },
        finale: {
          title: "MISIÓN_COMPLETA",
          body: "Transmitiendo todos los registros de la misión al almacenamiento local.\nGracias por explorar esta arquitectura digital.\nReiniciando el sistema al origen..."
        }
      }
    }
  },
  de: {
    translation: {
      status: "[ STATUS: ONLINE ]",
      mission: "MISSIONSKONTROLLE: RESKYUME_OS_v2.0",
      scroll: "DRÜCKE [LEERTASTE] ZUM VORWÄRTSFAHREN // [RÜCKTASTE] ZURÜCK",
      initialized: "[ KLICKE ÜBERALL, UM AUDIO ZU AKTIVIEREN ]",
      solar: {
        intro: {
          title: "LUCAS FRISCHEISEN",
          body: "Full Stack Entwickler & KI-Ingenieur. Spezialisiert auf interaktive Hochleistungsschnittstellen und autonome synthetische Systeme.",
          meta: "CUSTOM_VANILLA_THREEJS_BUILD // VITE_REACT_19",
          hint: "LEERTASTE_DRUECKEN_ZUM_STARTEN"
        },
        language: {
          title: "INTERFACE-SPRACHE WÄHLEN",
          body: "Bitte wählen Sie Ihr bevorzugtes Sprachprotokoll, um den Deep Dive in mein berufliches Ökosystem zu beginnen."
        },
        tutorial: {
          title: "NAVIGATIONS-GUIDE",
          body: "Stellen Sie ein Synchronisationsprotokoll mit der Missionsarchitektur über diese Eingaben her:",
          steps: [
              { key: "SPACE", desc: "Zum nächsten technischen Sektor vorrücken" },
              { key: "BACKSPACE", desc: "Zum vorherigen beruflichen Knoten zurückkehren" },
              { key: "MOUSE_DRAG", desc: "3D-Himmelsarchitekturen inspizieren" },
              { key: "SCROLL", desc: "Nähe zu aktiven Datenknoten anpassen" }
          ]
        },
        mercury: {
          title: "FRONT-END KERN",
          body: "Die innere Schicht meines Tech-Stacks. Leichte Hochleistungsbibliotheken für responsive Nutzererlebnisse.",
          tech: ["Three.js", "React 19", "GSAP", "Zustand"]
        },
        venus: {
          title: "APPLICATION STACK",
          body: "Robuste Frameworks für Unternehmenseinsätze, die Stabilität und moderne Entwicklung garantieren.",
          tech: ["Next.js 15", "TypeScript", "TailwindCSS", "Framer Motion", "Node.js"]
        },
        earth_flyby: {
          title: "SYSTEMÜBERSICHT",
          body: "Beschleunigung durch Kernmodule. Dieses Portfolio basiert auf einer eigenen 3D-Engine mit Vanilla Three.js."
        },
        mars: {
          title: "BACK-END & INFRA",
          body: "Skalierbare Infrastruktur und Logikebenen. Orchestrierung von Datenflüssen und Sicherheitsprotokollen.",
          tech: ["Python", "Go", "Docker", "PostgreSQL", "Supabase"],
          cards: [
            { title: "RVC Inference", description: "Hochleistungs-Stimmklon-API mit GPU-Beschleunigung." },
            { title: "Verteilte Systeme", description: "Design von lastverteilten Microservices für KI-Aufgaben." }
          ]
        },
        jupiter: {
          title: "KI & KOGNITIVE LÖSUNGEN",
          body: "Integration von Large Language Models (LLMs) und KI-Agenten in Produktionsumgebungen.",
          tech: ["Gemini 1.5 Pro", "LangChain", "Vektordatenbanken", "Prompt Engineering"],
          cards: [
            { title: "LiraOS Core", description: "Humanisierte KI-Schnittstelle und autonome Gedächtnissysteme." },
            { title: "Lira_Chat", description: "Intelligente, minimalistische Chat-Schnittstelle mit tiefer KI-Integration." }
          ],
          links: [
            { label: "REPO_LIRAOS", url: "https://github.com/Rukafuu/LiraOS" },
            { label: "LIVE_LIRAOS", url: "https://liraos.xyz/" },
            { label: "REPO_LIRACHAT", url: "https://github.com/Rukafuu/lirachat" },
            { label: "LIVE_LIRACHAT", url: "https://lirachat.vercel.app/" }
          ]
        },
        saturn: {
          title: "KREATIV & MULTIMEDIA",
          body: "Synthetische Kunst und Sound-Engineering. Kombination von prozeduraler Generierung mit Audio.",
          tech: ["Web Audio API", "SASS", "Gulp", "Procedural Geometry"],
          cards: [
              { title: "FukkaVT Infra", description: "Erweitertes VTuber-System mit Echtzeit-Stimmumwandlung." },
              { title: "Dev_Dashboard", description: "Echtzeit-Telemetrieüberwachung und Gedächtnisprotokolle." }
          ],
          links: [
            { label: "REPO_FUKKAVT", url: "https://github.com/Rukafuu/FukkaVT" },
            { label: "LIVE_FUKKAVT", url: "https://fukka-vtuber.vercel.app/" },
            { label: "REPO_DASHBOARD", url: "https://github.com/Rukafuu/lira-developer-dashboard" },
            { label: "LIVE_DASHBOARD", url: "https://lira-developer-dashboard.vercel.app/" }
          ]
        },
        uranus: {
          title: "KONTAKT",
          body: "Suche nach High-Impact-Kooperationen oder technischer Leitung. Lassen Sie uns synchronisieren.",
          links: [
            { label: "PERFIL_GITHUB", url: "https://github.com/rukafuu" },
            { label: "LINKEDIN", url: "https://linkedin.com/in/rukafuu" }
          ]
        },
        neptune: {
          title: "DEPLOYS",
          body: "Erkunden Sie die Live-Instanzen und Repositorys der wichtigsten Komponenten in der Cloud von Lucas Frischeisen.",
          links: [
            { label: "REPO_MOTOR_PORTFOLIO", url: "https://github.com/Rukafuu/portfolio" },
            { label: "REPO_HUB_CENTRAL", url: "https://github.com/Rukafuu/Rukafuu" }
          ]
        },
        pluto_legend: {
          title: "PHILOSOPHIE",
          body: "\"Der Traum ist nicht nur, denkende Maschinen zu bauen, sondern Erlebnisse, die man fühlt. Wir sind Sternenstaub aus Code.\"",
          stacks: {
              front: ["React", "Vue", "Three.js", "Vite", "HTML/CSS", "TypeScript"],
              back: ["Node.js", "Python", "API Design", "MCP", "PostgreSQL"],
              infra: ["Cloud", "GCP", "Architecture"]
          }
        },
        finale: {
          title: "MISSION_ABGESCHLOSSEN",
          body: "Übertragung aller Missionsprotokolle in den lokalen Speicher.\nVielen Dank für das Erkunden dieser digitalen Architektur.\nSystem wird auf Ursprung zurückgesetzt..."
        }
      }
    }
  },
  ja: {
    translation: {
      status: "[ ステータス: オンライン ]",
      mission: "ミッションコントロール: RESKYUME_OS_v2.0",
      scroll: "[SPACE] で進む // [BACKSPACE] で戻る",
      initialized: "[ 画面をクリックしてオーディオを有効化 ]",
      solar: {
        intro: {
          title: "ルーカス・フリッシャイゼン",
          body: "フルスタック・デベロッパー ＆ AIエンジニア。高性能なインタラクティブ・インターフェースと自律型合成システムの構築を専門としています。",
          meta: "CUSTOM_VANILLA_THREEJS_BUILD // VITE_REACT_19",
          hint: "スペースキーでエンジンを初期化"
        },
        language: {
          title: "インターフェース言語を選択",
          body: "私のプロフェッショナルなエコシステムへのディープダイブを開始するために、優先する言語プロトコルを選択してください。"
        },
        tutorial: {
          title: "ナビゲーションガイド",
          body: "以下の主要な入力を使用して、ミッションアーキテクチャとの同期プロトコルを確立してください：",
          steps: [
              { key: "SPACE", desc: "次の技術セクターへ進む" },
              { key: "BACKSPACE", desc: "前のプロフェッショナルノードへ戻る" },
              { key: "ドラッグ", desc: "3D天体アーキテクチャを視察" },
              { key: "スクロール", desc: "アクティブなデータノードへの近接度を調整" }
          ]
        },
        mercury: {
          title: "フロントエンド・コア",
          body: "私の技術スタックの内部層。レスポンシブで流動的なユーザーエクスペリエンスを作成するために使用される、軽量で高性能なライブラリ。",
          tech: ["Three.js", "React 19", "GSAP", "Zustand"]
        },
        venus: {
          title: "アプリケーション・スタック",
          body: "安定性と最新の開発体験を確保するために、エンタープライズグレードのデプロイに使用される堅牢なフレームワーク。",
          tech: ["Next.js 15", "TypeScript", "TailwindCSS", "Framer Motion", "Node.js"]
        },
        earth_flyby: {
          title: "システム概要",
          body: "コアモジュールを通過して加速中。このポートフォリオは、Vanilla Three.jsとViteを使用したカスタム3Dエンジンとして構築されています。"
        },
        mars: {
          title: "バックエンド ＆ インフラ",
          body: "スケーラブルなインフラストラクチャとロジック層。データフローと安全な通信プロトコルのオーケストレーション。",
          tech: ["Python", "Go", "Docker", "PostgreSQL", "Supabase"],
          cards: [
            { title: "RVC Inference", description: "GPU加速による高性能音声クローニングAPI。" },
            { title: "Distributed Systems", description: "AIタスク処理のための負荷分散されたマイクロサービス設計。" }
          ]
        },
        jupiter: {
          title: "AI ＆ 認知ソリューション",
          body: "大規模言語モデル（LLM）とカスタムニューラルエージェントを本番環境に統合。",
          tech: ["Gemini 1.5 Pro", "LangChain", "Vector Databases", "Prompt Engineering"],
          cards: [
            { title: "LiraOS Core", description: "擬人化されたAIインターフェースと自律型メモリシステム。" },
            { title: "Lira_Chat", description: "深いAI統合を備えたインテリジェントでミニマリストなチャットインターフェース。" }
          ],
          links: [
            { label: "REPO_LIRAOS", url: "https://github.com/Rukafuu/LiraOS" },
            { label: "LIVE_LIRAOS", url: "https://liraos.xyz/" },
            { label: "REPO_LIRACHAT", url: "https://github.com/Rukafuu/lirachat" },
            { label: "LIVE_LIRACHAT", url: "https://lirachat.vercel.app/" }
          ]
        },
        saturn: {
          title: "クリエイティブ ＆ マルチメディア",
          body: "合成アートとサウンドエンジニアリング。手続き型生成とプログラムによるオーディオ実行の組み合わせ。",
          tech: ["Web Audio API", "SASS", "Gulp", "Procedural Geometry"],
          cards: [
              { title: "FukkaVT インフラ", description: "リアルタイム音声変換を備えた高度なVTuberシステム。" },
              { title: "Dev_Dashboard", description: "リアルタイムの認知テレメトリ監視とメモリログ。" }
          ],
          links: [
            { label: "REPO_FUKKAVT", url: "https://github.com/Rukafuu/FukkaVT" },
            { label: "LIVE_FUKKAVT", url: "https://fukka-vtuber.vercel.app/" },
            { label: "REPO_DASHBOARD", url: "https://github.com/Rukafuu/lira-developer-dashboard" },
            { label: "LIVE_DASHBOARD", url: "https://lira-developer-dashboard.vercel.app/" }
          ]
        },
        uranus: {
          title: "コンタクト",
          body: "インパクトのあるコラボレーションや技術的なリーダーシップを求めています。同期プロトコルを確立しましょう。",
          links: [
            { label: "PERFIL_GITHUB", url: "https://github.com/rukafuu" },
            { label: "LINKEDIN", url: "https://linkedin.com/in/rukafuu" }
          ]
        },
        neptune: {
          title: "デプロイメント ＆ ログ",
          body: "ルーカス・フリッシャイゼン・クラウド内の主要なエコシステムコンポーネントのライブインスタンスと技術リポジトリを探索してください。",
          links: [
            { label: "REPO_MOTOR_PORTFOLIO", url: "https://github.com/Rukafuu/portfolio" },
            { label: "REPO_HUB_CENTRAL", url: "https://github.com/Rukafuu/Rukafuu" }
          ]
        },
        pluto_legend: {
          title: "個人の哲学",
          body: "「夢は単に考える機械を作ることではなく、心で感じる体験を作ることです。私たちはコードでできた星屑なのです。」",
          stacks: {
              front: ["React", "Vue", "Three.js", "Vite", "HTML/CSS", "TypeScript"],
              back: ["Node.js", "Python", "API Design", "MCP", "PostgreSQL"],
              infra: ["Cloud", "GCP", "Architecture"]
          }
        },
        finale: {
          title: "ミッション完了",
          body: "すべてのミッションログをローカルストレージに送信中。\nこのデジタルアーキテクチャを探索していただきありがとうございます。\nシステムをオリジンにリセットしています..."
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
    supportedLngs: ['en', 'pt', 'es', 'de', 'ja'],
    load: 'languageOnly',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
