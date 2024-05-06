import { ShaderTemplate } from '../../types/Shaders'

export const defaultFragment: ShaderTemplate = ({
    header,
    func,
    start,
    main,
} = {}) => /*glsl*/ `#version 300 es
precision highp float;

in vec2 v_textureCoord;
out vec4 outColor;

uniform sampler2D u_texture;

${header ?? ''}
${func ?? ''}

void main() {
    ${start ?? ''}
    outColor = texture(u_texture, v_textureCoord);
    ${main ?? ''}
}`
