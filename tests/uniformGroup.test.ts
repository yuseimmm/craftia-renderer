import { UniformGroup } from '../src/core/uniforms';

describe('uniformgroup test', () => {
    it('should accept constructor arguments', () => {
        const u_opacity = 0

        const uniforms = new UniformGroup({
            'float': {
                u_opacity
            }
        })

        expect(uniforms.uniforms['u_opacity'].name).toBe('u_opacity')
        expect(uniforms.uniforms['u_opacity'].type).toBe('float')
        expect(uniforms.uniforms['u_opacity'].value).toBe(u_opacity)
    })
})