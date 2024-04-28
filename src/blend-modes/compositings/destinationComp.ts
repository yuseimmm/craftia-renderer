import { BlendModeProps } from '../BlendMode'

export const destinationComp: BlendModeProps = {
    key: 'destinationComp',
    bit: {
        func: /*glsl*/ `
        vec4 compDestination(vec4 base, vec4 front) {
            return vec4(0.0f);
        }
        `,
        main: /*glsl*/ `
        outColor = compDestination(base, front);
        `,
    },
}
