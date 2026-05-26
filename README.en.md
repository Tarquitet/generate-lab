# Fluid Pro Engine

Modern React + Vite app for realtime 3D visuals using three.js and @react-three/fiber.

Overview

- Renders GPU shaders and particle/mesh engines in a WebGL canvas.
- Built with React, Vite, three.js, @react-three/fiber and @react-three/drei.

Features

- Modular render core and engines (mesh, lines, particles).
- Multiple GLSL shaders for surface and particle effects.
- Live controls (sidebar) to tweak shader parameters and presets.

Requirements

- Node.js 16+ and npm
- Modern browser (Chrome, Firefox, Edge)

Quickstart

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open the app in your browser at the URL Vite shows (usually `http://localhost:5173`).

Build & Preview

```bash
npm run build
npm run preview
```

Project structure

- `src/` — application source
  - `components/` — React components and rendering engines
  - `hooks/` — shader loader, engine bridge, control hooks
  - `shaders/` — GLSL shader sources (surface, particles, lines)

How to use the site

- The main view is a 3D canvas. Use the mouse to orbit/zoom (if controls enabled).
- Sidebar controls let you change active shader, tweak uniforms (color, intensity, speed), and toggle particle systems.
- Try presets first, then modify parameters to learn their effect.

Troubleshooting

- If something fails, check browser console for shader compilation errors.
- Re-run `npm install` if modules are missing.
- Use `npm run lint` to surface JS/React lint warnings.

Deployment tips

- This is a static SPA; you can deploy to Vercel, Netlify or any static host.
- For Vercel: push to a Git repo and connect the project; Vercel auto-detects Vite projects.

Credits & License

Uses `three`, `@react-three/fiber`, `@react-three/drei` and other OSS packages. Check `package.json` for versions.

Contact

If you want I can add CI, a demo page, or deployment configuration for Netlify/Vercel.
