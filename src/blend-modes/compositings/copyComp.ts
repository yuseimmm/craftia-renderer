import { BlendModeProps } from '../BlendMode'

export const copyComp: BlendModeProps = {
    key: 'copyComp',
    bit: {
        func: /*glsl*/ `
        vec4 compCopy(vec4 base, vec4 front) {
            return front;
        }
        `,
        main: /*glsl*/ `
        outColor = compCopy(base, front);
        `,
    },
}
