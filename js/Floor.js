class Floor extends THREE.Mesh{
    constructor(w=5., h=.1, d=5.){
        super();
        this.geometry = new THREE.BoxGeometry( w, h, d );

        // this.material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        this.material = new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.TextureLoader().load("imgs/red-brick.jpg")})
        this.mesh = new THREE.Mesh( this.geometry, this.material );

        console.log(this.mesh);
        
        this.repr = "floor"

        this.shouldAnimate = false;
        this.animationMode = null;

        this.updatePosition = this.updatePosition.bind(this);
        this.updateRotation = this.updateRotation.bind(this);
        this.updateScale = this.updateScale.bind(this);

        this.anime = this.anime.bind(this);
        this.toString = this.toString.bind(this);
    }

    updatePosition(x = this.mesh.position.x, y = this.mesh.position.y, z = this.mesh.position.z){
        this.position.x = x
        this.position.y = y
        this.position.z = z
    }

    updateRotation(x = this.mesh.rotation.x, y = this.mesh.rotation.y, z = this.mesh.rotation.z){
        this.rotation.x = x
        this.rotation.y = y
        this.rotation.z = z
    }
    
    updateScale(x = this.mesh.scale.x, y = this.mesh.scale.y, z = this.mesh.scale.z){
        this.scale.x = x
        this.scale.y = y
        this.scale.z = z
    }

    anime(mode="ROTATING"){
        this.shouldAnimate = !this.shouldAnimate
        this.animationMode = mode
    }

    changeWireframe(value){
        this.mesh.material.wireframe = value;
    }

    toString(){
        return this.repr;
    }
}