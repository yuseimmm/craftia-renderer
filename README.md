# Craftia-Renderer
## The 2D Rendering Library for WebGL
The aim of this project is to develop a fast, lightweight 2D rendering library for image editing software. The library fully leverages WebGL for rapid and potent rendering with hardware acceleration.

## Installation
### Install from the command line:
```sh
$ npm install @yuseimmm/craftia-renderer
```

## Basic Usage Example
```typescript
import * as CRAFTIA from "@yuseimmm/craftia-renderer";

const main = async () => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;

    document.body.appendChild(canvas);

    const renderer = new CRAFTIA.WebGLRenderer(gl, {
        width: 1920, height: 1080
    });

    const stage = new CRAFTIA.Stage(renderer, 1280, 720);

    const layer1 = new CRAFTIA.RasterLayer({
        texture: await CRAFTIA.createTextureAsync('./img/sample-car.png')
    });

    stage.setChildren([layer1]);
    stage.renderStage();
}

main();
```