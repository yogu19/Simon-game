const music = document.getElementById('bg-music');
const soundBtn = document.getElementById('soundBtn');
const audio1 = document.getElementById("myAudio1");
const audio2 = document.getElementById("myAudio2");
let isPlaying = false;

function toggleSound() {
  if (!isPlaying) {
    music.play();
    soundBtn.textContent = '🔊'; // Sound On icon
    isPlaying = true;
  } else {
    music.pause();
    soundBtn.textContent = '🔇'; // Sound Off icon
    isPlaying = false;
  }
}

document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("home-screen").classList.remove("active");
  document.getElementById("game-screen").classList.add("active");

  //trigger the game start
  startGame();
});

function startGame() {
  let gameSeq = [];
  let userSeq = [];
  let started = false;
  let level = 0;
  let h2 = document.querySelector("#level");
  let btns = ["red", "green", "yellow", "blue"];
  let highest = 0;
  let score = 0;

  document.addEventListener("keypress", function () {
    if (started == false) {
      started = true;
      levelUp();
    }
  });

  function btnFlash(btn) {
    audio2.currentTime = 0;
    audio2.play();
    btn.classList.add("flash");
    setTimeout(function () {
      btn.classList.remove("flash");
    }, 400);
  }

  function userFlash(btn) {
    btn.classList.add("userFlash");
    audio1.currentTime = 0;
    audio1.play();
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

  function highScore(score) {
    if (score > highest) highest = score;
    return highest;
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
}

