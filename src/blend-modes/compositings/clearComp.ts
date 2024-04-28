import { BlendModeProps } from '../BlendMode'

export const clearComp: BlendModeProps = {
    key: 'clearComp',
    bit: {
        func: /*glsl*/ `
        vec4 compClear(vec4 base, vec4 front) {
            return vec4(0.0f);
        }
        `,
        main: /*glsl*/ `
        outColor = compClear(base, front);
        `,
    },
}
