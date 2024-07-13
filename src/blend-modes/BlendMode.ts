import { Shader } from '../shader'
import { UniformGroup } from '../uniforms'
import { darkenBlend } from './darkenBlend'
import { hardLightBlend } from './hardLightBlend'
import { multiplyBlend } from './multiplyBlend'
import { normalBlend } from './normalBlend'
import { overlayBlend } from './overlayBlend'
import { screenBlend } from './screenBlend'
import { colorBlend } from './colorBlend'
import { colorBurnBlend } from './colorBurnBlend'
import { colorDodgeBlend } from './colorDodgeBlend'
import { differenceBlend } from './differenceBlend'
import { exclusionBlend } from './exclusionBlend'
import { hueBlend } from './hueBlend'
import { lightenBlend } from './lightenBlend'
import { luminosityBlend } from './luminosityBlend'
import { saturationBlend } from './saturationBlend'
import { softLightBlend } from './softLightBlend'
import { linearBurnBlend } from './linearBurnBlend'
import { linearDodgeBlend } from './linearDodgeBlend'
import { linearLightBlend } from './linearLightBlend'
import { pinLightBlend } from './pinLightBlend'
import { vividLightBlend } from './vividLightBlend'
import { hardMixBlend } from './hardMixBlend'
import { colorDarkerBlend } from './colorDarkerBlend'
import { colorLighterBlend } from './colorLighterBlend'
import { subtractBlend } from './subtractBlend'
import { divideBlend } from './divideBlend'
import { mat3 } from 'gl-matrix'

export type BlendModeProps = {
    key: string
    bit: {
        header?: string
        func?: string
        start?: string
        main?: string
    }
}

export type BlendModeShader = Shader<
    UniformGroup<{
        u_baseTexture: {
            type: 'int'
            value: number
        }
        u_frontTexture: {
            type: 'int'
            value: number
        }
        u_alpha: {
            type: 'float'
            value: number
        }
        u_matrix: {
            type: 'mat3x3<float>'
            value: mat3
        }
    }>
>

const createBlendModeShader = (blendMode: BlendModeProps): BlendModeShader => {
    const vert = /*glsl*/ `#version 300 es
    precision highp float;
    in vec2 a_position;
    
    in vec2 a_uv;
    out vec2 v_textureCoord;
    
    uniform mat3 u_matrix;

    void main() {
        v_textureCoord = a_uv;
        gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
    }`

    const frag = /*glsl*/ `#version 300 es
    precision highp float;

    in vec2 v_textureCoord;
    out vec4 outColor;

    uniform sampler2D u_baseTexture;
    uniform sampler2D u_frontTexture;

    uniform float u_alpha;

    ${blendMode.bit.header ?? ''}
    ${blendMode.bit.func ?? ''}

    void main() {

        vec4 base = texture(u_baseTexture, v_textureCoord);

        vec4 front_texture = texture(u_frontTexture, v_textureCoord);
        vec4 front = vec4(front_texture.rgb, front_texture.a * u_alpha);

        float blend = front.a + base.a * (1.0f - front.a);

        ${blendMode.bit.main ?? ''}
    }
    `
    return Shader.from(
        vert,
        frag,
        new UniformGroup({
            u_baseTexture: {
                type: 'int',
                value: 0,
            },
            u_frontTexture: {
                type: 'int',
                value: 1,
            },
            u_alpha: {
                type: 'float',
                value: 1.0,
            },
            u_matrix: {
                type: 'mat3x3<float>',
                value: [1, 0, 0, 0, -1, 0, 0, 0, 1],
            },
        })
    )
}

// prettier-ignore
export const BLEND_MODES = {
    'normal': createBlendModeShader(normalBlend),

    'darken': createBlendModeShader(darkenBlend),
    'multiply': createBlendModeShader(multiplyBlend),
    'color-burn': createBlendModeShader(colorBurnBlend),
    'linear-burn': createBlendModeShader(linearBurnBlend),
    'darker-color': createBlendModeShader(colorDarkerBlend),

    'lighten': createBlendModeShader(lightenBlend),
    'screen': createBlendModeShader(screenBlend),
    'color-dodge': createBlendModeShader(colorDodgeBlend),
    'linear-dodge': createBlendModeShader(linearDodgeBlend),
    'lighter-color': createBlendModeShader(colorLighterBlend),

    'overlay': createBlendModeShader(overlayBlend),
    'soft-light': createBlendModeShader(softLightBlend),
    'hard-light': createBlendModeShader(hardLightBlend),
    'vivid-light': createBlendModeShader(vividLightBlend),
    'inear-light': createBlendModeShader(linearLightBlend),
    'pin-light': createBlendModeShader(pinLightBlend),
    'hard-mix': createBlendModeShader(hardMixBlend),

    'difference': createBlendModeShader(differenceBlend),
    'exclusion': createBlendModeShader(exclusionBlend),
    'subtract': createBlendModeShader(subtractBlend),
    'divide': createBlendModeShader(divideBlend),

    'hue': createBlendModeShader(hueBlend),
    'saturation': createBlendModeShader(saturationBlend),
    'luminosity': createBlendModeShader(luminosityBlend),
    'color': createBlendModeShader(colorBlend),
}
