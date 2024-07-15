import { mat3 } from 'gl-matrix'
import { IVec, Vec } from './Vec'
export class Vec2 implements IVec {
    readonly x: number
    readonly y: number
    public get r() {
        return this.x
    }
    public get g() {
        return this.y
    }
    public get rg() {
        return this
    }
    public get xy() {
        return this
    }
    public get inverse() {
        return this.times(-1)
    }
    constructor(xy: number)
    constructor(x: number, y: number)
    constructor(coordArray: [number, number, ...number[]])
    constructor(a: number | [number, number, ...number[]], b?: number) {
        if (typeof a === 'number' && typeof b === 'number') {
            this.x = a
            this.y = b
        } else if (typeof a === 'number') {
            this.x = a
            this.y = a
        } else if (Array.isArray(a)) {
            this.x = a[0]
            this.y = a[1]
        } else {
            this.x = 0
            this.y = 0
        }
    }
    public add(v: Vec2): Vec2 {
        return new Vec2(this.x + v.x, this.y + v.y)
    }
    public sub(v: Vec2): Vec2 {
        return new Vec2(this.x - v.x, this.y - v.y)
    }
    public times(n: number): Vec2 {
        return new Vec2(this.x * n, this.y * n)
    }
    public dot(v: Vec2): number {
        return this.x * v.x + this.y * v.y
    }
    public equal(v: Vec): boolean {
        return v instanceof Vec2 && v.x === this.x && v.y === this.y
    }
    public distance(v: Vec2): number {
        return Math.sqrt((v.x - this.x) ** 2 + (v.y - this.y) ** 2)
    }
    public toArray(): [number, number] {
        return [this.x, this.y]
    }
    public midpoint(v: Vec2): Vec2 {
        return new Vec2(this.x + (v.x - this.x) / 2, this.y + (v.y - this.y) / 2)
    }
    public round() {
        return new Vec2(Math.round(this.x), Math.round(this.y))
    }
    public floor() {
        return new Vec2(Math.floor(this.x), Math.floor(this.y))
    }
    public transformMat3(m: mat3) {
        const x = m[0] * this.x + m[3] * this.y + m[6]
        const y = m[1] * this.x + m[4] * this.y + m[7]
        return new Vec2(x, y)
    }
}
