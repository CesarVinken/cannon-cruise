let currentMapUpperX;
let currentMapUpperY;
let warshipSpawningChance = 5; //percentage chance a new ship will be a warship
let destroyedShips = 0;

const maxShipPop = 11;

function drawBackground() {
  if (
    sprites.player.pos.y <
    currentMapUpperY + gameAssets.sea.height / 2 + sprites.player.height
  ) {
    //draw three sea tiles at the top
    backgrounds = backgrounds.sort(function(a, b) {
      if (a.pos.y < b.pos.y) return -1;
      if (a.pos.y > b.pos.y) return 1;
      return 0;
    });
    currentMapUpperY -= gameAssets.sea.height;
    backgrounds[6].pos.y -= gameAssets.sea.height * 3;
    backgrounds[7].pos.y -= gameAssets.sea.height * 3;
    backgrounds[8].pos.y -= gameAssets.sea.height * 3;
  } else if (
    sprites.player.pos.y >
    currentMapUpperY + gameAssets.sea.height * 2.5 - sprites.player.height
  ) {
    //draw three sea tiles at the bottom
    currentMapUpperY += gameAssets.sea.height;
    backgrounds = backgrounds.sort(function(a, b) {
      if (a.pos.y < b.pos.y) return -1;
      if (a.pos.y > b.pos.y) return 1;
      return 0;
    });
    backgrounds[0].pos.y += gameAssets.sea.height * 3;
    backgrounds[1].pos.y += gameAssets.sea.height * 3;
    backgrounds[2].pos.y += gameAssets.sea.height * 3;
  }

  if (
    sprites.player.pos.x <
    currentMapUpperX + gameAssets.sea.width / 2 + sprites.player.width
  ) {
    //draw three sea tiles on the left
    currentMapUpperX -= gameAssets.sea.width;
    backgrounds = backgrounds.sort(function(a, b) {
      if (a.pos.x < b.pos.x) return -1;
      if (a.pos.x > b.pos.x) return 1;
      return 0;
    });
    backgrounds[6].pos.x -= gameAssets.sea.width * 3;
    backgrounds[7].pos.x -= gameAssets.sea.width * 3;
    backgrounds[8].pos.x -= gameAssets.sea.width * 3;
  } else if (
    sprites.player.pos.x >
    currentMapUpperX + gameAssets.sea.height * 2.5 - sprites.player.width
  ) {
    //draw three sea tiles on the right
    currentMapUpperX += gameAssets.sea.width;
    backgrounds = backgrounds.sort(function(a, b) {
      if (a.pos.x < b.pos.x) return -1;
      if (a.pos.x > b.pos.x) return 1;
      return 0;
    });
    backgrounds[0].pos.x += gameAssets.sea.width * 3;
    backgrounds[1].pos.x += gameAssets.sea.width * 3;
    backgrounds[2].pos.x += gameAssets.sea.width * 3;
  }

  backgrounds.forEach(seaTile => {
    seaTile.draw();
  });
}

function checkMapPopulation() {
  setInterval(function() {
    console.log("check ship population. Ship population is " + ships.length);
    if (ships.length < maxShipPop) {
      setupShipsOutsideViewport(1);
    }
  }, 6000);
}

function chooseShipType() {
  random = Math.floor(Math.random() * Math.floor(100)); //50%

  if (random < warshipSpawningChance) {
    return new Warship(gameAssets.warship);
  } else {
    return new Ship(gameAssets.ship);
  }
}
function handleSpawningChances() {
  if (destroyedShips >= 8) warshipSpawningChance = 95;
  else if (destroyedShips >= 5) warshipSpawningChance = 70;
  else if (destroyedShips >= 3) warshipSpawningChance = 40;
  else if (destroyedShips >= 1) warshipSpawningChance = 25;
  else warshipSpawningChance = 5;
}
