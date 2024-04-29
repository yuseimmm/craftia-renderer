import { Shader } from '../core/shader'
import { Texture } from '../core/textures'
import { MeshGeometry } from './MeshGeometry'

export type MeshTextures = {
    [key: number]: Texture | null
}

export type MeshOptions<SHADER extends Shader> = {
    textures: MeshTextures
    geometry: MeshGeometry
    shader: SHADER
}

export class Mesh<SHADER extends Shader = Shader> {
    public geometry: MeshGeometry
    public textures: MeshTextures
    public shader: SHADER

    constructor(options: MeshOptions<SHADER>) {
        this.geometry = options.geometry
        this.shader = options.shader
        this.textures = options.textures || {}
    }
}
