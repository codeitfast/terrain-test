const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {

    const scene = new BABYLON.Scene(engine);
    const gravityVector = new BABYLON.Vector3(0, -9.81, 0)
    var physicsPlugin = new BABYLON.CannonJSPlugin()
    scene.enablePhysics(gravityVector, physicsPlugin)

    //var camera = new BABYLON.ArcRotateCamera("Camera", 10, Math.PI/4, 50, BABYLON.Vector3.Zero(), scene);
    var camera = new BABYLON.FollowCamera("Camera", new BABYLON.Vector3(0, 10, 0), scene);
    camera.followRadius = 10;
    camera.attachControl(canvas, true)
    camera.cameraAcceleration = .01


    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 0, 0));
  
    

    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameterX: 5, diameterY: 5, diameterZ: 5}, scene)
    sphere.rotation.z = .5
    sphere.position.y = 100
    camera.lockedTarget = sphere;


    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "height_map.png", 200, 200, 200, 0, 30, scene, false, function () {
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor, { mass: 0 });
    });
    ground
    
    const grass = new BABYLON.StandardMaterial("grass", scene)
    grass.diffuseTexture = new BABYLON.Texture("grass.png")
    ground.material = grass;

    const rubber = new BABYLON.StandardMaterial("rubber", scene)
    rubber.diffuseTexture = new BABYLON.Texture("coin_texture.jpg")
    sphere.material = rubber;
    
    ground.position.y = -5

    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1, restitution: .9}, scene)
    

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