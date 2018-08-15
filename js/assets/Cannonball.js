function Cannonball(asset, parentShip) {
  GameAsset.call(this, asset);

  this.speed = 6;
  this.parentShip = parentShip;
  this.hitShip = false;
  this.width = 15;
  this.height = 15;

  this.pos = {
    x: sprites.player.pos.x + sprites.player.width / 2,
    y: sprites.player.pos.y + sprites.player.height / 2
  };

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
      1000
    );
  };
}

Cannonball.prototype.update = function() {
  if (this.hitShip) {
    cannonballs.forEach((ball, index) => {
      if (ball == this) {
        this.destroy(index);
      }
    });
  } else {
    this.move();
    // console.log("CLOSEST SHIP " + );
    // this.checkHit(sprites.player.findClosestShip());
    this.checkHit();
  }
};

Cannonball.prototype.draw = function() {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, this.width, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

Cannonball.prototype.destroy = function(index) {
  cannonballs.splice(index, 1);
};

Cannonball.prototype.move = function() {
  this.pos.x += this.speed * Math.cos(this.parentShip.rotation + Math.PI / 2);
  this.pos.y += this.speed * Math.sin(this.parentShip.rotation + Math.PI / 2);
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
