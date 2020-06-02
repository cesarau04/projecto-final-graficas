dict = [
    {
        obj: "earth.obj",
        img: "earth.jpg"
    },
    {
        obj: "moon.obj",
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

}

function earthSetter(){
    
}

function moonScenario(){

}

function moonSetter(){
    
}

function marsScenario(){
    loadObj(dict[2].obj, dict[2].img)
}

function marsSetter(obj){
    console.log("test")
    console.log(obj)
}