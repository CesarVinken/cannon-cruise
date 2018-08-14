function Player(asset) {
  Ship.call(this, asset);
  //   this.speed = 0;
  this.rotation = -Math.PI / 2;

  //the player starts off in the middle
  this.pos = {
    x: canViewport.width / 2 + this.width / 2,
    y: canViewport.height / 2 + this.height / 2
  };
}

Player.prototype = Object.create(Ship.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  this.move();
};

Player.prototype.rotate = function() {
  ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2);

  if (keyEvents.leftPressed) this.rotation -= 0.01;
  else if (keyEvents.rightPressed) this.rotation += 0.01;

  ctx.rotate(this.rotation);
};

Player.prototype.draw = function() {
  ctx.save();

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
