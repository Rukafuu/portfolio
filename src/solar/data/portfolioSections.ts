import { PortfolioSection } from '../types/journey';

export const PORTFOLIO_SECTIONS: Record<string, PortfolioSection> = {
  intro: {
    title: "LUCAS FRISCHEISEN",
    body: "Full Stack Developer & AI Engineer. Specialized in building high-performance interactive interfaces and autonomous synthetic systems.",
  },
  language: {
    title: "SELECT INTERFACE LANGUAGE",
    body: "Please select your preferred linguistic protocol to begin the deep dive into my professional ecosystem.",
  },
  tutorial: {
    title: "NAVIGATION GUIDE",
    body: "• SPACE: Advance to the next professional sector\n• DRAG: Inspect 3D architectures\n• SCROLL: Adjust proximity to data nodes\n• HUD (Bottom-Left): Audio management",
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
    body: "Accelerating through core modules. This portfolio is built as a custom 3D engine using Vanilla Three.js and Vite.",
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
        { title: "Lira_Copilot", description: "Multi-modal vision analysis engine for contextual automation." },
        { title: "Global RAG", description: "Semantic search engine using vector embeddings for long-term memory." }
    ]
  },
  saturn: {
    title: "CREATIVE & MULTIMEDIA",
    body: "Synthetic art and sound engineering. Combining procedural generation with programmatic audio execution.",
    tech: ["Web Audio API", "SASS", "Gulp", "Procedural Geometry"]
  },
  uranus: {
    title: "REACH OUT",
    body: "Looking for high-impact collaborations or technical leadership. Let's establish a synchronization protocol.",
    links: [
      { label: "GITHUB", url: "https://github.com/rukafuu" },
      { label: "LINKEDIN", url: "https://linkedin.com/in/rukafuu" }
    ]
  },
  neptune: {
    title: "SOCIAL ECOSYSTEM",
    body: "Connect with me across the developer network to follow the evolution of the LiraOS infrastructure.",
    links: [
        { label: "LIRAOS_V1", url: "https://liraos.xyz" },
        { label: "EMAIL", url: "mailto:lucas.frischeisen@gmail.com" }
    ]
  },
  pluto_legend: {
    title: "PERSONAL PHILOSOPHY",
    body: "\"The dream is not simply to build machines that think, but to build experiences that feel. We are stardust made of code.\"",
  },
  finale: {
    title: "JOURNEY_COMPLETE",
    body: "Transmitting all mission logs to local storage.\nThank you for exploring this digital architecture.\nSystem resetting to origin...",
  }
};
