function Warship(asset) {
  Ship.call(this, asset);
  this.speed = asset.speed;
  this.canShoot = true;
  this.shootingRange = 250;
}

Warship.prototype = Object.create(Ship.prototype);
Warship.prototype.constructor = Warship;

Warship.prototype.update = function() {
  Ship.prototype.update.call(this);

  if (this.distanceToPlayer < this.shootingRange) {
    let shootDirection = this.playerPosAngle();
    if (shootDirection && this.canShoot) {
      if (this.willShoot()) {
        this.fire(shootDirection);
      } else this.shotCooldown();
    }
  }
};

//find out what at angle the player is compared to the ship. We need to know if the player is next to the ship and if the ship is on the left or right
Warship.prototype.playerPosAngle = function() {
  let angle = 0;

  let vector = {
    x: sprites.player.getCenter().x - this.getCenter().x,
    y: sprites.player.getCenter().y - this.getCenter().y
  };
  let vectorAngle = Math.atan2(vector.y, vector.x);

  let angleDiff = vectorAngle - this.rotation; // In radians

  if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
  else if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

  angleDiff = radiansToDegrees(angleDiff);
  //find shooting direction
  if (angleDiff < -40 && angleDiff > -140) {
    return "left";
  }
  if (angleDiff > 40 && angleDiff < 140) {
    return "right";
  }
  return undefined;
};

Warship.prototype.fire = function(shootingDirection) {
  let cannonball = new Cannonball(
    gameAssets.cannonball,
    this,
    shootingDirection
  );
  cannonball.create();
  this.shotCooldown();
};

Warship.prototype.shotCooldown = function() {
  console.log("cooldown");
  this.canShoot = false;
  setTimeout(
    function() {
      this.canShoot = true;
    }.bind(this),
    800
  );
};

Warship.prototype.willShoot = function() {
  random = Math.floor(Math.random() * Math.floor(2)); //50% chance the ship will shoot
  return random === 1 ? true : false;
};
