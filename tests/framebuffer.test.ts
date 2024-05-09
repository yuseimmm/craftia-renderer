import { FrameBuffer } from '../src/frameBuffer';
import { Vec2 } from '../src/units';

describe('framebuffer. test', () => {
    it('When the size of the frame buffer is changed, the size of the texture must also be changed.', () => {
        const frameBuffer = new FrameBuffer(100, 100)
        const width = 200
        const height = 200

        frameBuffer.resize(new Vec2(width, height))

        expect(frameBuffer.getColorTexture().width).toBe(width)
        expect(frameBuffer.getColorTexture().height).toBe(height)
    })

    it('Geometry textures should be detached', () => {
        const frameBuffer = new FrameBuffer(100, 100)

        const detachedTexture = frameBuffer.detachColorTexture()

        expect(frameBuffer.getColorTexture()).not.toBe(detachedTexture)
    })
})