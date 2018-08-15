function initialiseGame() {
  document.onkeydown = keyDownHandler;
  document.onkeyup = keyUpHandler;

  for (let asset in gameAssets) {
    gameAssets[asset].img = new Image();

    gameAssets[asset].img.src = gameAssets[asset].location;
  }

  createWorld(
    canViewport.width,
    canViewport.height,
    seaTile.width,
    seaTile.height
  );
}

function createWorld() {
  console.log("create world..");
  setupBackground();
  setupPlayer();
  setupShipsInViewport(6);
  setupShipsOutsideViewport(0);

  //starts game
  requestAnimationFrame(loop);
  checkMapPopulation(); //this loop checks regularly if there are enough ships in the game
}

//creates all sea tiles surrounding the player
function setupBackground() {
  let sea = gameAssets.sea;
  currentMapUpperX = -sea.width;
  currentMapUpperY = -sea.height;

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
}

function setupShipsInViewport(number) {
  for (i = 0; i < number; i++) {
    let s = new Ship(gameAssets.ship);
    s.setRandomLocationInViewport();
    s.create();
  }
}

function setupShipsOutsideViewport(number) {
  for (i = 0; i < number; i++) {
    let s = new Ship(gameAssets.ship);
    s.setRandomLocationOutsideViewport();
    s.create();
  }
}

function setupPlayer() {
  sprites[gameAssets.player.name] = new Player(gameAssets.player);
}
