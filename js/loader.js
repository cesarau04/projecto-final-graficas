function loadObj(path) {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(
        path + ".mtl",

        function (mtl) {
            mtl.preload();
            var objLoader = new THREE.OBJLoader()
            objLoader.setMaterials(mtl);
            objLoader.load(
                path + ".obj",

                function (obj) {
                    program.addMesh(obj)
                },

                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },

                function (err) {
                    console.log('Couldnt open obj at' + path);
                }
            )
        }, 

        function (xhr) {},

        function (err) {
            console.log("No se cargo mtl");
            
            var objLoader = new THREE.OBJLoader()
            objLoader.load(
                path + ".obj",
                
                function (obj) {
                    let newMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.TextureLoader().load("imgs/mars.png")})
                    obj.traverse( function( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material = newMaterial;
                        }
                    } );
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
    )
}        
