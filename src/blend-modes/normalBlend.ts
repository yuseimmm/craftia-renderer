import { BlendFuncProps } from './BlendMode'

export const normalBlend: BlendFuncProps = {
    srcRGB: WebGL2RenderingContext.SRC_ALPHA,
    dstRGB: WebGL2RenderingContext.ONE_MINUS_SRC_ALPHA,
    srcAlpha: WebGL2RenderingContext.ONE,
    dstAlpha: WebGL2RenderingContext.ONE_MINUS_SRC_ALPHA
}
