export const config = {
  id: 'liquid_marble',
  name: 'Liquid Marble',
  type: 'surface',
  activeControls: ['speed', 'complexity', 'blur', 'color1', 'color2', 'color3', 'color4'],
  palettes: [
    ['#0B1021', '#1B2A49', '#5C6BC0', '#C5CAE9'],
    ['#050505', '#6E44FF', '#B892FF', '#FFFFFF'],
    ['#1A1A1A', '#FF0080', '#7928CA', '#FFFFFF'],

    ['#2D1B12', '#A47551', '#D8C3A5', '#F8F4EA'],
    ['#021B1A', '#0F3D3E', '#14B8A6', '#D1FAE5'],
    ['#2B1E24', '#C97B84', '#F2B5D4', '#FFF1F2'],
    ['#111111', '#444444', '#888888', '#F5F5F5'],
    ['#051937', '#004D7A', '#00BF72', '#A8EB12'],
  ],
};

export const fragmentShader = `
  uniform float u_time; uniform float u_speed; uniform float u_complexity; uniform float u_blur;
  uniform vec3 u_color1; uniform vec3 u_color2; uniform vec3 u_color3; uniform vec3 u_color4;
  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) ); vec2 x0 = v - i + dot(i, C.xx) ;
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ; m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5); vec3 g = a0.xyz * x0.x + h.xyz * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw; return 130.0 * dot(m, g);
  }

  void main() {
    vec2 pos = vUv * 2.0; 
    float t = u_time * u_speed * 0.3;

    vec2 q = vec2(snoise(pos + vec2(0.0, t)), snoise(pos + vec2(5.2, 1.3 - t)));
    vec2 r = vec2(snoise(pos + u_complexity * q + vec2(1.7, 9.2) + t * 1.2), 
                  snoise(pos + u_complexity * q + vec2(8.3, 2.8) + t * 0.8));

    float f = snoise(pos + r);
    float mezcla = f * 0.5 + 0.5;

    // Colores base
    vec3 colorAcrilico = mix(u_color1, u_color2, smoothstep(0.0, 0.35 + u_blur*0.2, mezcla));
    colorAcrilico = mix(colorAcrilico, u_color3, smoothstep(0.35, 0.7 + u_blur*0.2, mezcla));
    colorAcrilico = mix(colorAcrilico, u_color4, smoothstep(0.7, 1.0 + u_blur*0.2, mezcla));

    // Vetas metálicas (Aquí el BLUR hace la magia)
    float vetas = smoothstep(0.45 - u_blur*0.3, 0.55 + u_blur*0.3, abs(f));
    colorAcrilico += u_color4 * pow(vetas, 4.0) * 0.4; 

    gl_FragColor = vec4(colorAcrilico, 1.0);
  }
`;
