var e={id:`topo_lines`,name:`Topographic Map`,type:`surface`,activeControls:[`speed`,`complexity`,`blur`,`color1`,`color2`],palettes:[[`#050510`,`#6E44FF`],[`#02121E`,`#00D1FF`],[`#0A0A0A`,`#39FF14`],[`#140021`,`#FF00AA`],[`#1A1A1A`,`#FFFFFF`]]},t=`
  uniform float u_time;
  uniform float u_speed;
  uniform float u_complexity;
  uniform float u_blur; // RECIBIMOS EL BLUR DESDE LA UI
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  
  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v - i + dot(i, C.xx) ;
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ; m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g = a0.xyz * x0.x + h.xyz * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    float t = u_time * u_speed * 0.5;
    
    vec2 pos = vUv * 3.0;
    float n = snoise(pos + t);
    n += 0.5 * snoise(pos * 2.0 - t * 0.5);

    float anillos = cos(n * (u_complexity * 10.0));

    // AQUI ESTÁ EL TRUCO DEL BLUR
    // Si u_blur es 0.0, hace un corte duro en 0.9 (líneas súper afiladas).
    // Si u_blur es 0.5, hace un gradiente que va desde 0.4 hasta 1.4 (líneas muy difuminadas y anchas).
    float lineas = smoothstep(0.9 - u_blur, 0.9 + u_blur, anillos);

    vec3 colorFinal = mix(u_color1, u_color2, lineas);

    // Opcional: el resplandor externo también puede ser afectado por el blur
    colorFinal += u_color2 * (smoothstep(0.0, 1.0 + u_blur, anillos) * 0.2);

    gl_FragColor = vec4(colorFinal, 1.0);
  }
`;export{e as config,t as fragmentShader};