import { BLEND_MODES } from '../blend-modes'
import { Container } from '../contanier'
import { Vec2 } from '../core'

export interface ILayer<T> extends Container {
    translation: Vec2
    blendMode: keyof typeof BLEND_MODES
    clone(options: T): ILayer<T>
}
