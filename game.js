"use strict"
// 캔버스 생성
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let CharacterCheck = false;

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let Fgrade1 = new Image();


// 1학년 체육복
let imgArray1 = new Array();
imgArray1[0] = "fgrade/fgrade_1.png";
imgArray1[1] = "fgrade/fgrade_2.png";
imgArray1[2] = "fgrade/fgrade_3.png";
imgArray1[3] = "fgrade/fgrade_4.png";
imgArray1[4] = "fgrade/fgrade_5.png";
imgArray1[5] = "fgrade/fgrade_6.png";
imgArray1[6] = "fgrade/fgrade_7.png";
imgArray1[7] = "fgrade/fgrade_8.png";

function showImage(){
    let imgNum = Math.round(Math.random()*7);
    Fgrade1 = document.getElementById("introimg");
    Fgrade1.src = imgArray1[imgNum];
    setTimeout(showImage, 100);
}



let Character = { //캐릭터
    x : 180,
    y : 100,//300 //100
    width : 130, //80 //980 //110
    height : 170, //80 //980 //130
    score : 0, //플레이어 점수
    size : false, //플레이어 js 아이템 획득 시 true, false에 따라 충돌
    item_time : 5, //js, coin 아이템 효력 시간은 모두 5초 

    draw1() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(Fgrade1, this.x, this.y, this.width, this.height);

    },

    draw2() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(Fgrade2, this.x, this.y, this.width, this.height);
    },

    draw3() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(Fgrade3, this.x, this.y, this.width, this.height);
    },

    draw4() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(Fgrade4, this.x, this.y, this.width, this.height);
    },

    draw5() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(Fgrade5, this.x, this.y, this.width, this.height);
    },

    draw6() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(Fgrade6, this.x, this.y, this.width, this.height);
    },

    draw7() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(Fgrade7, this.x, this.y, this.width, this.height);
    },

    draw8() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(Fgrade8, this.x, this.y, this.width, this.height);
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
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(java, this.x, this.y, this.width, this.height);
    }
}


// 아이템 충돌시 보여질 문제
function itemQuestion(){
    let question = [
        "[띄어쓰기 금지]\njava는 무슨 언어일까요 ?",
        "[띄어쓰기 금지]\nJava의 상수 선언할 때 사용하는 단어는 ?",
        "[띄어쓰기 금지]\n기존의 클래스에 기능을 추가하거나 재정의 하여 새로운 클래스를 정의 하는 것은 ?",
        "[띄어쓰기 금지]\nC언어에서 int는 몇 byte인가요 ?",
        "[띄어쓰기 금지]\n프로그램이 실행하는데 영향을 주지 않는 언어 구성 요소이고\nJava에선 //, /**/ html에서는 <!-->이 기본적이다.",
        "[띄어쓰기 금지]\njavascript에서 엄격모드를 사용하기 위해 코드 최상단에 쓰는 것은 ?",
        "[띄어쓰기 금지]\njavascript에서는 예전에는 변수 선언할 때 var를 썼다. 최근들어서 변수를 선언할 때 쓰는 것은 ?",
        "[띄어쓰기 금지]\n같은 블록내에서 선언한 변수만 사용가능한 변수를 칭하는 것은 ?",
        "[띄어쓰기 금지]\n블록 밖에서 선언하여 어디서든 다 사용가능한 변수를 칭하는 것은 ?",
        "[띄어쓰기 금지]\nHTML이나 XML로 작성된 문서의 표시 방법을 기술하기 위한 스타일 시트 언어를 칭하는 것은 ?",
        "[띄어쓰기 금지]\nC언어는 무슨 언어일까요?",
        "[띄어쓰기 금지]\n프로그래밍 언어에서 다른 변수, 혹은 그 변수의 메모리 공간 주소를 가리키는 변수를 말하며\n일반적으로 ◯◯◯는 메모리 주소로 바꿀 수 있다. ◯◯◯에 들어갈 말은 ?",
        "[띄어쓰기 금지]\n◯◯◯◯은 문장의 끝을 의미한다. 자바에서는 문장의 끝에 ◯◯◯◯을 사용하지 않으면 컴파일 에러가 발생한다. ◯◯◯◯에 들어갈 말은 ?",
        "[띄어쓰기 금지]\n◯◯◯는 이미 문법적인 용도로 사용되고 있기 때문에 식별자로 사용할 수 없는 단어들을 칭한다.\n◯◯◯는 변수로 사용할 수 없으며 Java에서 continue는 ◯◯◯이다.",
        "[띄어쓰기 금지]\nc나 java언어에서는 '존재하지 않는 객체'에 대한 참조값을 의미하고 자바스크립트에서는 '존재하지 않거나, 비어있거나, 알 수 없는 값'을 나타내는 것은?",
        "[띄어쓰기 금지]\n자바스크립트에서 typeof null의 값은?",
        "[띄어쓰기 금지]\n자바스크립트에서 typeof alert의 값은?",
        "[띄어쓰기 금지]\n자바스크립트에서 undefined를 숫자로 변환한 값은?",
        "[띄어쓰기 금지]\n자바스크립트에서 null===undefined의 값은?",
        "[띄어쓰기 금지]\n문자로 이루어진 코드를 기계어로 변환하는 장치는?",
        "[띄어쓰기 금지]\nC++ 에서 여러 함수가 이름을 공유하는 것은?",
        "[띄어쓰기 금지]\nC++ 에서는 함수를 선언할 때 매개 변수에 초기값을 지정할 수 있다. 기본 인자로 설정된 변수는?",
        "[띄어쓰기 금지]\n외부에서는 객체의 멤버 접근을 금지하는 키워드는?",
        "[띄어쓰기 금지]\nC++ 에서 메모리 누수로부터 프로그램의 안전성을 보장하기 위해 사용이 끝난 메모리를 자동으로 해제하는 기능은? (영어로)"
    ];
    
    let rand = Math.floor(Math.random() * 23) + 1;
    let answer;
    
    switch(rand){
        case 1: answer = prompt(question[0]); break;
        case 2: answer = prompt(question[1]); break;
        case 3: answer = prompt(question[2]); break;
        case 4: answer = prompt(question[3]); break;
        case 5: answer = prompt(question[4]); break;
        case 6: answer = prompt(question[5]); break;
        case 7: answer = prompt(question[6]); break;
        case 8: answer = prompt(question[7]); break;
        case 9: answer = prompt(question[8]); break;
        case 10: answer = prompt(question[9]); break;
        case 11: answer = prompt(question[10]); break;
        case 12: answer = prompt(question[11]); break;
        case 13: answer = prompt(question[12]); break;
        case 14: answer = prompt(question[13]); break;
        case 15: answer = prompt(question[14]); break;
        case 16: answer = prompt(question[15]); break;
        case 17: answer = prompt(question[16]); break;
        case 18: answer = prompt(question[17]); break;
        case 19: answer = prompt(question[18]); break;
        case 20: answer = prompt(question[19]); break;
        case 21: answer = prompt(question[20]); break;
        case 22: answer = prompt(question[21]); break;
        case 23: answer = prompt(question[22]); break;
        case 24: answer = prompt(question[23]); break;
        case 25: answer = prompt(question[24]); break;
        case 26: answer = prompt(question[25]); break;

    }
    
    if(rand == 1){
        if(answer == "객체지향" || answer == "객체지향언어"){ alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 2){
        if(answer == "final") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 3){
        if(answer == "상속") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 4){
        if(answer == "4" || answer == "4byte") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 5){
        if(answer == "주석") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 6){
        answer = answer.toLowerCase();
        if(answer == "use strict" || answer == "usestrict") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 7){
        if(answer == "let") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 8){
        if(answer == "지역변수" || answer == "지역") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 9){
        if(answer == "전역변수" || answer == "전역") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    }  else if(rand == 10){
        answer = answer.toUpperCase();
        if(answer == "CSS") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 11){
        if(answer == "절차지향" || answer == "절차지향언어") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 12){
        if(answer == "포인터") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 13){
        if(answer == "세미콜론" || answer == ";") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 14){
        if(answer == "예약어") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 15){
        answer = answer.toUpperCase();
        if(answer == "NULL") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 16){
        answer = answer.toUpperCase();
        if(answer == "OBJECT") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 17){
        answer = answer.toUpperCase();
        if(answer == "FUNCTION") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 18){
        answer = answer.toUpperCase();
        if(answer == "NAN") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 19){
        answer = answer.toUpperCase();
        if(answer == "FALSE") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 20){
        answer = answer.toUpperCase();
        if(answer == "COMPILER" || answer == "컴파일러") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 21){
        if(answer == "함수오버로딩") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 22){
        if(answer == "디폴트매개변수") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 23){
        answer = answer.toUpperCase();
        if(answer == "PRIVATE") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    } else if(rand == 24){
        answer = answer.toUpperCase();
        if(answer == "SMARTPOINTER" || answer == "SMART POINTER") { alert("정답입니다. 아이템 효과가 발생됩니다."); return true; } 
        else {alert("오답입니다. 아이템 효과가 발생되지 않습니다."); return false; }
    }
}

let timer = 0;
let obstacleCount = [];
let jumpTimer = 0;
let animation;
let counter = 0;
let coinAudio = new Audio('/audio/coin.wav');  

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

     //alert(`타이머 : ${timer}`); //타이머 확인 문구
     if(timer % 2 == 0) { //짝수 초마다 점수 0.5씩 증가
        Character.score += 1; 
        let score = document.getElementById("score").value = Character.score; //html 아이디가 score인 곳으로 플레이어 점수 넘겨주기
    }
    //alert(`점수 : ${Character.score}`); //점수 확인문구
  
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
        if(Character.size == false){
            collision(Character, a); //캐릭터와 장애물 충돌확인 
        }
        
        a.draw();
    })
    
    // 점프
    //setInterval(Jump(), 1000);
    Jump();
    if (jumpSwitch == true) {
        Character.y -= 9;
        jumpTimer++;
    }

    if (jumpSwitch == false) {
        if(Character.size == false) { //
            if(Character.y < 437) { //437
                Character.y += 15;
            }
        }
        else if(Character.size == true) {
            if(Character.y < 180) { //437
                Character.y += 15;
            }
        }
    }

    if (jumpTimer > 20) {  
        jumpSwitch = false; 
        jumpTimer = 0; 
    }
  
    //setInterval(Character.draw1)
    Character.draw1();
}

frameExecution();

//충돌 확인
function collision(Character, obstacle) {
    let Ob_rx = obstacle.x + obstacle.width; //장애물의 우측 끝 x좌표
    let Pl_rx = Character.x + Character.width;   //캐릭터의 우측 끝 x좌표

    let Ob_ry = obstacle.y + obstacle.height; //장애물의 하단 끝 y좌표
    let Pl_ry = Character.y + Character.height; //캐릭터의 하단 끝 y좌표 
    
    if(Ob_rx > Character.x && obstacle.x < Pl_rx && Ob_ry > Character.y && obstacle.y < Pl_ry) { //충돌
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
                let answer = itemQuestion();
                alert(answer);
                if(answer == true){
                    let timerCh = setTimeout(() => { //캐릭터 커지기
                        Character.y = 50;
                        Character.height = 400;
                        Character.width = 400;
                        Character.size = true;
                    }, );

                    let item_time = document.getElementById("item").value = Character.item_time;
                
                    function Item_time() {
                        Character.item_time--;
                        item_time = document.getElementById("item").value = Character.item_time;
                    }

                    //1초 간격으로 아이템 효력의 남은 시간을 보여줌
                    let timerId = setInterval(Item_time, 1000);
                    //5초 후에 정지
                    setTimeout(() => {clearInterval(timerId); console.log("정지");}, 5000);

                   let timerSmall = setTimeout(() => { //캐릭터 5초 뒤 작아지기
                    Character.y = 300;
                    Character.height = 140;
                    Character.width = 110;
                    Character.size = false;
                    Character.item_time = 5;
                   }, 5000);
                
                }

                break;

      
            case 5 :    //충돌한 것이 coin일 때
                let coin = new COIN();
                coinAudio.play();
                alert("COIN 아이템 획득!!");
                alert(`획득한 코인 개수 : ${coincounter1()}`);

                obstacleCount.forEach((a, i, o) => { //코인 아이템 삭제
                    o.splice(i, 1);
                })
                counter++;
                
                if(counter == 3) { //코인의 개수가 10개라면
                    alert("여기에 아주 잘 들어옫나 ~");
                    let moving = document.getElementById('moving');
                    function showImage(){
                        let imgNum = Math.round(Math.random()*7);
                        Fgrade1 = document.getElementById("introimg");
                        Fgrade1.src = imgArray1[imgNum];
                        setTimeout(showImage, 50);
                    }

                    let timerCh = setTimeout(() => { // 배경속도 증가
                        moving.style.animation = "movebg 1s linear infinite";
                    }, );

                    let item_time = document.getElementById("item").value = Character.item_time;
                
                    function Item_time() {
                        Character.item_time--;
                        item_time = document.getElementById("item").value = Character.item_time;
                    }

                    //1초 간격으로 아이템 효력의 남은 시간을 보여줌
                    let timerId = setInterval(Item_time, 1000);
                    //5초 후에 정지
                    setTimeout(() => {clearInterval(timerId); console.log("정지");}, 5000);

                   let timerSmall = setTimeout(() => { // 다시 느리게
                    moving.style.animation = "movebg 5s linear infinite";
                    
                   }, 5000);

                }
                break;
        } 
    }
}

// 스페이스를 누를 때마다 점프하깅
var jumpSwitch = false; // 점프를 하는지 안 하는지 체크해주는 거
function Jump() {
    document.addEventListener('keydown', function(e) {
        if(e.code === 'Space'){
            jumpSwitch = true;
        }
    })
}


