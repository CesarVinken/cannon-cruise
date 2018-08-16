function gameOver() {
  $("#game-over-wrapper").addClass("game-over-background");
  $("#game-over-wrapper").html(
    '<div id="game-over"><p>GAME OVER</p><button id="restart">Sail one more time!</button></div>'
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
