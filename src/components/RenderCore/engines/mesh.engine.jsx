import { useThree } from '@react-three/fiber';
import { MASTER_VERTEX_SHADER } from '../../../constants/shaders';

function MeshEngine({ activeShader, uniforms, materialRef }) {
  const { viewport } = useThree();

  return (
    <mesh>
      {/* ✅ CORRECTO: React Three Fiber maneja esto nativamente sin desmontar el objeto */}
      <planeGeometry args={[viewport.width, viewport.height]} />

      <shaderMaterial
        key={activeShader.config.id}
        ref={materialRef}
        vertexShader={MASTER_VERTEX_SHADER}
        fragmentShader={activeShader.fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

MeshEngine.engineConfig = { type: 'surface' };
export default MeshEngine;
