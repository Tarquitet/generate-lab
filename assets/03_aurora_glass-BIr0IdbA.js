var e={id:`aurora_glass`,name:`Aurora Glass`,type:`surface`,activeControls:[`speed`,`complexity`,`blur`,`color1`,`color2`,`color3`,`color4`],palettes:[[`#061826`,`#1BA1E2`,`#7DF9FF`,`#E0FFFF`],[`#2B0A3D`,`#FF5F6D`,`#FFC371`,`#FFF5E1`],[`#140F2D`,`#5F4B8B`,`#A393EB`,`#F7F7FF`],[`#031926`,`#468189`,`#77ACA2`,`#E8F1F2`],[`#2D1E2F`,`#F672B0`,`#C084FC`,`#FFF7FB`],[`#2B1103`,`#FF7B00`,`#FFD166`,`#FFF8E7`]]},t=`
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
    vec2 uv = vUv;
    float t = u_time * u_speed * 0.2;

    vec2 warpedUv = uv;
    warpedUv.x += snoise(vec2(uv.y * u_complexity, t)) * 0.2;
    warpedUv.y += snoise(vec2(uv.x * u_complexity, t * 1.2)) * 0.2;

    float ola1 = snoise(vec2(warpedUv.x * 2.0 + t, warpedUv.y * 1.5)) * 0.5 + 0.5;
    float ola2 = snoise(vec2(warpedUv.x * 3.0 - t * 0.8, warpedUv.y * 2.5 - t)) * 0.5 + 0.5;
    float ola3 = snoise(vec2(warpedUv.x * 1.5 + t * 1.5, warpedUv.y * 3.0 + t * 0.5)) * 0.5 + 0.5;

    vec3 colorAcrilico = u_color1; 
    
    // EL BLUR SUAVIZA LAS TRANSICIONES DE LUZ
    float soften = u_blur * 0.5;
    colorAcrilico = mix(colorAcrilico, u_color2, smoothstep(0.1 - soften, 0.9 + soften, ola1));
    colorAcrilico = mix(colorAcrilico, u_color3, smoothstep(0.2 - soften, 0.8 + soften, ola2) * 0.8);

    float interseccion = ola1 * ola2 * ola3;
    colorAcrilico = mix(colorAcrilico, u_color4, smoothstep(0.1, 0.6 + soften, interseccion) * 1.2);

    float reflejoCristal = smoothstep(0.0, 1.5, uv.x + uv.y);
    colorAcrilico += u_color4 * (reflejoCristal * 0.08);

    gl_FragColor = vec4(colorAcrilico, 1.0);
  }
`;export{e as config,t as fragmentShader};