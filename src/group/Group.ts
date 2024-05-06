import { Container } from '../contanier'
import { Vec2 } from '../core'
import { RenderStream } from '../stream'
import { BLEND_MODES } from '../blend-modes'

export type GroupOptions = {
    blendMode?: keyof typeof BLEND_MODES
    translation?: Vec2
    visible?: boolean
    opacity?: number
    fill?: number
}

export class Group extends Container {
    private _children: Container[]
    private _dest: RenderStream | null

    constructor(options: GroupOptions) {
        super(options)
        this._children = []
        this._dest = null
    }

    public renderFront(masterStream: RenderStream) {
        this._dest = this._dest ? this._dest : masterStream.renderer.createRenderStream()

        if (this.requiresUpdate()) {
            // Clear rendering contents
            this._dest.blendMode.blend({
                blendMode: BLEND_MODES['clear'],
                opacity: 0.0,
            })

            for (let i = 0; i < this._children.length; i++) {
                this._children[i].render(this._dest)
            }
        }

        this.refreshUpdate(false)

        return this._dest.dest.getColorTexture()
    }

    public setChildren(children: Container[]) {
        this._children = children
        this.update = true
    }

    public requiresUpdate(): boolean {
        if (this.update) {
            return true
        }

        for (let i = 0; i < this._children.length; i++) {
            if (this._children[i].requiresUpdate()) {
                return true
            }
        }

        return false
    }

    public refreshUpdate(update: boolean = false) {
        this.update = update

        for (let i = 0; i < this._children.length; i++) {
            this._children[i].refreshUpdate(update)
        }
    }
}
