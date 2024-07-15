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
    protected _localScene: Scene
    private _updateLocalScene: boolean

    constructor(options: GroupOptions = {}) {
        super({ ...options, texture: TEXTURE_EMPTY })

        this._children = []
        this._localScene = new Scene([new FrameBuffer(), new FrameBuffer(), new FrameBuffer()])
        this._updateLocalScene = true
    }

    public setChildren(children: Container[]) {
        this._children = children
        this._children.forEach((c) => (c.parent = this))

        this.onChildrenUpdate()
    }

    public onChildrenUpdate() {
        this._updateLocalScene = true
        this.parent?.onChildrenUpdate()
    }

    public updateLocalScene(renderer: WebGLRenderer) {
        if (this._updateLocalScene) {
            renderer.viewport(0, 0, this._localScene.width, this._localScene.height)

            this._localScene.clear(renderer, this._localScene.previous)
            this._localScene.clear(renderer, this._localScene.current)

            for (let i = 0; i < this._children.length; i++) {
                this._children[i].render(renderer, this._localScene)
            }

            this._updateLocalScene = false
        }
    }

    public render(renderer: WebGLRenderer, scene: Scene) {
        this._localScene.width = scene.width
        this._localScene.height = scene.height

        this.updateLocalScene(renderer)

        super.texture = this._localScene.read(this._localScene.previous)
        super.render(renderer, scene)
    }
}
