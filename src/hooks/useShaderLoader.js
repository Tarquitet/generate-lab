import { useMemo } from 'react';

// Carga todos los shaders de la carpeta /shaders
const shaderModules = import.meta.glob('../shaders/**/*.js', { eager: true });
const discoveredShaders = Object.values(shaderModules);

export function useShaderLoader() {
  const shaders = useMemo(() => discoveredShaders, []);

  const getShaderById = (id) => shaders.find((s) => s.config?.id === id);

  const getDefaultShaderId = () => shaders[0]?.config?.id;

  return {
    shaders,
    getShaderById,
    getDefaultShaderId,
  };
}
