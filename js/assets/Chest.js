function Chest(asset, pos) {
  GameAsset.call(this, asset);

  this.pos = {
    x: pos.x,
    y: pos.y
  };
  this.width = asset.width / 4;
  this.height = asset.height / 4;
  this.goldValue = 10;
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
    20000
  );
};

Chest.prototype.update = function() {
  if (checkCollision(this, sprites.player)) {
    this.pickUp();
  }
};

Chest.prototype.destroy = function(index) {
  chests.splice(index, 1);
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
