import { Geometry, IndexBuffer, IndexBufferData, VertexBuferData, VertexBuffer } from '../core'

export type MeshGeometryOptions = {
    positions?: VertexBuferData
    uvs?: VertexBuferData
    indices?: IndexBufferData
    topology?: GLenum
    interleave?: boolean
}

export class MeshGeometry extends Geometry {
    constructor(options: MeshGeometryOptions = {}) {
        // prettier-ignore
        const positions = options.positions || new Float32Array([
            -1.0, 1.0,
            -1.0, -1.0,
            1.0, 1.0,
            1.0, -1.0,
        ]);
        // prettier-ignore
        const uvs = options.uvs || new Float32Array([
            0.0, 0.0,
            0.0, 1.0,
            1.0, 0.0,
            1.0, 1.0,
        ]);
        const indices = options.indices || new Int16Array([0, 1, 2, 1, 3, 2])

        const positionBuffer = new VertexBuffer(positions)
        const uvBuffer = new VertexBuffer(uvs)
        const indicesBuffer = new IndexBuffer(indices)
        const topology = options.topology || WebGL2RenderingContext.TRIANGLES

        super({
            attributes: {
                a_position: {
                    buffer: positionBuffer,
                    size: 2,
                },
                a_uv: {
                    buffer: uvBuffer,
                    size: 2,
                },
            },
            indices: indicesBuffer,
            topology,
        })

        if (options.interleave) {
            this.interleave()
        }
    }

    public setPositions(position: VertexBuferData) {
        this.getBuffer('a_position')?.setData(position)
    }
    public setUvs(uvs: VertexBuferData) {
        this.getBuffer('a_uv')?.setData(uvs)
    }
    public setIndices(indices: IndexBufferData) {
        this.getIndexBuffer()?.setData(indices)
    }
}
