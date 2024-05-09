import { IndexBuffer, VertexBuffer } from '../src/buffer';
import { Geometry } from '../src/geometry';

describe('geometry. test', () => {
    it('should accept `attributes` in constructor arguments', () => {
        const positions = new Float32Array([
            -1.0, 1.0,
            -1.0, -1.0,
            1.0, 1.0,
            1.0, -1.0,
        ])

        const positionBuffer = new VertexBuffer(positions)

        const attributes = {
            a_position: {
                buffer: positionBuffer,
                size: 2,
                offset: 10,
                stride: 10
            }
        }

        const geometry = new Geometry({ attributes })

        expect(geometry.getAttribute('a_position')?.name).toBe('a_position')
        expect(geometry.getAttribute('a_position')?.size).toBe(attributes.a_position.size)
        expect(geometry.getAttribute('a_position')?.offset).toBe(attributes.a_position.offset)
        expect(geometry.getAttribute('a_position')?.stride).toBe(attributes.a_position.stride)
        expect(geometry.getBuffer('a_position')).toBe(positionBuffer)
    })

    it('should accept `indices` in constructor arguments', () => {
        const indices = new Int16Array([0, 1, 2, 1, 3, 2])
        const indicesBuffer = new IndexBuffer(indices)

        const geometry = new Geometry({ indices: indicesBuffer })

        expect(geometry.getIndexBuffer()).toBe(indicesBuffer)
    })

    it('The addition of the vertex attribute should be accepted.', () => {
        const geometry = new Geometry()

        const positions = new Float32Array([
            -1.0, 1.0,
            -1.0, -1.0,
            1.0, 1.0,
            1.0, -1.0,
        ])

        const positionBuffer = new VertexBuffer(positions)

        const a_position = {
            buffer: positionBuffer,
            size: 2,
            offset: 10,
            stride: 10
        }

        geometry.addAttribute(
            'a_position',
            a_position.buffer,
            a_position.size,
            a_position.offset,
            a_position.stride
        )

        expect(geometry.getAttribute('a_position')?.name).toBe('a_position')
        expect(geometry.getAttribute('a_position')?.size).toBe(a_position.size)
        expect(geometry.getAttribute('a_position')?.offset).toBe(a_position.offset)
        expect(geometry.getAttribute('a_position')?.stride).toBe(a_position.stride)
        expect(geometry.getBuffer('a_position')).toBe(positionBuffer)
    })
})