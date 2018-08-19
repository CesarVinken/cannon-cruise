let playerScore = 0;

function displayScore() {
  $(".score").text("Gold: " + playerScore);
}

function increaseScore(gold) {
  playerScore += gold;
  displayScore();
  $(".score").attr("id", "golden-letter");

  setTimeout(() => {
    $(".score").removeAttr("id");
  }, 800);
}
