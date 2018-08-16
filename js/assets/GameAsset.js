function GameAsset(asset) {
  this.width = asset.width;
  this.height = asset.height;
  this.img = asset.img;
  this.rotation = 0;
  this.color = "black";

  this.pos = {
    x: 0,
    y: 0
  };
}

GameAsset.prototype.getCenter = function() {
  return {
    x: this.pos.x + this.width / 2,
    y: this.pos.y + this.height / 2
  };
};

GameAsset.prototype.getBottomCenter = function() {
  let center = this.getCenter();
  return {
    x: center.x - (Math.cos(this.rotation) * this.height) / 2,
    y: center.y - (Math.sin(this.rotation) * this.height) / 2
  };
};

GameAsset.prototype.draw = function() {
  ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
};
