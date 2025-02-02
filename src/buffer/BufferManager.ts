import { valueof } from '../types'
import { WebGLRenderer } from '../WebGLRenderer'
import { AbstractBuffer } from './AbstractBuffer'
import { BUFFER_TYPE } from './GLBuffer'

export class BufferManager {
    private _renderer: WebGLRenderer

    constructor(renderer: WebGLRenderer) {
        this._renderer = renderer
    }

    /**
     * Bind buffers.
     * @param buffer
     */
    public bind(buffer: AbstractBuffer) {
        this.update(buffer)
        const glbuffer = buffer.generateGLBuffer(this._renderer.gl)
        glbuffer.bind()
    }

    /**
     * Complete the upload of data to the GPU.
     * However, if the upload is not flagged, the process is skipped.
     * @param buffer
     */
    public update(buffer: AbstractBuffer) {
        const glBuffer = buffer.generateGLBuffer(this._renderer.gl)
        if (glBuffer.requiresUpdate(buffer.version)) {
            glBuffer.setData(buffer.version, buffer.data)
        }
    }

    /**
     * Unbind the buffer.
     * @param type
     */
    public unbind(type: valueof<typeof BUFFER_TYPE>) {
        this._renderer.gl.bindBuffer(type, null)
    }
}
