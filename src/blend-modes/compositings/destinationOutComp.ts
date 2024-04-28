import { BlendModeProps } from '../BlendMode'

export const destinationOutComp: BlendModeProps = {
    key: 'destinationOutComp',
    bit: {
        func: /*glsl*/ `
        vec4 compDestinationOut(vec4 base, vec4 front) {
            vec3 color = base.a * base.rgb * (1.0f - front.a);
            float alpha = base.a * (1.0f - front.a);

            return vec4(color, alpha);
        }
        `,
        main: /*glsl*/ `
        outColor = compDestinationOut(base, front);
        `,
    },
}
