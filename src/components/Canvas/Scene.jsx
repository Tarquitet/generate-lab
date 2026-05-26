import { Canvas } from '@react-three/fiber';
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { CANVAS_CONFIG } from '../../constants/shaders';
import { RenderCore } from '../RenderCore/RenderCore';

export function Scene({ activeShader, controls, onBridgeReady }) {
  return (
    <Canvas {...CANVAS_CONFIG}>
      <RenderCore activeShader={activeShader} controls={controls} onBridgeReady={onBridgeReady} />
      <EffectComposer>
        <Noise opacity={controls.grain} />
        <Vignette eskil={false} offset={0.1} darkness={controls.vignette} />
        {/* 🔥 Aquí agregas nuevos efectos de postprocessing fácilmente */}
        {/* <Bloom intensity={controls.bloom} /> */}
      </EffectComposer>
    </Canvas>
  );
}
