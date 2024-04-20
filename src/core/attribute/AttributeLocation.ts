export class AttributeLocation {
    private shaerID: number | null
    private location: number

    constructor(shader?: number, location?: number) {
        this.shaerID = shader ?? null
        this.location = location ?? -1
    }

    public get() {
        return this.location
    }

    public necessaryUpdate(shaderID: number | null) {
        return this.shaerID !== shaderID
    }

    public update(shaderID: number | null, location: number | null) {
        this.shaerID = shaderID
        this.location = location ?? -1
    }
}
