import { mat3 } from 'gl-matrix';
import { SmartLayer } from '../src/layer'
import { Texture } from '../src/core/textures';
import { Vec2 } from '../src/core/units';

describe('smartLayer test', () => {
    it('should accept constructor arguments', () => {
        const transform: mat3 = [
            2, 0, 0,
            0, 2, 0,
            0, 0, 1
        ]

        const texture = new Texture()
        const scaling = new Vec2(2, 2)
        const translation = new Vec2(100, 500)
        const rotation = 45 * (Math.PI / 180)
        const blendMode = "multiply"
        const opacity = 0.1
        const visible = false

        const smartLayer = new SmartLayer({
            texture,
            transform,
            scaling,
            translation,
            rotation,
            blendMode,
            opacity,
            visible
        });

        expect(smartLayer.texture).toBe(texture)
        expect(smartLayer.translation).toBe(translation)
        expect(smartLayer.blendMode).toBe(blendMode)
        expect(smartLayer.opacity).toBe(opacity)
        expect(smartLayer.visible).toBe(visible)
    })
})