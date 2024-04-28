import { Effect } from '../effect/Effect'
import { RenderPipeline } from '../pipeline'

export type ContainerParentProps = {
    opacity?: number
}

export interface ContainerOptions {
    visible: boolean
    opacity: number
    parent: ContainerParentProps
}

export abstract class Container {
    public parent: ContainerParentProps
    public visible: boolean
    public opacity: number

    constructor({ visible, parent, opacity }: Partial<ContainerOptions>) {
        this.visible = visible ?? true
        this.opacity = opacity ?? 1
        this.parent = parent ?? {}
    }

    public abstract get children(): (Effect | Container)[]

    public render(pipeline: RenderPipeline) {
        if (!this.visible) {
            return
        }

        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i]

            if (child instanceof Container) {
                child.parent.opacity = this.getOpacity()
            }

            child.render(pipeline)
        }
    }

    public getOpacity() {
        return this.opacity * (this.parent.opacity ?? 1)
    }
}
