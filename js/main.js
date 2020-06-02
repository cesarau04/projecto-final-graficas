"use strict"
var canvas;
var program;
var mesh;


function main() {
    canvas = document.getElementById("canvas");
    program = new Program(canvas);

    // document.getElementById("animate").checked = false;

    initEventHandler();
    resetUI();

    program.update();
}

class Program {
    constructor(canvasIn) {
        this.objectsInScene = [];
        this.scene = null;
        this.camera = null;
        this.light = null
        this.bIsCameraOrto = false;
        this.sceneReady = false;
        this.canvas = canvasIn;
        this.threeRenderer = null;
        this.currentSelected = null;
        this.anime = null;
        this.cameraRotation = null;

        this.addMesh = this.addMesh.bind(this);
        this.update = this.update.bind(this);
        this.createPerspectiveCamera = this.createPerspectiveCamera.bind(this);
        this.createOrtoCamera = this.createOrtoCamera.bind(this)
        this.listUpdater = this.listUpdater.bind(this);
        this.clickchecker = this.clickchecker.bind(this);

        this.controls = null
        // Auto init
        this.__restart__()
    }

    __restart__() {
        this.threeRenderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.threeRenderer.setSize(this.canvas.width, this.canvas.height);
        this.threeRenderer.setClearColor("black");
        this.scene = new THREE.Scene();
        this.createPerspectiveCamera()
        this.scene.add(this.camera);
        this.light = this.createLight()
        this.scene.add(this.light);
        this.objectsInScene = []
        this.sceneReady = true;
        this.currentSelected = null;
        this.bIsCameraOrto = false;
        this.anime = new Anime()
        document.getElementById("figure-list").innerHTML = ''
        this.objectsInScene = []


        this.controls = new THREE.OrbitControls(this.camera, this.threeRenderer.domElement);
    }

    createLight() {
        return new THREE.AmbientLight();
    }

    createPerspectiveCamera(fov = 60., near = 0.01, far = 10000, x = 0., y = 10., z = 15.) {
        var camera = new THREE.PerspectiveCamera(fov, this.canvas.width / this.canvas.height, near, far);
        camera.position.set(x, y, z);
        camera.lookAt(0., 0., 0.)
        this.camera = camera
        this.bIsCameraOrto = false;
        this.cameraRotation = this.camera.rotation
    }

    createOrtoCamera(left = -5,
        right = 5,
        top = 5,
        bottom = -5,
        near = 0.01,
        far = 10000,
        x = 0.,
        y = 0.,
        z = 10) {
        var camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        camera.position.set(x, y, z)
        this.camera = camera
        this.bIsCameraOrto = true;
        this.cameraRotation = this.camera.rotation
    }

    moveCamera(x, y, z) {
        this.camera.position.x = x
        this.camera.position.y = y
        this.camera.position.z = z
    }

    addMesh(obj) {
        this.scene.add(obj)
        this.objectsInScene.push(obj)
        this.sceneReady = true;
        this.currentSelected = obj
        document.getElementById("figure-list").innerHTML = ''
        this.listUpdater(obj)
    }

    update() {
        if (this.sceneReady) {
            this.threeRenderer.render(this.scene, this.camera);
        }

        for (var obj in this.objectsInScene) {
            this.anime.do(this.objectsInScene[obj]);
        }

        refreshTransformUI();
        requestAnimationFrame(this.update);
    }

    listUpdater(obj) {
        document.getElementById("figure-list").innerHTML = "";
        for (var obj in this.objectsInScene) {
            var x = document.createElement("LI");
            if (program.currentSelected.type === "Group") {
                var t = document.createTextNode(this.objectsInScene[obj].repr + " " + this.objectsInScene[obj].id);
            } else {
                var t = document.createTextNode(this.objectsInScene[obj].repr + " " + this.objectsInScene[obj].id);
                
            }
            x.addEventListener('click', this.clickchecker.bind(event, obj));
            x.appendChild(t);
            document.getElementById("figure-list").appendChild(x);
        }
    }

    clickchecker(obj, x) {
        this.currentSelected = this.objectsInScene[obj];
        document.getElementById("seleccionado").innerHTML = this.currentSelected + this.currentSelected.id
    }
}

