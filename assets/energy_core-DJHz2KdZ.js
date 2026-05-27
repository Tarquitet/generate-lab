var e={id:`energy_core`,name:`Energy Core`,type:`particles`,activeControls:[`speed`,`complexity`,`glow`,`color1`,`color2`,`color3`,`color4`],palettes:[[`#02131F`,`#0066FF`,`#7DF9FF`,`#FFFFFF`],[`#0E001A`,`#6A00FF`,`#C77DFF`,`#FFFFFF`],[`#1A0500`,`#FF5A00`,`#FFD166`,`#FFF7CC`],[`#001A14`,`#00C896`,`#7FFFD4`,`#EFFFFA`],[`#140021`,`#FF006E`,`#FF87C5`,`#FFFFFF`],[`#061826`,`#4CC9F0`,`#CAF0F8`,`#FFFFFF`],[`#0A0A0A`,`#39FF14`,`#B9FF66`,`#F3FFE3`],[`#050505`,`#7928CA`,`#B892FF`,`#FFFFFF`]]},t=`
uniform float u_time;
uniform float u_speed;
uniform float u_complexity;

varying float vEnergy;

void main(){

  vec3 pos = position;

  float t =
    u_time * u_speed;

  float dist =
    length(pos.xy);

  pos.z +=
    sin(dist * 10.0 - t * 4.0)
    * 0.5;

  pos.x +=
    cos(pos.y * 4.0 + t)
    * 0.1
    * u_complexity;

  pos.y +=
    sin(pos.x * 4.0 - t)
    * 0.1
    * u_complexity;

  vEnergy =
    sin(dist * 12.0 - t * 5.0);

  vec4 mvPosition =
    modelViewMatrix *
    vec4(pos, 1.0);

  gl_PointSize =
    6.0 *
    (1.0 / -mvPosition.z);

  gl_Position =
    projectionMatrix *
    mvPosition;
}
`,n=`
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;

varying float vEnergy;

void main(){

  vec2 uv =
    gl_PointCoord - 0.5;

  float d =
    length(uv);

  float alpha =
    smoothstep(0.5, 0.0, d);

  vec3 color =
    mix(
      u_color1,
      u_color2,
      vEnergy
    );

  color =
    mix(
      color,
      u_color3,
      alpha
    );

  color +=
    u_color4
    * pow(alpha, 3.0);

  gl_FragColor =
    vec4(color, alpha);
}
`;export{e as config,n as fragmentShader,t as vertexShader};