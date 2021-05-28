import BABYLON from '@babylonjs/core'
const createScene = () => { 
        const canvas = document.getElementById("renderCanvas"); // Get the canvas element
        const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

        // Add your code here matching the playground format
        // Add your code here matching the playground format
        const createScene = function () {
    
            const scene = new BABYLON.Scene(engine);  

            BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "box.babylon");

            const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
            camera.attachControl(canvas, true);
            const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

            return scene;
        };
}

export default createScene;
