# 🌌 Lira Solar Ecosystem - Premium Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-00f2fe.svg)](https://opensource.org/licenses/MIT)
[![Three.js](https://img.shields.io/badge/Three.js-r183-black)](https://threejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff)](https://vitejs.dev/)

Um ecossistema orbital interativo construído com **Three.js** e **React Three Fiber**. Este não é apenas um portfolio, é uma jornada através de uma arquitetura digital, explorando tecnologias e projetos como se fossem corpos celestes.

---

## 🌑 O Buraco Negro "Gargantua"

A peça central deste projeto é uma recriação cinemática de um buraco negro, inspirada em _Interstellar_. Diferente de implementações comuns, esta versão utiliza **Layered Geometry** e **Post-Processing Shaders** para garantir estabilidade e fidelidade visual.

### Destaques Técnicos do Gargantua:

- **Event Horizon Blindado**: Um núcleo de escuridão absoluta (`#000000`) protegido contra fog, bloom e tone mapping da cena.
- **Accretion Disk Dinâmico**: Um disco de acreção horizontal com brilho emissivo ultra-alto e animação orbital.
- **Singularity Transition**: Uma transição de câmera imersiva que cruza o horizonte de eventos, escondendo a luz e as estrelas para revelar o vazio da singularidade.
- **Render Optimization**: Otimizado para manter 60FPS constantes, utilizando render order estratégico para evitar glitches de transparência.

---

## 🚀 Tecnologias Core

O projeto utiliza o que há de mais moderno no ecossistema WebGL/React:

- **React Three Fiber & Drei**: A ponte declarativa entre React e Three.js.
- **Three.js (r183)**: Motor 3D de alta performance.
- **Post-Processing**: Bloom seletivo, Chromatic Aberration e Noise para um look de "transmissão de dados espacial".
- **Framer Motion**: Orquestração das animações da interface HUD.
- **i18next**: Sistema de internacionalização completo (PT, EN, ES, DE, JA).
- **Vite**: Build system ultra-rápido.

---

## 📡 Arquitetura da Jornada (Journey Stops)

O fluxo do usuário é controlado por um **SolarJourneyController**, que mapeia pontos de interesse no sistema solar:

1.  **A Estrela (Sun)**: Onde tudo começa, representando o núcleo de energia e tutorial.
2.  **Os Planetas**: Cada planeta hospeda uma seção do portfolio (Projetos, Stacks, Contato).
3.  **Voyager-1 (The Edge)**: Onde as tecnologias de infraestrutura e backend residem.
4.  **Warp Speed**: Uma transição de altíssima velocidade para a anomalia do buraco negro.
5.  **Gargantua (The Finale)**: A conclusão da jornada no interior da singularidade.

---

## 🛠️ Como Executar Localmente

Certifique-se de ter o **Node.js** instalado.

1. **Clonar o Repositório**:

   ```bash
   git clone https://github.com/Rukafuu/portfolio.git
   cd portfolio
   ```

2. **Instalar Dependências**:

   ```bash
   npm install
   ```

3. **Iniciar Servidor de Desenvolvimento**:

   ```bash
   npm run dev
   ```

4. **Build para Produção**:
   ```bash
   npm run build
   ```

---

## 🎨 Design Aesthetics

- **Paleta de Cores**: Cyberpunk-industrial, variando do `#00f2fe` (Primary Cyan) ao `#ff2d55` (Neon Red) e o fogo dourado do `#ffaa00`.
- **Interface HUD**: UI estática inspirada em sistemas operacionais de naves espaciais (Reskyune_OS_v2.0).
- **Tipografia**: Outfit para títulos e JetBrains Mono para elementos técnicos.

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para explorar, aprender e construir sobre ele.

_"Nós somos poeira estelar feita de código."_ - **Lira AI**
