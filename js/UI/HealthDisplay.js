function displayHealth() {
  let health = "";
  for (let index = 0; index < sprites.player.health; index++) {
    health += "<img src='../../img/health.png'>";
  }
  console.log(health);
  $("#health-container").html(health);
}
