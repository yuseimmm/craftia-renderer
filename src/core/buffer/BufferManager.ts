import { WebGLRenderer } from '../WebGLRenderer'
import { AbstractBuffer } from './AbstractBuffer'
import { BufferType } from './GLBuffer'

export class BufferManager {
    private readonly renderer: WebGLRenderer

    constructor(renderer: WebGLRenderer) {
        this.renderer = renderer
    }
    /**
     * Complete the upload of data to the GPU.
     * However, if the upload is not flagged, the process is skipped.
     * @param buffer
     */
    public update(buffer: AbstractBuffer) {
        const glBuffer = buffer.generateGLBuffer(this.renderer.gl)
        if (glBuffer.necessaryUpdate(buffer.version)) {
            glBuffer.setData(buffer.version, buffer.data)
        }
    }
    /**
     * Bind buffers.
     * @param buffer
     */
    public bind(buffer: AbstractBuffer) {
        this.update(buffer)
        const glbuffer = buffer.generateGLBuffer(this.renderer.gl)
        glbuffer.bind()
    }
    /**
     * Unbind the buffer.
     * @param type
     */
    public unbind(type: BufferType) {
        this.renderer.gl.bindBuffer(type, null)
    }
}
