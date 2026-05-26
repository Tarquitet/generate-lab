import { useMemo } from 'react';
import { useThree } from '@react-three/fiber';

import { MASTER_VERTEX_SHADER } from '../../../constants/shaders';

function MeshEngine({ activeShader, uniforms, materialRef }) {
  const { viewport } = useThree();

  const geometry = useMemo(
    () => <planeGeometry args={[viewport.width, viewport.height]} />,
    [viewport.width, viewport.height],
  );

  return (
    <mesh>
      {geometry}

      <shaderMaterial
        ref={materialRef}
        vertexShader={MASTER_VERTEX_SHADER}
        fragmentShader={activeShader.fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

MeshEngine.engineConfig = {
  type: 'surface',
};

export default MeshEngine;
