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
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
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

class C { //C언어 장애물 - 1
    constructor() {
        this.id = 1;
        this.x = 1500;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(c, this.x, this.y, this.width, this.height);
    }
}

class CC { //C++ 장애물 - 2
    constructor() {
        this.id = 2;
        this.x = 1500;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(cc, this.x, this.y, this.width, this.height);
    }
}

class JS { //JS 장애물 - 3
    constructor() {
        this.id = 3;
        this.x = 1500;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(js, this.x, this.y, this.width, this.height);
    }
}

class ERROR { //error 장애물 - 4
    constructor() {
        this.id = 4;
        this.x = 1500;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(error, this.x, this.y, this.width, this.height);
    }
}

class COIN { //coin 장애물 - 5
    constructor() {
        this.id = 5;
        this.coin_cnt = 0; //코인 갯수
        this.coin_bool = false;
        this.x = 1500;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(coin, this.x, this.y, this.width, this.height);
    }
}

class JAVA { //C언어 장애물 - 6
    constructor() {
        this.id = 6;
        this.x = 1500;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(java, this.x, this.y, this.width, this.height);
    }
}

let timer = 0;
let obstacleCount = [];
let jumpTimer = 0;
let animation;

//코인 개수 함수
function CoinCounter() {
    let coin_cnt = 0;
    return function() {
        return ++coin_cnt;
    }
}
let coincounter1 = CoinCounter();

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

        let rand = Math.floor(Math.random() * 7) + 1; //1~7 랜덤

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
        
        let ob_random = Math.floor(Math.random() * 4) + 1; //1~4 랜덤

        switch(ob_random) {
            case 1 : a.x -= 3; break;
            case 2 : a.x -= 9; break;
            case 3 : a.x -= 22; break;
            case 4 : a.x -= 28; break;

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
        if(Character.y < 437) { //440
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
        //alert("충돌!");
        switch(obstacle.id) { //장애물 아이디로 장애물 구별
            case 1 : case 2 : case 4 : case 6 : //충돌한 것이 c언어, c++, error, java 일 때
                alert("장애물과 충돌!!");
                ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
                cancelAnimationFrame(animation); //게임 중단
                break;

            case 3 :     //충돌한 것이 js일 때 
                alert("JS 아이템 획득!!");
                obstacleCount.forEach((a, i, o) => { //js 아이템 삭제
                    o.splice(i, 1);
                })
                //코딩 문제 나오는 함수
                break;

            case 5 :    //충돌한 것이 coin일 때
                //let coin = new COIN();
        
                alert("COIN 아이템 획득!!");
                
                //coin.coin_cnt++; //코인 갯수 쁠쁠
        
                //alert(coin.coin_cnt); //코인 갯수 더해진 거 확인 문구
                
                alert(`획득한 코인 개수 : ${coincounter1()}`);
                //alert(coincounter1());

                obstacleCount.forEach((a, i, o) => { //코인 아이템 삭제
                    o.splice(i, 1);
                })
        
                if(coin.coin_cnt == 10) { //코인의 개수가 10개라면 
                    coin.coin_cnt = 0;  //코인 개수 0개로 초기화
                    //속도 빨라지는 함수 
        
                }
                
                break;


            /*
            //충돌할 때 어떤 아이템인지 확인하려고 만든 것
            case 1 : 
                alert("c!!");
                //ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
                //cancelAnimationFrame(animation); //게임 중단
                break;

            case 2 : 
                alert("c++!!");
                //ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
                //cancelAnimationFrame(animation); //게임 중단
                break;

            case 3 : 
                alert("js!!");
                //ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
                //cancelAnimationFrame(animation); //게임 중단
                break;

            case 4 : 
                alert("error!!");
                //ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
                //cancelAnimationFrame(animation); //게임 중단
                break;

            case 5 : 
                alert("coin!!");
                //ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
                //cancelAnimationFrame(animation); //게임 중단
                break;

            case 6 : 
                alert("java!!");
                //ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
                //cancelAnimationFrame(animation); //게임 중단
                break;
            */
        } 
    }
}

// 스페이스를 누를 때마다 점프하기
var jumpSwitch = false; // 점프를 하는지 안 하는지 체크해주는 거
document.addEventListener('keydown', function(e) {
    if(e.code === 'Space'){
        jumpSwitch = true;
    }
})