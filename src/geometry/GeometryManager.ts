import { WebGLRenderer } from '../WebGLRenderer'
import { Geometry } from './Geometry'
export class GeometryManager {
    private _renderer: WebGLRenderer
    public activeGeometry: Geometry | null
    constructor(renderer: WebGLRenderer) {
        this._renderer = renderer
        this.activeGeometry = null
    }

    public update(geometry: Geometry) {
        const vao = geometry.generateVao(this._renderer.gl)

        vao.bind()

        if (vao.requiresUpdate(geometry.version)) {
            for (let i = 0; i < geometry.attributes.length; i++) {
                const attr = geometry.attributes[i]
                const buffer = geometry.buffers[attr.buffer]

                if (buffer) {
                    this._renderer.buffer.bind(buffer)
                    this._renderer.attribute.bind(attr)
                }
            }

            if (geometry.indexBuffer) {
                this._renderer.buffer.bind(geometry.indexBuffer)
            }
        } else {
            geometry.buffers.forEach((b) => {
                this._renderer.buffer.update(b)
            })
            geometry.attributes.forEach((a) => {
                this._renderer.attribute.update(a)
            })
        }

        vao.setVersion(geometry.version)
        vao.unbind()
    }

    public bind(geometry: Geometry) {
        this.activeGeometry = geometry
        this.update(geometry)
        geometry.generateVao(this._renderer.gl).bind()
    }

    public unbind() {
        this._renderer.gl.bindVertexArray(null)
    }

    /**
     * It draws using the geometry index buffer.
     * @param mode a GLenum specifying the type primitive to render.
     * @param size a GLsizei specifying the number of elements of the bound element array buffer to be rendered.
     * @param start a GLintptr specifying a byte offset in the element array buffer.
     * Must be a valid multiple of the size of the given type.
     */
    public drawIndex(size?: number, start?: number) {
        const geometry = this.activeGeometry
        const gl2 = this._renderer.gl

        if (!geometry) {
            console.warn('No geometry is bound. Please bind the geometry first.')
            return
        }
        if (!geometry.indexBuffer) {
            console.warn('Geometry index is not defined.First define the index of the geometry.')
            return
        }

        const byteSize = geometry.indexBuffer.data.BYTES_PER_ELEMENT

        const type =
            byteSize === 1
                ? gl2.UNSIGNED_BYTE
                : byteSize === 2
                  ? gl2.UNSIGNED_SHORT
                  : gl2.UNSIGNED_INT

        gl2.drawElements(
            geometry.topology,
            size || geometry.indexBuffer.data.length,
            type,
            (start || 0) * byteSize
        )
    }
}
