function Sea(asset, pos) {
  GameAsset.call(this, asset);

  this.basePos = {
    x: pos.x,
    y: pos.y
  };

  this.pos = {
    x: pos.x,
    y: pos.y
  };

  backgrounds.push(this);
}

Sea.prototype = Object.create(GameAsset.prototype);
Sea.prototype.constructor = Sea;
