import { Scene, Engine, HemisphericLight, ArcRotateCamera } from "@babylonjs/core";
import { State } from './state';
export interface ScenePackage {
    scene: Scene,
    light: HemisphericLight,
    camera: ArcRotateCamera
}
export interface completePackage { 
    engine: Engine
    scenePackage: ScenePackage
}
    