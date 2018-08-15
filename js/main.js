let canViewport = document.getElementById("canvas");

let seaTile = { width: canViewport.width, height: canViewport.height };

let ctx = canViewport.getContext("2d");

let sprites = {};

let debug = false;

let leftPressed = new KeyEvent();
let rightPressed = new KeyEvent();
let spacePressed = new KeyEvent();

let gameAssets = {
  sea: {
    name: "sea",
    location: "./img/sea.jpg",
    width: 640,
    height: 640
  },
  player: {
    name: "player",
    location: "./img/player.png",
    width: 70,
    height: 70,
    health: 4
  },
  ship: {
    name: "ship",
    location: "./img/player.png",
    width: 70,
    height: 70,
    health: 2
  },
  cannonball: {
    name: "cannonball",
    location: "./img/player.png",
    width: 20,
    height: 20
  }
};
let backgrounds = [];
let ships = [];
let cannonballs = [];

initialiseGame();

function loop() {
  ctx.clearRect(0, 0, canViewport.width, canViewport.height);

  ctx.save();

  ctx.translate(
    -sprites.player.pos.x + canViewport.width / 2 - sprites.player.width / 2,
    -sprites.player.pos.y + canViewport.height / 2 - sprites.player.height / 2
  );

  drawBackground();

  sprites.player.draw();
  sprites.player.update();

  //move ships
  ships.forEach((ship, index) => {
    if (ship === sprites.player) return;

    if (ship.shipTooFarAway()) {
      ship.remove(index);
      setupShipsOutsideViewport(1);
      //remove ship
    } else {
      ship.draw();
      ship.update();
    }
  });

  cannonballs.forEach(cannonball => {
    cannonball.draw();
    cannonball.update();
  });

  ctx.restore();

  requestAnimationFrame(loop);
}

function keyDownHandler(event) {
  if (event.keyCode == 39) {
    rightPressed.keyPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed.keyPressed = true;
  } else if (event.keyCode == 32) {
    if (spacePressed.available) {
      spacePressed.keyPressed = true;
      spacePressed.cooldown();
    }
  }
}

function keyUpHandler(event) {
  if (event.keyCode == 39) {
    rightPressed.keyPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed.keyPressed = false;
  } else if (event.keyCode == 32) {
    spacePressed.keyPressed = false;
  }
}
