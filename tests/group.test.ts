import { Group } from '../src/group';
import { Vec2 } from '../src/units';

describe('group test', () => {
    it('should accept constructor arguments', () => {
        const translation = new Vec2(100, 500)
        const blendMode = "multiply"
        const opacity = 0.1
        const visible = false

        const group = new Group({
            translation,
            blendMode,
            opacity,
            visible
        });

        expect(group.translation).toBe(translation)
        expect(group.blendMode).toBe(blendMode)
        expect(group.opacity).toBe(opacity)
        expect(group.visible).toBe(visible)
    })
})