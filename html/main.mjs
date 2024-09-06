import { animate, createDrawState } from "./boilerplate.mjs";

const gl = document.getElementById('canvas').getContext('webgl2');

  const data = Float32Array.of( // 4 vertices with 4 components each
    -0.7,  0.7, 0, 1,
    -0.7, -0.7, 0, 0,
     0.7, -0.7, 1, 0,
     0.7,  0.7, 1, 1
  );
  const indices = Uint16Array.of( // 2 triangles
    0, 1, 2,
    0, 2, 3
  );

  const state = createDrawState(gl, {
    attributes: {
      a_pos_uv: {data, size: 4}
    },
    indices,
    vert: `
      uniform float u_time;
      in vec4 a_pos_uv;
      out vec4 v_color;

      void main() {
        vec2 rotation = vec2(sin(u_time), cos(u_time));
        v_color = vec4(a_pos_uv.zw, 0.5 + rotation.x * 0.5, 1);
        gl_Position = vec4(mat2(rotation.y, -rotation.x, rotation) * a_pos_uv.xy, 0, 1);
      }`,
    frag: `
      precision mediump float;
      in vec4 v_color;
      out vec4 color;

      void main() {
        color = v_color;
      }`
  });

  state.use();

 animate(gl, () => {
    gl.uniform1f(state.uniforms.u_time, performance.now() / 1000);
    state.draw();
  });
