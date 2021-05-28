
import SceneFactory from './service/scenefactory';
import MenuService from './service/menuservice';

import { ScenePackage } from './interface/sceneinterfaceobjects';
import { Scene, Engine } from '@babylonjs/core';
import { State } from './interface/state';
import { createStore } from 'redux';
import { stateReducer } from './reducers';
import { menuData } from './data/menu';

class Application { 
    
    private canvas: HTMLCanvasElement;
    private statePackages: Array<ScenePackage> = [];
    private engine: Engine;
    private store: any;
    private sceneFactory: SceneFactory;
        
    constructor() { 

        //attach to canvas
        this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

        //create a store for our state
        this.store = createStore(stateReducer);    

        //init the scene factory
        this.sceneFactory = new SceneFactory(this.store);

        //build out the first package
        const packages =  this.sceneFactory.create(this.canvas, this.sceneFactory.newScenePackage);
        
        //pull engine from package
        this.engine = packages.engine;
        
        //add new scene 
        //todo this array can be returned from the scene factory instead of handled here.
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