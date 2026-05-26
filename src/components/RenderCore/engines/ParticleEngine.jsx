import { useState } from 'react';
import * as THREE from 'three';

function ParticleEngine({ activeShader, uniforms, materialRef }) {
  const [geometry] = useState(() => {
    const count = 150000;

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = Math.random() * 10 - 5;

      positions[i * 3 + 1] = Math.random() * 10 - 5;

      positions[i * 3 + 2] = Math.random() * 10 - 5;
    }

    const geo = new THREE.BufferGeometry();

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return geo;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={activeShader.vertexShader}
        fragmentShader={activeShader.fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

ParticleEngine.engineConfig = {
  type: 'particles',
};

export default ParticleEngine;
