<div align="center">

# 🏮 Neon Lamp Interactive Login Experience

<p align="center">
  <strong>A futuristic, hyper-realistic neon desk lamp interactive authentication portal.</strong><br>
  Featuring real-time lighting physics, volumetric light beams, interactive cord physics, and procedural sound synthesis.
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-neno--lamp.vercel.app-00f2fe?logo=vercel&logoColor=white)](https://neno-lamp.vercel.app/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript%20ES6+-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5 / CSS3](https://img.shields.io/badge/HTML5%20%2F%20CSS3-Modern%20UI-e34f26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-Procedural%20Sound-blueviolet)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-brightgreen)](#)

[🚀 Live Demo](https://neno-lamp.vercel.app/) • [⚡ 1-Click Deploy](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnazmul-d3v%2FNeno-lamp) • [Explore Features](#-key-features) • [Quick Start](#-quick-start) • [Color Themes](#-neon-color-themes) • [Controls & Shortcuts](#-controls--shortcuts)

</div>

---

## 🌟 Overview

**Neon Lamp Login** is an interactive web experience inspired by cyberpunk aesthetics and realistic industrial design. At its core is a fully articulated SVG desk lamp with an interactive pull-cord switch. Turning the lamp on projects an illuminated volumetric cone of light across a glassmorphic login interface, complete with floating ambient dust particles and tactile synthesized sound effects.

Everything is built from scratch with **zero third-party libraries or frameworks**—just modern semantic HTML5, advanced CSS, and vanilla ES Modules.

---

## ✨ Key Features

- 💡 **Interactive Articulated Desk Lamp**
  - Fully scalable SVG desk lamp with brass joints, gunmetal finish, and specular highlights.
  - Interactive physics-driven pull cord with realistic drag-tension and damped harmonic spring recoil.
  - Interactive base switch button and clickable shade dome for quick toggling.

- 🔦 **Volumetric Lighting Physics**
  - Dynamic volumetric spotlight beam with directional gradient falloff.
  - Real-time ground plane reflections and ambient surface glow.
  - Adaptive UI brightness: turning off the lamp immerses the card into dark mode with dimmed visibility and an illumination alert.

- 🔊 **Procedural Web Audio Engine**
  - Built natively with the **Web Audio API**—zero audio asset downloads or latency.
  - Procedurally synthesizes authentic tactile switch clicks, cord tension creaks, electrical hums, tab transitions, success chimes, and validation alerts.
  - Built-in global mute/unmute toggle.

- 🌌 **Ambient Canvas Dust Particles**
  - High-performance HTML5 `<canvas>` dust mote simulation.
  - Dynamic Brownian motion physics with illumination reactivity—particles light up when floating through the lamp's light beam cone.

- 🎨 **Dynamic Neon Theme Presets**
  - Instant live palette switching across 5 curated neon cyberpunk themes:
    - 🩵 **Neon Cyan** (Default electric cyan)
    - 🩷 **Cyber Magenta** (Vibrant synthwave pink)
    - 🧡 **Warm Tungsten** (Cozy amber incandescent glow)
    - 💚 **Matrix Green** (High-tech terminal emerald)
    - 💜 **Ultra Violet** (Deep neon purple)

- 🪟 **Glassmorphic Multi-View Auth System**
  - **Sign In**, **Sign Up**, and **Password Recovery** forms in one streamlined glassmorphism card.
  - Animated sliding tab indicator with smooth CSS transitions.
  - Interactive password visibility toggle (eye / eye-off icons).
  - Toast notification system for instant user feedback.

---

## 🎮 Controls & Shortcuts

| Action | Control Method |
| :--- | :--- |
| **Toggle Lamp** | Drag or click the **Pull Cord** |
| **Toggle Lamp** | Click the **Base Push Button** |
| **Toggle Lamp** | Click the **Lamp Shade Dome** |
| **Keyboard Shortcut** | Press <kbd>Space</kbd> or <kbd>L</kbd> |
| **Change Color Theme** | Click any color pill in the top toolbar |
| **Toggle Sound Effects**| Click the **Speaker Icon** in the top-right |
| **Switch Auth Forms** | Click **Sign In** / **Sign Up** tabs or **Forgot?** link |
| **Toggle Password** | Click the eye icon inside password fields |

---

## 🚀 Quick Start

Because this project uses native **JavaScript ES Modules** (`type="module"`), it should be served via a local HTTP server rather than opened directly as a `file://` URL.

### Option 1: Python (Pre-installed on most systems)
```bash
# Clone the repository
git clone https://github.com/nazmul-d3v/Neno-lamp.git

# Navigate into the project folder
cd Neno-lamp

# Start local server (Python 3)
python -m http.server 8000
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

### Option 2: Node.js (npx)
```bash
# Using 'serve'
npx serve .

# Or using 'live-server' for auto-reload
npx live-server
```

### Option 3: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Right-click `index.html` and select **"Open with Live Server"**.

---

## 🎨 Neon Color Themes

| Theme Name | Primary Accent | Vibe |
| :--- | :---: | :--- |
| **Neon Cyan** | `#00f2fe` | Cyberpunk terminal, energetic neon glow |
| **Cyber Magenta** | `#ff2a85` | Synthwave aesthetic, high contrast |
| **Warm Tungsten** | `#ffaa00` | Classic incandescent desk lamp, warm & cozy |
| **Matrix Green** | `#00ff88` | Sci-fi retro computer console |
| **Ultra Violet** | `#a855f7` | Deep ultraviolet blacklight luminescence |

---

## 📁 Project Structure

```text
Neno-lamp/
├── assets/             # Media and static graphics
├── css/
│   ├── card.css        # Glassmorphic auth card, inputs, tabs & buttons
│   ├── lamp.css        # Lamp structure, cord animations & volumetric light beam
│   └── style.css       # Global layout, CSS variables, themes & typography
├── js/
│   ├── app.js          # Core application coordinator & form handlers
│   ├── audio.js        # Web Audio API sound synthesis engine
│   ├── lamp.js         # Lamp controller, spring physics & cord drag interactions
│   └── particles.js    # Canvas 2D ambient dust particle simulation
├── index.html          # Semantic HTML5 stage & SVG desk lamp vector artwork
└── README.md           # Documentation & project guide
```

---

## 🛠️ Built With

- **HTML5:** Semantic architecture, accessible forms, embedded SVG vector graphics.
- **CSS3:** Custom properties (variables), Backdrop Filter Glassmorphism, 3D transforms, flexbox & grid.
- **Vanilla JavaScript (ES6+):** Modular OOP design, event delegation, coordinate vector math.
- **Web Audio API:** Real-time waveform generation (`OscillatorNode`, `GainNode`, `BiquadFilterNode`).
- **HTML5 Canvas:** Real-time particle physics and rendering loop with `requestAnimationFrame`.

---

## 💡 Customization

You can easily add new color themes in [`js/app.js`](file:///js/app.js) by appending to the `THEMES` object:

```javascript
const THEMES = {
    // ...existing themes
    sunset: {
        name: 'Sunset Orange',
        primary: '#ff5e3a',
        secondary: '#ff2a6d',
        glow: 'rgba(255, 94, 58, 0.45)',
        rgb: { r: 255, g: 94, b: 58 },
        cardBorder: 'rgba(255, 94, 58, 0.22)',
        btnText: '#ffffff'
    }
};
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - feel free to use, modify, and distribute it in your personal and commercial projects.

---

<div align="center">
  <sub>Crafted with passion for interactive web design. Star ⭐ this repository if you enjoyed the lighting experience!</sub>
</div>
