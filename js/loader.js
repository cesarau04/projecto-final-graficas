function loadObj(path, texture) {

    finObj = null;

    imgsPath = "imgs/"
    modelsPath = "models/"
    var objLoader = new THREE.OBJLoader()

    objLoader.load(
        modelsPath + path,

        function (obj) {
            let newMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: new THREE.TextureLoader().load(imgsPath + texture), side: THREE.TwoSide })
            newMaterial.repeat = 20
            obj.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = newMaterial;
                    child.material.side = THREE.DoubleSide;
                }
            });

            program.addMesh(obj);
            switch(texture){
                case "earth.jpg":
                    sceneEarth = true;
                    break;
                case "mars.png":
                    sceneMars = true;
                    break;
                case "moon.jpg":
                    sceneMoon = true;
                    break;
            }
        },

        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },

        function (err) {
            console.log('Couldnt open obj at' + imgsPath + path);
        }
    )
}

function loadSound(soundFile, continuous, volume) {
    console.log("played sound")
    var listener = new THREE.AudioListener();
    program.camera.add( listener );
  
    var sound = new THREE.Audio( listener );
  
    var audioLoader = new THREE.AudioLoader();

    audioLoader.load("sounds/" + soundFile, function( buffer ){
      sound.setBuffer( buffer );
      sound.setLoop( continuous );
      sound.setVolume( volume );
      sound.play();
    })
  }

function ballLoader(ball) {
    switch(ball){
        case "baseball":
            break;
        case "tenis":
            break;
        case "bowling":
            break;
        case "basket":
            break;
    }
}

function scenarioLoader(scenario) {
    switch(scenario){
        case "earth":
            earthScenario();
            break;
        case "moon":
            moonScenario();
            break;
        case "mars":
            marsScenario();
            break;
    }
}