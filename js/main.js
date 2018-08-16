let canViewport = document.getElementById("canvas");

let seaTile = { width: canViewport.width, height: canViewport.height };

let ctx = canViewport.getContext("2d");

let sprites = {};

let debug = false;

let leftPressed = new KeyEvent();
let rightPressed = new KeyEvent();
let aPressed = new KeyEvent();
let dPressed = new KeyEvent();

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
    health: 4,
    speed: 1.1
  },
  ship: {
    name: "ship",
    location: "./img/player.png",
    width: 70,
    height: 70,
    health: 2,
    speed: 1
  },
  warship: {
    name: "warship",
    location: "./img/warship.png",
    width: 110,
    height: 110,
    health: 3,
    speed: 0.9
  },
  cannonball: {
    name: "cannonball",
    location: "./img/cannonball.png",
    width: 20,
    height: 20
  },
  explosion: {
    name: "cannonball",
    location: "./img/explosion.png",
    width: 20,
    height: 20
  },
  smoke: {
    name: "smoke",
    location: "./img/smoke.png",
    width: 80,
    height: 80
  },
  shipwreck: {
    name: "shipwreck",
    location: "./img/shipwreck.png",
    width: 87,
    height: 52
  },
  chest: {
    name: "chest",
    location: "./img/chest.png",
    width: 239,
    height: 191
  }
};
let backgrounds = [];
let ships = [];
let cannonballs = [];
let explosions = [];
let smokeClouds = [];
let shipwrecks = [];
let chests = [];

$("#start-screen button").click(function() {
  newGame();
  $("#start-screen").hide();
});
function newGame() {
  $(".canvas-wrapper").show();

  setDefaultValues();
  initialiseGame();
  displayScore();
}

function setDefaultValues() {
  backgrounds = [];
  ships = [];
  cannonballs = [];
  explosions = [];
  smokeClouds = [];
  shipwrecks = [];
  chests = [];
}

function loop() {
  ctx.clearRect(0, 0, canViewport.width, canViewport.height);

  ctx.save();

  ctx.translate(
    -sprites.player.pos.x + canViewport.width / 2 - sprites.player.width / 2,
    -sprites.player.pos.y + canViewport.height / 2 - sprites.player.height / 2
  );

  drawBackground();

  if (!sprites.player.isDead) {
    sprites.player.draw();
    sprites.player.update();
  }

  //move ships
  ships.forEach((ship, index) => {
    if (ship.distanceToPlayer > 700) {
      ship.remove(index);
      setupShipsOutsideViewport(1);
    } else {
      ship.draw();
      ship.update();
    }
  });

  cannonballs.forEach(cannonball => {
    cannonball.draw();
    cannonball.update();
  });

  explosions.forEach(explosion => {
    explosion.draw();
  });

  smokeClouds.forEach(smokeCloud => {
    smokeCloud.draw();
  });

  shipwrecks.forEach(shipwreck => {
    shipwreck.draw();
  });

  chests.forEach(chest => {
    chest.draw();
    chest.update();
  });

  ctx.restore();

  requestAnimationFrame(loop);
}

function keyDownHandler(event) {
  if (event.keyCode == 39) {
    rightPressed.keyPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed.keyPressed = true;
  } else if (event.keyCode == 65) {
    if (aPressed.available) {
      aPressed.keyPressed = true;
      //   aPressed.cooldown();
    }
  } else if (event.keyCode == 68) {
    if (dPressed.available) {
      dPressed.keyPressed = true;
      // dPressed.cßooldown();
    }
  }
}

function keyUpHandler(event) {
  if (event.keyCode == 39) {
    rightPressed.keyPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed.keyPressed = false;
  } else if (event.keyCode == 65) {
    aPressed.keyPressed = false;
  } else if (event.keyCode == 68) {
    dPressed.keyPressed = false;
  }
}
