export const config = {
  id: 'matrix_rain',

  name: 'Matrix Rain',

  type: 'particles',

  activeControls: ['speed', 'complexity', 'glow', 'color1', 'color2'],

  palettes: [
    ['#001100', '#39FF14'],
    ['#00131A', '#00E5FF'],
    ['#120018', '#C77DFF'],
    ['#1A0000', '#FF3B3B'],
    ['#140D00', '#FFB000'],
    ['#050505', '#F5F5F5'],
    ['#031926', '#5CE1E6'],
    ['#0A0A0A', '#B9FF66'],
  ],
};

export const vertexShader = `
uniform float u_time;
uniform float u_speed;

varying float vAlpha;

void main(){

  vec3 pos = position;

  float t =
    u_time * u_speed;

  pos.y =
    mod(
      pos.y - t * 2.0,
      10.0
    ) - 5.0;

  vAlpha =
    1.0 - abs(pos.y) / 5.0;

  vec4 mvPosition =
    modelViewMatrix *
    vec4(pos, 1.0);

  gl_PointSize =
    3.0 *
    (1.0 / -mvPosition.z);

  gl_Position =
    projectionMatrix *
    mvPosition;
}
`;

export const fragmentShader = `
uniform vec3 u_color1;
uniform vec3 u_color2;

varying float vAlpha;

void main(){

  vec2 uv =
    gl_PointCoord - 0.5;

  float d =
    length(uv);

  float alpha =
    smoothstep(
      0.5,
      0.0,
      d
    ) * vAlpha;

  vec3 color =
    mix(
      u_color1,
      u_color2,
      vAlpha
    );

  gl_FragColor =
    vec4(color, alpha);
}
`;
