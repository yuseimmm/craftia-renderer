# craftia-renderer
### The 2D rendering library for WebGL
The goal of this project is to create a fast, lightweight 2D rendering library for image editing software.
The library fully supports WebGL for fast and powerful rendering with hardware acceleration.

## features
### Supported ✅
- WebGL Renderer 
- Several blend modes
- Transformations (rotation, scaling, translation, and other free free transformations) 
- Render Texture
### Work in progress 🏗️
- Full support for blend modes
- Layer mask
- Vector image
- Filter

## Usage
```typescript
import * as CRAFTIA from '@yuseimmm/craftia-renderer';

//init
const canvas = document.createElement('canvas') as HTMLCanvasElement;
const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;

const renderer = new CRAFTIA.WebGLRenderer(gl);
const renderPipeline = new CRAFTIA.RenderPipeline(renderer);
renderer.setSize(new CRAFTIA.Vec2(1920, 1080));

const main = async () => {
    // Create a main group
    const mainGroup = new CRAFTIA.Container({
        transform: [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ],
        visible: true,
        scaling: new CRAFTIA.Vec2(1, 1),
        translation: new CRAFTIA.Vec2(0, 0),
        rotation: 0 * (Math.PI / 180),
        blendMode: "normal",
        opacity: 1.0
    });

    //Create a layer
    const layer1 = new CRAFTIA.RasterLayer({
        //Load the texture
        texture: await CRAFTIA.createTextureAsync('./sample.png'),
        transform: [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ],
        visible: true,
        scaling: new CRAFTIA.Vec2(1, 1),
        translation: new CRAFTIA.Vec2(0, 0),
        rotation: 0 * (Math.PI / 180),
        blendMode: "normal",
        opacity: 1.0
    })

    // Add the layer to main group
    mainGroup.setChildren([layer1]);
    //rendering
    mainGroup.render(renderPipeline);
}
```