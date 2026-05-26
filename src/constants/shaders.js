// MASTER_VERTEX_SHADER compartido por todos los fragment shaders
export const MASTER_VERTEX_SHADER = `
  varying vec2 vUv;
  uniform float u_zoom;
  uniform float u_rotation;
  uniform float u_panX;
  uniform float u_panY;
  uniform float u_time;

  void main() {
    vec2 transformedUv = uv;
    transformedUv -= 0.5; 
    
    float c = cos(u_rotation);
    float s = sin(u_rotation);
    mat2 rot = mat2(c, -s, s, c);
    transformedUv = rot * transformedUv;
    
    transformedUv *= u_zoom;
    transformedUv += vec2(u_panX * u_time, u_panY * u_time);
    
    vUv = transformedUv + 0.5; 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Configuración global del Canvas
export const CANVAS_CONFIG = {
  camera: { position: [0, 0, 1], fov: 50 },
  gl: { preserveDrawingBuffer: true, antialias: true, alpha: false },
};

// Resoluciones para export
export const RESOLUTION_MAP = {
  '1080p': [1920, 1080],
  '4K': [3840, 2160],
  '8K': [7680, 4320],
};
