let canViewport = document.getElementById("canvas");

let seaTile = { width: canViewport.width, height: canViewport.height };

let ctx = canViewport.getContext("2d");

let img = {};
let sprites = {};

//list of assets as objects
let sea = { name: "sea", location: "./img/sea.jpg", width: 640, height: 640 };
let player = {
  name: "player",
  location: "./img/player.png",
  width: 70,
  height: 70
};

let ship = {
  name: "ship",
  location: "./img/player.png",
  width: 70,
  height: 70
};

keyEvents = {
  rightPressed: false,
  leftPressed: false
};

let gameAssets = [sea, player, ship];
let backgrounds = [];
let ships = [];

initialiseGame(gameAssets);

var roc = { x: 120, y: 120 };

function loop() {
  ctx.clearRect(0, 0, canViewport.width, canViewport.height);

  ctx.save();

  ctx.translate(
    -sprites["player"].pos.x +
      canViewport.width / 2 -
      sprites["player"].width / 2,
    -sprites["player"].pos.y +
      canViewport.height / 2 -
      sprites["player"].height / 2
  );

  drawBackground();

  ctx.fillRect(roc.x - 5, roc.y - 5, 10, 10);

  sprites["player"].draw();
  sprites["player"].update();

  // ctx.restore();

  // ctx.save();
  //move ships
  ships.forEach(ship => {
    ship.draw();
    ship.update();
  });

  ctx.restore();

  requestAnimationFrame(loop);
}

function drawBackground() {
  backgrounds.forEach(seaTile => {
    seaTile.draw();
  });
}

function keyDownHandler(event) {
  if (event.keyCode == 39) {
    keyEvents.rightPressed = true;
  } else if (event.keyCode == 37) {
    keyEvents.leftPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.keyCode == 39) {
    keyEvents.rightPressed = false;
  } else if (event.keyCode == 37) {
    keyEvents.leftPressed = false;
  }
}
