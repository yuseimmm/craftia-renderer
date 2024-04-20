import { WebGLRenderer } from '../WebGLRenderer'
import { FrameBuffer } from './FrameBuffer'

export class FrameBufferManager {
    private renderer: WebGLRenderer

    constructor(renderer: WebGLRenderer) {
        this.renderer = renderer
    }

    public bind(frameBuffer: FrameBuffer | null) {
        if (!frameBuffer) {
            this.unbind()
            return
        }
        this.update(frameBuffer)

        const glFbo = frameBuffer.generateGLframeBuffer(this.renderer.gl)
        glFbo.bind()
    }

    public update(frameBuffer: FrameBuffer) {
        const glFbo = frameBuffer.generateGLframeBuffer(this.renderer.gl)

        if (glFbo.necessaryUpdate(frameBuffer.version)) {
            glFbo.bind()

            const texture = frameBuffer.getColorTexture()
            const glTexture = texture.generateGLtexture(this.renderer.gl)

            this.renderer.texture.update(texture, 0)

            this.renderer.gl.framebufferTexture2D(
                this.renderer.gl.FRAMEBUFFER,
                this.renderer.gl.COLOR_ATTACHMENT0,
                this.renderer.gl.TEXTURE_2D,
                glTexture.webGLTexture,
                glTexture.level
            )

            glFbo.setVersion(frameBuffer.version)
        }
    }

    public unbind() {
        this.renderer.gl.bindFramebuffer(WebGL2RenderingContext.FRAMEBUFFER, null)
    }
}
