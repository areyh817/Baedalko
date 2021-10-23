
// 캔버스 생성
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


let Character = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,

    draw(){
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

Character.draw();

class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let cactus = new Cactus();
cactus.draw();


let timer = 0;
let cactusCount = [];
function frameExecution(){
    requestAnimationFrame(frameExecution);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(timer % 85 == 0){
        let cactus = new Cactus();
        cactusCount.push(cactus);
        
    }

    cactusCount.forEach((a) => {
        a.x--;
        a.draw();
    })

    Character.draw()
}

frameExecution();