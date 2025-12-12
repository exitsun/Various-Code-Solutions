"use strict";
const outcome = document.querySelector(".outcome");
const outcomeDetail = document.querySelector(".outcome-detail");
const matchHistory = document.querySelector(".match-history");

let isAutoPlaying = false;

let score = JSON.parse(localStorage.getItem("score")) || {
  //boolean if value not truthy do the other side of the code
  wins: 0,
  losses: 0,
  ties: 0,
};
updateScore();
gameOutcome();

const moveButtons = document.querySelectorAll(".move-button");
moveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerMove = button.dataset.move;
    playGame(playerMove);
  });
});
const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScore();
  gameOutcome();
});
const autoPlayButton = document.querySelector(".auto-play-button");
autoPlayButton.addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }

  //   console.log(event.key);
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose!";
    } else if (computerMove === "paper") {
      result = "You win!";
    } else {
      result = "Tie game!";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie game!";
    } else if (computerMove === "paper") {
      result = "You lose!";
    } else {
      result = "You win!";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win!";
    } else if (computerMove === "paper") {
      result = "Tie game!";
    } else {
      result = "You lose!";
    }
  }

  if (result === "You win!") {
    score.wins++;
  } else if (result === "You lose!") {
    score.losses++;
  } else if (result === "Tie game!") {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score)); //local storage przechowuje jedynie string wiec stringify aby zachować
  updateScore();
  gameOutcome(playerMove, computerMove, result);
}

function updateScore() {
  matchHistory.innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}`;
}
function gameOutcome(playerMove, computerMove, result) {
  if (result) {
    outcome.innerHTML = `${result}`;
    outcomeDetail.innerHTML = `You picked <img src="./${playerMove}-emoji.png" class="move-icon"/>. Computer picked: <img src="./${computerMove}-emoji.png" class="move-icon"/>.`;
  } else {
    outcome.innerHTML = "Play game!";
    outcomeDetail.innerHTML = "Pick your move!";
  }
}

function pickComputerMove() {
  let computerMove = "";
  let randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove; // displays the value in the console!
}
let intervalId;

// const autoPlay = () => {}; // can be described as this, but regular function is preffered because of clearer hoisting rules

function autoPlay() {
  if (!isAutoPlaying) {
    isAutoPlaying = true;
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
