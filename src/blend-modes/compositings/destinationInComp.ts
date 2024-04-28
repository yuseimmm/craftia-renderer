import { BlendModeProps } from '../BlendMode'

export const destinationInComp: BlendModeProps = {
    key: 'destinationInComp',
    bit: {
        func: /*glsl*/ `
        vec4 compDestinationIn(vec4 base, vec4 front) {
            vec3 color = base.a * base.rgb * front.a;
            float alpha = base.a * front.a;

            return vec4(color, alpha);
        }
        `,
        main: /*glsl*/ `
        outColor = compDestinationIn(base, front);
        `,
    },
}
