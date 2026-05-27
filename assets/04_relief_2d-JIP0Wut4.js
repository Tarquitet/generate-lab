var e={id:`relief_2d`,name:`Relief Topography (2.5D)`,type:`surface`,activeControls:[`speed`,`complexity`,`blur`,`glow`,`color1`,`color2`,`color3`],palettes:[[`#0B132B`,`#3A506B`,`#C6D8D3`],[`#2D1B12`,`#A47551`,`#F1D6B8`],[`#120C0C`,`#5C1A1B`,`#FF784F`],[`#02131F`,`#3DA5D9`,`#E0FBFC`],[`#081C15`,`#2D6A4F`,`#D8F3DC`],[`#111111`,`#666666`,`#F5F5F5`],[`#140021`,`#4B0082`,`#FF4ECD`]]},t=`
uniform float u_time;
uniform float u_speed;
uniform float u_complexity;
uniform float u_blur;
uniform float u_glow; // Usaremos glow para intensificar la luz ambiente
uniform vec3 u_color1; // Color base (sombras)
uniform vec3 u_color2; // Color intermedio (luz suave)
uniform vec3 u_color3; // Color alto (luz fuerte)
varying vec2 vUv;

// --- Función de Ruido de Perlin (copiada de los otros shaders) ---
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
m = m * m ; m = m * m ;
vec3 x = 2.0 * fract(p * C.www) - 1.0;
vec3 h = abs(x) - 0.5;
vec3 a0 = x - floor(x + 0.5);
vec3 g = a0.xyz * x0.x + h.xyz * x0.y;
g.yz = a0.yz * x12.xz + h.yz * x12.yw;
return 130.0 * dot(m, g);
}
// --- Fin de la función de ruido ---

void main() {
    float t = u_time * u_speed * 0.3;
    vec2 pos = vUv * u_complexity * 2.0; // Escalamos el UV con la complejidad

    // Generamos el mapa de altura base con ruido
    float n = snoise(pos + t);
    n += 0.5 * snoise(pos * 2.0 - t * 0.5);
    n += 0.25 * snoise(pos * 4.0 + t * 0.3);
    // Normalizamos la altura entre 0 y 1
    float height = n * 0.5 + 0.5;

    // Creamos una máscara de forma suave basada en la altura y el blur
    // Define qué áreas son "altas" y cuánto de definidas están
    float edgeThreshold = 0.5; // Umbral base para considerar "altura"
    float shape = smoothstep(edgeThreshold - u_blur * 0.5, edgeThreshold + u_blur * 0.5, height);

    // Calculamos normales aproximadas para la iluminación (simplificado)
    // Derivadas para estimar pendiente
    float eps = 0.01;
    float h_x = snoise(pos + vec2(eps, 0.0) + t);
    float h_y = snoise(pos + vec2(0.0, eps) + t);
    float dx = (snoise(pos + vec2(eps, 0.0) + t) - n) / eps;
    float dy = (snoise(pos + vec2(0.0, eps) + t) - n) / eps;

    // Vector normal simplificado (sin normalizar para ahorrar cálculos)
    vec3 normal = normalize(vec3(-dx, -dy, 1.0));

    // Dirección de la luz (apuntando hacia abajo y ligeramente a la izquierda)
    vec3 lightDir = normalize(vec3(-0.3, -0.3, 1.0));

    // Calculamos la intensidad de la luz (difusa)
    float diff = clamp(dot(normal, lightDir), 0.0, 1.0);

    // Mezclamos colores basados en la altura y la luz
    // Primero, decidimos la base según la altura
    vec3 colorBase = mix(u_color1, u_color2, height);
    colorBase = mix(colorBase, u_color3, height * height); // Resaltar áreas altas

    // Luego, aplicamos el efecto de la luz difusa
    vec3 litColor = mix(colorBase * 0.8, colorBase * (1.0 + diff * 0.5), diff);

    // Aplicamos un poco de "brillo ambiental" global usando el control 'glow'
    vec3 ambientLight = u_glow * 0.02 * vec3(1.0, 1.0, 1.0);
    litColor += ambientLight;

    // Finalmente, usamos la máscara de forma para limitar el área donde se aplica el efecto
    vec3 finalColor = mix(u_color1 * 0.7, litColor, shape); // Fondo oscuro

    gl_FragColor = vec4(finalColor, 1.0);
}
`;export{e as config,t as fragmentShader};