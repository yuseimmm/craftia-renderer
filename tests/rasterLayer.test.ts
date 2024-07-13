import { RasterLayer } from '../src/layer'
import { Texture } from '../src/textures';
import { Vec2 } from '../src/units';

describe('rasterLayer test', () => {
    it('should accept constructor arguments', () => {
        const texture = new Texture()
        const translation = new Vec2(100, 500)
        const blendMode = "multiply"
        const opacity = 0.1
        const visible = false

        const rasterLayer = new RasterLayer({
            texture,
            translation,
            blendMode,
            opacity,
            visible
        });

        expect(rasterLayer.texture).toBe(texture)
        expect(rasterLayer.translation).toBe(translation)
        expect(rasterLayer.blendMode).toBe(blendMode)
        expect(rasterLayer.opacity).toBe(opacity)
        expect(rasterLayer.visible).toBe(visible)
    })
})