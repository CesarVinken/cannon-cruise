function Chest(asset, parentShip) {
  GameAsset.call(this, asset);

  this.width = asset.width / 8;
  this.height = asset.height / 8;
  this.isFlashing = false;
  this.flasher;
  this.parentShip = parentShip;
  this.goldValue = parentShip.goldValue;
}

Chest.prototype = Object.create(GameAsset.prototype);
Chest.prototype.constructor = Chest;

Chest.prototype.create = function() {
  this.setChestPos();

  chests.push(this);

  //time out to destroy the chest after some time
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

  //time out to display a flashing effect before the chest is finally destroyed
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

      let text = new PirateText(randomChestReaction());
      increaseScore(this.goldValue);
    }
  });
};

Chest.prototype.draw = function() {
  ctx.save();

  if (this.isFlashing) ctx.globalAlpha = 0;

  ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
  ctx.restore();
};

//chests spawn randomly in the top-left, top-right, bottom-left or bottom-right of the destroyed ship
Chest.prototype.setChestPos = function() {
  let randomX = Math.floor(Math.random() * Math.floor(2));
  if (randomX === 0) randomX = -1;

  let randomY = Math.floor(Math.random() * Math.floor(2));
  if (randomY === 0) randomY = -1;

  this.pos.x = this.parentShip.pos.x + this.parentShip.width / 2 + randomX * 40;
  this.pos.y =
    this.parentShip.pos.y + this.parentShip.height / 2 + randomY * 40;
};
