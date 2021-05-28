import { ScenePackage } from "../interface/sceneinterfaceobjects";
import { Engine, Scene, SceneLoader, ArcRotateCamera, Vector3, HemisphericLight } from "@babylonjs/core";

class SceneFactory {
    static of(name: string, canvas: HTMLCanvasElement) { 
        
        const engine = new Engine(canvas, true); // Generate the 3D engine

        const scene = new Scene(engine);  

        SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "box.babylon");

        const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);
        const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

        return {
            scene,
            engine,
            light,
            camera
        }
    }
}

export default SceneFactory