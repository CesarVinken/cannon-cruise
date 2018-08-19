function Smoke(asset, pos) {
  GameAsset.call(this, asset);

  this.sourceFrameX = 0; //rows
  this.sourceFrameY = 0; //columns
  this.sourceFrameWidth = 51.2;
  this.sourceFrameHeight = 51.2;
  this.pos = {
    x: pos.x,
    y: pos.y
  };
}

Smoke.prototype.create = function() {
  smokeClouds.push(this);

  setTimeout(
    function() {
      smokeClouds.forEach((smokeCloud, index) => {
        if (smokeCloud == this) {
          this.destroy(index);
          clearInterval(this.playAnim);
        }
      });
    }.bind(this),
    2000
  );
  this.playAnim = setInterval(
    function() {
      this.sourceFrameX++;
      if (this.sourceFrameX >= 6) {
        this.sourceFrameX = 0;
        this.sourceFrameY++;
      }
    }.bind(this),
    40
  );
};

Smoke.prototype.destroy = function(index) {
  smokeClouds.splice(index, 1);
};

Smoke.prototype.draw = function() {
  ctx.drawImage(
    this.img,
    this.sourceFrameX + this.sourceFrameX * this.sourceFrameWidth,
    this.sourceFrameY + this.sourceFrameY * this.sourceFrameHeight,
    this.sourceFrameWidth,
    this.sourceFrameHeight,
    this.pos.x,
    this.pos.y,
    this.width,
    this.height
  );
};
