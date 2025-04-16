let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let h2 = document.querySelector("#level");
let btns = ["red", "green", "yellow", "blue"];
const hightscore = [];
let score = 0;

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
    if(level == '1'){
        setTimeout(() => {btn.classList.add("flash")},2000);
        setTimeout(function () {
            btn.classList.remove("flash");
          }, 2400);
    }else{
        btn.classList.add("flash");
        setTimeout(function () {
            btn.classList.remove("flash");
          }, 400);
    }
}

function userFlash(btn) {
    btn.classList.add("userFlash");
  

  console.log("1");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  score++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  btnFlash(randbtn);
}

function highScore (score) {
  hightscore.push(score);

  return Math.max(...hightscore);
}

function checkAns(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over ! Your score was <b> ${level}</b> <br> Press any key to start. `;

    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "#3C3D37";
    }, 200);
    reset();
  }
}

function btnPress() {
  let userBtn = this;
  userFlash(userBtn);

  userSeq.push(userBtn.getAttribute("id"));
  // console.log(userSeq);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  document.querySelector("#Highest").innerText = `Highest score ${highScore(score)}`;
  started = false;
  level = 0;
  score = 0;
  userSeq = [];
  gameSeq = [];
}
