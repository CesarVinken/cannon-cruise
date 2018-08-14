let canViewport = document.getElementById("canvas");

let seaTile = { width: canViewport.width, height: canViewport.height };

let ctx = canViewport.getContext("2d");

let sprites = {};

let debug = false;

let currentMapUpperX;
let currentMapUpperY;

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
  // console.log(getViewport());
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

  //move ships
  ships.forEach(ship => {
    if (ship.checkShipDeletion()) {
      //remove ship
    } else {
      ship.draw();
      ship.update();
    }
  });

  ctx.restore();

  requestAnimationFrame(loop);
}

function drawBackground() {
  if (
    sprites.player.pos.y <
    currentMapUpperY + sea.height / 2 + sprites.player.height
  ) {
    //draw three sea tiles at the top
    backgrounds = backgrounds.sort(function(a, b) {
      if (a.pos.y < b.pos.y) return -1;
      if (a.pos.y > b.pos.y) return 1;
      return 0;
    });
    currentMapUpperY -= sea.height;
    backgrounds[6].pos.y -= sea.height * 3;
    backgrounds[7].pos.y -= sea.height * 3;
    backgrounds[8].pos.y -= sea.height * 3;
  } else if (
    sprites.player.pos.y >
    currentMapUpperY + sea.height * 2.5 - sprites.player.height
  ) {
    //draw three sea tiles at the bottom
    currentMapUpperY += sea.height;
    backgrounds = backgrounds.sort(function(a, b) {
      if (a.pos.y < b.pos.y) return -1;
      if (a.pos.y > b.pos.y) return 1;
      return 0;
    });
    backgrounds[0].pos.y += sea.height * 3;
    backgrounds[1].pos.y += sea.height * 3;
    backgrounds[2].pos.y += sea.height * 3;
  }

  if (
    sprites.player.pos.x <
    currentMapUpperX + sea.width / 2 + sprites.player.width
  ) {
    //draw three sea tiles on the left
    currentMapUpperX -= sea.width;
    backgrounds = backgrounds.sort(function(a, b) {
      if (a.pos.x < b.pos.x) return -1;
      if (a.pos.x > b.pos.x) return 1;
      return 0;
    });
    backgrounds[6].pos.x -= sea.width * 3;
    backgrounds[7].pos.x -= sea.width * 3;
    backgrounds[8].pos.x -= sea.width * 3;
  } else if (
    sprites.player.pos.x >
    currentMapUpperX + sea.height * 2.5 - sprites.player.width
  ) {
    //draw three sea tiles on the right
    currentMapUpperX += sea.width;
    backgrounds = backgrounds.sort(function(a, b) {
      if (a.pos.x < b.pos.x) return -1;
      if (a.pos.x > b.pos.x) return 1;
      return 0;
    });
    backgrounds[0].pos.x += sea.width * 3;
    backgrounds[1].pos.x += sea.width * 3;
    backgrounds[2].pos.x += sea.width * 3;
  }

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
