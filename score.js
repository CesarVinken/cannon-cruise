let playerScore = 0;

function displayScore() {
  $(".score").text("Gold: " + playerScore);
}

function increaseScore(gold) {
  playerScore += gold;
  displayScore();
  console.log("score effect");
  $(".score").addClass("golden-letter");

  setTimeout(() => {
    $(".score").removeClass("golden-letter");
  }, 800);
}
