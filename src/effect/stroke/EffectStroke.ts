import { BLEND_MODES } from '../../blend-modes'
import { FrameBuffer, Vec2, Vec4 } from '../../core'
import { EffectStream } from '../EffectStream'
import { stroke } from './stroke'

export type EffectStrokeOptions = {
    blendMode?: keyof typeof BLEND_MODES
    opacity?: number
    size?: number
}

export class EffectStroke {
    private _dest: FrameBuffer

    public blendMode: keyof typeof BLEND_MODES
    public opacity: number
    public width: number

    constructor(options: EffectStrokeOptions = {}) {
        this._dest = new FrameBuffer()

        this.blendMode = options.blendMode ?? 'normal'
        this.opacity = options.opacity ?? 1.0
        this.width = options.size ?? 10
    }

    // TODO!! Refactoring required.
    public render(effectStream: EffectStream) {
        effectStream.spin()

        // Blends the stroke with what is render in the master pipeline.
        effectStream.blendMode.blend({
            // The rendering result of the master pipeline.
            base: effectStream.masterBase,
            // Stroke
            front: this._dest.getColorTexture(),

            // Set blending options
            blendMode: BLEND_MODES[this.blendMode],
            opacity: this.opacity,
        })

        // Mask the blending results.
        effectStream.blendMode.blend({
            blendMode: BLEND_MODES['destination-in'],
            opacity: 1.0,

            base: effectStream.dest.getColorTexture(),
            front: this._dest.getColorTexture(),
            dest: effectStream.front,
        })

        effectStream.blendMode.blend({
            blendMode: BLEND_MODES['normal'],
            opacity: 1.0,
        })
    }

    public update(effectStream: EffectStream) {
        this._dest.resize(new Vec2(effectStream.renderer.width, effectStream.renderer.height))

        stroke.uniforms.setValues({
            'vec4<float>': {
                u_color: new Vec4(0, 0, 0, 1),
            },
            int: {
                u_horizontal: 1,
                u_texture: 0,
                u_width: this.width,
            },
        })

        effectStream.decoration.createDecoration({
            dest: this._dest,
            source: {
                [0]: effectStream.masterFront,
            },

            // A shader that creates borders from textures
            shader: stroke,
        })
    }
}
