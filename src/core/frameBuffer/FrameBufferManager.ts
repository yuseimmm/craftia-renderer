import { WebGLRenderer } from '../WebGLRenderer'
import { Vec4 } from '../units'
import { FrameBuffer } from './FrameBuffer'

export class FrameBufferManager {
    private _renderer: WebGLRenderer

    constructor(renderer: WebGLRenderer) {
        this._renderer = renderer
    }

    public bind(frameBuffer: FrameBuffer | null) {
        if (!frameBuffer) {
            this.unbind()
            return
        }
        this.update(frameBuffer)

        const glFbo = frameBuffer.generateGLframeBuffer(this._renderer.gl)
        glFbo.bind()
    }

    public update(frameBuffer: FrameBuffer) {
        const glFbo = frameBuffer.generateGLframeBuffer(this._renderer.gl)

        if (glFbo.requiresUpdate(frameBuffer.version)) {
            glFbo.bind()

            const texture = frameBuffer.getColorTexture()
            const glTexture = texture.generateGLtexture(this._renderer.gl)

            this._renderer.texture.update(texture, 0)

            this._renderer.gl.framebufferTexture2D(
                this._renderer.gl.FRAMEBUFFER,
                this._renderer.gl.COLOR_ATTACHMENT0,
                this._renderer.gl.TEXTURE_2D,
                glTexture.webGLTexture,
                glTexture.level
            )

            glFbo.setVersion(frameBuffer.version)
        }
    }

    public clear(frameBuffer: FrameBuffer, color: Vec4 = new Vec4(0, 0, 0, 0)) {
        this.bind(frameBuffer)
        this._renderer.clear(color)
        this.unbind()
    }

    public readPixcels(frameBuffer: FrameBuffer) {
        const u8 = new Uint8Array(
            this._renderer.gl.drawingBufferWidth * this._renderer.gl.drawingBufferHeight * 4
        )

        this.bind(frameBuffer)
        this._renderer.gl.readPixels(
            0,
            0,
            frameBuffer.width,
            frameBuffer.height,
            WebGL2RenderingContext.RGBA,
            WebGL2RenderingContext.UNSIGNED_BYTE,
            u8
        )
        return u8
    }

    public unbind() {
        this._renderer.gl.bindFramebuffer(WebGL2RenderingContext.FRAMEBUFFER, null)
    }
}
