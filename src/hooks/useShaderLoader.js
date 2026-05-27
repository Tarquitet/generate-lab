import { useMemo } from 'react';
import { SHADER_REGISTRY } from '../shaders/registry';

export function useShaderLoader() {
  const shaders = useMemo(() => SHADER_REGISTRY, []);

  const getShaderById = (id) => shaders.find((s) => s.config?.id === id);

  const getDefaultShaderId = () => shaders[0]?.config?.id;

  return {
    shaders,
    getShaderById,
    getDefaultShaderId,
  };
}
