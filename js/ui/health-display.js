function displayHealth() {
  let health = "";
  for (let index = 0; index < sprites.player.health; index++) {
    health += "<img src='../../img/health.jpeg'>";
  }
  $("#health-container").html(health);
}
