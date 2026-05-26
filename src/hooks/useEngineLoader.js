import { useMemo } from 'react';

const engineModules = import.meta.glob('../components/RenderCore/engines/*.jsx', { eager: true });

export function useEngineLoader() {
  const engines = useMemo(() => {
    return Object.values(engineModules).reduce((acc, module) => {
      const Engine = module.default;

      const type = Engine.engineConfig?.type;

      if (!type) return acc;

      acc[type] = Engine;

      return acc;
    }, {});
  }, []);

  return engines;
}
