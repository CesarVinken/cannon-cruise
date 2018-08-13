let canViewport = document.getElementById("can-viewport");
let canPlayer = document.getElementById("can-player");

let canWorld = createElement("canvas", {
  width: 1280,
  height: 1280
});

let seaTile = { width: 64, height: 64 };

let ctx_viewportCanvas = canViewport.getContext("2d");
let ctx_playerCanvas = canPlayer.getContext("2d");
let ctx_worldCanvas = canWorld.getContext("2d");

let screenTopLeft = canWorld.width / 2 - canViewport.width / 2;
let screenTopRight = canWorld.height / 2 - canViewport.height / 2;

let img = {};
let sprites = {};

//list of assets as objects
let sea = { name: "sea", location: "./img/sea.jpg", width: 64, height: 64 };
let player = {
  name: "player",
  location: "./img/player.png",
  width: 40,
  height: 40
};

let gameAssets = [sea, player];

initialiseGame(gameAssets);

//loading all assets
function initialiseGame(assets) {
  for (let i = 0; i < assets.length; i++) {
    let image = new Image();
    let imageName = assets[i].name;
    console.log("loading: " + imageName);
    if (i !== assets.length - 1) {
      image.onload = function() {
        img[imageName] = this;
        img.width = assets[i].width;
        img.height = assets[i].height;
      };
    } else {
      image.onload = function() {
        img[imageName] = this;
        img.width = assets[i].width;
        img.height = assets[i].height;
        createWorld(
          canWorld.width,
          canWorld.height,
          seaTile.width,
          seaTile.height
        );
      };
    }
    image.src = assets[i].location;
  }
}

function createWorld(numTileWidth, numTileHeight, tWidth, tHeight) {
  console.log("create world..");
  for (let i = 0, len = numTileHeight; i < len; i++) {
    for (let k = 0, len2 = numTileWidth; k < len2; k++) {
      let x = k * tWidth;
      let y = i * tHeight;
      let image = img["sea"];
      ctx_worldCanvas.drawImage(image, x, y, tWidth, tHeight);
    }
  }
  //add player as sprite
  addSprite(player);

  //start game
  requestAnimationFrame(loop);
}

/* This is the 'viewport' itself btw. Just read it ou loud, helps when you want to understand what's going on */
function loop() {
  ctx_viewportCanvas.clearRect(0, 0, canViewport.width, canViewport.height);
  console.log(
    "Our current top left on the map: " +
      screenTopLeft +
      ", " +
      screenTopRight +
      "."
  );
  //Update player sprite position

  ctx_viewportCanvas.drawImage(
    canWorld,
    canViewport.width,
    canViewport.height,
    canViewport.width,
    canViewport.height,
    0,
    0,
    canViewport.width,
    canViewport.height
  );

  sprites["player"].update();
  sprites["player"].draw();

  requestAnimationFrame(loop);
}

function addSprite(asset) {
  sprites[asset.name] = new Sprite(asset);
}
