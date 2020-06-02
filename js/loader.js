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
        }
    )
}        
