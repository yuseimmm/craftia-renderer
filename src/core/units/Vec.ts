import { Vec2 } from './Vec2'
import { Vec3 } from './Vec3'
import { Vec4 } from './Vec4'

type Vec = Vec2 | Vec3 | Vec4

interface IVec {
    readonly inverse: Vec
    /**
     * Computes the sum of two vectors.
     * @param v vector to add
     * @returns result
     */
    readonly add: (v: this) => Vec
    /**
     * Computes the difference between two vectors.
     * @param v vector to pull
     * @returns a new vector is created as a result.
     */
    readonly sub: (v: this) => Vec
    /**
     * Multiply all values in a vector by the same number.
     * @param n multiplier
     * @returns a new vector is created as a result.
     */
    readonly times: (n: number) => Vec
    /**
     * Compute the dot product of two vectors.
     * @param v the other vector
     * @returns a new vector is created as a result.
     */
    readonly dot: (v: this) => number

    /**
     * Whether two vectors are equivalent.
     * @param v vectors to be compared
     * @returns boolean indicating whether the values are equal
     */
    readonly equal: (v: Vec) => boolean

    /**
     * Compute the distance between two vectors.
     * @param v the other vector
     * @returns the distance between two vectors.
     */

    readonly distance: (v: this) => number
    /**
     * Convert to array.
     * @returns array
     */
    readonly toArray: () => number[]
}

function isVec(value: unknown): value is Vec {
    if (value instanceof Vec2 || value instanceof Vec3 || value instanceof Vec4) {
        return true
    }
    return false
}

export { isVec }
export type { IVec, Vec }
