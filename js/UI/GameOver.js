function gameOver() {
  $("#game-over-wrapper").addClass("game-over-background");

  let ducats = playerScore;
  if (playerScore > 0) {
    ducats += " thousand";
  }

  $("#game-over-wrapper").html(
    '<div id="game-over"><h2>GAME OVER</h2><p>You collected ' +
      ducats +
      ' golden ducats</p><button id="restart">Sail one more time!</button></div>'
  );
  $("#restart").click(function() {
    restartGame();
  });
}

function restartGame() {
  $("#game-over-wrapper").removeClass("game-over-background");
  $("#game-over-wrapper").html("");

  newGame();
}
