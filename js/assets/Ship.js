function Ship(asset) {
  GameAsset.call(this, asset);
  this.speed = 1;
  this.rotation = 0;
}

Ship.prototype = Object.create(GameAsset.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.create = function() {
  console.log("ship created");
  ships.push(this);
};

Ship.prototype.update = function() {
  this.move();
};

//the ships can spawn anywhere within the viewport, facing any direction
Ship.prototype.setRandomLocationInViewport = function() {
  let randomDegrees = Math.floor(Math.random() * Math.floor(360));
  this.rotation = degreesToRadians(randomDegrees);

  this.pos.x = Math.floor(Math.random() * Math.floor(canViewport.width));
  this.pos.y = Math.floor(Math.random() * Math.floor(canViewport.height));
  this.rotation = -degreesToRadians(randomDegrees);
};

Ship.prototype.setRandomLocationOutsideViewport = function() {
  let viewportPos = getViewport();
  let edgeOfViewport = Math.floor(Math.random() * 4);

  const minPadding = 30;
  const maxPadding = 60;

  let randomDegrees = 0;
  //   edgeOfViewport = 0;
  //Math.random() * (max - min) + min; //formula for random in a range
  switch (edgeOfViewport) {
    case 0: //ship is above viewport
      console.log("ship is above viewport");
      randomDegrees = Math.floor(Math.random() * Math.floor(360 - 180) + 180);
      this.rotation = degreesToRadians(randomDegrees);

      this.pos.x = Math.floor(
        Math.random() *
          Math.floor(viewportPos.topRight.x - viewportPos.topLeft.x) +
          viewportPos.topLeft.x
      );
      this.pos.y =
        Math.floor(
          Math.random() *
            Math.floor(
              viewportPos.topLeft.y -
                maxPadding -
                viewportPos.topLeft.y -
                minPadding
            ) +
            viewportPos.topLeft.y -
            minPadding
        ) - this.height;
      this.rotation = -degreesToRadians(randomDegrees);
      console.log("rotation: " + randomDegrees);

      break;
    case 1: //ship is under viewport
      console.log("ship is under viewport");
      randomDegrees = Math.floor(Math.random() * Math.floor(180 - 0) + 0);
      this.rotation = degreesToRadians(randomDegrees);

      this.pos.x = Math.floor(
        Math.random() *
          Math.floor(viewportPos.bottomRight.x - viewportPos.bottomLeft.x) +
          viewportPos.bottomLeft.x
      );
      this.pos.y =
        Math.floor(
          Math.random() *
            Math.floor(
              viewportPos.bottomLeft.y +
                maxPadding -
                viewportPos.bottomLeft.y +
                minPadding
            ) +
            viewportPos.bottomLeft.y +
            minPadding
        ) + this.height;

      this.rotation = -degreesToRadians(randomDegrees);
      console.log("rotation: " + randomDegrees);
      break;
    //Math.random() * (max - min) + min;
    case 2: //ship is left of the viewport
      console.log("ship is left viewport");
      randomDegrees = Math.floor(Math.random() * Math.floor(270 - 90) + 90);
      this.rotation = degreesToRadians(randomDegrees);

      this.pos.x =
        Math.floor(
          Math.random() *
            Math.floor(
              viewportPos.bottomLeft.x -
                maxPadding -
                viewportPos.bottomLeft.x -
                minPadding
            ) +
            viewportPos.bottomLeft.x -
            minPadding
        ) - this.width;
      this.pos.y = Math.floor(
        Math.random() *
          Math.floor(
            viewportPos.bottomLeft.y +
              minPadding -
              viewportPos.topLeft.y -
              minPadding
          ) +
          viewportPos.topLeft.y -
          minPadding
      );

      this.rotation = -degreesToRadians(randomDegrees);
      console.log("rotation: " + randomDegrees);
      break;
    case 3: //ship is right of the viewport
      console.log("ship is right viewport");
      randomDegrees = Math.floor(Math.random() * Math.floor(180 - 0) + 0);
      if (randomDegrees > 90) randomDegrees += 180;
      this.rotation = degreesToRadians(randomDegrees);
      this.pos.x =
        Math.floor(
          Math.random() *
            Math.floor(
              viewportPos.bottomRight.x +
                maxPadding -
                viewportPos.bottomRight.x +
                minPadding
            ) +
            viewportPos.bottomRight.x +
            minPadding
        ) + this.width;
      this.pos.y = Math.floor(
        Math.random() *
          Math.floor(
            viewportPos.bottomRight.y +
              minPadding -
              viewportPos.topRight.y -
              minPadding
          ) +
          viewportPos.topRight.y -
          minPadding
      );
      this.rotation = -degreesToRadians(randomDegrees);
      console.log("rotation: " + randomDegrees);
      break;
    default:
      console.log("unknown value : " + edgeOfViewport);
      break;
  }

  if (debug) console.log("ship created at " + this.pos.x, this.pos.y);
};

Ship.prototype.rotate = function() {
  ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2);

  ctx.rotate(this.rotation);

  ctx.translate(
    -(this.pos.x + this.width / 2),
    -(this.pos.y + this.height / 2)
  );
};

Ship.prototype.draw = function() {
  ctx.save();

  this.rotate();

  ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);

  ctx.restore();
};

Ship.prototype.move = function() {
  this.pos.x += this.speed * Math.cos(this.rotation);
  this.pos.y += this.speed * Math.sin(this.rotation);
};

Ship.prototype.shipTooFarAway = function() {
  //check if ship is not too far away from the player
  let distance = Math.hypot(
    this.pos.x - sprites["player"].pos.x,
    this.pos.y - sprites["player"].pos.y
  );
  return distance > 700;
};

Ship.prototype.remove = function(index) {
  ships.splice(index, 1);
};

// Ship.prototype.spawnRandomShip = function() {
//   console.log("spawn new ship");
// //  let s = new Ship(gameAssets.ship);
// //   s.setRandomLocationOutsideViewport();
//   s.create();
// };
