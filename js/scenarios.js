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
}

function moonScenario(){
    program.__restart__()

    loadObj(dict[1].obj, dict[1].img)
}

function moonSetter(obj){
    console.log(obj)
}

function marsScenario(){
    program.__restart__()
    
    loadObj(dict[2].obj, dict[2].img)
}

function marsSetter(obj){
    console.log("test")
    console.log(obj)
}