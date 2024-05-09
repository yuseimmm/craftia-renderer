import { Texture, Vec2 } from '../src/core';
import { RasterLayer } from '../src/layer';
import { Group } from '../src/group';

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

    it('The update flag of the children should be detected.', () => {
        const layer = new RasterLayer({
            texture: new Texture()
        })

        const group = new Group()

        group.setChildren([layer])

        layer.refreshUpdate(true)

        expect(group.requiresUpdate()).toBe(true)
    })
})