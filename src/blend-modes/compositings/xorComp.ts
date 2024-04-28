import { BlendModeProps } from '../BlendMode'

export const xorComp: BlendModeProps = {
    key: 'xorComp',
    bit: {
        func: /*glsl*/ `
        vec4 compXOR(vec4 base, vec4 front) {
            vec3 color = front.a * front.rgb * (1.0f - base.a) + base.a * base.rgb * (1.0f - front.a);
            float alpha = front.a * (1.0f - base.a) + base.a * (1.0f - front.a);

            return vec4(color, alpha);
        }
        `,
        main: /*glsl*/ `
        outColor = compXOR(base, front);
        `,
    },
}
