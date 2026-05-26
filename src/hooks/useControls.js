import { useState, useCallback } from 'react';

const DEFAULT_CONTROLS = {
  // Transform
  zoom: 1.0,
  rotation: 0.0,
  panX: 0.1,
  panY: 0.1,
  // Shader Math
  speed: 0.5,
  complexity: 2.0,
  glow: 5.0,
  blur: 0.1,
  // Colors
  color1: '#050510',
  color2: '#1a1a4b',
  color3: '#ff0055',
  color4: '#ffaa00',
  // Post-processing
  grain: 0.08,
  vignette: 0.5,
};

export function useControls(initialOverrides = {}) {
  const [controls, setControls] = useState({
    ...DEFAULT_CONTROLS,
    ...initialOverrides,
  });

  const updateControl = useCallback((key, value) => {
    setControls((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetControls = useCallback(() => {
    setControls(DEFAULT_CONTROLS);
  }, []);

  return {
    controls,
    updateControl,
    resetControls,
  };
}
