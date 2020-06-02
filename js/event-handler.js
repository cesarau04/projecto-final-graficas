isWireFrame = false;
backgorundPlaying = false;
hex = "#ffffff"

function toolsEventHandler(e) {
  console.log("Enter EventHandler with " + e);

  // older project lines
  if (e === 'creeper') {
    program.addMesh(new Creeper());
    program.currentSelected.changeWireframe(isWireFrame);
    changeColor(hex);
  }
  if (e === 'floor') {
    program.addMesh(new Floor());
    program.currentSelected.changeWireframe(isWireFrame);
    changeColor(hex);
  }

  if (e === "sphere") {
    program.addMesh(new Sphere());
    program.currentSelected.changeWireframe(isWireFrame);
    changeColor(hex);
  }
  if (e === "box") {
    program.addMesh(new Box());
    program.currentSelected.changeWireframe(isWireFrame);
    changeColor(hex);
  }
  if (e === "cylinder") {
    program.addMesh(new Cylinder());
    program.currentSelected.changeWireframe(isWireFrame);
    changeColor(hex);
  }
  if (e === "cone") {
    program.addMesh(new Cone());
    program.currentSelected.changeWireframe(isWireFrame);
    changeColor(hex);
  }
  if (e === "torus") {
    program.addMesh(new Torus());
    program.currentSelected.changeWireframe(isWireFrame);
    changeColor(hex);
  }
  if (e === "torus-knot") {
    program.addMesh(new TorusKnot());
    program.currentSelected.changeWireframe(isWireFrame);
    changeColor(hex);
  }
  if (e === "solid") {
    isWireFrame = false;
    for (i = 0; i < program.objectsInScene.length; i++) {
      program.objectsInScene[i].changeWireframe(false);
    }
  } else if (e === "wiref") {
    isWireFrame = true;
    for (i = 0; i < program.objectsInScene.length; i++) {
      program.objectsInScene[i].changeWireframe(true);
    }
  }

  if (e === "camera-change") {
    if (program.bIsCameraOrto) {
      program.createPerspectiveCamera();
    } else {
      program.createOrtoCamera(-5, 5, 5, -5);
    }
  }

  if (e === "reposition") {
    if (program.bIsCameraOrto) {
      program.camera.rotation = program.cameraRotation
      program.createOrtoCamera();
    } else {
      program.camera.rotation = program.cameraRotation
      program.createPerspectiveCamera();
    }
  }

  if (e === "delete-current") {
    newScene = []
    console.log(program.objectsInScene);

    for (var i in program.objectsInScene) {
      if (program.objectsInScene[i].id === program.currentSelected.id) {
        document.getElementById("figure-list").innerHTML = ''
      } else {
        newScene.push(program.objectsInScene[i])
      }
    }


    var bkCamera = program.camera;
    var bkLight = program.light;
    program.scene.dispose();
    program.scene = new THREE.Scene();
    program.scene.add(bkCamera);
    program.scene.add(bkLight);
    program.objectsInScene = []
    for (var i in newScene) {
      program.addMesh(newScene[i])
    }
  }
  if (e === "clear") {
    program.__restart__();
  }
}

function colorPaletteEvent() {
  hex = document.getElementById("color-palette").value//.replace("#","0x")
  console.log(hex);
  changeColor(hex);
}

function changeColor(rgb) {
  var newColor = new THREE.Color(rgb);
  if (program.currentSelected.type === "Group") {
    for (var i = 0; i < program.currentSelected.children.length - 1; i++) {
      console.log(program.currentSelected.children[i]);
      program.currentSelected.children[i].mesh.material.color = newColor;
    }
  } else {
    program.currentSelected.mesh.material.color = newColor;
  }
}

function onModeChange(e) {
  // EditMode = !EditMode
  console.log("EditMode val: ") // + EditMode);
}

function resetUI() {
  // document.getElementById("zoom-slider").value = 0
  // document.getElementById("pan-slider").value = 0
  // document.getElementById("dolly-slider").value = 0
  // document.getElementById("tilt-slider").value = 0
}

function refreshTransformUI() {
  if (program.currentSelected === null) {
    return
  }
  // document.getElementById("translation-x").value = program.currentSelected.position.x
  // document.getElementById("translation-y").value = program.currentSelected.position.y
  // document.getElementById("translation-z").value = program.currentSelected.position.z

  // document.getElementById("rotation-x").value = program.currentSelected.rotation.x
  // document.getElementById("rotation-y").value = program.currentSelected.rotation.y
  // document.getElementById("rotation-z").value = program.currentSelected.rotation.z

  // document.getElementById("scale-x").value = program.currentSelected.scale.x
  // document.getElementById("scale-y").value = program.currentSelected.scale.y
  // document.getElementById("scale-z").value = program.currentSelected.scale.z

  // if (program.currentSelected.shouldAnimate) {
  //   document.getElementById("animate").checked = true;
  // } else {
  //   document.getElementById("animate").checked = false;
  // }
}

// function 

function onZoomCamera(e) {
  console.log(document.getElementById("zoom-slider").value);

  if (program.bIsCameraOrto) {
    program.camera.zoom = document.getElementById("zoom-slider").value / CamVelocityFactor;
    program.camera.updateProjectionMatrix();
  } else {
    program.camera.fov *= document.getElementById("zoom-slider").value / CamVelocityFactor;
    program.camera.updateProjectionMatrix();
  }
}

var CamVelocityFactor = 50;
function onPanCamera(e) {
  var panValue = document.getElementById("pan-slider").value / CamVelocityFactor;
  program.camera.position.x = program.camera.position.x + panValue
  document.getElementById("pan-slider").value = 0
}

function onDollyCamera(e) {
  var dollyValue = document.getElementById("dolly-slider").value / CamVelocityFactor;
  program.camera.position.z = program.camera.position.z + dollyValue
  document.getElementById("dolly-slider").value = 0
}

function onTiltCamera(e) {
  var tiltValue = document.getElementById("tilt-slider").value / CamVelocityFactor;
  program.camera.position.y = program.camera.position.y + tiltValue
  document.getElementById("tilt-slider").value = 0
}

function onAnimToggle(e) {
  program.currentSelected.anime()
}

function onCamRotX(e) {
  program.camera.rotation.x += document.getElementById("camrot-x-slider").value * Math.PI / 180
  document.getElementById("camrot-x-slider").value = 0
}

function onCamRotY(e) {
  program.camera.rotation.y += document.getElementById("camrot-y-slider").value * Math.PI / 180
  document.getElementById("camrot-y-slider").value = 0
}

function onCamRotZ(e) {
  program.camera.rotation.z += document.getElementById("camrot-z-slider").value * Math.PI / 180
  document.getElementById("camrot-z-slider").value = 0
}

function initApp() {

  document.getElementById("btn-init").setAttribute("class", "waves-effect waves-light btn disabled")

  program.addMesh(new Floor());
  if(!backgorundPlaying){
    backgorundPlaying = true;
    loadSound("background.mp3", true, 0.1);
  }  
}

function askForFilename() {
  // ASK FOR FILENAME
  loadObj("Mars.obj", "mars.png");
}

function initEventHandler(e) {

  // rightside buttons
  document.getElementById("btn-init").addEventListener("click", initApp);
  document.getElementById("btn-load").addEventListener("click", askForFilename);
  document.getElementById("btn-cam").addEventListener("click", function(){loadSound("throw.flac", false, 0.5)});

  // leftside buttons (balls)
  document.getElementById("btn-base").addEventListener("click", function(){ballLoader("baseball")});
  document.getElementById("btn-teni").addEventListener("click", function(){ballLoader("tenis")});
  document.getElementById("btn-bowl").addEventListener("click", function(){ballLoader("bowling")});
  document.getElementById("btn-bask").addEventListener("click", function(){ballLoader("basket")});

  //leftside buttons (scenarios)
  document.getElementById("btn-eart").addEventListener("click", function(){scenarioLoader("earth")});
  document.getElementById("btn-moon").addEventListener("click", function(){scenarioLoader("moon")});
  document.getElementById("btn-mars").addEventListener("click", function(){scenarioLoader("mars")});

  // document.addEventListener("keydown", onDocumentKeyDown, false);

  // document.getElementById("zoom-slider").addEventListener("change", onZoomCamera);
  // document.getElementById("pan-slider").addEventListener("change", onPanCamera);
  // document.getElementById("dolly-slider").addEventListener("change", onDollyCamera);
  // document.getElementById("tilt-slider").addEventListener("change", onTiltCamera);

  // Translation Sliders
  document.getElementById("transl-x-slider").addEventListener("input",translationSliders);
  document.getElementById("transl-y-slider").addEventListener("input",translationSliders);
  document.getElementById("transl-z-slider").addEventListener("input",translationSliders);

  // Rotation Sliders
  document.getElementById("rotation-x-slider").addEventListener("input",rotationSliders);
  document.getElementById("rotation-y-slider").addEventListener("input",rotationSliders);
  document.getElementById("rotation-z-slider").addEventListener("input",rotationSliders);

  // Scale Sliders
  document.getElementById("scale-x-slider").addEventListener("input",scaleSliders);
  document.getElementById("scale-y-slider").addEventListener("input",scaleSliders);
  document.getElementById("scale-z-slider").addEventListener("input",scaleSliders);

  // document.getElementById("animate").addEventListener("change", onAnimToggle)
  // document.getElementById("camrot-x-slider").addEventListener("change", onCamRotX)
  // document.getElementById("camrot-y-slider").addEventListener("change", onCamRotY)
  // document.getElementById("camrot-z-slider").addEventListener("change", onCamRotZ)
}

function translationSliders(event) {
  var newX = Number(document.getElementById("transl-x-slider").value) / CamVelocityFactor;
  var newY = Number(document.getElementById("transl-y-slider").value) / CamVelocityFactor;
  var newZ = Number(document.getElementById("transl-z-slider").value) / CamVelocityFactor;
  document.getElementById("trans_val_x").innerHTML = newX;
  document.getElementById("trans_val_y").innerHTML = newY;
  document.getElementById("trans_val_z").innerHTML = newZ;
  program.currentSelected.updatePosition(program.currentSelected.position.x + newX, program.currentSelected.position.y + newY, program.currentSelected.position.z + newZ);
}

function rotationSliders(event) {
  var newX = Number(document.getElementById("rotation-x-slider").value) / CamVelocityFactor;
  var newY = Number(document.getElementById("rotation-y-slider").value) / CamVelocityFactor;
  var newZ = Number(document.getElementById("rotation-z-slider").value) / CamVelocityFactor;
  document.getElementById("rot_val_x").innerHTML = newX;
  document.getElementById("rot_val_y").innerHTML = newY;
  document.getElementById("rot_val_z").innerHTML = newZ;
  program.currentSelected.updateRotation(program.currentSelected.rotation.x + newX, program.currentSelected.rotation.y + newY, program.currentSelected.rotation.z + newZ);
}

function scaleSliders(event) {
  var newX = Number(document.getElementById("scale-x-slider").value / (CamVelocityFactor * 2));
  var newY = Number(document.getElementById("scale-y-slider").value / (CamVelocityFactor * 2));
  var newZ = Number(document.getElementById("scale-z-slider").value / (CamVelocityFactor * 2));
  document.getElementById("escal_val_x").innerHTML = newX;
  document.getElementById("escal_val_y").innerHTML = newY;
  document.getElementById("escal_val_z").innerHTML = newZ;
  program.currentSelected.updateScale(program.currentSelected.scale.x + newX, program.currentSelected.scale.y + newY, program.currentSelected.scale.z + newZ);
}
