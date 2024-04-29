import { BLEND_MODES } from '../blend-modes'
import { RenderPipeline } from '../pipeline'
import { ISprite } from '../sprite'

export type EffectOptions<SPRITE extends ISprite = ISprite> = {
    sprite: SPRITE
    blendMode: keyof typeof BLEND_MODES
    opacity: number
}

export class Effect<SPRITE extends ISprite = ISprite> {
    public blendMode: keyof typeof BLEND_MODES
    public opacity: number
    public sprite: SPRITE

    constructor(options: EffectOptions<SPRITE>) {
        this.blendMode = options.blendMode
        this.opacity = options.opacity
        this.sprite = options.sprite
    }

    public render(pipeline: RenderPipeline) {
        pipeline.spin()
        this.sprite.render(pipeline.renderer, pipeline.front)

        pipeline.blendMode.blend({
            blendMode: BLEND_MODES[this.blendMode],
            opacity: this.opacity,
        })
    }

    public clone() {
        return new Effect({
            sprite: this.sprite.clone(),
            blendMode: this.blendMode,
            opacity: this.opacity,
        })
    }
}
