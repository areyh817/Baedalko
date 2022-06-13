//지하철 게임
/*
//기본세팅
-제한시간 30초
-한 문제당 5점
-30초 안에 문제를 맞춘 갯수만큼 점수 획득
-지하철 문 열리면서 30초 카운트 시작(게임 시작)
-제한시간 30초가 끝나면 재하철 문 닫히면서 게임 종료 
-게임 종료 후 두번째 게임인 달리기 게임으로 넘어감
-첫번째, 두번째, 세번째 게임 점수 누적되어야 함

//게임
-backgroundImg 아이디 불러와서 이미지 넣기
-30초 제한시간 끝나면 닫힌 문 넣기
-html에서 <p>태그로 문제 넣을 곳 만들기
-객관식 버튼 3개
-버튼 아이디 가져와서 답 맞는지 체크
-답 맞으면 score+=5, 다음 문제로 넘어가기
-틀리면 score+=0, 다음 문제로 넘어가기
-30초 끝나면 달리기 게임으로 넘어가기

//문제


//나왔던 문제 안나오게 하기
-문제 나왔던 랜덤 들어갈 배열 만들기(배열 크기 미정 : 사용자가 몇 문제 풀지 모르기 때문)
ex) rand가 1이 나왔다면 배열에 1넣어주기...
-문제 랜덤 뽑을 때 중복 체크해서 나왔던 문제 또 안나오게 하기

//정답 체크
-html에서 버튼 만들기
-1번 버튼 누르면 클릭 이벤트로 함수 불러와서 <div>속성에 btn1넣어줌
-js에서 getElementById로 btn1인지 btn2인지 btn3인지 체크

*/

// 캔버스 생성
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// let language = document.getElementById("language_choice").value;
// alert(language);

let language = location.href.split('?')[1];
// alert(subject);

// let subject = "js";

let door_open = new Image();    //열린 문 이미지
let door_close = new Image();   //닫힌 문 이미지
let one = new Image();      //1
let two = new Image();      //2
let three = new Image();    //3

let door;   //닫힘 or 열림
let time = 30;  //제한시간 30초
let user_select;    //사용자가 선택한 번호
let user_score = 0;     //사용자의 점수
let answer_ch;   //문제 정답 체크
let Question_random = [0];  //질문 랜덤으로 들어갈 배열

door_open.src = '/game_subway/subway_door/subway_open.png';
door_close.src = "/game_subway/subway_door/subway_close.png";
one.src = '/game_subway/number/num_1.png';
two.src = '/game_subway/number/num_2.png';
three.src = '/game_subway/number/num_3.png';

//효과음
let openAudio = new Audio('/audio/door_open.mp3');  //지하철 문 열릴시
let closeAudio = new Audio('/audio/door_close.mp3');  //지하철 문 닫힐시
let answer_true = new Audio('/audio/true.wav');  //문제 정답시
let answer_false = new Audio('/audio/wrong.wav');   //문제 오답시

door = "close" //닫힘, 게임 시작 전 닫힌 문

Door(door);

//문 열림, 닫힘
function Door(door) {
    if(door == "close") {   //닫힘이면
        //alert("close");
        door_close.onload = () => {
            //alert("close 들어옴")
            ctx.drawImage(door_close, 0, 0, 1710, 680);
        }
    } 

    else if(door == "close2") {
        ctx.drawImage(door_close, 0, 0, 1710, 680);
    }

    else if(door == "open") {   //열림이면
        ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
        ctx.drawImage(door_open, 0, 0, 1710, 680);
    }
}

//정답 버튼
function Btn() {
    ctx.drawImage(one, 720, 270, 50, 50);
    ctx.drawImage(two, 720, 340, 50, 50);
    ctx.drawImage(three, 720, 410, 50, 50);
}

//게임판 정리
function Clear() {
    //사각형 색
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(600, 125, 562, 427);
}

//캔버스 클릭 이벤트
canvas.onclick = function(event) {
    //마우스 x좌표, y좌표
    const x = event.clientX - ctx.canvas.offsetLeft;
    const y = event.clientY - ctx.canvas.offsetTop;

    // alert("x : " + x + " y : " + y);

    //마우스의 x좌표 : 720 ~ 770, y좌표 : 270 ~ 320이면 1
    //x좌표 : 720 ~ 770, y좌표 : 340 ~ 390이면 2
    //x좌표 : 720 ~ 770, y좌표 : 410 ~ 460이면 3
    if((x >= 720 && x <= 770) && (y >= 270 && y <= 320)) {
        user_select = 1;
        //alert("answer_ch : " + answer_ch);
        if(language == "js") {
            Answer_check(js_answer[answer_ch]);
        }
        else if(language == "ds") {
            Answer_check(ds_answer[answer_ch]);
        }
    }
    else if((x >= 720 && x <= 770) &&y >= 340 && y <= 390) {
        user_select = 2;
        //alert("answer_ch : " + answer_ch);
        if(language == "js") {
            Answer_check(js_answer[answer_ch]);
        }
        else if(language == "ds") {
            Answer_check(ds_answer[answer_ch]);
        }
    }
    else if((x >= 720 && x <= 770) &&y >= 410 && y <= 460) {
        user_select = 3;
        //alert("answer_ch : " + answer_ch);
        if(language == "js") {
            Answer_check(js_answer[answer_ch]);
        }
        else if(language == "ds") {
            Answer_check(ds_answer[answer_ch]);
        }
    }
}

//정답 체크 && 점수 주기
function Answer_check(answer) {
    //사용자가 선택한 정답과 문제의 정답이 같다면 
    if(user_select == answer) {
        answer_true.play();
        user_score += 5;
        alert("user_score : " + user_score);
        Clear();
        Btn();
        Question();
    } else {
        answer_false.play();
        user_score += 0;
        alert("user_score : " + user_score);
        Clear();
        Btn();
        Question();
    }
}

//js문제 정답
let  js_answer = [
    "2", "3", "1", "2", "3", "1", "2", "1", "3", "2", "3", "1", "3", "2", "2", "2", "1"
]

//ds문제 정답
let  ds_answer = [
    "2", "1", "1", "3", "2", "3", "3", "3", "1", "2", "2", "3", "3", "1", "2", "1", "3"
]

Question();

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

    //let rand = Math.floor(Math.random() * 23) + 1;
    //let rand = 4;

    //문제 랜덤
    // let rand;

    // 문제 중복없이 출제
    // alert("Question_random : " + Question_random);
    // alert("Question_random.length : " + Question_random.length);
    for(let i = 0; i < Question_random.length; i++) {
        rand = Math.floor(Math.random() * 16)+1;
        if(!Question_random.includes(rand)) {
            Question_random.push(rand);
            // alert("Question_random.length : " + Question_random.length);
            break;
        }else {
            i--;
        }
    }

    // alert("rand : " + rand);
    // alert(Question_random);

    // let rand = 3;

    switch(rand){
        case 1: 
            if(language == "js") {  //사용자가 선택한 언어가 js일 때
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[0], 640, 180);
                ctx.fillText("use struct", 820, 300);
                ctx.fillText("use strict", 820, 370);
                ctx.fillText("use State", 820, 440);
            } 
            else if(language == "ds") { //사용자가 선택한 언어가 ds일 때
                ctx.font = "18px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[0].split('우', 1)+"우", 620, 180);
                ctx.fillText(question_ds[0].substring(question_ds[0].indexOf('우')+1, question_ds[0].indexOf('등')), 613, 210);
                ctx.fillText(question_ds[0].substring(question_ds[0].indexOf('등'), question_ds[0].indexOf('?')) + "?", 618, 240);
                ctx.fillText("ArrayList", 820, 300);
                ctx.fillText("LinkedList", 820, 370);
                ctx.fillText("배열", 820, 440);
            }

            answer_ch = 0;

            break;
        case 2: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[1].split('.', 1)+".", 700, 180);
                ctx.fillText(question_js[1].substring(question_js[1].indexOf('.')+1, question_js[1].indexOf('?')) + "?", 685, 210);
                ctx.fillText("int", 850, 300);
                ctx.fillText("val", 850, 370);
                ctx.fillText("let", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "18px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[1].split('로', 1)+"로", 620, 180);
                ctx.fillText(question_ds[1].substring(question_ds[1].indexOf('로')+1, question_ds[0].indexOf('등')), 613, 210);
                ctx.fillText(question_ds[1].substring(question_ds[1].indexOf('잘'), question_ds[0].indexOf('?')), 618, 240);
                ctx.fillText("Vector", 820, 300);
                ctx.fillText("var", 820, 370);
                ctx.fillText("val", 820, 440);
            }

            answer_ch = 1;

            break;
        case 3: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[2], 800, 180);
                ctx.fillText("object", 850, 300);
                ctx.fillText("function", 850, 370);
                ctx.fillText("false", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[2].split('어', 1)+"어", 620, 180);
                ctx.fillText(question_ds[2].substring(question_ds[2].indexOf('어')+1, question_ds[2].indexOf('?')) + "?", 720, 210);
                ctx.font = "20px malgun gothic"
                ctx.fillText("ArrayList", 850, 300);
                ctx.fillText("LinkedList", 850, 370);
                ctx.fillText("배열", 850, 440);
            }

            answer_ch = 2;

            break;
        case 4: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[3], 800, 180);
                ctx.fillText("object", 850, 300);
                ctx.fillText("function", 850, 370);
                ctx.fillText("true", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[3].split('는', 1)+"는", 640, 180);
                ctx.fillText(question_ds[3].substring(question_ds[3].indexOf('자'), question_ds[3].indexOf('?')) + "?", 610, 210);
                ctx.font = "20px malgun gothic"
                ctx.fillText("데큐", 850, 300);
                ctx.fillText("큐", 850, 370);
                ctx.fillText("스택", 850, 440);
            }

            answer_ch = 3;

            break;
        case 5: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[4], 730, 180);
                ctx.fillText("0", 850, 300);
                ctx.fillText("1", 850, 370);
                ctx.fillText("NAN", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[4].split('른', 1)+"른", 640, 180);
                ctx.fillText(question_ds[4].substring(question_ds[4].indexOf('른')+1, question_ds[4].indexOf('?')) + "?", 780, 210);
                ctx.font = "20px malgun gothic"
                ctx.fillText("데큐", 850, 300);
                ctx.fillText("큐", 850, 370);
                ctx.fillText("트리", 850, 440);
            }

            answer_ch = 4;

            break;
        case 6: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[5], 750, 180);
                ctx.fillText("false", 850, 300);
                ctx.fillText("true", 850, 370);
                ctx.fillText("NAN", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[5].split('가', 1)+"가", 640, 180);
                ctx.fillText(question_ds[5].substring(question_ds[5].indexOf('가')+1, question_ds[5].indexOf('?')) + "?", 670, 210);
                ctx.font = "20px malgun gothic"
                ctx.fillText("원형 큐", 850, 300);
                ctx.fillText("트리", 850, 370);
                ctx.fillText("데큐", 850, 440);
            }

            answer_ch = 5;

            break;
        case 7: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[6], 700, 180);
                ctx.fillText("제임스 고슬링", 850, 300);
                ctx.fillText("브레덴 아이크", 850, 370);
                ctx.fillText("데니스리치", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[6], 750, 180);
                ctx.fillText("데큐", 850, 300);
                ctx.fillText("큐", 850, 370);
                ctx.fillText("트리", 850, 440);
            }

            answer_ch = 6;

            break;
        case 8: 
            if(language == "js") {
                ctx.font = "16px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[7].split('영', 1), 620, 180);
                ctx.fillText(question_js[7].substring(question_js[7].indexOf('영'), question_js[7].indexOf('?')) + "?", 730, 210);
                ctx.font = "20px malgun gothic"
                ctx.fillText("화살표 함수", 850, 300);
                ctx.fillText("가비지 컬렉션", 850, 370);
                ctx.fillText("화살표 상속", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[7], 720, 180);
                ctx.fillText("힙 정렬", 850, 300);
                ctx.fillText("버블 정렬", 850, 370);
                ctx.fillText("퀵 정렬", 850, 440);
            }

            answer_ch = 7;

            break;
        case 9: 
            if(language == "js") {
                ctx.font = "18px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[8].split('.', 1)+".", 625, 180);
                ctx.fillText(question_js[8].substring(question_js[8].indexOf('.')+1, question_js[8].indexOf(',')) + ".", 620, 210);
                ctx.fillText(question_js[8].substring(question_js[8].indexOf(',')+1, question_js[8].indexOf('?')) + "?", 620, 240);
                ctx.font = "20px malgun gothic"
                ctx.fillText("배열", 850, 300);
                ctx.fillText("셋", 850, 370);
                ctx.fillText("맵", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "18px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[8].split('는', 1)+"는", 610, 180);
                ctx.fillText(question_ds[8].substring(question_ds[8].indexOf('도'), question_ds[8].indexOf('가')), 660, 210);
                ctx.fillText(question_ds[8].substring(question_ds[8].indexOf('가'), question_ds[8].indexOf('?')) + "?", 730, 240);
                ctx.fillText("삽입 정렬", 820, 300);
                ctx.fillText("버블 정렬", 820, 370);
                ctx.fillText("힙 정렬", 820, 440);
            }

            answer_ch = 8;

            break;
        case 10: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[9], 680, 180);
                ctx.fillText("배열", 850, 300);
                ctx.fillText("셋", 850, 370);
                ctx.fillText("맵", 850, 440); 
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[9].split('큰', 1), 610, 180);
                ctx.fillText(question_ds[9].substring(question_ds[9].indexOf('큰'), question_ds[9].indexOf('?')) + "?", 670, 210);
                ctx.font = "20px malgun gothic"
                ctx.fillText("삽입 정렬", 850, 300);
                ctx.fillText("버블 정렬", 850, 370);
                ctx.fillText("병합 정렬", 850, 440);
            }

            answer_ch = 9;

            break;
        case 11: 
            if(language == "js") {
                ctx.font = "18px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[10].split('나', 1)+"나", 670, 180);
                ctx.fillText(question_js[10].substring(question_js[10].indexOf('나')+1, question_js[10].indexOf('?')) + "?", 620, 210);
                ctx.fillText("reverse", 850, 300);
                ctx.fillText("split", 850, 370);
                ctx.fillText("concat", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[10].split('고', 1)+"고", 640, 180);
                ctx.fillText(question_ds[10].substring(question_ds[10].indexOf('직'), question_ds[10].indexOf('?')) + "?", 630, 210);
                ctx.font = "20px malgun gothic"
                ctx.fillText("스레드", 850, 300);
                ctx.fillText("동기", 850, 370);
                ctx.fillText("비동기", 850, 440);
            }

            answer_ch = 10;

            break;
        case 12: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[11], 640, 180);
                ctx.fillText("reverse", 850, 300);
                ctx.fillText("splice", 850, 370);
                ctx.fillText("request", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[11].split('고', 1)+"고", 670, 180);
                ctx.fillText(question_ds[11].substring(question_ds[11].indexOf('고')+1, question_ds[11].indexOf('?')) + "?", 680, 210);
                ctx.font = "20px malgun gothic"
                ctx.fillText("스레드", 850, 300);
                ctx.fillText("멀티", 850, 370);
                ctx.fillText("비동기", 850, 440);
            }

            answer_ch = 11;

            break;
        case 13: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[12], 640, 180);
                ctx.fillText("request", 850, 300);
                ctx.fillText("split", 850, 370);
                ctx.fillText("splice", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[12], 710, 180);
                ctx.fillText("유니", 850, 300);
                ctx.fillText("애니", 850, 370);
                ctx.fillText("스레드", 850, 440);
            }

            answer_ch = 12;

            break;
        case 14: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[13], 650, 180);
                ctx.fillText("timeRate", 850, 300);
                ctx.fillText("setTimeout", 850, 370);
                ctx.fillText("setInterval", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[13], 650, 180);
                ctx.fillText("프로세스", 850, 300);
                ctx.fillText("애니", 850, 370);
                ctx.fillText("행", 850, 440);
            }

            answer_ch = 13;

            break;
        case 15: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[14], 650, 180);
                ctx.fillText("timeRate", 850, 300);
                ctx.fillText("setInterval", 850, 370);
                ctx.fillText("timer", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "19px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[14].split('전', 1)+"전에", 660, 180);
                ctx.fillText(question_ds[14].substring(question_ds[14].indexOf("해"+'당'), question_ds[14].indexOf('?')) + "?", 700, 210);
                ctx.font = "20px malgun gothic"
                ctx.fillText("다익스트라", 850, 300);
                ctx.fillText("깊이우선탐색", 850, 370);
                ctx.fillText("너비우선탐색", 850, 440);
            }

            answer_ch = 14;

            break;
        case 16: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[15].split('.', 1)+".", 650, 180);
                ctx.fillText(question_js[15].substring(question_js[15].indexOf('.')+1, question_js[15].indexOf('?')) + "?", 640, 210);
                ctx.fillText("Map", 850, 300);
                ctx.fillText("Set", 850, 370);
                ctx.fillText("foreach", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "19px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[15].split('인', 1)+"인", 700, 180);
                ctx.fillText(question_ds[15].substring(question_ds[15].indexOf('인')+1, question_ds[15].indexOf('?')) + "?", 740, 210);
                ctx.font = "20px malgun gothic"
                ctx.fillText("다익스트라", 850, 300);
                ctx.fillText("너비우선탐색", 850, 370);
                ctx.fillText("그래프", 850, 440);
            }

            answer_ch = 15;

            break;
        case 17: 
            if(language == "js") {
                ctx.font = "20px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_js[16], 650, 180);
                ctx.fillText("라라벨", 850, 300);
                ctx.fillText("node", 850, 370);
                ctx.fillText("react", 850, 440);
            }
            else if(language == "ds") {
                ctx.font = "19px malgun gothic"
                ctx.fillStyle = "#000000";
                ctx.fillText(question_ds[16].split('를', 1)+"를", 710, 180);
                ctx.fillText(question_ds[16].substring(question_ds[16].indexOf('를')+1, question_ds[16].indexOf('?')) + "?", 770, 210);
                ctx.font = "20px malgun gothic"
                ctx.fillText("깊이우선탐색", 850, 300);
                ctx.fillText("그래프", 850, 370);
                ctx.fillText("너비우선탐색", 850, 440);
            }

            answer_ch = 16;

            break;
    }
}

//3초 뒤 게임 시작
setTimeout(function() { 
    openAudio.play();
    setTimeout(function() {
        door = "open"
        Door(door);
        Btn();
    
        let Subway = setInterval(function() {
            time--;
            document.getElementById("timer").value = time;
        
            //제한시간 30초가 끝났을 시
            if(time <= 0) {
                clearInterval(Subway);  //setInteval() 실행을 끝냄
                Clear();
                closeAudio.play();
                setTimeout(function() {
                    door = "close2"
                    Door(door);

                    setTimeout(function() {
                        location.href = `/game_schoolrun/gradeChoice.html?${user_score}?${language}`;
                    }, 2000)    //2초 뒤 스쿨런 게임 
                }, 5000)    //5초 뒤 문 닫힘
            }
        }, 1000);   //문 열리는 효과음 후 1초 뒤 30초 제한시간 시작
    
        Question();
    }, 1000)
}, 3000);