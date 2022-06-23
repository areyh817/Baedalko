// "use strict"

let canvas;
let ctx;

//1학년 이미지
let Grade_1 = new Image();
Grade_1.src = "grade_1/grade_6.png";

//2학년 이미지
let Grade_2 = new Image();
Grade_2.src = "grade_2/grade_6.png";

//3학년 이미지
let Grade_3 = new Image();
Grade_3.src = "grade_3/grade_6.png";

//장애물
let shape =  new Image();
shape.src = "error.png";

//화이트보드
let whiteboard = new Image();
whiteboard.src = "whiteboard.png";

//배경
let background = new Image();
background.src = "gamebackground/school_backgrouond.png";

//효과음
let answer_true = new Audio('audio/true.wav');  //문제 정답시
let answer_false = new Audio('audio/wrong.wav');   //문제 오답시

let screenWidth = 1350;          //화면 가로 //canvas : 1685
let screenHeight = 900;          //화면 세로
let shapes = {};                 //장애물 담을 객체
let shapeIndex = 0;
let fallSpeed = 1;              //장애물 떨어지는 속도
let shapeGenerateSpeed = 700;   //장애물 만들어내는 속도
let user_score = 0;             //사용자 점수
let time = 30;                   //제한시간
let time_get;
let time_t;
let update;
let ob_generate;

let grade_get = location.href.split('?')[4];
let language_get = location.href.split('?')[5];
let user_score_get = location.href.split('?')[6];
// alert("poop2 user_score_get : " + user_score_get);

let grade;
let language;

if(grade_get != undefined) {
    grade = location.href.split('?')[4];
}
if(language_get != undefined) {
    language = location.href.split('?')[5];
}
if(user_score_get < 700) {
    user_score += parseInt(user_score_get);
}

// alert("poop2 grade : " + grade);
// alert("poop2 language : " + language);


function Init(){    //처음 실행될 함수
    //캔버스 생성
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    time_t = 1000;

    time_get = location.href.split('?')[3];
    // alert("poop2 time_get : " + time_get);

    if(time_get != 30 && time_get != undefined) {
        time = location.href.split('?')[3];
    }
    
    // alert("poop2 time : " + time);

    canvas.onclick = function(event) {
        //마우스 x좌표, y좌표
        const x = event.clientX - ctx.canvas.offsetLeft;
        const y = event.clientY - ctx.canvas.offsetTop;
    
        // alert("x : " + x + " y : " + y);
    }

    //정답 발판
    ctx.fillStyle = "#FFC0CB";
    ctx.fillRect(1405, 500, 20, 170);

    ctx.fillStyle = "#DDA0DD";
    ctx.fillRect(1405, 710, 20, 170);

    //화이트 보드
    ctx.drawImage(whiteboard, 570, -10, 600, 150);

    Question()
    shapeGenerate()
    update = setInterval(Updater, 10);
    ob_generate = setInterval(shapeGenerate, shapeGenerateSpeed);

    Time();
    
}

function Time() {
    //제한 시간
    let Time = setInterval(function() {
        time--;
        document.getElementById("timer").value = time;
        //제한시간 30초가 끝났을 시
        if(time <= 0) {
            // alert("끝남")
            // context.fillStyle = "#00ffff";
            // context.fillRect(0, 0, 1685, screenHeight);
            ctx.clearRect(0, 0, 1700, 900);
            clearInterval(update);  //setInteval() 실행을 끝냄
            clearInterval(ob_generate);
            clearInterval(Time);
            // alert("들어오냐")
            location.href = `gameOver.html?${user_score}`;
        }
    }, time_t) 
}


function keydown(){
    //눌러진 key의 코드값
    keycode=event.keyCode;
    switch(keycode){
        case 37: //left
            character.Velocity.X = -5;
        break; 

        case 39: //right
            character.Velocity.X = 5;
            break; 

        case 38:    //up
            character.Velocity.Y = -5; 
            
            break;

        case 40:    //down
            character.Velocity.Y = 5;
    }
}

function keyup(){
    //떨어진 key의 코드값
    character.Velocity.X = 0;
    character.Velocity.Y = 0;
}

function Shape(posX, width, height) {
    this.Width = width;
    this.Height = height;
    this.Position = {
        X: posX,
        Y: this.Height + 88 //장애물 y : 50+88 = 138  //장애물 떨어지는 위치
    };
    this.Velocity = Math.random() * fallSpeed + 1;   //속도
    // alert("velocity : " + this.Velocity)
    this.Index = shapeIndex;

    // alert("shapeIndex : " + shapeIndex);

    shapes[shapeIndex] = this;  //장애물 객체에 장애물 담기
    shapeIndex++

    this.checkCollisions = function() {
      if(this.Position.Y >= screenHeight){  //화면 height를 벗어난다면 삭제
        delete shapes[this.Index];
      }
    }

    this.updatePosition = function() {  //장애물 y축 업데이트
        this.Position.Y += this.Velocity;
    }

    this.Draw = function() {    //장애물 캔버스에 그려주기
        // ctx.fillStyle = "#000000";
        // ctx.fillRect(this.Position.X, this.Position.Y, this.Width, this.Height);
        ctx.drawImage(shape, this.Position.X, this.Position.Y, this.Width, this.Height);
        //context.drawImage(imgBg, 0, 0, 1200, 590);
    }

    this.update = function() {  
        this.checkCollisions();
        this.updatePosition();
        this.Draw();
    }
}


let character = new Character(35, 150, 170);
let user_select;    //사용자가 고른 정답

//정답 체크 && 점수 주기
function Answer_check(answer) {
    //사용자가 선택한 정답과 문제의 정답이 같다면 
    if(user_select == answer) {
        answer_true.play();
        user_score += 5;
        // alert("user_score : " + user_score);
        Clear();
        // Question();
    } else {
        answer_false.play();
        user_score += 0;
        // alert("user_score : " + user_score);
        Clear();
        // Question();
    }
}

//문제, 정답 리셋
function Clear() {
    character.Position.X = 35;
    character.Position.Y = screenHeight - 210;
    character.Velocity.X = 0;
    character.Velocity.Y = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Init();

    location.href = `poop.html?${"1"}?${"2"}?${time}?${grade}?${language}?${user_score}`;
}

function Character(posX, width, height) {
    this.Width = width
    this.Height = height
    this.Position = {
        X: posX, 
        Y: screenHeight - 210
    }
    this.Velocity = {
        X:0, Y: 0
    }

    this.checkCollisions = function() {  //캐릭터와 장애물 충돌 체크
        function collision(a,b){    //a : 캐릭터, b : 장애물
          if (
            a.Position.X <= b.Position.X + b.Width &&
            a.Position.X + a.Width >= b.Position.X &&
            a.Position.Y + a.Height >= b.Position.Y &&
            a.Position.Y <= b.Position.Y + b.Height ) {
            // alert("충돌");
              return true
          }
        }

        let i = 0;
        for (i in shapes){
            if(collision(this, shapes[i])){ //장애물과 충돌했다면 처음 자리로 돌아가기
                this.Position.X = 35;
                this.Position.Y = screenHeight - 210;
            }
        }

        //첫번째 발판
        if((character.Position.X + 130) == 1405 && (character.Position.Y + 100) >= 540 && (character.Position.Y + 100) <= 640) {
            // alert("1");
            user_select = 1;
            if(language == "js") {
                Answer_check(js_answer[answer_ch]);
            }
            else if(language == "ds") {
                Answer_check(ds_answer[answer_ch]);
            }
            else if(language == "common") {
                Answer_check(common_answer[answer_ch]);
            }
            else if(language == "entertainer") {
                Answer_check(entertainer_answer[answer_ch]);
            }
        }
        //두번째 발판
        else if((character.Position.X + 130)  == 1405 && (character.Position.Y + 100) >= 710 && (character.Position.Y + 100) <= 850) {
            // alert("2")
            user_select = 2;
            if(language == "js") {
                Answer_check(js_answer[answer_ch]);
            }
            else if(language == "ds") {
                Answer_check(ds_answer[answer_ch]);
            }
            else if(language == "common") {
                Answer_check(common_answer[answer_ch]);
            }
            else if(language == "entertainer") {
                Answer_check(entertainer_answer[answer_ch]);
            }
        }
      }
      
      this.updatePosition = function(){ //캐릭터 x, y 업데이트
        this.Position.X += this.Velocity.X;
        this.Position.Y += this.Velocity.Y;
    }

    this.Draw = function() {    //캐릭터 캔버스에 그려주기
        // ctx.fillStyle = "#00ffff";
        // ctx.fillRect(this.Position.X, this.Position.Y, this.Width, this.Height);
        
        //1학년이라면
        if(grade == "first") {
            ctx.drawImage(Grade_1, this.Position.X, this.Position.Y, this.Width, this.Height);
        }
        else if(grade == "second") {
            ctx.drawImage(Grade_2, this.Position.X, this.Position.Y, this.Width, this.Height);
        }
        else if(grade == "third") {
            ctx.drawImage(Grade_3, this.Position.X, this.Position.Y, this.Width, this.Height);
        }
    }
    
    this.update = function(){
        // alert("zzzzzzzzzzz")
        this.checkCollisions();
        this.updatePosition();
        this.Draw();
    }
}

function newGame() {
    score = 0;
}


function shapeGenerate(){   //장애물 생성
    new Shape(Math.random() * screenWidth, 50, 50);
    
}

function Updater() {
    // ctx.fillStyle = "#f5f5dc";
    // ctx.fillRect(0, 138, screenWidth+50, screenHeight);

    ctx.clearRect(0, 138, screenWidth+50, screenHeight); //캔버스 초기화, 안해주면 장애물 길게 늘어남
    let i = 0;
    for(i in shapes) {
        // alert(shapes)
    
      shapes[i].update();
    }
    character.update();
}


// let koFont = loadFont('https://fonts.googleapis.com/css2?family=Jua&display=swap');

//js 정답(발판)
let  js_answer = [
    "2", "2", "1", "1", "2", "1", "2", "1", "2", "2", "2", "1", "1", "1", "2", "2", "1"
]

//ds 정답(발판)
let  ds_answer = [
    "2", "1", "1", "2", "2", "2", "1", "1", "1", "2", "2", "1", "1", "1", "2", "1", "2"
]

//상식 정답(발판)
let  common_answer = [
    "1", "2", "1", "2", "2", "2", "1", "2", "1", "2", "2", "1", "2", "2", "2", "1", "1"
]

//연예인 정답(발판)
let  entertainer_answer = [
    "2", "2", "1", "2", "1", "1", "2", "2", "1", "1", "2", "1", "1", "2", "1", "1", "2"
]

let Question_random = [0];  //질문 랜덤으로 들어갈 배열
// let language = 'js';
let answer_ch;
//문제
function Question() {
    //js문제
    let question_js = [
        "엄격모드를 사용하기 위해 코드 최상단에 쓰는 것은?",
        "예전에는 변수를 선언할 때 var를 썼다. 최근들어서 변수를 선언할 때 쓰는 것은?",
        "typeof null의 값은?",
        "typeof alert의 값은?",
        "undefined를 숫자로 변환한 값은?",
        "null===undefined의 값은?",
        "자바스크립트를 만든 사람은 누구인가요?",
        "함수 표현식보다 단순하고 간결한 문법으로 함수를 만들 수 있는 방법으로 영어론 arrow function이라 하는 이것은?",
        "■는 키가 있는 데이터를 저장한다는 점에서 객체와 유사하다. 다만 ■은 키에 다양한 자료형을 허용한다는 점에서 차이가 있다, ■은 무엇일까요?",
        "중복을 허용하지 않는 값을 모아놓은 컬렉션은?",
        "기존 배열의 요소를 사용해 새로운 배열을 만들거나 기존 배열에 요소를 추가하고자 할 때 사용할 수 있는 함수명은?",
        "배열의 요소를 역순으로 정렬 시켜주는 메서드명은?",
        "배열에서 요소를 하나만 지울 때 사용하는 메서드명은?",
        "일정 시간이 지난 후에 함수를 실행하는 메서드명은?",
        "일정 시간 간격을 두고 함수를 실행하는 메서드명은 ?",
        "간단하게 배열의 요소들을 중복제거를 하려고 한다.return Array.from(new 🖤(values)); 🖤에 들어갈 말은?",
        "자바스크립트에서 발전된 프레임워크가 아닌 것은?"
    ];

    //ds문제
    let question_ds = [
        "양방향 포인터 구조로 데이터의 삽입, 삭제가 빈번할 경우 데이터의 위치 정보만 수정하면 되기에 유용 스택, 큐, 양방향 큐 등을 만들기 위한 용도인 list는?",
        "과거에는 대용량 처리를 위해 사용했으며, 내부에서는 자동으로 동기화 처리가 일어나 비교적 성능이 좋지 않고 무거워서 요즘은 잘 쓰지 않는 것의 용어는?",
        "단방향 포인터 구조로 각 데이터에 대한 인덱스를 갖고 있어 조회 기능에 성능이 뛰어난 것은?",
        "LIFO 형식의 자료구조로서 맨 위 요소만 접근할 수 있는 자료구조 용어는?",
        "FIFO 형식의 자료구조로서 데이터의 삽입, 삭제가 빠른 자료구조 용어는?",
        "스택과 큐의 장점만 뽑아간 자료구조로서 삽입 삭제가 양쪽에서 일어날 수 있는 자료구조 용어는?",
        "비선형 자료구조의 예는?",
        "정렬 방법 중에 제일 빠른 정렬법은?",
        "처음 들어갈 숫자를 선택하고 앞에서부터 탐색하여 끝까지 탐색하는 도중 선택한 숫자보다 작은 발견시 그 숫자와 스왑하여 가장 작은 수부터 정렬하는 방법은?",
        "앞에서부터 자신과 뒤의 숫자를 비교하여 더 작을시 스왑하여 큰 숫자는 가장 뒤로 밀리게 되는 정렬 방법은?",
        "요청과 결과가 동시에 일어나며 설계가 매우 간단하고 직관적이고 유지보수와 디버깅이 쉬운 자료구조 용어는?",
        "병렬이며 요쳥과 결과가 동시에 일어나지 않고 동기보다 구조가 복잡한 자료구조 용어는?",
        "프로세스 내에 실행되는 흐름의 단위는?",
        "실행중인 프로그램(실행의 단위)를 무엇이라 하나요?",
        "루트 노드에서 시작해서 다음 분기로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 방식은?",
        "다이나믹 프로그래밍을 활용한 대표적인 최단 경로 탐색 알고리즘은?",
        "루트 노드에서 시작해서 인적한 노드를 먼저 탐색하는 방식은?"
    ];

    //상식문제
    let question_common = [
        "평창동계올림픽이 열렸던 해는 몇 년도 인가요?",
        "학교폭력 상담 전화는 몇 번일까요?",
        "한국의 국가 전화번호는 몇 번일까요?",
        "소음 측정 단위는 데시벨이라고 하는데 기호로는 어떻게 표시할까요?",
        "국보 1호였던 문화재의 이름은?",
        "우리나라 최초의 한글 소설로 전해지는 이 고전소설의 이름은?",
        "2022년 최저시급은 얼마인가요?",
        "스마트폰을 기기에 접촉해 카드결제 및 가까운 거리에서 데이터를 주고 받는 이 통신기술은 무엇인가?",
        "태극기에는 태극문양과 4괘가 있는데 이 중 하늘, 봄, 동이라는 의미를 갖고있는 것은?",
        "5월 5일 어린이날을 만든 인물은?",
        "한국 청동기 시대의 대표적인 무덤 양식으로, 지석묘라고도 불리는 이것은 무엇일까요?",
        "제주도의 옛 이름은 무엇일까요?",
        "대동여지도를 만든 사람은?",
        "‘큰 집’이라는 뜻으로, 고대 이집트의 왕을 이르던 말은 무엇일까요?",
        "백범일지를 쓴 독립 운동가는?",
        "태양계에서 가장 큰 행성은 ?",
        "우리나라의 초대대통령은 누구인가요?"
    ];

    //상식문제
    let question_entertainer = [
        "2019년에 개봉한 영화로 미국 아카데미 시상식에서 작품상을 받은 영화는?",
        "방탄소년단 + 트와이스 멤버수를 모두 더한 값은?",
        "노래 제목에 COME BACK HOME이 없는 가수는?",
        "불타오르네를 부른 가수가 아닌 것은?",
        "노래 제목에 POSION이 없는 가수는?",
        "장원영은 어디 그룹일까?",
        "에스파에 속한 멤버 이름이 아닌 것은?",
        "2022년에 데뷔한 JYP 신인그룹 이름은?",
        "다음 중 위너 멤버가 아닌 사람은?",
        "다음 중 혼성그룹이 아닌 것은?",
        "프로듀스 시리즈로 데뷔한 그룹명이 아닌 것은?",
        "준호가 우리집 직캠으로 역주행을 했는데 준호가 속한 그룹이 아닌 것은?",
        "브레이브 걸스가 역주행한 곡인 것은?",
        "counting stars로 유명해진 래퍼 이름은?",
        "2pm에서 탈퇴한 멤버의 이름은?",
        "nct 유닛으로 아닌 것은?",
        "인피니트 노래 제목으로 틀린 것은?"
    ];

    //let rand = Math.floor(Math.random() * 23) + 1;
    //let rand = 4;

    //문제 랜덤
    // let rand;

    // 문제 중복없이 출제
    // alert("Question_random : " + Question_random);
    // alert("Question_random.length : " + Question_random.length);

    /*
    for(let i = 0; i < Question_random.length; i++) {
        rand = Math.floor(Math.random() * 16)+1;
        if(!Question_random.includes(rand)) {
            Question_random.push(rand);
            break;
        }else {
            i--;
        }
    }
    */
    
    

    // alert("rand : " + rand);
    // alert(Question_random);

    let rand = 17;

    switch(rand){
        case 1: 
            if(language == "js") {  //사용자가 선택한 언어가 js일 때
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[0], 640, 80);
                ctx.fillText("use struct", 1500, 590);
                ctx.fillText("use strict", 1500, 790);
            } 
            else if(language == "ds") { //사용자가 선택한 언어가 ds일 때
                ctx.font = "18px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[0].split('우', 1)+"우", 620, 60);
                ctx.fillText(question_ds[0].substring(question_ds[0].indexOf('우')+1, question_ds[0].indexOf('등')), 613, 80);
                ctx.fillText(question_ds[0].substring(question_ds[0].indexOf('등'), question_ds[0].indexOf('?')) + "?", 618, 100);
                ctx.fillText("ArrayList", 1500, 590);
                ctx.fillText("LinkedList", 1500, 790);
            }
            else if(language == "common") { //사용자가 선택한 언어가 상식일 때
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[0], 650, 80);
                ctx.fillText("2018년", 1500, 590);
                ctx.fillText("2014년", 1500, 790);
            }

            else if(language == "entertainer") { //사용자가 선택한 언어가 연예인일 때
                ctx.font = "16px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[0], 610, 80);
                ctx.fillText("연가시", 1500, 590);
                ctx.fillText("기생충", 1500, 790);
            }


            //문제 답
            answer_ch = 0;

            break;
        case 2: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[1].split('.', 1)+".", 680, 80);
                ctx.fillText(question_js[1].substring(question_js[1].indexOf('.')+1, question_js[1].indexOf('?')) + "?", 665, 100);
                ctx.fillText("int", 1500, 590);
                ctx.fillText("let", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "18px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[1].split('로', 1)+"로", 620, 60);
                ctx.fillText(question_ds[1].substring(question_ds[1].indexOf('로')+1, question_ds[0].indexOf('등')), 613, 80);
                ctx.fillText(question_ds[1].substring(question_ds[1].indexOf('잘'), question_ds[0].indexOf('?')), 618, 100);
                ctx.fillText("Vector", 1500, 590);
                ctx.fillText("var", 1500, 790);
            }
            else if(language == "common") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[1], 690, 80);
                ctx.fillText("114", 1500, 590);
                ctx.fillText("117", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "16px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[1], 680, 80);
                ctx.fillText("15", 1500, 590);
                ctx.fillText("16", 1500, 790);
            }

            answer_ch = 1;

            break;
        case 3: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[2], 780, 80);
                ctx.fillText("object", 1500, 590);
                ctx.fillText("function", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[2].split('어', 1)+"어", 600, 60);
                ctx.fillText(question_ds[2].substring(question_ds[2].indexOf('어')+1, question_ds[2].indexOf('?')) + "?", 710, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("ArrayList", 1500, 590);
                ctx.fillText("LinkedList", 1500, 790);
            }
            else if(language == "common") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[2], 690, 80);
                ctx.fillText("82", 1500, 590);
                ctx.fillText("02", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[2], 650, 80);
                ctx.fillText("스테이씨", 1500, 590);
                ctx.fillText("서태지와 아이들", 1500, 790);
            }

            answer_ch = 2;

            break;
        case 4: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[3], 780, 80);
                ctx.fillText("object", 1500, 590);
                ctx.fillText("function", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[3].split('는', 1)+"는", 620, 60);
                ctx.fillText(question_ds[3].substring(question_ds[3].indexOf('자'), question_ds[3].indexOf('?')) + "?", 600, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("데큐", 1500, 590);
                ctx.fillText("스택", 1500, 790);
            }
            else if(language == "common") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[3].split('하', 1)+"하는데", 690, 60);
                ctx.fillText(question_common[3].substring(question_common[3].indexOf('기'), question_common[3].indexOf('?')) + "?", 720, 80);
                ctx.fillText("dq", 1500, 590);
                ctx.fillText("dB", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[3], 690, 80);
                ctx.fillText("BTS", 1500, 590);
                ctx.fillText("BTZ", 1500, 790);
            }

            answer_ch = 3;

            break;
        case 5: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[4], 720, 80);
                ctx.fillText("0", 1500, 590);
                ctx.fillText("NAN", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[4].split('른', 1)+"른", 630, 60);
                ctx.fillText(question_ds[4].substring(question_ds[4].indexOf('른')+1, question_ds[4].indexOf('?')) + "?", 780, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("데큐", 1500, 590);
                ctx.fillText("큐", 1500, 790);
            }
            else if(language == "common") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[4], 720, 80);
                ctx.fillText("동대문", 1500, 590);
                ctx.fillText("숭례문", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[4], 690, 80);
                ctx.fillText("현아", 1500, 590);
                ctx.fillText("시크릿", 1500, 790);
            }

            answer_ch = 4;

            break;
        case 6: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[5], 740, 80);
                ctx.fillText("false", 1500, 590);
                ctx.fillText("NAN", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[5].split('가', 1)+"가", 640, 60);
                ctx.fillText(question_ds[5].substring(question_ds[5].indexOf('가')+1, question_ds[5].indexOf('?')) + "?", 670, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("원형 큐", 1500, 590);
                ctx.fillText("데큐", 1500, 790);
            }
            else if(language == "common") { 
                ctx.font = "18px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[5], 610, 80);
                ctx.fillText("동의보감", 1500, 590);
                ctx.fillText("홍길동전", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[5], 760, 80);
                ctx.fillText("아이브", 1500, 590);
                ctx.fillText("르세라핌", 1500, 790);
            }

            answer_ch = 5;

            break;
        case 7: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[6], 700, 80);
                ctx.fillText("제임스 고슬링", 1500, 590);
                ctx.fillText("브레덴 아이크", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[6], 750, 80);
                ctx.fillText("트리", 1500, 590);
                ctx.fillText("큐", 1500, 790);
            }
            else if(language == "common") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[6], 710, 80);
                ctx.fillText("9160원", 1500, 590);
                ctx.fillText("8720원", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[6], 700, 80);
                ctx.fillText("닝닝", 1500, 590);
                ctx.fillText("지엘", 1500, 790);
            }

            answer_ch = 6;

            break;
        case 8: 
            if(language == "js") {
                ctx.font = "16px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[7].split('영', 1), 610, 60);
                ctx.fillText(question_js[7].substring(question_js[7].indexOf('영'), question_js[7].indexOf('?')) + "?", 720, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("화살표 함수", 1500, 590);
                ctx.fillText("가비지 컬렉션", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[7], 720, 80);
                ctx.fillText("퀵 정렬", 1500, 590);
                ctx.fillText("힙 정렬", 1500, 790);
            }
            else if(language == "common") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[7].split('서', 1)+"서", 620, 60);
                ctx.fillText(question_common[7].substring(question_common[7].indexOf('데'), question_common[7].indexOf('?')) + "?", 670, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("메타버스", 1500, 590);
                ctx.fillText("NFC", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[7], 700, 80);
                ctx.fillText("르세라핌", 1500, 590);
                ctx.fillText("엔믹스", 1500, 790);
            }

            answer_ch = 7;

            break;
        case 9: 
            if(language == "js") {
                ctx.font = "18px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[8].split('.', 1)+".", 620, 40);
                ctx.fillText(question_js[8].substring(question_js[8].indexOf('.')+1, question_js[8].indexOf(',')) + ".", 610, 60);
                ctx.fillText(question_js[8].substring(question_js[8].indexOf(',')+1, question_js[8].indexOf('?')) + "?", 800, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("배열", 1500, 590);
                ctx.fillText("맵", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "18px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[8].split('는', 1)+"는", 600, 60);
                ctx.fillText(question_ds[8].substring(question_ds[8].indexOf('도'), question_ds[8].indexOf('가')), 660, 80);
                ctx.fillText(question_ds[8].substring(question_ds[8].indexOf('가'), question_ds[8].indexOf('?')) + "?", 730, 100);
                ctx.fillText("삽입 정렬", 1500, 590);
                ctx.fillText("버블 정렬", 1500, 790);
            }
            else if(language == "common") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[8].split('중', 1)+"중", 670, 60);
                ctx.fillText(question_common[8].substring(question_common[8].indexOf('하'), question_common[8].indexOf('?')) + "?", 670, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("건", 1500, 590);
                ctx.fillText("곤", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[8], 700, 80);
                ctx.fillText("이승윤", 1500, 590);
                ctx.fillText("이승훈", 1500, 790);
            }

            answer_ch = 8;

            break;
        case 10: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[9], 650, 80);
                ctx.fillText("배열", 1500, 590);
                ctx.fillText("셋", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[9].split('큰', 1), 590, 60);
                ctx.fillText(question_ds[9].substring(question_ds[9].indexOf('큰'), question_ds[9].indexOf('?')) + "?", 670, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("삽입 정렬", 1500, 590);
                ctx.fillText("버블 정렬", 1500, 790);
            }
            else if(language == "common") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[9], 710, 80);
                ctx.fillText("안중근", 1500, 590);
                ctx.fillText("방정환", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[9], 700, 80);
                ctx.fillText("서태지와 아이들", 1500, 590);
                ctx.fillText("쿨", 1500, 790);
            }

            answer_ch = 9;

            break;
        case 11: 
            if(language == "js") {
                ctx.font = "18px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[10].split('나', 1)+"나", 660, 60);
                ctx.fillText(question_js[10].substring(question_js[10].indexOf('나')+1, question_js[10].indexOf('?')) + "?", 600, 80);
                ctx.fillText("reverse", 1500, 590);
                ctx.fillText("concat", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[10].split('고', 1)+"고", 640, 60);
                ctx.fillText(question_ds[10].substring(question_ds[10].indexOf('직'), question_ds[10].indexOf('?')) + "?", 630, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("스레드", 1500, 590);
                ctx.fillText("동기", 1500, 790);
            }
            else if(language == "common") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[10].split('로', 1)+"로", 670, 60);
                ctx.fillText(question_common[10].substring(question_common[10].indexOf('지'), question_common[10].indexOf('?')) + "?", 670, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("돌무지무덤", 1500, 590);
                ctx.fillText("고인돌", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[10], 650, 80);
                ctx.fillText("아이즈원", 1500, 590);
                ctx.fillText("아이브", 1500, 790);
            }

            answer_ch = 10;

            break;
        case 12: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[11], 640, 80);
                ctx.fillText("reverse", 1500, 590);
                ctx.fillText("splice", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[11].split('고', 1)+"고", 650, 60);
                ctx.fillText(question_ds[11].substring(question_ds[11].indexOf('고')+1, question_ds[11].indexOf('?')) + "?", 670, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("비동기", 1500, 590);
                ctx.fillText("스레드", 1500, 790);
            }
            else if(language == "common") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[11], 710, 80);
                ctx.fillText("탐라", 1500, 590);
                ctx.fillText("우산국", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "16px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[11], 620, 80);
                ctx.fillText("2AM", 1500, 590);
                ctx.fillText("2PM", 1500, 790);
            }

            answer_ch = 11;

            break;
        case 13: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[12], 620, 80);
                ctx.fillText("splice", 1500, 590);
                ctx.fillText("split", 1500, 790)
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[12], 690, 80);
                ctx.fillText("스레드", 1500, 590);
                ctx.fillText("유니", 1500, 790);    
            }
            else if(language == "common") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[12], 740, 80);
                ctx.fillText("박문수", 1500, 590);
                ctx.fillText("김정호", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[12], 690, 80);
                ctx.fillText("롤린", 1500, 590);
                ctx.fillText("롤리폴리", 1500, 790);
            }

            answer_ch = 12;

            break;
        case 14: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[13], 630, 80);
                ctx.fillText("setTimeout", 1500, 590);
                ctx.fillText("setInterval", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[13], 650, 80);
                ctx.fillText("프로세스", 1500, 590);
                ctx.fillText("애니", 1500, 790);
            }
            else if(language == "common") { 
                ctx.font = "18px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[13], 610, 80);
                ctx.fillText("아틀란티스", 1500, 590);
                ctx.fillText("파라오", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[13], 690, 80);
                ctx.fillText("바오", 1500, 590);
                ctx.fillText("비오", 1500, 790);
            }


            answer_ch = 13;

            break;
        case 15: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[14], 630, 80);
                ctx.fillText("timeRate", 1500, 590);
                ctx.fillText("setInterval", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "19px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[14].split('전', 1)+"전에", 660, 70);
                ctx.fillText(question_ds[14].substring(question_ds[14].indexOf("해"+'당'), question_ds[14].indexOf('?')) + "?", 700, 90);
                ctx.font = "20px malgun gothic"
                ctx.fillText("다익스트라", 1500, 590);
                ctx.fillText("깊이우선탐색", 1500, 790);
            }
            else if(language == "common") { 
                ctx.font = "18px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[14], 730, 80);
                ctx.fillText("유관순", 1500, 590);
                ctx.fillText("김구", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[14], 720, 80);
                ctx.fillText("박재범", 1500, 590);
                ctx.fillText("황찬성", 1500, 790);
            }

            answer_ch = 14;

            break;
        case 16: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[15].split('.', 1)+".", 630, 60);
                ctx.fillText(question_js[15].substring(question_js[15].indexOf('.')+1, question_js[15].indexOf('?')) + "?", 620, 80);
                ctx.fillText("Map", 1500, 590);
                ctx.fillText("Set", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "19px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[15].split('인', 1)+"인", 700, 60);
                ctx.fillText(question_ds[15].substring(question_ds[15].indexOf('인')+1, question_ds[15].indexOf('?')) + "?", 740, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("다익스트라", 1500, 590);
                ctx.fillText("너비우선탐색", 1500, 790);
            }
            else if(language == "common") { 
                ctx.font = "18px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[15], 730, 80);
                ctx.fillText("목성", 1500, 590);
                ctx.fillText("토성", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[15], 760, 80);
                ctx.fillText("NCT 128", 1500, 590);
                ctx.fillText("NCT DREAM", 1500, 790);
            }

            answer_ch = 15;

            break;
        case 17: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[16], 650, 80);
                ctx.fillText("라라벨", 1500, 590);
                ctx.fillText("node", 1500, 790);
            }
            else if(language == "ds") {
                ctx.font = "19px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[16].split('를', 1)+"를", 710, 60);
                ctx.fillText(question_ds[16].substring(question_ds[16].indexOf('를')+1, question_ds[16].indexOf('?')) + "?", 770, 80);
                ctx.font = "20px malgun gothic"
                ctx.fillText("그래프", 1500, 590);
                ctx.fillText("너비우선탐색", 1500, 790);
            }
            else if(language == "common") { 
                ctx.font = "18px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_common[16], 730, 80);
                ctx.fillText("이승만", 1500, 590);
                ctx.fillText("박정희", 1500, 790);
            }
            else if(language == "entertainer") { 
                ctx.font = "20px italic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_entertainer[16], 720, 80);
                ctx.fillText("내꺼하자", 1500, 590);
                ctx.fillText("네꺼하자", 1500, 790);
            }

            answer_ch = 16

            break;
    }
}
 
