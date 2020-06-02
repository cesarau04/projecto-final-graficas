class Sphere extends THREE.Mesh {
    constructor(r = 1, ws = 32, hs = 32) {
        super();
        this.geometry = new THREE.SphereGeometry(r, ws, hs);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.repr = "Sphere"

        this.shouldAnimate = false;
        this.animationMode = null;

        this.updatePosition = this.updatePosition.bind(this);
        this.updateRotation = this.updateRotation.bind(this);
        this.updateScale = this.updateScale.bind(this);

        this.anime = this.anime.bind(this);
        this.toString = this.toString.bind(this);
    }

    updatePosition(x = this.mesh.position.x, y = this.mesh.position.y, z = this.mesh.position.z) {
        this.position.x = x
        this.position.y = y
        this.position.z = z
    }

    updateRotation(x = this.mesh.rotation.x, y = this.mesh.rotation.y, z = this.mesh.rotation.z) {
        this.rotation.x = x
        this.rotation.y = y
        this.rotation.z = z
    }
    updateScale(x = this.mesh.scale.x, y = this.mesh.scale.y, z = this.mesh.scale.z) {
        this.scale.x = x
        this.scale.y = y
        this.scale.z = z
    }

    anime(mode = "ROTATING") {
        this.shouldAnimate = !this.shouldAnimate
        this.animationMode = mode
    }

    changeWireframe(value){
        this.mesh.material.wireframe = value;
    }

    toString() {
        return this.repr;
    }
}