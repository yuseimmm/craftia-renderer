export interface ShaderOptions {
    header?: string
    func?: string
    start?: string
    main?: string
}
export type ShaderTemplate = (props?: ShaderOptions) => string
