let canViewport = document.getElementById("can-viewport");

let seaTile = { width: canViewport.width, height: canViewport.height };

let ctx_viewportCanvas = canViewport.getContext("2d");

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

let gameAssets = [sea, player];
let backgrounds = [];

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
          canViewport.width,
          canViewport.height,
          seaTile.width,
          seaTile.height
        );
      };
    }
    image.src = assets[i].location;
  }
}

function createWorld() {
  console.log("create world..");

  //add sprites
  setupBackground();

  //start game
  requestAnimationFrame(loop);
}

function loop() {
  ctx_viewportCanvas.clearRect(0, 0, canViewport.width, canViewport.height);

  drawBackground();

  console.log(
    "Our current top left on the map: " +
      screenTopLeft +
      ", " +
      screenTopRight +
      "."
  );

  sprites["player"].update();
  sprites["player"].draw();

  requestAnimationFrame(loop);
}

function drawBackground() {
  backgrounds.forEach(seaTile => {
    seaTile.draw();
  });
}

function setupBackground() {
  sprites["seas"["1"]] = new Sea(sea, {
    x: 0 - sea.width,
    y: 0 - sea.height
  });
  sprites["seas"["2"]] = new Sea(sea, {
    x: 0,
    y: 0 - sea.height
  });
  sprites["seas"["3"]] = new Sea(sea, {
    x: 0 + sea.width,
    y: 0 - sea.height
  });
  sprites["seas"["4"]] = new Sea(sea, { x: 0 - sea.width, y: 0 });
  sprites["seas"["5"]] = new Sea(sea, { x: 0, y: 0 });
  sprites["seas"["6"]] = new Sea(sea, { x: 0 + sea.width, y: 0 });
  sprites["seas"["7"]] = new Sea(sea, {
    x: 0 - sea.width,
    y: 0 + sea.height
  });
  sprites["seas"["8"]] = new Sea(sea, {
    x: 0,
    y: 0 + sea.height
  });
  sprites["seas"["9"]] = new Sea(sea, {
    x: 0 + sea.width,
    y: 0 + sea.height
  });
  sprites[player.name] = new Player(player);
}
