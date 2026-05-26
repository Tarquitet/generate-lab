export const config = {
  id: 'neon_original',
  name: 'Neon Flow',
  type: 'surface',

  activeControls: ['speed', 'complexity', 'glow', 'color1', 'color2'],

  palettes: [
    ['#050510', '#FF00C8'],
    ['#03121E', '#00D9FF'],
    ['#000000', '#39FF14'],
    ['#140000', '#FF5A36'],
    ['#0E001A', '#9D4EDD'],
    ['#1A1200', '#FFD60A'],
    ['#02131F', '#7DF9FF'],
    ['#0A0A0A', '#FF006E'],
  ],
};

export const fragmentShader = `
  uniform float u_time;
  uniform float u_speed;
  uniform float u_complexity;
  uniform float u_glow;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) ); vec2 x0 = v - i + dot(i, C.xx) ;
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5); vec3 g = a0.xyz * x0.x + h.xyz * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw; return 130.0 * dot(m, g);
  }

  void main() {
    // El tiempo multiplicado por la velocidad controlada desde la UI
    float t = u_time * u_speed;
    
    // Aplicamos Domain Warping: El ruido mueve a otro ruido
    vec2 q = vec2(snoise(vUv + t * 0.1), snoise(vUv + vec2(1.0) - t * 0.1));
    vec2 r = vec2(snoise(vUv + u_complexity * q + t * 0.2), snoise(vUv + u_complexity * q + vec2(2.3) - t * 0.1));
    
    // El ruido final que genera las líneas
    float f = snoise(vUv + r * u_complexity);
    
    // Convertimos el ruido en líneas brillantes (el factor u_glow controla el contraste)
    float luz = pow(1.0 - abs(f), u_glow);
    
    // Mezcla final de colores
    vec3 colorFinal = mix(u_color1, u_color2, f * 0.3) + u_color2 * luz * 1.5;
    
    gl_FragColor = vec4(colorFinal, 1.0);
  }
`;
