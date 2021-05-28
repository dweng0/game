
import SceneFactory from './service/scenefactory';
import { ScenePackage } from './interface/sceneinterfaceobjects';
import { Scene, Engine } from '@babylonjs/core';
import { State } from './interface/state';

class Application { 
    
    private canvas: HTMLCanvasElement;
    private statePackages: Array<ScenePackage> = [];
    private engine: Engine;
        
    constructor() { 
        this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

        const { create, newScenePackage } = SceneFactory;
        const packages = create(this.canvas, newScenePackage)
        
        this.engine = packages.engine;
        
        //add new scene 
        this.addStatePackage(State.START, packages.scenePackage);

        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }

    addStatePackage(state: State, scenePackage: ScenePackage) {
        return this.statePackages.splice(state, 1, scenePackage);
    }

    switchSceneByState(state: State) {
        
        //check if scene exists in our list of scenes
        const statePackage = this.statePackages[state];

        if(!statePackage) {
            throw new Error('State package not available, has is been created yet?');
        }
        
        this.engine.runRenderLoop(() => { 
            statePackage.scene.render();
        });
    }
}


new Application();