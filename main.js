"use strict"
// 캔버스 생성
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let firstgradeImg = new Image(); //1학년 체육복
firstgradeImg.src = 'fgrade_1.png';


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

let Character = { //캐릭터
    x : 180,
    y : 100,//300 //100
    width : 110, //80 //980 //110
    height : 140, //80 //980 //130

    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(firstgradeImg, this.x, this.y, this.width, this.height);
    }
}

let js = new Image(); //js-1
js.src = 'obstacle/js.png';

let c = new Image();    //c-2
c.src = 'obstacle/c.png';

class Obstacle { //장애물
    constructor() {
        this.x = 900;
        this.y = 522; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(js, 200, 360, 500, 350);
        ctx.drawImage(c, this.x, this.y, this.width, this.height);
    }
}

let timer = 0;
let obstacleCount = [];
let jumpTimer = 0;
let animation;

function frameExecution(){
    animation = requestAnimationFrame(frameExecution);
    timer++;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(timer % 60 === 0) {
        let obstacle = new Obstacle();
        obstacleCount.push(obstacle);
        
    }

    obstacleCount.forEach((a, i, o) => {
        // x좌표가 0미만이면 제거해야한다.
        if(a.x < 0) {
            o.splice(i, 1);
        }
        a.x-=10;
        collision(Character, a); //캐릭터와 장애물 충돌확인 
        a.draw();
    })
    
    // 점프
    if (jumpSwitch == true) {
        Character.y -= 9;
        jumpTimer++;
    }

    if (jumpSwitch == false) {
        if(Character.y < 440) { //440
            Character.y += 15;
        }
    }

    if (jumpTimer > 20) {  
        jumpSwitch = false; 
        jumpTimer = 0; 
    }

    Character.draw()
}

frameExecution();

//충돌 확인
function collision(Character, obstacle) {
    let Ob_rx = obstacle.x + obstacle.width; //장애물의 우측 끝 x좌표
    let Pl_rx = Character.x + Character.width;   //캐릭터의 우측 끝 x좌표

    let Ob_ry = obstacle.y + obstacle.height; //장애물의 하단 끝 y좌표
    let Pl_ry = Character.y + Character.height; //캐릭터의 하단 끝 y좌표 
    
    if(Ob_rx > Character.x && obstacle.x < Pl_rx && Ob_ry > Character.y && obstacle.y < Pl_ry) { //충돌
        alert("충돌쓰");
        ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
        cancelAnimationFrame(animation); //게임 중단
    }
}

// 스페이스를 누를 때마다 점프하기
var jumpSwitch = false; // 점프를 하는지 안 하는지 체크해주는 거
document.addEventListener('keydown', function(e) {
    if(e.code === 'Space'){
        jumpSwitch = true;
    }
})

let rand = Math.floor(Math.random() * 7) + 1;