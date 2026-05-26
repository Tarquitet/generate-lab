export const config = {
  id: 'galaxy_dust',

  name: 'Galaxy Dust',

  type: 'particles',

  activeControls: ['speed', 'complexity', 'glow', 'color1', 'color2', 'color3'],

  palettes: [
    ['#02010A', '#1B1B3A', '#7DF9FF'],
    ['#050510', '#6A00FF', '#F0ABFC'],
    ['#140A00', '#FF7B00', '#FFF3B0'],
    ['#001A14', '#00A896', '#D8FFF1'],
    ['#061826', '#4CC9F0', '#F1FAFF'],
    ['#140021', '#FF006E', '#FFD6FF'],
    ['#050505', '#555555', '#FFFFFF'],
    ['#031926', '#5CE1E6', '#D8FFF1'],
  ],
};

export const vertexShader = `
  uniform float u_time;
  uniform float u_speed;
  uniform float u_complexity;
  uniform float u_glow;

  varying float vDepth;

  void main() {

    vec3 pos = position;

    float t =
      u_time * u_speed;

    float radius =
      length(pos.xy);

    float angle =
      atan(pos.y, pos.x);

    angle +=
      radius * 0.5;

    pos.x =
      cos(angle + t * 0.2)
      * radius;

    pos.y =
      sin(angle + t * 0.2)
      * radius;

    pos.z +=
      sin(radius * 8.0 + t)
      * 0.5;

    vDepth = pos.z;

    vec4 mvPosition =
      modelViewMatrix *
      vec4(pos, 1.0);

    gl_PointSize =
      u_glow *
      (4.0 / -mvPosition.z);

    gl_Position =
      projectionMatrix *
      mvPosition;
  }
`;

export const fragmentShader = `
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;

  varying float vDepth;

  void main() {

    vec2 uv =
      gl_PointCoord - 0.5;

    float d =
      length(uv);

    float alpha =
      smoothstep(
        0.5,
        0.0,
        d
      );

    vec3 color =
      mix(
        u_color1,
        u_color2,
        vDepth * 0.5 + 0.5
      );

    color =
      mix(
        color,
        u_color3,
        alpha
      );

    gl_FragColor =
      vec4(color, alpha);
  }
`;
