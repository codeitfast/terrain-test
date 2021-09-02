const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {

    const scene = new BABYLON.Scene(engine);
    const gravityVector = new BABYLON.Vector3(0, -50, 0)
    var physicsPlugin = new BABYLON.CannonJSPlugin()
    scene.enablePhysics(gravityVector, physicsPlugin)

    //var camera = new BABYLON.ArcRotateCamera("Camera", 10, Math.PI/4, 50, BABYLON.Vector3.Zero(), scene);
     var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 200, BABYLON.Vector3.Zero(), scene);
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 30;
    camera.upperRadiusLimit = 300;
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 0, 0));
    
    const rubber = new BABYLON.StandardMaterial("rubber", scene)
    rubber.diffuseTexture = new BABYLON.Texture("coin_texture.jpg")
    const grass = new BABYLON.StandardMaterial("grass", scene)
    grass.diffuseTexture = new BABYLON.Texture("grass.png")
  
    
    function makeSphere(){
      const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameterX: 5, diameterY: 5, diameterZ: 5}, scene)
      sphere.position.y = 150 + Math.random(0,1)*5
      sphere.position.x += (Math.random(0,1)-.5)
      sphere.position.z += (Math.random(0, 1)-.5)
      sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1, restitution: .9}, scene)
      sphere.material = rubber;
    }
    //camera.lockedTarget = sphere;
    
    

    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "height_map.png", 200, 200, 10, 0, 50, scene, false, function () {
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor, { mass: 0 });
    });
    ground
    
    
    ground.material = grass;    
    ground.position.y = -5

    var tick = 0;
    var sphereAmount = 0
    scene.registerBeforeRender(function(){

      if((tick++ % 2)) return;
      if(sphereAmount < 50) makeSphere();
      sphereAmount ++
    })

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