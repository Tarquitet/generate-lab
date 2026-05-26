import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function useShaderUniforms(activeShader, controls) {
  const materialRef = useRef();

  // Creamos los uniforms UNA vez por shader activo
  const uniforms = useMemo(() => {
    if (!activeShader) return null;

    return {
      u_time: { value: 0 },
      u_zoom: { value: controls.zoom },
      u_rotation: { value: controls.rotation },
      u_panX: { value: controls.panX },
      u_panY: { value: controls.panY },
      u_speed: { value: controls.speed },
      u_complexity: { value: controls.complexity },
      u_glow: { value: controls.glow },
      u_blur: { value: controls.blur },
      u_color1: { value: new THREE.Color(controls.color1) },
      u_color2: { value: new THREE.Color(controls.color2) },
      u_color3: { value: new THREE.Color(controls.color3) },
      u_color4: { value: new THREE.Color(controls.color4) },
      u_resolution: {
        value: new THREE.Vector2(),
      },
      u_mouse: {
        value: new THREE.Vector2(),
      },
      // 🔥 Aquí puedes agregar nuevos uniforms fácilmente:
      // u_texture: { value: null },
      // u_mouse: { value: new THREE.Vector2() },
    };
  }, [activeShader?.config?.id]); // Solo se recrea si cambia el shader

  // Actualizamos los valores en cada frame (sin recrear objetos)
  useFrame((state) => {
    if (!materialRef.current || !uniforms) return;

    const u = materialRef.current.uniforms;
    u.u_time.value = state.clock.elapsedTime;
    u.u_zoom.value = controls.zoom;
    u.u_rotation.value = controls.rotation;
    u.u_panX.value = controls.panX;
    u.u_panY.value = controls.panY;
    u.u_speed.value = controls.speed;
    u.u_complexity.value = controls.complexity;
    u.u_glow.value = controls.glow;
    u.u_blur.value = controls.blur;
    u.u_color1.value.set(controls.color1);
    u.u_color2.value.set(controls.color2);
    u.u_color3.value.set(controls.color3);
    u.u_color4.value.set(controls.color4);
    u.u_resolution.value.set(state.size.width, state.size.height);
    u.u_mouse.value.set(state.mouse.x, state.mouse.y);
  });

  return { materialRef, uniforms };
}
