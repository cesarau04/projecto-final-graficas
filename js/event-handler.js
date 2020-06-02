isWireFrame = false;
backgorundPlaying = false;
hex = "#ffffff"

function toolsEventHandler(e) {
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
  hex = document.getElementById("color-palette").value
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

function resetUI() {
}

function refreshTransformUI() {
  if (program.currentSelected === null) {
    return
  }
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

function parabolaTest() {
  let box = new Box()
  program.addMesh(box)
}

function btn_bask() {
  loadBasketball()
}

function getValuesParabola() {
  program.velocity = Number(document.getElementById("velocity_val").value)
  program.angle = Number(document.getElementById("angle_val").value)
  program.height = program.currentSelected.position.y
  program.gravity = Number(document.getElementById("gravity_val").value)
  
  program.bShouldThrow = true
}

function btn_throw() {
  getValuesParabola()
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
  
  // Throw button
  document.getElementById("btn-throw").addEventListener("click", btn_throw);

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

  // Button Test
  document.getElementById("btn-test").addEventListener("click", parabolaTest)
  
  // Basket button
  document.getElementById("btn-bask").addEventListener("click", btn_bask)
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
