import { BLEND_MODES } from '../blend-modes/BlendMode'
import { Container } from '../contanier'
import { FrameBuffer } from '../frameBuffer'
import { Scene } from '../scene/Scene'
import { Sprite } from '../sprite'
import { TEXTURE_EMPTY } from '../textures'
import { Vec2 } from '../units'
import { WebGLRenderer } from '../WebGLRenderer'

export type GroupOptions = {
    blendMode?: keyof typeof BLEND_MODES
    translation?: Vec2
    visible?: boolean
    opacity?: number
}

export class Group extends Sprite {
    protected _children: Container[]
    public _localScene: Scene

    constructor(options: GroupOptions = {}) {
        super({ ...options, texture: TEXTURE_EMPTY })

        this._children = []
        this._localScene = new Scene([new FrameBuffer(), new FrameBuffer(), new FrameBuffer()])
    }

    public updateLocalScene(renderer: WebGLRenderer) {
        if (this.requiresUpdate()) {
            this._localScene.clear(renderer, this._localScene.current)

            for (let i = 0; i < this._children.length; i++) {
                this._children[i].render(renderer, this._localScene)
            }
        }

        this.refreshUpdate(false)
    }

    public render(renderer: WebGLRenderer, scene: Scene) {
        this._localScene.width = scene.width
        this._localScene.height = scene.height

        this.updateLocalScene(renderer)

        super.texture = this._localScene.read(this._localScene.previous)
        super.render(renderer, scene)
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
