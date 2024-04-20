import { BlendModeProps } from '../BlendMode'

export const sourceOverComp: BlendModeProps = {
    key: 'sourceOverComp',
    bit: {
        func: /*glsl*/ `
        vec4 compSourceOver(vec4 base, vec4 front) {
            vec3 color = front.a * front.rgb + base.a * base.rgb * (1.0f - front.a);
            float alpha = front.a + base.a * (1.0f - front.a);
            return vec4(color.rgb, alpha);
        }`,
        main: /*glsl*/ `
        outColor = compSourceOver(base, front);
        `,
    },
}
