import { Scene, Engine, HemisphericLight, ArcRotateCamera } from "@babylonjs/core";

export interface ScenePackage {
    scene: Scene,
    engine: Engine,
    light: HemisphericLight,
    camera: ArcRotateCamera
}
    