import { mat3 } from 'gl-matrix'
import { Group } from '../group'
import { WebGLRenderer } from '../WebGLRenderer'
import { Vec2 } from '../units'

export class Stage extends Group {
    private _renderer: WebGLRenderer
    private _freeze: boolean;

    private _isChildrenUpdated: boolean;
    private _isUpdated: boolean;

    constructor(renderer: WebGLRenderer, width: number, height: number) {
        super()

        this._renderer = renderer

        this._localScene.width = width
        this._localScene.height = height

        this._freeze = false;
        this._isChildrenUpdated = false;
        this._isUpdated = false;
    }
    public get rotation() {
        return super.rotation
    }

    public set rotation(rotation: number) {
        super.rotation = rotation
    }

    public get transform() {
        return super.transform
    }

    public set transform(transform: mat3) {
        super.transform = transform
    }

    public get scaling() {
        return super.scaling
    }

    public set scaling(scaling: Vec2) {
        super.scaling = scaling
    }

    public freeze() {
        this._freeze = true;
    }

    public unfreeze() {
        this._freeze = false;

        if (this._isChildrenUpdated) {
            this.onChildrenUpdate();
            this._isChildrenUpdated = false;

            return;
        }

        if (this._isUpdated) {
            this.onUpdate()

            this._isUpdated = false
            return;
        }
    }

    public onChildrenUpdate() {
        super.onChildrenUpdate();

        if (this._freeze) {
            this._isChildrenUpdated = true;
            return;
        }

        this.updateLocalScene(this._renderer)
        this.onUpdate()
    }

    public onUpdate() {
        super.onUpdate();

        if (this._freeze) {
            this._isUpdated = true;
            return;
        }

        super.texture = this._localScene.read(this._localScene.previous)

        this._renderer.frameBuffer.unbind()
        this._renderer.viewport(0, 0,this._renderer.width, this._renderer.height)
        this._renderer.clear()

        this.excude(this._renderer, this._renderer.width, this._renderer.height)
    }

    public resize(width: number, height: number) {
        this._localScene.width = width
        this._localScene.height = height
    }
}
