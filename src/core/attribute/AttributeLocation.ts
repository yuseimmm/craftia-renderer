export class AttributeLocation {
    private _shaerID: number | null
    private _location: number

    constructor(shader?: number, location?: number) {
        this._shaerID = shader ?? null
        this._location = location ?? -1
    }

    public get() {
        return this._location
    }

    public requiresUpdate(shaderID: number | null) {
        return this._shaerID !== shaderID
    }

    public update(shaderID: number | null, location: number | null) {
        this._shaerID = shaderID
        this._location = location ?? -1
    }
}
