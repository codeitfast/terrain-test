const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {

    const scene = new BABYLON.Scene(engine);
    const gravityVector = new BABYLON.Vector3(0, -9.81, 0)
    var physicsPlugin = new BABYLON.CannonJSPlugin()
    scene.enablePhysics(gravityVector, physicsPlugin)

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 5, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 0, 0));
  
    

    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene)
    sphere.position.y = 10
    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "height_map.png", 
    {width:150, height:150, subdivisions: 200, minHeight:0, maxHeight: 10});
    
    const grass = new BABYLON.StandardMaterial("grass", scene)
    grass.diffuseTexture = new BABYLON.Texture("grass.png")
    largeGround.material = grass;
    
    largeGround.position.y = -5

    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1, restitution: .9}, scene)
    //largeGround.physicsImpostor = new BABYLON.PhysicsImpostor(largeGround, BABYLON.PhysicsImpostor.MeshImpostor, {mass: 0, restitution: .9}, scene)

    return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
        scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});