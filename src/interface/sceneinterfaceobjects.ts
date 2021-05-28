import { Scene, Engine, HemisphericLight, ArcRotateCamera } from "@babylonjs/core";
import { State } from './state';

export interface ScenePackage {
    scene: Scene,
    menu?: Menu
}

export interface completePackage { 
    engine: Engine
    scenePackage: ScenePackage
}

export interface Action {
    type: State
    
}
export interface MenuItem { 
    id: string,
    label: string
    onClickStateTransition?: State
    child?: MenuItem
}

export interface Menu { 
    name: string,
    children: Array<MenuItem>
    width: string,
    height: string,
    background: string,
    color: string
}
    