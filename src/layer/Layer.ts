import { Node, NodeOptions } from '../node/Node'
import { Sprite } from '../sprite/Sprite'

export interface LayerOptions extends NodeOptions {}

export abstract class Layer extends Node {
    protected abstract sprite: Sprite

    constructor(options: LayerOptions) {
        super(options)
    }
    public get realHeight() {
        return this.sprite.realHeight
    }
    public get realWidth() {
        return this.sprite.realWidth
    }
    public abstract getRenderables(): Sprite[]
}
