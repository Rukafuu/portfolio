# Interstellar Portfolio - Solar Edition

An interactive, scroll-driven journey through the Solar System built with **React-Three-Fiber** and **Three.js**.

## 🚀 Features

- **Full Solar System**: 8 planets with high-resolution 2K textures based on NASA/JPL telemetry.
- **Cinematic Traversal**: Scroll-based flight path from the Sun to the outer edges of the solar system.
- **Physics-Informed Orbits**: Configurable rotation and translation speeds for all celestial bodies.
- **Helium Interface (HUD)**: Interactive controls to pause simulations, toggle orbits, and view planet data.
- **Black Hole Finale**: A gravitational anomaly that resets the journey at the edge of the system.

## 🕹️ Controls

- **[ H ]**: Toggle Command Interface.
- **[ SPACE ]**: Pause/Resume orbital movement.
- **[ O ]**: Toggle orbit path visibility.
- **[ SCROLL ]**: Manually pilot the traversal trajectory.
- **[ MOUSE DRAG ]**: Free camera rotation (orbit controls).

## 🛠️ Stack

- **Engine**: Three.js + @react-three/fiber
- **Language**: TypeScript
- **Environment**: Vite
- **UI**: Framer Motion + Lucide React
- **i18n**: Multi-language support (EN, PT, ES, DE, JA)

## 📁 Project Structure

- `/src/solar/`: Core solar system engine.
- `/src/solar/bodies/`: Celestial body components (Sun, Planet, Moon).
- `/src/solar/data/`: Planetary metrics and configuration.
- `/src/solar/utils/`: Traversal and input utilities.
- `/public/textures/solar/`: 2K Albedo maps and NASA data.

## 📜 Credits

Textures provided by [Solar System Scope](https://www.solarsystemscope.com/textures/). Reference data from NASA/JPL/USGS.
Detailed credits available in `/public/textures/solar/CREDITS.md`.
