import { ScenePackage, completePackage } from "../interface/sceneinterfaceobjects";
import { Engine, Scene, SceneLoader, ArcRotateCamera, Vector3, HemisphericLight } from "@babylonjs/core";
import { State } from "../interface/state";

class SceneFactory {

    static create(canvas: HTMLCanvasElement, fn: (engine: Engine) => ScenePackage): completePackage {
        const engine = new Engine(canvas, true); // Generate the 3D engine
        const packages = {
            engine,
            scenePackage: fn(engine)
        }

        packages.scenePackage.camera.attachControl(canvas, true);
       
        SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "box.babylon");
        return packages;
    }

    static newScenePackage(engine: Engine): ScenePackage { 
        
        const scene = new Scene(engine);  
        const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), scene);
        const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

        return {
            scene,
            light,
            camera
        }
    }
}

export default SceneFactory