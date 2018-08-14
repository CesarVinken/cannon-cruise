function GameAsset(asset) {
  this.width = asset.width;
  this.height = asset.height;
  this.img = asset.img;
  this.rotation = 0;

  this.pos = {
    x: 0,
    y: 0
  };
}

GameAsset.prototype.draw = function() {
  ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
};
