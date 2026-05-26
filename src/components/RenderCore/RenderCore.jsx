import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useShaderUniforms } from '../../hooks/useShaderUniforms';
import { useEngineLoader } from '../../hooks/useEngineLoader';

export function RenderCore({ activeShader, controls, onBridgeReady }) {
  const { gl, scene, camera } = useThree();
  const { materialRef, uniforms } = useShaderUniforms(activeShader, controls);
  const engines = useEngineLoader();
  const Engine = engines[activeShader.config.type];

  useEffect(() => {
    if (!onBridgeReady) return;

    const captureImage = (resolutionKey, format) => {
      const resMap = {
        '1080p': [1920, 1080],
        '4K': [3840, 2160],
        '8K': [7680, 4320],
      };

      const [w, h] = resMap[resolutionKey] || [1920, 1080];
      const originalW = gl.domElement.clientWidth;
      const originalH = gl.domElement.clientHeight;
      gl.setSize(w, h, false);
      gl.render(scene, camera);
      const dataUrl = gl.domElement.toDataURL(format || 'image/png', 1.0);
      gl.setSize(originalW, originalH, true);
      const link = document.createElement('a');
      link.download = `render_${Date.now()}`;
      link.href = dataUrl;
      link.click();
    };
    onBridgeReady({
      captureImage,
    });
  }, [gl, scene, camera, onBridgeReady]);

  if (!Engine) return null;

  if (!Engine) return null;

  return (
    <Engine
      key={activeShader.config.id}
      activeShader={activeShader}
      uniforms={uniforms}
      materialRef={materialRef}
      controls={controls}
    />
  );
}
