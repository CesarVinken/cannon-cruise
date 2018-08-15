let playerScore = 0;

function displayScore() {
  $("#score").text("Gold: " + playerScore);
  // let viewportPos = getViewport();
  //   ctx.font = "20px Georgia";
  // ctx.fillText("Hello World!", 10, 50);
}

function increaseScore(gold) {
  playerScore += gold;
}
