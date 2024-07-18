import { BlendFuncProps } from './BlendMode'

export const normalBlend: BlendFuncProps = {
    srcRGB: 770, // WebGL2RenderingContext.SRC_ALPHA
    dstRGB: 771, // WebGL2RenderingContext.ONE_MINUS_SRC_ALPHA
    srcAlpha: 1, // WebGL2RenderingContext.ONE
    dstAlpha: 771, // WebGL2RenderingContext.ONE_MINUS_SRC_ALPHA
}
