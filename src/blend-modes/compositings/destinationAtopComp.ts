import { BlendModeProps } from '../BlendMode'

export const destinationAtopComp: BlendModeProps = {
    key: 'destinationAtopComp',
    bit: {
        func: /*glsl*/ `
        vec4 compDestinationAtop(vec4 base, vec4 front) {
            vec3 color = front.a * front.rgb * (1.0f - base.a) + base.a * base.rgb * front.a;
            float alpha = front.a * (1.0f - base.a) + base.a * front.a;

            return vec4(color, alpha);
        }
        `,
        main: /*glsl*/ `
        outColor = compDestinationAtop(base, front);
        `,
    },
}
