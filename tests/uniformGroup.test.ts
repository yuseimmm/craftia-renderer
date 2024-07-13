import { UniformGroup } from '../src/uniforms';

describe('uniformgroup test', () => {
    it('should accept constructor arguments', () => {
        const u_opacity = 0

        const uniforms = new UniformGroup({
            "u_opacity": {
                type: "float",
                value: u_opacity
            }
        })

        expect(uniforms.uniforms['u_opacity'].name).toBe('u_opacity')
        expect(uniforms.uniforms['u_opacity'].type).toBe('float')
        expect(uniforms.uniforms['u_opacity'].value).toBe(u_opacity)
    })
})