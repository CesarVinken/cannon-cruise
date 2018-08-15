function Cannonball(asset, parentShip, shootingDirection) {
  GameAsset.call(this, asset);

  this.speed = 10;
  this.parentShip = parentShip;
  this.hitShip = false;
  this.width = 10;
  this.height = 10;
  this.rotation = this.parentShip.rotation;
  this.shootingDirection = shootingDirection;
  this.isHalfFaded = false;
  this.isFaded = false;

  this.pos = {
    x: sprites.player.pos.x + sprites.player.width / 2,
    y: sprites.player.pos.y + sprites.player.height / 2
  };
}
Cannonball.prototype = Object.create(GameAsset.prototype);
Cannonball.prototype.constructor = Cannonball;

Cannonball.prototype.create = function() {
  cannonballs.push(this);
  setTimeout(
    function() {
      cannonballs.forEach((ball, index) => {
        if (ball == this) {
          this.destroy(index);
        }
      });
    }.bind(this),
    600
  );

  setTimeout(
    //time outs for fading effects
    function() {
      cannonballs.forEach((ball, index) => {
        if (ball == this) {
          this.isHalfFaded = true;
          setTimeout(
            function() {
              this.isFaded = true;
            }.bind(this),
            100
          );
        }
      });
    }.bind(this),
    200
  );
};

Cannonball.prototype.update = function() {
  if (this.hitShip) {
    cannonballs.forEach((ball, index) => {
      if (ball == this) {
        console.log(this.shootingDirection);

        let pos1 = {
          x:
            this.pos.x -
            this.parentShip.width / 8 -
            Math.cos(this.rotation) * 12,
          y: this.pos.y - Math.sin(this.rotation) * 12
        };
        let explosion1 = new Explosion(gameAssets.explosion, pos1);
        explosion1.create();
        let explosion2 = new Explosion(gameAssets.explosion, ball.pos);
        explosion2.create();
        let pos3 = {
          x:
            this.pos.x -
            this.parentShip.width / 8 +
            Math.cos(this.rotation) * 12,
          y: this.pos.y + Math.sin(this.rotation) * 12
        };
        let explosion3 = new Explosion(gameAssets.explosion, pos3);
        explosion3.create();
        this.destroy(index);
      }
    });
  } else {
    this.move();
    this.checkHit();
  }
};

Cannonball.prototype.draw = function() {
  ctx.save();
  if (this.isHalfFaded) ctx.globalAlpha -= 0.4;
  if (this.isFaded) ctx.globalAlpha -= 0.3;

  ctx.drawImage(
    this.img,
    this.pos.x - this.parentShip.width / 8 - Math.cos(this.rotation) * 12,
    this.pos.y - Math.sin(this.rotation) * 12,
    this.width,
    this.height
  );
  ctx.drawImage(
    this.img,
    this.pos.x - this.parentShip.width / 8,
    this.pos.y,
    this.width,
    this.height
  );
  ctx.drawImage(
    this.img,
    this.pos.x - this.parentShip.width / 8 + Math.cos(this.rotation) * 12,
    this.pos.y + Math.sin(this.rotation) * 12,
    this.width,
    this.height
  );

  ctx.restore();
};

Cannonball.prototype.destroy = function(index) {
  cannonballs.splice(index, 1);
};

Cannonball.prototype.move = function() {
  if (this.shootingDirection === "left") {
    this.pos.x -= this.speed * Math.cos(this.rotation + Math.PI / 2);
    this.pos.y -= this.speed * Math.sin(this.rotation + Math.PI / 2);
  } else if (this.shootingDirection === "right") {
    this.pos.x += this.speed * Math.cos(this.rotation + Math.PI / 2);
    this.pos.y += this.speed * Math.sin(this.rotation + Math.PI / 2);
  }
};

Cannonball.prototype.checkHit = function() {
  ships.forEach(
    function(ship, index) {
      if (ship === sprites.player) return;

      if (
        this.pos.x < ship.pos.x + ship.width - ship.width / 4 &&
        this.pos.x + this.width > ship.pos.x + ship.width / 4 &&
        this.pos.y < ship.pos.y + ship.height &&
        this.pos.y + this.height > ship.pos.y
      ) {
        this.hitShip = true;
        ship.receiveDamage(index);
      }
    }.bind(this)
  );
};
