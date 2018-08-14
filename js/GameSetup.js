function initialiseGame(assets) {
  document.onkeydown = keyDownHandler;
  document.onkeyup = keyUpHandler;

  for (let i = 0; i < assets.length; i++) {
    let image = new Image();
    console.log("loading: " + assets[i].name);

    assets[i].img = image;
    image.onload = function() {
      if (i === assets.length - 1) {
        createWorld(
          canViewport.width,
          canViewport.height,
          seaTile.width,
          seaTile.height
        );
      }
    };
    image.src = assets[i].location;
  }
}

function createWorld() {
  console.log("create world..");
  setupBackground();
  setupShips(2);
  setupPlayer();

  //starts game
  requestAnimationFrame(loop);
}

//creates all sea tiles surrounding the player
function setupBackground() {
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

function setupShips(number) {
  for (i = 0; i < number; i++) {
    let s = new Ship(ship);
    sprites[ship.name + i] = s;
    s.setRandomLocationInViewport();
    s.create();
  }
}

function setupPlayer() {
  sprites[player.name] = new Player(player);
}
