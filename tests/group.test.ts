import { RasterLayer } from '../src/layer';
import { Group } from '../src/group';
import { Vec2 } from '../src/units';
import { Texture } from '../src/textures';

describe('group test', () => {
    it('should accept constructor arguments', () => {
        const translation = new Vec2(100, 500)
        const blendMode = "multiply"
        const opacity = 0.1
        const visible = false

        const smartLayer = new Group({
            translation,
            blendMode,
            opacity,
            visible
        });

        expect(smartLayer.translation).toBe(translation)
        expect(smartLayer.blendMode).toBe(blendMode)
        expect(smartLayer.opacity).toBe(opacity)
        expect(smartLayer.visible).toBe(visible)
    })
})