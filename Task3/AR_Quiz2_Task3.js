export const createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Create a cube
    var cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 2 }, scene);
    
    // Create a material for the cube
    var material = new BABYLON.StandardMaterial("cubeMaterial", scene);
    cube.material = material;

    // Give the cube color
    material.diffuseColor = new BABYLON.Color3(1, 0, 0);

    // Cube Sinusoidal Property Changes
    var time = 0;

    scene.onBeforeRenderObservable.add(function () {

    time += 0.02;

    // Change cube's color Sinusoidally
    var red = (Math.sin(time) + 1) / 2;
    var green = (Math.sin(time + 2 * Math.PI / 3) + 1) / 2;
    var blue = (Math.sin(time + 4 * Math.PI / 3) + 1) / 2;


    // Change position sinusoidally
    cube.position.y = 2 + Math.sin(time);


    // Change the cube's scale sinusoidally
    cube.scaling = new BABYLON.Vector3(
    1 + 0.5 * Math.sin(time),
    1 + 0.5 * Math.sin(time),
    1 + 0.5 * Math.sin(time)
    );

    material.diffuseColor = new BABYLON.Color3(red, green, blue);

    });


    // Move the cube upward
    cube.position.y = 1;



    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    return scene;
};