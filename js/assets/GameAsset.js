function GameAsset(asset) {
  this.width = asset.width;
  this.height = asset.height;

  this.img = img[asset.name]; //img reference
}

GameAsset.prototype.draw = function() {
  ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
};
