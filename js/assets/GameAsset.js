function GameAsset(asset) {
  this.width = asset.width;
  this.height = asset.height;

  this.img = img[asset.name]; //img reference

  this.draw = function() {
    ctx_viewportCanvas.drawImage(
      this.img,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  };

  // this.update = function() {
  //   //check for buttons pressed
  //   //   if (cursor.rightPressed && this.pos.x < can_world.width - this.width) {
  //   //     this.pos.x += this.speed.x;
  //   //   } else if (cursor.leftPressed && this.pos.x >= 0) {
  //   //     this.pos.x -= this.speed.x;
  //   //   }
  //   //   if (cursor.downPressed && this.pos.y < can_world.height - this.height) {
  //   //     this.pos.y += this.speed.y;
  //   //   } else if (cursor.upPressed && this.pos.y >= 0) {
  //   //     this.pos.y -= this.speed.y;
  //   //   }
  // };
}
