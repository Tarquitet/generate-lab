import { useState, useMemo, useCallback } from 'react';
import { useShaderLoader } from '../../hooks/useShaderLoader';
import { useControls } from '../../hooks/useControls';
import { useEngineBridge } from '../../hooks/useEngineBridge';
import { Scene } from '../Canvas/Scene';
import Sidebar from '../Sidebar'; // Ajusta la ruta si es necesario

export default function App() {
  // Hooks personalizados
  const { shaders, getShaderById, getDefaultShaderId } = useShaderLoader();
  const { controls, updateControl } = useControls();
  const { setBridge, captureImage } = useEngineBridge();

  // Estado local de la app
  const [activeShaderId, setActiveShaderId] = useState(getDefaultShaderId());
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Memoizamos el shader activo
  const activeShader = useMemo(() => getShaderById(activeShaderId), [activeShaderId, getShaderById]);

  // Cambio de shader con transición
  const handleShaderChange = useCallback(
    (newShaderId) => {
      if (newShaderId === activeShaderId) return;

      setIsTransitioning(true);
      setTimeout(() => {
        setActiveShaderId(newShaderId);
        window.history.pushState({}, '', window.location.pathname);
        setIsTransitioning(false);
      }, 400);
    },
    [activeShaderId],
  );

  return (
    <div className="relative h-screen w-screen bg-[#050505] text-neutral-200 font-sans overflow-hidden select-none">
      {/* Canvas con transición */}
      <div
        className={`absolute inset-0 z-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isTransitioning ? 'opacity-0 scale-105 blur-md' : 'opacity-100 scale-100 blur-0'
        }`}
      >
        {activeShader && (
          <Scene
            key={activeShader.config.id}
            activeShader={activeShader}
            controls={controls}
            onBridgeReady={setBridge}
          />
        )}
      </div>

      {/* Sidebar de controles */}
      <Sidebar
        shaders={shaders}
        activeShaderId={activeShaderId}
        setActiveShaderId={handleShaderChange}
        controls={controls}
        updateControl={updateControl}
        onExportImage={captureImage}
      />
    </div>
  );
}
