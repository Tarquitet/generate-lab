export const config = {
  id: 'vector_flow',
  name: 'Vector Wave Flow',
  type: 'surface',

  activeControls: ['speed', 'complexity', 'glow', 'blur', 'color1', 'color2'],

  palettes: [
    ['#020617', '#38BDF8'],
    ['#000000', '#FFFFFF'],
    ['#140021', '#FF4ECD'],
    ['#031525', '#7DD3FC'],
    ['#1E1B4B', '#C4B5FD'],
  ],
};

export const fragmentShader = `
uniform float u_time;
uniform float u_speed;
uniform float u_complexity;
uniform float u_glow;
uniform float u_blur;

uniform vec3 u_color1;
uniform vec3 u_color2;

varying vec2 vUv;

float ribbon(vec2 uv){

    float t =
        u_time * u_speed;

    // CURVA PRINCIPAL
    float center =
        0.5
        + sin(uv.y * 2.5 + t * 0.7)
        * 0.12

        + sin(uv.y * 6.0 - t * 0.4)
        * 0.05;

    // ANCHO VARIABLE
    float width =
        0.08
        + sin(uv.y * 4.0 + t)
        * 0.02;

    float d =
        abs(uv.x - center);

    return smoothstep(
        width + u_blur * 0.2,
        0.0,
        d
    );
}

float internalLines(vec2 uv){

    float t =
        u_time * u_speed;

    float lines =
        sin(
            uv.y * 180.0
            + t * 2.0
        );

    lines =
        abs(lines);

    lines =
        pow(lines, 18.0);

    return lines;
}

void main(){

    vec2 uv = vUv;

    // forma principal
    float shape =
        ribbon(uv);

    // lineas internas
    float lines =
        internalLines(uv);

    // fade suave en bordes
    float edgeFade =
        smoothstep(
            0.0,
            0.15,
            shape
        );

    // glow
    float glow =
        pow(shape, 2.0)
        * u_glow;

    // color base
    vec3 color =
        mix(
            u_color1,
            u_color2,
            lines
        );

    // intensidad dentro del ribbon
    color *= shape;

    // brillo elegante
    color +=
        u_color2
        * glow
        * 0.25;

    // transparencia humo
    float alpha =
        shape * 0.9;

    gl_FragColor =
        vec4(color, alpha);
}
`;
