export class UniformLocation {
    private _shaerID: number | null
    private _location: WebGLUniformLocation | null

    constructor(shader?: number, location?: WebGLUniformLocation | null) {
        this._shaerID = shader ?? null
        this._location = location ?? null
    }

    public get() {
        return this._location
    }

    public necessaryUpdate(shaderID: number | null) {
        return this._shaerID !== shaderID
    }

    public update(shaderID: number | null, location: WebGLUniformLocation | null) {
        this._shaerID = shaderID
        this._location = location
    }
}
