dict = [
    {
        obj: "earth.obj",
        img: "earth.jpg"
    },
    {
        obj: "mars.obj",
        img: "moon.jpg"
    },
    {
        obj: "mars.obj",
        img: "mars.png"
    }
];

scenarios = {

}

function earthScenario(){
    program.__restart__()

    loadObj(dict[0].obj, dict[0].img)
}

function earthSetter(obj){
    console.log(obj)
    obj.rotation.x = -0.3
    obj.position.z = 2
    obj.position.y = 2

}

function moonScenario(){
    program.__restart__()

    loadObj(dict[1].obj, dict[1].img)
}

function moonSetter(obj){
    console.log(obj)
    obj.scale.x = 0.01
    obj.scale.y = 0.01
    obj.scale.z = 0.01

    obj.rotation.x = -2
    obj.position.z = 6
    obj.position.y = 2
}

function marsScenario(){
    program.__restart__()
    loadObj(dict[2].obj, dict[2].img)
}

function marsSetter(obj){
    console.log(obj)
    obj.scale.x = 0.01
    obj.scale.y = 0.01
    obj.scale.z = 0.01

    obj.rotation.x = -2
    obj.position.z = 6
    obj.position.y = 2
}