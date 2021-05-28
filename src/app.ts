
import SceneFactory from './service/scenefactory';
import { ScenePackage } from './interface/sceneinterfaceobjects';

const Start = () => {
    const canvas: HTMLCanvasElement = document.getElementById("renderCanvas") as HTMLCanvasElement; // Get the canvas element
    const { scene, engine } = SceneFactory.of("default", canvas);

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
            scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
            engine.resize();
    });
}

Start();