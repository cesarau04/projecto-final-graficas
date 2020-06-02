function loadObj(path, texture) {

    var objLoader = new THREE.OBJLoader()

    objLoader.load(
        path,

        function (obj) {
            let newMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: new THREE.TextureLoader().load(texture), side: THREE.TwoSide })
            obj.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = newMaterial;
                    child.material.side = THREE.DoubleSide;
                }
            });

            program.addMesh(obj)
        },

        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },

        function (err) {
            console.log('Couldnt open obj at' + path);
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