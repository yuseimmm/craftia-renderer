import { ShaderTemplate } from '../types/Shaders'

export const fragTemplate: ShaderTemplate = ({
    header,
    func,
    start,
    main,
} = {}) => /*glsl*/ `#version 300 es
precision highp float;

in vec2 v_textureCoord;
out vec4 outColor;

uniform sampler2D u_baseTexture;
uniform sampler2D u_frontTexture;

uniform float u_alpha;

${header ?? ''}
${func ?? ''}

void main() {
    ${start ?? ''}
    vec4 base = texture(u_baseTexture, v_textureCoord);
    vec4 front = texture(u_frontTexture, v_textureCoord) * vec4(1.0f, 1.0f, 1.0f, u_alpha);
    ${main ?? ''}
}
`
