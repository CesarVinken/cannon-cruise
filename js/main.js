let canViewport = document.getElementById("can-viewport");
let canPlayer = document.getElementById("can-player");
//let canWorld = document.getElementById("can-world");
let canWorld = createElement("canvas", {
  width: 1280,
  height: 1280
});
let seaTile = { width: 64, height: 64 };

let ctx_viewportCanvas = canViewport.getContext("2d");
let ctx_playerCanvas = canPlayer.getContext("2d");
let ctx_worldCanvas = canWorld.getContext("2d");

let img = {};
let sprites = {};

function createElement(ele, attrObj) {
  /* Create the new Element */
  var element = document.createElement(ele);

  /* Do the following only if attrObj exists */
  if (attrObj) {
    /* Loop through attrObj's properties to set the element's attributes */
    for (var i in attrObj) {
      element.setAttribute(i, attrObj[i]);
      /* attrObj's format:
                {
                    'attribute name': "Attribute's value"
                }
            */
    }
  }

  /* Return the new element */
  return element;
}

initialiseGame(["sea"], ["./img/sea.jpg"]); //name, file location

//loading all assets
function initialiseGame(key, assets) {
  for (let i = 0; i < assets.length; i++) {
    let image = new Image();
    let imageName = key[i];
    console.log("loading: " + imageName);
    if (i !== assets.length - 1) {
      image.onload = function() {
        img[imageName] = this;
      };
    } else {
      image.onload = function() {
        img[imageName] = this;
        createWorld(
          canWorld.width,
          canWorld.height,
          seaTile.width,
          seaTile.height
        );
      };
    }
    image.src = assets[i];
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
  //addSprite("player");

  //start game
  requestAnimationFrame(loop);
}

/* This is the 'viewport' itself btw. Just read it ou loud, helps when you want to understand what's going on */
function loop() {
  /* Update player sprite position */
  // sprites["player"].update();
  //sprites["player"].draw();

  ctx_viewportCanvas.clearRect(0, 0, canViewport.width, canViewport.height);
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
  // canViewport.drawImage(
  //   can_world,
  //   sprites.player.pos.x < 320 || sprites.player.pos.x > can_world.width - 320
  //     ? 0
  //     : sprites["player"].pos.x + sprites["player"].width / 2 - 320,
  //   sprites.player.pos.y < 320 || sprites.player.pos.y > can_world.height - 320
  //     ? 0
  //     : sprites["player"].pos.y + sprites["player"].height / 2 - 320,
  //   640,
  //   640,
  //   0,
  //   0,
  //   640,
  //   640
  // );
  requestAnimationFrame(loop);
}

function addSprite(key) {
  sprites[key] = new Sprite(key);
}
