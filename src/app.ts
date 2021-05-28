
import SceneFactory from './service/scenefactory';
import { ScenePackage } from './interface/sceneinterfaceobjects';
import { Scene, Engine } from '@babylonjs/core';
import { State } from './interface/state';
import { createStore, StoreCreator } from 'redux';
import { stateReducer } from './reducers';

class Application { 
    
    private canvas: HTMLCanvasElement;
    private statePackages: Array<ScenePackage> = [];
    private engine: Engine;
    private store: any;
        
    constructor() { 

        this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        this.store = createStore(stateReducer);    
        
        const { create, newScenePackage } = SceneFactory;
        const packages = create(this.canvas, newScenePackage)
        
        this.engine = packages.engine;
      
        
        //add new scene 
        this.addStatePackage(State.START, packages.scenePackage);
        
        //subscribe to state changes
        this.store.subscribe(() => this.switchSceneByState(this.store.getState().value));

        //handle resize
        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        //dispatch a start event
        this.store.dispatch({type: State.START});
    }

    addStatePackage(state: State, scenePackage: ScenePackage) {
        return this.statePackages.splice(state, 1, scenePackage);
    }

    switchSceneByState(state: State): void {
        
        //check if scene exists in our list of scenes
        const statePackage = this.statePackages[state];

        if(!statePackage) {
            
            throw new Error('State package not available, has is been created yet?');
        }
        statePackage.scene.debugLayer.show();
        this.handleLoading(statePackage.scene);
        this.engine.runRenderLoop(() => { 
            statePackage.scene.render();
        });
    }

    handleLoading(scene: Scene): void {
        this.engine.displayLoadingUI();
        scene.whenReadyAsync()
        .then(() => this.engine.hideLoadingUI())
        .catch((e: any) => { 
            console.log(e);
            throw new Error('There was an error loading the scene!');
        });
    }
}

new Application();