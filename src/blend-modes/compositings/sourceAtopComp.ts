import { BlendModeProps } from '../BlendMode'

export const sourceAtopComp: BlendModeProps = {
    key: 'sourceAtopComp',
    bit: {
        func: /*glsl*/ `
        vec4 compSourceAtop(vec4 base, vec4 front) {
            vec3 color = front.a * front.rgb * base.a + base.rgb * (1.0f - front.a);
            float alpha = front.a * base.a + base.a * (1.0f - front.a);

            return vec4(color, alpha);
        }
        `,
        main: /*glsl*/ `
        outColor = compSourceAtop(base, front);
        `,
    },
}
