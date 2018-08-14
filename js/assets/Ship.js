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

Ship.prototype.checkShipDeletion = function() {
  //check if ship is not too far away from the player
  let distance = Math.hypot(
    this.pos.x - sprites["player"].pos.x,
    this.pos.y - sprites["player"].pos.y
  );
  return distance > 700;
};
