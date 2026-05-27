// src/shaders/registry.js

export const SHADER_REGISTRY = [
  // ==========================================
  // MOTORES DE SUPERFICIE (PLANOS / SDF)
  // ==========================================
  {
    config: {
      id: 'topo_lines',
      name: 'Topographic Map',
      type: 'surface',
      activeControls: ['speed', 'complexity', 'blur', 'color1', 'color2'],
      palettes: [
        ['#050510', '#6E44FF'],
        ['#02121E', '#00D1FF'],
        ['#0A0A0A', '#39FF14'],
        ['#140021', '#FF00AA'],
        ['#1A1A1A', '#FFFFFF'],
      ],
    },
    loadCode: () => import('./surface/01_topography.js'),
  },
  {
    config: {
      id: 'liquid_marble',
      name: 'Liquid Marble',
      type: 'surface',
      activeControls: ['speed', 'complexity', 'blur', 'color1', 'color2', 'color3', 'color4'],
      palettes: [
        ['#0B1021', '#1B2A49', '#5C6BC0', '#C5CAE9'],
        ['#050505', '#6E44FF', '#B892FF', '#FFFFFF'],
        ['#1A1A1A', '#FF0080', '#7928CA', '#FFFFFF'],
        ['#2D1B12', '#A47551', '#D8C3A5', '#F8F4EA'],
        ['#021B1A', '#0F3D3E', '#14B8A6', '#D1FAE5'],
        ['#2B1E24', '#C97B84', '#F2B5D4', '#FFF1F2'],
        ['#111111', '#444444', '#888888', '#F5F5F5'],
        ['#051937', '#004D7A', '#00BF72', '#A8EB12'],
      ],
    },
    loadCode: () => import('./surface/02_liquid_marble.js'),
  },
  {
    config: {
      id: 'aurora_glass',
      name: 'Aurora Glass',
      type: 'surface',
      activeControls: ['speed', 'complexity', 'blur', 'color1', 'color2', 'color3', 'color4'],
      palettes: [
        ['#061826', '#1BA1E2', '#7DF9FF', '#E0FFFF'],
        ['#2B0A3D', '#FF5F6D', '#FFC371', '#FFF5E1'],
        ['#140F2D', '#5F4B8B', '#A393EB', '#F7F7FF'],
        ['#031926', '#468189', '#77ACA2', '#E8F1F2'],
        ['#2D1E2F', '#F672B0', '#C084FC', '#FFF7FB'],
        ['#2B1103', '#FF7B00', '#FFD166', '#FFF8E7'],
      ],
    },
    loadCode: () => import('./surface/03_aurora_glass.js'),
  },
  {
    config: {
      id: 'relief_2d',
      name: 'Relief Topography (2.5D)',
      type: 'surface',
      activeControls: ['speed', 'complexity', 'blur', 'glow', 'color1', 'color2', 'color3'],
      palettes: [
        ['#0B132B', '#3A506B', '#C6D8D3'],
        ['#2D1B12', '#A47551', '#F1D6B8'],
        ['#120C0C', '#5C1A1B', '#FF784F'],
        ['#02131F', '#3DA5D9', '#E0FBFC'],
        ['#081C15', '#2D6A4F', '#D8F3DC'],
        ['#111111', '#666666', '#F5F5F5'],
        ['#140021', '#4B0082', '#FF4ECD'],
      ],
    },
    loadCode: () => import('./surface/04_relief_2d.js'),
  },
  {
    config: {
      id: 'neon_original',
      name: 'Neon Flow',
      type: 'surface',
      activeControls: ['speed', 'complexity', 'glow', 'color1', 'color2'],
      palettes: [
        ['#050510', '#FF00C8'],
        ['#03121E', '#00D9FF'],
        ['#000000', '#39FF14'],
        ['#140000', '#FF5A36'],
        ['#0E001A', '#9D4EDD'],
        ['#1A1200', '#FFD60A'],
        ['#02131F', '#7DF9FF'],
        ['#0A0A0A', '#FF006E'],
      ],
    },
    loadCode: () => import('./surface/05_neon_liquid_flow.js'),
  },
  {
    config: {
      id: 'vector_flow',
      name: 'Vector Wave Flow',
      type: 'surface',
      activeControls: ['speed', 'complexity', 'glow', 'blur', 'color1', 'color2'],
      palettes: [
        ['#020617', '#38BDF8'],
        ['#000000', '#FFFFFF'],
        ['#140021', '#FF4ECD'],
        ['#031525', '#7DD3FC'],
        ['#1E1B4B', '#C4B5FD'],
      ],
    },
    loadCode: () => import('./surface/06_vector_flow.js'),
  },

  // ==========================================
  // MOTORES DE PARTÍCULAS (BUFFER GEOMETRY)
  // ==========================================
  {
    config: {
      id: 'energy_core',
      name: 'Energy Core',
      type: 'particles',
      activeControls: ['speed', 'complexity', 'glow', 'color1', 'color2', 'color3', 'color4'],
      palettes: [
        ['#02131F', '#0066FF', '#7DF9FF', '#FFFFFF'],
        ['#0E001A', '#6A00FF', '#C77DFF', '#FFFFFF'],
        ['#1A0500', '#FF5A00', '#FFD166', '#FFF7CC'],
        ['#001A14', '#00C896', '#7FFFD4', '#EFFFFA'],
        ['#140021', '#FF006E', '#FF87C5', '#FFFFFF'],
        ['#061826', '#4CC9F0', '#CAF0F8', '#FFFFFF'],
        ['#0A0A0A', '#39FF14', '#B9FF66', '#F3FFE3'],
        ['#050505', '#7928CA', '#B892FF', '#FFFFFF'],
      ],
    },
    loadCode: () => import('./particles/energy_core.js'),
  },
  {
    config: {
      id: 'galaxy_dust',
      name: 'Galaxy Dust',
      type: 'particles',
      activeControls: ['speed', 'complexity', 'glow', 'color1', 'color2', 'color3'],
      palettes: [
        ['#02010A', '#1B1B3A', '#7DF9FF'],
        ['#050510', '#6A00FF', '#F0ABFC'],
        ['#140A00', '#FF7B00', '#FFF3B0'],
        ['#001A14', '#00A896', '#D8FFF1'],
        ['#061826', '#4CC9F0', '#F1FAFF'],
        ['#140021', '#FF006E', '#FFD6FF'],
        ['#050505', '#555555', '#FFFFFF'],
        ['#031926', '#5CE1E6', '#D8FFF1'],
      ],
    },
    loadCode: () => import('./particles/galaxy_dust.js'),
  },
  {
    config: {
      id: 'matrix_rain',
      name: 'Matrix Rain',
      type: 'particles',
      activeControls: ['speed', 'complexity', 'glow', 'color1', 'color2'],
      palettes: [
        ['#001100', '#39FF14'],
        ['#00131A', '#00E5FF'],
        ['#120018', '#C77DFF'],
        ['#1A0000', '#FF3B3B'],
        ['#140D00', '#FFB000'],
        ['#050505', '#F5F5F5'],
        ['#031926', '#5CE1E6'],
        ['#0A0A0A', '#B9FF66'],
      ],
    },
    loadCode: () => import('./particles/matrix_rain.js'),
  },
];
