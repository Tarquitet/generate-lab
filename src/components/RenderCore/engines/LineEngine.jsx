import { useMemo } from 'react';
import * as THREE from 'three';

function LineEngine({ activeShader, uniforms, materialRef }) {
  const geometry = useMemo(() => {
    const count = 8000;

    const pos = new Float32Array(count * 3);

    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (i / count) * 2 - 1;

      offsets[i] = i / count;
    }

    const geo = new THREE.BufferGeometry();

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    geo.setAttribute('offset', new THREE.BufferAttribute(offsets, 1));

    return geo;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={activeShader.vertexShader}
        fragmentShader={activeShader.fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </lineSegments>
  );
}

LineEngine.engineConfig = {
  type: 'lines',
};

export default LineEngine;
