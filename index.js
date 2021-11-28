"use strict";

let opeingAudio = new Audio("audio/opening.mp3");
opeingAudio.play();

function button2_click() {
    let node = document.querySelector('#audio1');
    node.play();
    console.log("사운드 재생");
  }

  function button1_click() {
    let node = document.querySelector('#audio1');
    node.play();
    console.log("사운드 재생");
  }