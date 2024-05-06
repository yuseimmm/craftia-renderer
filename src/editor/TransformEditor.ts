import { mat3 } from "gl-matrix";
import { FrameBuffer, WebGLRenderer } from "../core";
import { RasterLayer } from "../layer";
import { TextureSprite } from "../sprite";

export class TransformEditor {
    private _target: RasterLayer | null
    private _sprite: TextureSprite | null
    private _dest: FrameBuffer | null

    constructor() {
        this._target = null
        this._sprite = null
        this._dest = null
    }

    public attach(target: RasterLayer) {
        this._target = target
    }

    public get(renderer: WebGLRenderer) {
        if (!this._target) {
            return;
        }
        this._dest = this._dest ? this._dest : new FrameBuffer(
            renderer.width,
            renderer.height
        )

        this._sprite = new TextureSprite({
            texture: this._target.texture
        })

        return this._target.clone({
            texture: this._dest.getColorTexture()
        })
    }

    public transform(renderer: WebGLRenderer, transform: mat3) {
        if (!this._target || !this._sprite || !this._dest) {
            return;
        }

        const projectionMatrix = mat3.multiply(
            mat3.create(),
            this._target.getProjectionMatrix(),
            transform
        )

        this._sprite.setTransform(projectionMatrix)
        this._sprite.render(renderer, this._dest)
    }

    public detach() {
        this._dest?.destroy()

        this._dest = null
        this._target = null
        this._sprite = null
    }
}