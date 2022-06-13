"use strict"
// 캔버스 생성
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let CharacterCheck = false;

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let grade = location.href.split('?')[1]; //사용자가 선택한 학년 가져오기
let user_score = location.href.split('?')[2]; //전 게임 점수 가져오기
let language = location.href.split('?')[3]; //사용자가 선택한 언어 가져오기
alert(user_score);
alert(language);

let Question_random = [0];  //질문 랜덤으로 들어갈 배열
let Fgrade, Sgrade, Tgrade; //1, 2, 3학년
let imgArray; //이미지배열

if(grade == "first") { //사용자가 선택한 학년이 1학년일 때
    Fgrade = new Image(); //1학년 체육복

    imgArray = new Array();
    imgArray[0] = "/game_schoolrun/grade_1/grade_1.png";
    imgArray[1] = "/game_schoolrun/grade_1/grade_2.png";
    imgArray[2] = "/game_schoolrun/grade_1/grade_3.png";
    imgArray[3] = "/game_schoolrun/grade_1/grade_4.png";
    imgArray[4] = "/game_schoolrun/grade_1/grade_5.png";
    imgArray[5] = "/game_schoolrun/grade_1/grade_6.png";
    
    function showImage() { //캐릭터 gif
        let imgNum = Math.round(Math.random()*5);
        Fgrade = document.getElementById("introimg");
        Fgrade.src = imgArray[imgNum];
        setTimeout(showImage, 100);
    }
    showImage();
}

if(grade == "second") { //사용자가 선택한 학년이 2학년일 때
    Sgrade = new Image(); //2학년 체육복

    imgArray = new Array();
    imgArray[0] = "/game_schoolrun/grade_2/grade_1.png";
    imgArray[1] = "/game_schoolrun/grade_2/grade_2.png";
    imgArray[2] = "/game_schoolrun/grade_2/grade_3.png";
    imgArray[3] = "/game_schoolrun/grade_2/grade_4.png";
    imgArray[4] = "/game_schoolrun/grade_2/grade_5.png";
    imgArray[5] = "/game_schoolrun/grade_2/grade_6.png";
    
    function showImage() { //캐릭터 gif
        let imgNum = Math.round(Math.random()*5);
        Sgrade = document.getElementById("introimg");
        Sgrade.src = imgArray[imgNum];
        setTimeout(showImage, 100);
    }
    showImage();
}

if(grade == "third") { //사용자가 선택한 학년이 3학년일 때
    Tgrade = new Image(); //3학년 체육복

    imgArray = new Array();
    imgArray[0] = "/game_schoolrun/grade_3/grade_1.png";
    imgArray[1] = "/game_schoolrun/grade_3/grade_2.png";
    imgArray[2] = "/game_schoolrun/grade_3/grade_3.png";
    imgArray[3] = "/game_schoolrun/grade_3/grade_4.png";
    imgArray[4] = "/game_schoolrun/grade_3/grade_5.png";
    imgArray[5] = "/game_schoolrun/grade_3/grade_6.png";
    
    function showImage() { //캐릭터 gif
        let imgNum = Math.round(Math.random()*5);
        Tgrade = document.getElementById("introimg");
        Tgrade.src = imgArray[imgNum];
        setTimeout(showImage, 100);
    }
    showImage();
}

let Character = { //캐릭터
    x : 180,
    y : 100,
    width : 170, 
    height : 210, 
    score : parseInt(user_score), //플레이어 점수
    size : false, //플레이어 js 아이템 획득 시 true, false에 따라 충돌
    item_time : 5, //js, coin 아이템 효력 시간은 모두 5초 
    speed : false,  //캐릭터 속도

    draw() {
        if(grade == "first") { //사용자가 선택한 학년이 1학년일 때
            ctx.drawImage(Fgrade, this.x, this.y, this.width, this.height);
        }
        else if(grade == "second") { //2학년일 때
            ctx.drawImage(Sgrade, this.x, this.y, this.width, this.height);
        }
        else if(grade == "third") { //3학년일 때
            ctx.drawImage(Tgrade, this.x, this.y, this.width, this.height);
        }
    }
}

alert("Character : " + Character.score);

let c = new Image();    //c-1
c.src = '/game_schoolrun/obstacle/c.png';

let cc = new Image(); //c++-2
cc.src = '/game_schoolrun/obstacle/cc.png';

let js = new Image(); //js-3
js.src = '/game_schoolrun/obstacle/js.png';

let error = new Image(); //error-4
error.src = '/game_schoolrun/obstacle/error.png';

let coin = new Image(); //coin-5
coin.src = '/game_schoolrun/obstacle/coin.png';

let java = new Image(); //java-6
java.src = '/game_schoolrun/obstacle/java.png';

class C { //C언어 - 1
    constructor() {
        this.id = 1;
        this.x = 1500;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        ctx.drawImage(c, this.x, this.y, this.width, this.height);
    }
}

class CC { //C++ - 2
    constructor() {
        this.id = 2;
        this.x = 1500;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        ctx.drawImage(cc, this.x, this.y, this.width, this.height);
    }
}

class JS { //JS - 3
    constructor() {
        this.id = 3;
        this.x = 1500;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        ctx.drawImage(js, this.x, this.y, this.width, this.height);
    }
}

class ERROR { //error - 4
    constructor() {
        this.id = 4;
        this.x = 1500;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        ctx.drawImage(error, this.x, this.y, this.width, this.height);
    }
}

class COIN { //coin - 5
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
        ctx.drawImage(coin, this.x, this.y, this.width, this.height);
    }
}

class JAVA { //C언어 - 6
    constructor() {
        this.id = 6;
        this.x = 1500;
        this.y = 530; 
        this.width = 55;
        this.height = 55;
    }
    draw() {
        ctx.drawImage(java, this.x, this.y, this.width, this.height);
    }
}

// 아이템 충돌시 보여질 문제
function itemQuestion() {
    //js문제
    let question_js = [
        "javascript에서 엄격모드를 사용하기 위해 코드 최상단에 쓰는 것은?",
        "javascript에서는 예전에는 변수 선언할 때 var를 썼다. 최근들어서 변수를 선언할 때 쓰는 것은?",
        "HTML이나 XML로 작성된 문서의 표시 방법을 기술하기 위한 스타일 시트 언어를 칭하는 것은?",
        "자바스크립트에서 typeof null의 값은?",
        "자바스크립트에서 typeof alert의 값은?",
        "자바스크립트에서 undefined를 숫자로 변환한 값은?",
        "자바스크립트에서 null===undefined의 값은?",
        "함수 표현식보다 단순하고 간결한 문법으로 함수를 만들 수 있는 방법으로 영어로 arrow function인 것은?",
        "중복을 허용하지 않는 값을 모아놓은 컬렉션을 무엇이라고 하나요?",
        "기존 배열의 요소를 사용해 새로운 배열을 만들거나 기존 배열에 요소를 추가하고자 할 때 사용할 수 있는 함수명은?",
        "배열의 요소를 역순으로 정렬 시켜주는 메서드명은?",
        "배열에서 요소를 하나만 지울 때 사용하는 메서드명은?",
        "일정 시간이 지난 후에 함수를 실행하는 메서드명은?",
        "일정 시간 간격을 두고 함수를 실행하는 메서드명은?",
        "console.log('I want pizza'[0]); 의 출력 결과는?"
    ];

    //ds문제
    let question_ds = [
        "양방향 포인터 구조로 데이터의 삽입, 삭제가 빈번할 경우 데이터의 위치 정보만 수정하면 되기에 유용 스택, 큐, 양방향 큐 등을 만들기 위한 용도인 list는?",
        "과거에는 대용량 처리를 위해 사용했으며, 내부에서는 자동으로 동기화 처리가 일어나 비교적 성능이 좋지 않고 무거워서 요즘은 잘 쓰지 않는 것의 용어는?",
        "단방향 포인터 구조로 각 데이터에 대한 인덱스를 갖고 있어 조회 기능에 성능이 뛰어난 것은?",
        "LIFO 형식의 자료구조로서 맨 위 요소만 접근할 수 있는 자료구조 용어는?",
        "FIFO 형식의 자료구조로서 데이터의 삽입, 삭제가 빠른 자료구조 용어는?",
        "스택과 큐의 장점만 뽑아간 자료구조로서 삽입 삭제가 양쪽에서 일어날 수 있는 자료구조 용어는?",
        "정렬 방법 중에 제일 빠른 정렬 법은?",
        "처음 들어갈 숫자를 선택하고 앞에서부터 탐색하여 끝까지 탐색하는 도중 선택한 숫자보다 작은 발견시 그 숫자와 스왑하여 가장 작은 수부터 정렬하는 방법은?",
        "앞에서부터 자신과 뒤의 숫자를 비교하여 더 작을시 스왑하여 큰 숫자는 가장 뒤로 밀리게 되는 정렬 방법은?",
        "요청과 결과가 동시에 일어나며 설계가 매우 간단하고 직관적이고 유지보수와 디버깅이 쉬운 자료구조 용어는?",
        "병렬이며 요쳥과 결과가 동시에 일어나지 않고 동기보다 구조가 복잡한 자료구조 용어는?",
        "프로세스 내에 실행되는 흐름의 단위는?",
        "실행중인 프로그램(실행의 단위)를 무엇이라 하나요?",
        "루트 노드에서 시작해서 다음 분기로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 방식은?",
        "루트 노드에서 시작해서 인적한 노드를 먼저 탐색하는 방식은?"
    ];
    
    // let rand = Math.floor(Math.random() * 23) + 1;

    //문제 랜덤
    let rand;

    // 문제 중복없이 출제
    alert("Question_random : " + Question_random);
    alert("Question_random.length : " + Question_random.length);
    for(let i = 0; i < Question_random.length; i++) {
        rand = Math.floor(Math.random() * 14)+1;
        if(!Question_random.includes(rand)) {
            Question_random.push(rand);
            alert("Question_random.length : " + Question_random.length);
            break;
        }else {
            i--;
        }
    }

    alert("rand : " + rand);
    alert(Question_random);

    let user_answer;    //사용자가 적은 답
    
    switch(rand){
        case 1: 
            if(language == "js") { //사용자가 선택한 언어가 js일 때
                user_answer = prompt(question_js[0]); 
            } else if(language == "ds") { //사용자가 선택한 언어가 ds일 때
                user_answer = prompt(question_ds[0]); 
            }
            
            break;
        case 2: 
            if(language == "js") {
                user_answer = prompt(question_js[1]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[1]); 
            }

            break;
        case 3: 
            if(language == "js") {
                user_answer = prompt(question_js[2]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[2]); 
            }

            break;
        case 4: 
            if(language == "js") {
                user_answer = prompt(question_js[3]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[3]); 
            }

            break;
        case 5: 
            if(language == "js") {
                user_answer = prompt(question_js[4]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[4]); 
            }

            break;
        case 6: 
            if(language == "js") {
                user_answer = prompt(question_js[5]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[5]); 
            } 

            break;
        case 7: 
            if(language == "js") {
                user_answer = prompt(question_js[6]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[6]); 
            }

            break;
        case 8: 
            if(language == "js") {
                user_answer = prompt(question_js[7]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[7]); 
            }

            break;
        case 9: 
            if(language == "js") {
                user_answer = prompt(question_js[8]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[8]); 
            }

            break;
        case 10: 
            if(language == "js") {
                user_answer = prompt(question_js[9]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[9]); 
            }

            break;
        case 11: 
            if(language == "js") {
                user_answer = prompt(question_js[10]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[10]); 
            }

            break;
        case 12: 
            if(language == "js") {
                user_answer = prompt(question_js[11]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[11]); 
            }

            break;
        case 13: 
            if(language == "js") {
                user_answer = prompt(question_js[12]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[12]); 
            }

            break;
        case 14: 
            if(language == "js") {
                user_answer = prompt(question_js[13]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[13]); 
            }

            break;
        case 15: 
            if(language == "js") {
                user_answer = prompt(question_js[14]); 
            } else if(language == "ds") { 
                user_answer = prompt(question_ds[14]); 
            }

            break;
    }
    
    //정답 확인
    if(rand == 1){
        user_answer = user_answer.toLowerCase();
        if(user_answer == "use strict" || user_answer == "usestrict") { //js
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "linkedlist") { //ds
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 2) {
        user_answer = user_answer.toLowerCase();
        if(user_answer == "let") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "vector") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 3){
        if(user_answer == "CSS" || user_answer == "css") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "ARRAYLIST") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 4){
        if(user_answer == "OBJECT" || user_answer == "object") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "스택" || user_answer == "stack" || user_answer == "STACK") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 5) {
        if(user_answer == "FUNCTION" || user_answer == "function") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "큐" || user_answer == "queue" || user_answer == "QUEUE") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 6) {
        if(language == "js") {
            user_answer = user_answer.toUpperCase();
        }
        if(user_answer == "NAN") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!");
            return true; 
        } else if(user_answer == "데큐" || user_answer == "deque" || user_answer == "DEQUE") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 7) {
        if(language == "js") {
            user_answer = user_answer.toUpperCase();
        }
        if(user_answer == "FALSE") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "퀵 정렬" || user_answer == "퀵정렬") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    }  else if(rand == 8) {
        if(user_answer == "화살표 함수" || user_answer == "화살표함수") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "삽입정렬" || user_answer == "삽입 정렬") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 9) {
        if(user_answer == "셋" || user_answer == "set" || user_answer == "SET") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "버블정렬" || user_answer == "버블 정렬") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 10) {
        if(user_answer == "CONCAT", user_answer == "concat") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "동기") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 11) {
        if(user_answer == "REVERSE" || user_answer == "reverse") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "비동기") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 12) {
        if(user_answer == "SPLICE" || user_answer == "splice") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "스레드") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 13) {
        if(user_answer == "SETTIMEOUT" || user_answer == "settimeout") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "프로세스") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 14) {
        if(user_answer == "SETINTERVAL" || user_answer == "setinterval") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "깊이우선탐색") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    } else if(rand == 15) {
        if(user_answer == "I") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true; 
        } else if(user_answer == "너비우선탐색") { 
            alert("정답입니다. 아이템 효과가 발생됩니다!"); 
            return true;
        }
        else {
            alert("오답입니다. 아이템 효과가 발생되지 않습니다."); 
            return false; 
        }
    }
}

let timer = 0;  
let obstacleCount = []; //장애물 모아놓는 배열
let jumpTimer = 0;
let animation;
let coin_cnt = 0; //코인 개수 체크
// let score = 0; //사용자의 점수
let coinAudio = new Audio('/audio/coin.wav');  //코인 획득 시
let jumpAudio = new Audio('/audio/Jump.wav');   //점프 시
let pdAudio = new Audio('/audio/Power down.wav');  //사이즈 줄어들 시
let puAudio = new Audio('/audio/up.wav');  //사이즈 커질 시
let falseAudio = new Audio('/audio/wrong.wav');  //오답 시 
let trueAudio = new Audio('/audio/true.wav');   //정답 시

//코인 개수 함수
function CoinCounter() {
    return function() {
        return ++coin_cnt;
    }
}
let coincounter1 = CoinCounter();

function frameExecution(){
    animation = requestAnimationFrame(frameExecution);
    timer++;

     if(timer % 20 == 0) { 
        Character.score += 1; 
        document.getElementById("score").value = Character.score; //html 아이디가 score인 곳으로 플레이어 점수 넘겨주기
    }
  
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
        if(Character.size == false && Character.speed == false) { //캐릭터 사이즈가 정상이고 스피드가 빠르지 않을 때
            collision(Character, a); //캐릭터와 장애물 충돌확인 
        }
        
        a.draw();
    })
    
    // 점프
    Jump();
    if (jumpSwitch == true) {
        if(Character.size == false) { //캐릭터 원래 사이즈일 때
            if(Character.y > 260) { //260
                Character.y -= 17;   
            }
        }

        if(Character.size == true) { //캐릭터 커졌을 때
            if(Character.y > 50) {
                Character.y -= 14;
            }
        }
       
        jumpTimer++;
    }

    if (jumpSwitch == false) {
        if(Character.size == false) { //캐릭터 원래 사이즈일 때
            if(Character.y < 385) { //437
                Character.y += 15;
            }
        }
        else if(Character.size == true) { //캐릭터 사이즈 커졌을 때
            if(Character.y < 180) { //437
                Character.y += 15;
            }
        }
    }

    if (jumpTimer > 20) {  
        jumpSwitch = false; 
        jumpTimer = 0; 
    }

    Character.draw();
}

frameExecution();

//캐릭터 커지기 함수
function Character_Big() {
    // trueAudio.play();
    let timerCh = setTimeout(() => { //캐릭터 커지기
        puAudio.play();
        Character.y = 50;
        Character.height = 400;
        Character.width = 400;
        Character.size = true;
    }, );

    document.getElementById("item").value = Character.item_time;

    function Item_time() {
        document.getElementById("item").value = Character.item_time;
        Character.item_time--;
    }

    //1초 간격으로 아이템 효력의 남은 시간을 보여줌
    let timerId = setInterval(Item_time, 1000);
    //5초 후에 정지
    setTimeout(() => {clearInterval(timerId); console.log("정지");}, 5000);

    Character.item_time = 5;    //5초로 다시 초기화

    let timerSmall = setTimeout(() => { //캐릭터 5초 뒤 작아지기
        pdAudio.play();
        Character.y = 100;
        Character.height = 210;
        Character.width = 170;
        Character.size = false;
        Character.item_time = 5;
    }, 5000);
}

//충돌 확인
function collision(Character, obstacle) {
    let position = "student";

    let Ob_rx = obstacle.x + obstacle.width; //장애물의 우측 끝 x좌표
    let Pl_rx = Character.x + Character.width;   //캐릭터의 우측 끝 x좌표

    let Ob_ry = obstacle.y + obstacle.height; //장애물의 하단 끝 y좌표
    let Pl_ry = Character.y + Character.height; //캐릭터의 하단 끝 y좌표 
    
    if(Ob_rx > Character.x && obstacle.x < Pl_rx && Ob_ry > Character.y && obstacle.y < Pl_ry) { //충돌
        switch(obstacle.id) { //장애물 아이디로 장애물 구별
            case 1 : //충돌한 것이 c일 때
                if(language == "c") {   //사용자가 선택한 언어가 C일 때 
                    alert("C 아이템 획득!!");
                    obstacleCount.forEach((a, i, o) => { //js 아이템 삭제
                        o.splice(i, 1);
                    })
                    //코딩 문제 나오는 함수
                    let answer = itemQuestion();
                    // alert(answer);

                    if(answer == true) { //문제 정답일시
                        trueAudio.play();
                        Character_Big();    //캐릭터 커지기
                
                    } else {    //문제 오답시
                        falseAudio.play();
                    }
                }
                else {
                    alert("장애물과 충돌!!");
                    ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
                    moving.style.animation = "movebg 9000s linear infinite";
                    location.href = "/gameover/gameOver.html?" + Character.score + ":" + position;
                    cancelAnimationFrame(animation); //게임 중단
                }
                break;
            
            case 2 : //충돌한 것이 ds일 때
                if(language == "ds") { //사용자가 선택한 언어가 C일 때 
                    alert("DS 아이템 획득!!");
                    obstacleCount.forEach((a, i, o) => { //js 아이템 삭제
                        o.splice(i, 1);
                    })
                    //코딩 문제 나오는 함수
                    let answer = itemQuestion();
                    // alert(answer);

                    if(answer == true) { //문제 정답일시
                        trueAudio.play();
                        Character_Big();    //캐릭터 커지기
            
                    } else {    //문제 오답시
                        falseAudio.play();
                    }
                } 
                else {
                    alert("장애물과 충돌!!");
                    ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
                    moving.style.animation = "movebg 9000s linear infinite";
                    location.href = "/gameover/gameOver.html?" + Character.score + ":" + position;
                    cancelAnimationFrame(animation); //게임 중단
                }
                break;
            
            case 4 : //충돌한 것이 error일 때
                alert("장애물과 충돌!!");
                ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
                moving.style.animation = "movebg 9000s linear infinite";
                location.href = "/gameover/gameOver.html?" + Character.score + ":" + position;
                cancelAnimationFrame(animation); //게임 중단

                break;
            
            case 6 : //충돌한 것이 java 일 때
                if(language == "java") {    //사용자가 선택한 언어가 java일 때 
                    alert("JAVA 아이템 획득!!");
                    obstacleCount.forEach((a, i, o) => { //js 아이템 삭제
                        o.splice(i, 1);
                    })
                    //코딩 문제 나오는 함수
                    let answer = itemQuestion();
                    // alert(answer);

                    if(answer == true) { //문제 정답일시
                        trueAudio.play();
                        Character_Big();    //캐릭터 커지기
            
                    } else {    //문제 오답시
                        falseAudio.play();
                    }
                }
                else {
                    alert("장애물과 충돌!!");
                    ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
                    moving.style.animation = "movebg 9000s linear infinite";
                    location.href = "/gameover/gameOver.html?" + Character.score + ":" + position;
                    cancelAnimationFrame(animation); //게임 중단
                }
                
                break;

            case 3 :     //충돌한 것이 js일 때 
                if(language == "js") { //사용자가 선택한 언어가 js일 때 
                    alert("JS 아이템 획득!!");
                    obstacleCount.forEach((a, i, o) => { //js 아이템 삭제
                        o.splice(i, 1);
                    })
                    //코딩 문제 나오는 함수
                    let answer = itemQuestion();
                    // alert(answer);

                    if(answer == true) { //문제 정답일시
                        trueAudio.play();
                        Character_Big();    //캐릭터 커지기
            
                    } else {    //문제 오답시
                        falseAudio.play();
                    }
                }
                else {
                    alert("장애물과 충돌!!");
                    ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
                    moving.style.animation = "movebg 9000s linear infinite";
                    location.href = "/gameover/gameOver.html?" + Character.score + ":" + position;
                    cancelAnimationFrame(animation); //게임 중단
                }

                break;

      
            case 5 :    //충돌한 것이 coin일 때
                //let coin = new COIN();
                coinAudio.play();
                alert("COIN 아이템 획득!!");
                alert(`획득한 코인 개수 : ${coincounter1()}`);

                obstacleCount.forEach((a, i, o) => { //코인 아이템 삭제
                    o.splice(i, 1);
                })
                
                if(coin_cnt == 1) { //코인의 개수가 3개라면
                    // alert("여기에 아주 잘 들어옫나 ~");
                    let moving = document.getElementById('moving');
              
                    coin_cnt = 0;   //코인 초기화

                    let timerCh = setTimeout(() => { // 배경속도 증가
                        moving.style.animation = "movebg 1s linear infinite";
                        Character.speed = true;
                    }, );

                    document.getElementById("item").value = Character.item_time;
                
                    function Item_time() {
                        document.getElementById("item").value = Character.item_time;
                        Character.item_time--;
                    }

                    //1초 간격으로 아이템 효력의 남은 시간을 보여줌
                    let timerId = setInterval(Item_time, 1000);
                    //5초 후에 정지
                    setTimeout(() => {clearInterval(timerId); console.log("정지");}, 5000);

                    Character.item_time = 5;    //5초로 다시 초기화
                    
                    let timerSmall = setTimeout(() => { // 다시 느리게
                        moving.style.animation = "movebg 5s linear infinite";
                        Character.speed = false;
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
        jumpAudio.play();
        if(e.code === 'Space'){
            jumpSwitch = true;
        }
    })
}