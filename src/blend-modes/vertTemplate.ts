import { ShaderTemplate } from '../types/Shaders'

export const vertTemplate: ShaderTemplate = () => /*glsl*/ `#version 300 es
precision highp float;
in vec2 a_position;

in vec2 a_uv;
out vec2 v_textureCoord;

uniform mat3 u_matrix;

void main() {
    v_textureCoord = a_uv;
    gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
}`
