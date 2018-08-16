function Chest(asset, pos) {
  GameAsset.call(this, asset);

  this.pos = {
    x: pos.x,
    y: pos.y
  };
  this.width = asset.width / 8;
  this.height = asset.height / 8;
  this.goldValue = 10;
  this.isFlashing = false;
  this.flasher;
}

Chest.prototype = Object.create(GameAsset.prototype);
Chest.prototype.constructor = Chest;

Chest.prototype.create = function() {
  chests.push(this);

  setTimeout(
    function() {
      chests.forEach((chest, index) => {
        if (chest == this) {
          this.destroy(index);
        }
      });
    }.bind(this),
    18000
  );

  setTimeout(
    function() {
      flasher = setInterval(
        function() {
          this.isFlashing = !this.isFlashing;
        }.bind(this),
        400
      );
      chests.forEach((chest, index) => {
        if (chest == this) {
        }
      });
    }.bind(this),
    12000
  );
};

Chest.prototype.update = function() {
  if (checkCollision(this, sprites.player)) {
    this.pickUp();
  }
};

Chest.prototype.destroy = function(index) {
  chests.splice(index, 1);
  clearInterval(this.flasher);
};

Chest.prototype.pickUp = function() {
  chests.forEach((chest, index) => {
    if (chest == this) {
      this.destroy(index);
      console.log("coins!");
      increaseScore(this.goldValue);
    }
  });
};

GameAsset.prototype.draw = function() {
  ctx.save();

  if (this.isFlashing) ctx.globalAlpha = 0;

  ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
  ctx.restore();
};
