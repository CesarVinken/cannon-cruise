function Player(asset) {
  Warship.call(this, asset);
  this.rotation = -Math.PI / 2;
  this.speed = asset.speed;
  // this.health = asset.health;
  this.health = 1;
  this.canShoot = true;
  this.isDead = false;

  //the player is in the middle
  this.pos = {
    x: canViewport.width / 2 + this.width / 2,
    y: canViewport.height / 2 + this.height / 2
  };
}

Player.prototype = Object.create(Warship.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  this.move();

  if (aPressed.keyPressed) {
    if (this.canShoot) {
      this.fire("left");
      aPressed.keyPressed = false;
      this.canShoot = false;
    }
  }

  if (dPressed.keyPressed) {
    if (this.canShoot) {
      this.fire("right");
      dPressed.keyPressed = false;
      this.canShoot = false;
    }
  }
};

Player.prototype.rotate = function() {
  ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2);

  if (leftPressed.keyPressed) this.rotation -= 0.01;
  else if (rightPressed.keyPressed) this.rotation += 0.01;

  ctx.rotate(this.rotation);
};

Player.prototype.draw = function() {
  ctx.save();

  if (debug) this.drawFrontTriangle();

  this.rotate();

  if (debug) {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.2;
    ctx.fillRect(
      -this.width / 2,
      -this.height / 4 - 1,
      this.width,
      this.height / 2
    );
    ctx.restore();
  }

  ctx.drawImage(
    this.img,
    -this.width / 2,
    -this.height / 2,
    this.width,
    this.height
  );

  ctx.restore();
};

Player.prototype.sinkPlayer = function() {
  this.isDead = true;
  gameOver();
};
