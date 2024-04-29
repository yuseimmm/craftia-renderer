import { WebGLRenderer } from '../WebGLRenderer'
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

        if (glFbo.necessaryUpdate(frameBuffer.version)) {
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

    public unbind() {
        this._renderer.gl.bindFramebuffer(WebGL2RenderingContext.FRAMEBUFFER, null)
    }
}
