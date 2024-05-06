import { Shader, UniformGroup, Vec4 } from '../../core'
import { defaultFragment } from '../shaders/defaultFragment'
import { defaultVertex } from '../shaders/defaultVertex'

export const stroke = Shader.from(
    defaultVertex(),
    defaultFragment({
        header: /*glsl*/ `
        uniform vec4 u_color;
        uniform int u_width;
        uniform bool u_horizontal;
        `,
        start: /*glsl*/ `
        vec2 onePixel = vec2(1.0f) / vec2(textureSize(u_texture, 0));
        `,
        main: /*glsl*/ `
    bool contained = false;
    bool vacancy = false;

    for(int i = -u_width; i <= u_width; i++) {
        vec2 offset = vec2(float(i), float(0)) * onePixel;
        vec4 sampleColor = texture(u_texture, v_textureCoord + offset);

        contained = sampleColor.a > 0.2f ? true : contained;
    }

    for(int i = -u_width; i <= u_width; i++) {
        vec2 offset = vec2(float(0), float(i)) * onePixel;
        vec4 sampleColor = texture(u_texture, v_textureCoord + offset);

        contained = sampleColor.a > 0.2f ? true : contained;
    }

    outColor = (contained) ? u_color : vec4(0.0f);
        `,
    }),
    new UniformGroup({
        int: {
            u_texture: 0,
            u_horizontal: 1,
            u_width: 10,
        },
        'mat3x3<float>': {
            u_matrix: [1, 0, 0, 0, -1, 0, 0, 0, 1],
        },
        'vec4<float>': {
            u_color: new Vec4(0, 0, 0, 1),
        },
    })
)
