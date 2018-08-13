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
  console.log(" why am I undefined? " + this.img);
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
  this.pos.x += this.speed * Math.cos(this.rotation);
  this.pos.y += this.speed * Math.sin(this.rotation);

  backgrounds.forEach(seaTile => {
    if (this.pos.y < -canViewport.height / 2 + this.height / 2) {
      //too far up
      ships.forEach(ship => {
        ship.pos.y += canViewport.height;
      });
      this.pos.y += canViewport.height;
    } else if (
      //too far down
      this.pos.y >
      canViewport.height + canViewport.height / 2 - this.height / 2
    ) {
      this.pos.y -= canViewport.height;

      ships.forEach(ship => {
        ship.pos.y -= canViewport.height;
      });
    }
    if (this.pos.x < -canViewport.width / 2 + this.width / 2) {
      //too far left
      this.pos.x += canViewport.width;

      ships.forEach(ship => {
        ship.pos.x += canViewport.width;
      });
    } else if (
      this.pos.x >
      canViewport.width + canViewport.width / 2 - this.width / 2 //too far right
    ) {
      this.pos.x -= canViewport.width;
      ships.forEach(ship => {
        ship.pos.x -= canViewport.width;
      });
    }
  });
};
