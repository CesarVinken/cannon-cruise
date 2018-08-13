function Player(asset) {
  GameAsset.call(this, asset);
  this.speed = 1;
  this.rotation = -Math.PI / 2;

  //the player is in the middle of the screen
  this.pos = {
    x: canViewport.width / 2 - this.width / 2,
    y: canViewport.height / 2 - this.height / 2
  };
}

Player.prototype = Object.create(GameAsset.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  this.rotate();
  this.pos.x += this.speed * Math.cos(this.rotation);
  this.pos.y += this.speed * Math.sin(this.rotation);
  this.move();
};

Player.prototype.rotate = function() {
  ctx.save();
  ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
  if (keyEvents.leftPressed) this.rotation -= 0.01;
  else if (keyEvents.rightPressed) this.rotation += 0.01;

  ctx.rotate(this.rotation);
  ctx.restore();
};

Player.prototype.draw = function() {
  ctx.save();
  ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
  //this.rotation -= 0.01;
  if (keyEvents.leftPressed) this.rotation -= 0.01;
  else if (keyEvents.rightPressed) this.rotation += 0.01;

  ctx.rotate(this.rotation);

  ctx.fillRect(-5, -5, 10, 10);

  ctx.drawImage(
    this.img,
    -this.width / 2,
    -this.height / 2,
    this.width,
    this.height
  );

  ctx.restore();
};

Player.prototype.move = function() {
  backgrounds.forEach(seaTile => {
    if (this.pos.y > canViewport.height + seaTile.basePos.y) {
      this.pos.y -= canViewport.height;
    } else if (this.pos.y < -(canViewport.height - seaTile.basePos.y)) {
      this.pos.y += canViewport.height;
    }
    if (this.pos.x > canViewport.width + seaTile.basePos.x) {
      this.pos.x -= canViewport.width;
    } else if (this.pos.x < -(canViewport.width - seaTile.basePos.x)) {
      this.pos.x += canViewport.width;
    }
  });
};
