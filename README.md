# Craftia-Renderer
## The 2D Rendering Library for WebGL
The aim of this project is to develop a fast, lightweight 2D rendering library for image editing software. The library fully leverages WebGL for rapid and potent rendering with hardware acceleration.

## Current Features ✨
- WebGL Renderer
- Full support for blend modes
- Various types of layers (smart layers, raster layers)
- Layer Grouping
- Transformations (rotation, scaling, translation, and other transformations)
- Texture Rendering

## Usage
```typescript
import * as CRAFTIA from "@yuseimmm/craftia-renderer"

const main = async () => {
    //init
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext

    document.body.appendChild(canvas)

    const renderer = new CRAFTIA.WebGLRenderer(gl, {
        width: 1920,
        height: 1080
    })
    
    const masterStream = renderer.createRenderStream()

    const layer = new CRAFTIA.SmartLayer({
        texture: await CRAFTIA.createTextureAsync('./img/sample.png'),
        visible: true,
        translation: new CRAFTIA.Vec2(0, 0),
        blendMode: "normal",
        scaling: new CRAFTIA.Vec2(1, 1),
        opacity: 1.0
    })

    layer.render(masterStream)
    masterStream.renderScreen()
}

main();
```