import { BlendModeProps } from '../BlendMode'

export const destinationOverComp: BlendModeProps = {
    key: 'destinationOverComp',
    bit: {
        func: /*glsl*/ `
        vec4 compDestinationOver(vec4 base, vec4 front) {
            vec3 color = front.a * front.rgb * (1.0f - base.a) + base.a * base.rgb;
            float alpha = front.a * (1.0f - base.a) + base.a;

            return vec4(color, alpha);
        }
        `,
        main: /*glsl*/ `
        outColor = compDestinationOver(base, front);
        `,
    },
}
