import { Shader } from '../core/shader'
import { type ShaderOptions } from '../types/Shaders'
import { darkenBlend } from './blendings/darkenBlend'
import { hardLightBlend } from './blendings/hardLightBlend'
import { multiplyBlend } from './blendings/multiplyBlend'
import { normalBlend } from './blendings/normalBlend'
import { overlayBlend } from './blendings/overlayBlend'
import { screenBlend } from './blendings/screenBlend'
import { sourceOverComp } from './compositings/sourceOverComp'
import { fragTemplate } from './fragTemplate'
import { vertTemplate } from './vertTemplate'
import { UniformGroup } from '../core/uniforms/UniformGroup'
import { colorBlend } from './blendings/colorBlend'
import { colorBurnBlend } from './blendings/colorBurnBlend'
import { colorDodgeBlend } from './blendings/colorDodgeBlend'
import { differenceBlend } from './blendings/differenceBlend'
import { exclusionBlend } from './blendings/exclusionBlend'
import { hueBlend } from './blendings/hueBlend'
import { lightenBlend } from './blendings/lightenBlend'
import { luminosityBlend } from './blendings/luminosityBlend'
import { saturationBlend } from './blendings/saturationBlend'
import { softLightBlend } from './blendings/softLightBlend'
import { clearComp } from './compositings/clearComp'
import { destinationAtopComp } from './compositings/destinationAtopComp'
import { destinationComp } from './compositings/destinationComp'
import { destinationInComp } from './compositings/destinationInComp'
import { destinationOutComp } from './compositings/destinationOutComp'
import { destinationOverComp } from './compositings/destinationOverComp'
import { sourceAtopComp } from './compositings/sourceAtopComp'
import { sourceInComp } from './compositings/sourceInComp'
import { sourceOutComp } from './compositings/sourceOutComp'
import { xorComp } from './compositings/xorComp'
import { lighterComp } from './compositings/lighterComp'
import { linearBurnBlend } from './blendings/linearBurnBlend'
import { linearDodgeBlend } from './blendings/linearDodgeBlend'
import { linearLightBlend } from './blendings/linearLightBlend'
import { pinLightBlend } from './blendings/pinLightBlend'
import { vividLightBlend } from './blendings/vividLightBlend'
import { hardMixBlend } from './blendings/hardMixBlend'
import { colorDarkerBlend } from './blendings/colorDarkerBlend'
import { colorLighterBlend } from './blendings/colorLighterBlend'
import { subtractBlend } from './blendings/subtractBlend'
import { divideBlend } from './blendings/divideBlend'
import { mat3 } from 'gl-matrix'

export type BlendModeProps = {
    key: string
    bit: ShaderOptions
    deps?: BlendModeProps[]
}

let uid = 0

export class BlendMode {
    static readonly defaultMatrix: mat3 = [1, 0, 0, 0, -1, 0, 0, 0, 1]

    readonly shader
    readonly id: number

    constructor(blending: BlendModeProps, compositing: BlendModeProps) {
        const bit: ShaderOptions = {
            header: `
            ${blending.bit.header ?? ''}
            ${compositing.bit.header ?? ''}`,

            func: /*glsl*/ `
            ${blending.bit.func ?? ''}
            ${compositing.bit.func ?? ''}
        
            vec4 blend(vec4 base, vec4 front){
                ${blending.bit.start ?? ''}
                vec4 outColor;
                ${blending.bit.main ?? ''}
                return outColor;
            }
        
            vec4 composite(vec4 base, vec4 front){
                ${compositing.bit.start ?? ''}
                vec4 outColor;
                ${compositing.bit.main ?? ''}
                return outColor;
            }`,

            main: /*glsl*/ `
            outColor = blend(base, front);
            outColor = composite(base, outColor);
            `,
        }

        this.shader = Shader.from(
            vertTemplate(),
            fragTemplate(bit),
            new UniformGroup({
                float: {
                    u_alpha: 1.0,
                },
                int: {
                    u_baseTexture: 0,
                    u_frontTexture: 1,
                },
                'mat3x3<float>': {
                    u_matrix: BlendMode.defaultMatrix,
                },
            })
        )

        this.id = uid++
    }
}

// prettier-ignore
export const BLEND_MODES = {
    'normal': new BlendMode(normalBlend, sourceOverComp),

    'darken': new BlendMode(darkenBlend, sourceOverComp),
    'multiply': new BlendMode(multiplyBlend, sourceOverComp),
    'color-burn': new BlendMode(colorBurnBlend, sourceOverComp),
    'linear-burn': new BlendMode(linearBurnBlend, sourceOverComp),
    'darker-color': new BlendMode(colorDarkerBlend, sourceOverComp),

    'lighten': new BlendMode(lightenBlend, sourceOverComp),
    'screen': new BlendMode(screenBlend, sourceOverComp),
    'color-dodge': new BlendMode(colorDodgeBlend, sourceOverComp),
    'linear-dodge': new BlendMode(linearDodgeBlend, sourceOverComp),
    'lighter-color': new BlendMode(colorLighterBlend, sourceOverComp),

    'overlay': new BlendMode(overlayBlend, sourceOverComp),
    'soft-light': new BlendMode(softLightBlend, sourceOverComp),
    'hard-light': new BlendMode(hardLightBlend, sourceOverComp),
    'vivid-light': new BlendMode(vividLightBlend, sourceOverComp),
    'inear-light': new BlendMode(linearLightBlend, sourceOverComp),
    'pin-light': new BlendMode(pinLightBlend, sourceOverComp),
    'hard-mix': new BlendMode(hardMixBlend, xorComp),

    'difference': new BlendMode(differenceBlend, sourceOverComp),
    'exclusion': new BlendMode(exclusionBlend, sourceOverComp),
    'subtract': new BlendMode(subtractBlend, sourceOverComp),
    'divide': new BlendMode(divideBlend, sourceOverComp),

    'hue': new BlendMode(hueBlend, sourceOverComp),
    'saturation': new BlendMode(saturationBlend, sourceOverComp),
    'luminosity': new BlendMode(luminosityBlend, sourceOverComp),
    'color': new BlendMode(colorBlend, sourceOverComp),

    'clear': new BlendMode(normalBlend, clearComp),
    'destination-atop': new BlendMode(normalBlend, destinationAtopComp),
    'destination': new BlendMode(normalBlend, destinationComp),
    'destination-in': new BlendMode(normalBlend, destinationInComp),
    'destination-out': new BlendMode(normalBlend, destinationOutComp),
    'destination-over': new BlendMode(normalBlend, destinationOverComp),
    'source-atop': new BlendMode(normalBlend, sourceAtopComp),
    'source-in': new BlendMode(normalBlend, sourceInComp),
    'source-out': new BlendMode(normalBlend, sourceOutComp),
    'lighter': new BlendMode(normalBlend, lighterComp),
    'xor': new BlendMode(normalBlend, xorComp),

    //Add other combinations if needed.
}
