function Player(asset) {
  GameAsset.call(this, asset);
  this.speed = 5;

  //the player is in the middle of the screen
  this.pos = {
    x: canViewport.width / 2 - this.width / 2,
    y: canViewport.height / 2 - this.height / 2
  };
}

Player.prototype.update = function() {
  // check for buttons pressed

  this.move();
};

Player.prototype.move = function() {
  backgrounds.forEach(seaTile => {
    seaTile.pos.x += 0;
    seaTile.pos.y += 2;

    if (seaTile.pos.y > canViewport.height + seaTile.basePos.y) {
      seaTile.pos.y -= canViewport.height * 2;
    } else if (seaTile.pos.y < -(canViewport.height - seaTile.basePos.y)) {
      seaTile.pos.y += canViewport.height * 2;
    }

    if (seaTile.pos.x > canViewport.width + seaTile.basePos.x) {
      seaTile.pos.x -= canViewport.width * 2;
    } else if (seaTile.pos.x < -(canViewport.width - seaTile.basePos.x)) {
      seaTile.pos.x += canViewport.width * 2;
    }
  });
};
