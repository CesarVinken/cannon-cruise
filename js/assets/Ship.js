function Ship(asset) {
  GameAsset.call(this, asset);
  this.speed = 1;
  this.rotation = 0;
}

Ship.prototype = Object.create(GameAsset.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.create = function() {
  console.log("ship created");
  ships.push(this);
};

Ship.prototype.update = function() {
  this.move();
};

Ship.prototype.setRandomLocation = function() {
  this.pos.x = Math.floor(Math.random() * Math.floor(canViewport.width));
  this.pos.y = Math.floor(Math.random() * Math.floor(canViewport.height));
  console.log("random position: " + this.pos.x, this.pos.y);
};

Ship.prototype.move = function() {
  this.pos.x += this.speed * Math.cos(this.rotation);
  this.pos.y += this.speed * Math.sin(this.rotation);
};
