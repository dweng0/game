import { ScenePackage, completePackage, Menu } from "../interface/sceneinterfaceobjects";
import { Engine, Scene, SceneLoader, ArcRotateCamera, Vector3, HemisphericLight, Color4, FreeCamera } from "@babylonjs/core";
import { State } from "../interface/state";
import { menuData } from "../data/menu";
import playerLostMenu from '../data/playerlost';
import MenuService from "./menuservice";

class SceneFactory {
    private store;

    constructor(store: any) { 
        this.store = store;
    }

    create(canvas: HTMLCanvasElement, fn: (engine: Engine) => ScenePackage): completePackage {
        const engine = new Engine(canvas, true); 
        const packages: completePackage = {
            engine,
            scenePackage: fn(engine)
        }

        const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), packages.scenePackage.scene);
        const light = new HemisphericLight("light", new Vector3(1, 1, 0), packages.scenePackage.scene);

        MenuService.buildMenu(packages.scenePackage.scene, packages.scenePackage.menu);
        SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "box.babylon");
        return packages;
    }

    playerLost(engine: Engine): ScenePackage { 
        const scene = new Scene(engine)
            scene.clearColor = new Color4(0, 0, 0, 1);
        const camera = new FreeCamera("camera1", new Vector3(0, 0, 0), scene);
            camera.setTarget(Vector3.Zero());
        const menu: Menu = playerLostMenu

        return {
            scene,
            menu
        }
    };

    buildPlayerLostMenu() {}

    newScenePackage(engine: Engine): ScenePackage { 
        const scene = new Scene(engine);  
        return {
            scene 
        }
    }
}

export default SceneFactory