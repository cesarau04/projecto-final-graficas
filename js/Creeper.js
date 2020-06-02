class Creeper extends THREE.Group{
    constructor(){
        super();
        this.repr = "creeper";
        this.front_foot = new Box(2.4, 1.8, 1.2);
        this.front_foot.updatePosition(0, -5, 1.2);

        this.back_foot = new Box(2.4, 1.8, 1.2);
        this.back_foot.updatePosition(0, -5, -1.2);
        
        this.body = new Box(2.4, 3.6, 1.2);
        this.body.updatePosition(0, -2.3, 0);
        
        this.head = new Box(2.4, 2.4, 2.1);
        this.head.updatePosition(0, 0.7, -0.3);
        //top
        this.faceA = new Box(2.4, 0.6, 0.3);
        this.faceA.updatePosition(0, 1.6, 0.9);
        //left
        this.faceB = new Box(0.3, 1.8, 0.3);
        this.faceB.updatePosition(-1, 1, 0.9);
        //right
        this.faceC = new Box(0.3, 1.8, 0.3);
        this.faceC.updatePosition(1, 1, 0.9);
        //yeh
        this.faceD = new Box(0.6, 0.6, 0.3);
        this.faceD.updatePosition(0, 1.08, 0.9);

        this.faceE = new Box(0.6, 0.9, 0.3);
        this.faceE.updatePosition(-0.85, 0, 0.9);

        this.faceF = new Box(0.6, 0.9, 0.3);
        this.faceF.updatePosition(0.85, 0, 0.9);

        this.faceG = new Box(0.9, 0.3, 0.3);
        this.faceG.updatePosition(-0.72, 0.6, 0.9);

        this.faceH = new Box(0.9, 0.3, 0.3);
        this.faceH.updatePosition(0.72, 0.6, 0.9);

        this.faceI = new Box(0.6, 0.3, 0.3);
        this.faceI.updatePosition(0, -0.3, 0.9);

        this.mouth = new Box(2.3, 2.4, 0.001);
        this.mouth.updatePosition(0, 0.8, 0.9);
        this.color = new THREE.Color("rgb(0, 0, 0)");
        this.mouth.mesh.material.color = this.color;



        this.add(this.front_foot);
        this.add(this.back_foot);
        this.add(this.body);
        this.add(this.head);
        this.add(this.faceA);
        this.add(this.faceB);
        this.add(this.faceC);
        this.add(this.faceD);
        this.add(this.faceE);
        this.add(this.faceF);
        this.add(this.faceG);
        this.add(this.faceH);
        this.add(this.faceI);
        this.add(this.mouth);
    
        this.shouldAnimate = false;
        this.animationMode = null;

        this.anime = this.anime.bind(this);
    
    
    }

    changeWireframe(value){
        //this.children.Box.mesh.material.wireframe = value;
        console.log(this.children)
        for (var i = 0; i<this.children.length; i++){
            this.children[i].mesh.material.wireframe = value;
        }
    }

    anime(mode="ROTATING"){
        this.shouldAnimate = !this.shouldAnimate
        this.animationMode = mode
    }
}