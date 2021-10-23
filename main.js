
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
let jumpTimer = 0;

function frameExecution(){
    requestAnimationFrame(frameExecution);
    timer++;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(timer % 85 == 0){
        let cactus = new Cactus();
        cactusCount.push(cactus);
        
    }

    cactusCount.forEach((a, i, o) => {
        // x좌표가 0미만이면 제거해야한다.
        if(a.x < 0){
            o.splice(i, 1);
        }
        a.x--;
        a.draw();
    })
    
    if(jumpSwitch == true){
        Character.y--;
        jumpTimer++;
    }
    if(jumpSwitch == false){
        if(Character.y < 200) Character.y++;
    }

    if(jumpTimer > 100){ jumpSwitch = false; }
    Character.draw()
}

frameExecution();

var jumpSwitch = false; // 점프를 하는지 안 하는지 체크해주는 거
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jumpSwitch = true;
    }
})