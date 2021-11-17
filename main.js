"use strict"
// 캔버스 생성
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let firstgradeImg = new Image(); //1학년 체육복
firstgradeImg.src = 'fgrade_1.png';

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

let c = new Image();    //c-1
c.src = 'obstacle/c.png';

let cc = new Image(); //c++-2
cc.src = 'obstacle/cc.png';

let js = new Image(); //js-3
js.src = 'obstacle/js.png';

let error = new Image(); //error-4
error.src = 'obstacle/error.png';

let coin = new Image(); //coin-5
coin.src = 'obstacle/coin.png';

let java = new Image(); //java-6
java.src = 'obstacle/java.png';

/*
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
*/

class C { //C언어 장애물 - 1
    constructor() {
        this.x = 900;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        ctx.drawImage(c, this.x, this.y, this.width, this.height);
    }
}

class CC { //C++ 장애물 - 2
    constructor() {
        this.x = 900;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        ctx.drawImage(cc, this.x, this.y, this.width, this.height);
    }
}

class JS { //JS 장애물 - 3
    constructor() {
        this.x = 900;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        ctx.drawImage(js, this.x, this.y, this.width, this.height);
    }
}

class ERROR { //error 장애물 - 4
    constructor() {
        this.x = 900;
        this.y = 530; 
        this.width = 60;
        this.height = 40;
    }
    draw() {
        ctx.drawImage(error, this.x, this.y, this.width, this.height);
    }
}

class COIN { //coin 장애물 - 5
    constructor() {
        this.x = 900;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        ctx.drawImage(coin, this.x, this.y, this.width, this.height);
    }
}

class JAVA { //C언어 장애물 - 6
    constructor() {
        this.x = 900;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        ctx.drawImage(java, this.x, this.y, this.width, this.height);
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
        let c = new C();
        let cc = new CC();
        let js = new JS();
        let error = new ERROR();
        let coin = new COIN();
        let java = new JAVA();

        let rand = Math.floor(Math.random() * 7) + 1;

        switch(rand) {
            case 1 : obstacleCount.push(c); break;
            case 2 : obstacleCount.push(cc); break;
            case 3 : obstacleCount.push(js); break;
            case 4 : obstacleCount.push(error); break;
            case 5 : obstacleCount.push(coin); break;
            case 6 : obstacleCount.push(java); break;
        }
    }

    obstacleCount.forEach((a, i, o) => {
        // x좌표가 0미만이면 제거해야한다.
        if(a.x < 0) {
            o.splice(i, 1);
        }
        
        let ob_random = Math.floor(Math.random() * 5) + 1;
        switch(ob_random) {
            case 1 : a.x -= 3; break;//alert("4"); break;
            case 2 : a.x -= 7; break;//alert("6"); break;
            case 3 : a.x -= 12; break;//alert("9"); break;
            case 4 : a.x -= 19; break;//alert("12"); break;
            case 5 : a.x -= 25; break;//alert("15"); break;

        }

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