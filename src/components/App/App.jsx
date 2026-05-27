import { useState, useCallback, useEffect } from 'react'; // Quitamos useMemo
import { useShaderLoader } from '../../hooks/useShaderLoader';
import { useControls } from '../../hooks/useControls';
import { useEngineBridge } from '../../hooks/useEngineBridge';
import { Scene } from '../Canvas/Scene';
import Sidebar from '../Sidebar';

export default function App() {
  const { shaders, getShaderById, getDefaultShaderId } = useShaderLoader();
  const { controls, updateControl } = useControls();
  const { setBridge, captureImage } = useEngineBridge();

  const [activeShaderId, setActiveShaderId] = useState(getDefaultShaderId());
  const [activeShaderData, setActiveShaderData] = useState(null);

  // Empezamos asumiendo que está en transición (cargando) para evitar pantallazos
  const [isTransitioning, setIsTransitioning] = useState(true);

  const loadShader = useCallback(
    async (id) => {
      setIsTransitioning(true);

      try {
        const shaderDef = getShaderById(id);

        // Descarga el chunk de JS (Carga perezosa)
        const module = await shaderDef.loadCode();

        setActiveShaderData({
          config: shaderDef.config,
          vertexShader: module.vertexShader,
          fragmentShader: module.fragmentShader,
        });

        setActiveShaderId(id);
        window.history.pushState({}, '', window.location.pathname);
      } catch (error) {
        console.error('Error loading shader:', error);
      } finally {
        setIsTransitioning(false);
      }
    },
    [getShaderById],
  );

  // Carga inicial
  useEffect(() => {
    // Usar setTimeout difiere la ejecución fuera del ciclo síncrono del effect.
    // Esto evita el "cascading render", mejora el TTI (Time to Interactive)
    // y elimina el error estricto de ESLint.
    const initLoad = setTimeout(() => {
      loadShader(getDefaultShaderId());
    }, 0);

    return () => clearTimeout(initLoad);
  }, [loadShader, getDefaultShaderId]);

  return (
    <div className="relative h-screen w-screen bg-[#050505] text-neutral-200 font-sans overflow-hidden select-none">
      <div
        className={`absolute inset-0 z-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isTransitioning ? 'opacity-0 scale-105 blur-md' : 'opacity-100 scale-100 blur-0'
        }`}
      >
        {activeShaderData && (
          <Scene
            key={activeShaderData.config.id}
            activeShader={activeShaderData}
            controls={controls}
            onBridgeReady={setBridge}
          />
        )}
      </div>

      <Sidebar
        shaders={shaders}
        activeShaderId={activeShaderId}
        setActiveShaderId={loadShader}
        controls={controls}
        updateControl={updateControl}
        onExportImage={captureImage}
      />
    </div>
  );
}
