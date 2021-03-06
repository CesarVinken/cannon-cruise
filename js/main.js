let debug = false;

const canViewport = document.getElementById("canvas");
const ctx = canViewport.getContext("2d");

let gameAssets = {
  sea: {
    name: "sea",
    location: "../img/sea.jpeg",
    width: 640,
    height: 640
  },
  player: {
    name: "player",
    location: "../img/player.jpeg",
    width: 70,
    height: 70,
    health: 6,
    speed: 1.1
  },
  ship: {
    name: "ship",
    location: "../img/trade-vessel.jpeg",
    width: 74,
    height: 74,
    health: 2,
    speed: 1,
    goldValue: 10
  },
  warship: {
    name: "warship",
    location: "../img/warship.jpeg",
    width: 130,
    height: 110,
    health: 3,
    speed: 0.9,
    goldValue: 15
  },
  warship2: {
    name: "warship2",
    location: "../img/warship2.jpeg",
    width: 200,
    height: 75,
    health: 4,
    speed: 0.7,
    goldValue: 30
  },
  cannonball: {
    name: "cannonball",
    location: "../img/cannonball.jpeg",
    width: 20,
    height: 20
  },
  explosion: {
    name: "cannonball",
    location: "../img/explosion.jpeg",
    width: 20,
    height: 20
  },
  smoke: {
    name: "smoke",
    location: "../img/smoke.jpeg",
    width: 80,
    height: 80
  },
  shipwreck: {
    name: "shipwreck",
    location: "../img/shipwreck.jpeg",
    width: 87,
    height: 52
  },
  shipwreck2: {
    name: "shipwreck2",
    location: "../img/shipwreck.jpeg",
    width: 100,
    height: 65
  },
  shipwreck3: {
    name: "shipwreck3",
    location: "../img/shipwreck.jpeg",
    width: 160,
    height: 100
  },
  chest: {
    name: "chest",
    location: "../img/chest.jpeg",
    width: 239,
    height: 191
  }
};

let backgrounds = [],
  ships = [],
  cannonballs = [],
  explosions = [],
  smokeClouds = [],
  shipwrecks = [],
  chests = [];

let sprites = {};
const seaTile = { width: canViewport.width, height: canViewport.height };

let requestedFrame;

$("#start-screen button").click(function() {
  newGame();
  $("#start-screen").hide();
});

function newGame() {
  $(".canvas-wrapper").show();

  setDefaultValues();
  initialiseGame();
  displayHealth();
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
  texts = [];
  sprites = {};

  playerScore = 0;
  destroyedShips = 0;
  warshipSpawningChance = 5;
  capitalShipSpawningChance = 0;
}

//every game loop, draw and move all assets
let gameLoop = function loop() {
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

  ships.forEach((ship, index) => {
    //remove ships that are too far away from the player
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

  texts.forEach(text => {
    text.draw();
  });

  ctx.restore();

  requestedFrame = requestAnimationFrame(gameLoop);
};
