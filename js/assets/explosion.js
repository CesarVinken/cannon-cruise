function Explosion(asset, pos) {
  GameAsset.call(this, asset);
  this.sourceFrameX = 0; //rows of sprite collection
  this.sourceFrameY = 0; //columns of sprite collection
  this.sourceFrameWidth = 127;
  this.sourceFrameHeight = 127;
  this.width = 40;
  this.height = 40;
  this.pos = {
    x: pos.x - this.width / 2,
    y: pos.y - this.height / 2
  };
}

Explosion.prototype = Object.create(GameAsset.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.create = function() {
  explosions.push(this);

  setTimeout(
    function() {
      explosions.forEach((explosion, index) => {
        if (explosion == this) {
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
      if (this.sourceFrameX >= 8) {
        this.sourceFrameX = 0;
        this.sourceFrameY++;
      }
    }.bind(this),
    40
  );
};

Explosion.prototype.destroy = function(index) {
  explosions.splice(index, 1);
};

Explosion.prototype.draw = function() {
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
