function Shipwreck(asset, pos) {
  GameAsset.call(this, asset);

  this.pos = {
    x: pos.x,
    y: pos.y
  };
  this.fadeLevel = 1;
}

Shipwreck.prototype = Object.create(GameAsset.prototype);
Shipwreck.prototype.constructor = Shipwreck;

Shipwreck.prototype.create = function() {
  shipwrecks.push(this);

  setTimeout(
    function() {
      shipwrecks.forEach((shipwreck, index) => {
        if (shipwreck == this) {
          this.fade = setInterval(
            function() {
              this.fadeLevel -= 0.2;
            }.bind(this),
            500
          );
        }
      });
    }.bind(this),
    2000
  );

  setTimeout(
    function() {
      shipwrecks.forEach((shipwreck, index) => {
        if (shipwreck == this) {
          this.destroy(index);
        }
      });
    }.bind(this),
    5000
  );
};

Shipwreck.prototype.destroy = function(index) {
  clearInterval(this.fade);
  shipwrecks.splice(index, 1);
};

GameAsset.prototype.draw = function() {
  ctx.save();
  ctx.globalAlpha = this.fadeLevel;
  ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
  ctx.restore();
};
