import { mat3 } from 'gl-matrix'

const multiply = (x: number, y: number, m: mat3) => {
    const nx = x * m[0] + y * m[3] + 1 * m[6]
    const ny = x * m[1] + y * m[4] + 1 * m[7]

    return [nx, ny]
}

export const getBounds = (width: number, height: number, transform: mat3) => {
    const [x1, y1] = multiply(0, 0, transform)
    const [x2, y2] = multiply(0, height, transform)
    const [x3, y3] = multiply(width, height, transform)
    const [x4, y4] = multiply(width, 0, transform)

    const minX = Math.min(x1, x2, x3, x4)
    const minY = Math.min(y1, y2, y3, y4)

    const maxX = Math.max(x1, x2, x3, x4)
    const maxY = Math.max(y1, y2, y3, y4)

    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
    }
}
