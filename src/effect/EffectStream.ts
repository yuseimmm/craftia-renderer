import { Texture, WebGLRenderer } from '../core'
import { RenderStream } from '../stream'
import { EffectDecoration } from './EffectDecoration'

export class EffectStream extends RenderStream {
    public readonly decoration: EffectDecoration

    public masterBase: Texture
    public masterFront: Texture

    constructor(
        renderer: WebGLRenderer,
        width: number,
        height: number,
        masterBase: Texture,
        masterFront: Texture
    ) {
        super(renderer, width, height)

        this.decoration = new EffectDecoration(this)

        this.masterBase = masterBase
        this.masterFront = masterFront
    }
}
