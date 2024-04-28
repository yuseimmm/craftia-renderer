import { BlendModeProps } from '../BlendMode'

export const lighterComp: BlendModeProps = {
    key: 'lighterComp',
    bit: {
        func: /*glsl*/ `
        vec4 compLighter(vec4 base, vec4 front) {
            vec3 color = front.a * front.rgb + base.a * base.rgb;
            float alpha = front.a + base.a;

            return vec4(color, alpha);
        }
        `,
        main: /*glsl*/ `
        outColor = compLighter(base, front);
        `,
    },
}
