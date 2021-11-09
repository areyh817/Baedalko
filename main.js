"use strict"
// 캔버스 생성
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let firstgradeImg = new Image(); //1학년 체육복
firstgradeImg.src = 'f_grade.gif';

let js = new Image(); //js-1
js.src = 'js.png';

// let coin = new Image(); //coin-2
// coin.src = 'coin.png';

// let C = new Image(); //C-3
// C.src = 'c.png';

// let CC = new Image(); //C++-4
// CC.src = 'cc.png';

// let error = new Image(); //error-5
// error.src = 'error.png';

// let java = new Image(); //JAVA-6
// java.src = 'java.png';

let Character = {
    x : 90,
    y : 450,//300
    width : 80,
    height : 80,

    draw(){
        ctx.fillStyle = "green";
        ctx.drawImage(firstgradeImg, this.x, this.y);
    }
}

Character.draw();

class Cactus{
    constructor(){
        this.x = 700;
        this.y = 510;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(js, this.x, this.y);
    }
}

let cactus = new Cactus();
cactus.draw();


let timer = 0;
let cactusCount = [];
let jumpTimer = 0;
let animation;

function frameExecution(){
    animation = requestAnimationFrame(frameExecution);
    timer++;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(timer % 180 == 0){
        let cactus = new Cactus();
        cactusCount.push(cactus);
        
    }

    cactusCount.forEach((a, i, o) => {
        // x좌표가 0미만이면 제거해야한다.
        if(a.x < 0){
            o.splice(i, 1);
        }
        a.x--;
        collision(Character, a); //충돌확인
        a.draw();
    })
    
    // 점프
    if(jumpSwitch == true){
        Character.y -= 7;
        jumpTimer++;
    }
    if(jumpSwitch == false){
        if(Character.y < 440) Character.y += 7;
    }

    if(jumpTimer > 20){ jumpSwitch = false; jumpTimer = 0; }
    Character.draw()
}

frameExecution();

function collision(Character, cactus) {
    let X_x = cactus.x - (Character.x + Character.width); //x축 차이
    let Y_y = cactus.y - (Character.y + Character.height); //y축 차이
    if(X_x < 0 && Y_y < 0) { //충돌
        ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
        cancelAnimationFrame(animation); //게임 중단
    }
}

// 스페이스를 누를 때마다 점프하기
var jumpSwitch = false; // 점프를 하는지 안 하는지 체크해주는 거
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jumpSwitch = true;
    }
})

