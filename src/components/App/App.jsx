import { useState, useCallback, useEffect, useRef } from 'react';
import { useShaderLoader } from '../../hooks/useShaderLoader';
import { useControls } from '../../hooks/useControls';
import { useEngineBridge } from '../../hooks/useEngineBridge';
import { Scene } from '../Canvas/Scene';
import Sidebar from '../Sidebar';

export default function App() {
  const { shaders, getShaderById, getDefaultShaderId } = useShaderLoader();
  const { controls, updateControl } = useControls();
  const { setBridge, captureImage } = useEngineBridge();

  const defaultId = getDefaultShaderId();
  const [activeShaderId, setActiveShaderId] = useState(defaultId);
  const [activeShaderData, setActiveShaderData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // 🔥 Ref para evitar bucles infinitos
  const isInitialLoad = useRef(true);

  //  Diagnóstico inicial
  useEffect(() => {
    console.log('📦 SHADERS EN REGISTRO:', shaders.length);
    console.log('🎯 ID POR DEFECTO:', defaultId);
    if (shaders.length === 0) {
      setErrorMsg('El registro de shaders está VACÍO. Revisa src/shaders/registry.js');
    }
  }, [shaders, defaultId]);

  // 🔥 loadShader SIN activeShaderId en las dependencias
  const loadShader = useCallback(
    async (id) => {
      console.log('🔄 Solicitando cargar shader:', id);
      setErrorMsg(null);

      try {
        const shaderDef = getShaderById(id);
        if (!shaderDef) {
          throw new Error(`No se encontró el shader con ID: "${id}" en el registro.`);
        }

        console.log(' Descargando código del shader...');
        const module = await shaderDef.loadCode();
        console.log('✅ Código descargado exitosamente:', Object.keys(module));

        setActiveShaderData({
          config: shaderDef.config,
          vertexShader: module.vertexShader,
          fragmentShader: module.fragmentShader,
        });
        setActiveShaderId(id);
      } catch (error) {
        console.error(' ERROR CRÍTICO AL CARGAR SHADER:', error);
        setErrorMsg(`Error al cargar: ${error.message}`);
      }
    },
    [getShaderById],
  ); // ⚠️ SIN activeShaderId aquí

  // 🔥 Carga inicial: SOLO se ejecuta UNA VEZ
  useEffect(() => {
    if (isInitialLoad.current && defaultId) {
      isInitialLoad.current = false;
      console.log('⚡ Carga inicial del shader:', defaultId);
      loadShader(defaultId);
    }
  }, [defaultId, loadShader]); // ✅ Sin bucle porque loadShader no cambia

  // Pantalla de error visual
  if (errorMsg) {
    return (
      <div className="h-screen w-screen bg-red-900 text-white flex flex-col items-center justify-center p-8 font-mono">
        <h1 className="text-3xl font-bold mb-4">⚠️ ERROR CRÍTICO DETECTADO</h1>
        <p className="text-xl bg-black/30 p-4 rounded mb-4">{errorMsg}</p>
        <p className="text-sm opacity-75">Abre la consola del navegador (F12) para ver el detalle completo.</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-[#050505] text-neutral-200 font-sans overflow-hidden select-none">
      <div className="absolute inset-0 z-0">
        {activeShaderData ? (
          <Scene
            key={activeShaderData.config.id}
            activeShader={activeShaderData}
            controls={controls}
            onBridgeReady={setBridge}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-500 font-mono">
            Cargando shader inicial...
          </div>
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
