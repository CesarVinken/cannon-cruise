function Sprite(asset) {
  //   Position of sprite in world

  //   this.pos2 = {
  //     // Sprite's position in player canvas
  //     x: canPlayer.width / 2,
  //     y: canPlayer.height / 2
  //   };

  this.speed = 5;

  this.img = img[asset.name]; //img reference
  //   this.width = this.img.width;
  //   this.height = this.img.height;
  this.width = asset.width;
  this.height = asset.height;

  this.pos = {
    x: canViewport.width / 2 - this.width / 2,
    y: canViewport.height / 2 - this.height / 2
    // x: canWorld.width / 2,
    // y: canWorld.height / 2
  };

  this.draw = function() {
    ctx_viewportCanvas.drawImage(
      this.img,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );

    //   /* This makes sure that the camera stops when the character is near the edge of the screen */
    //   if (this.pos.x < 320) {
    //     this.pos2.x = this.pos.x;
    //   } else if (this.pos.x > can_world.width - 320) {
    //     this.pos2.x = 640 - (can_world.width - this.pos.x);
    //   } else {
    //     this.pos2.x = can_pCanvas.width / 2;
    //   }

    //   if (this.pos.y < 320) {
    //     this.pos2.y = this.pos.y;
    //   } else if (this.pos.y > can_world.height - 320) {
    //     this.pos2.y = 640 - (can_world.height - this.pos.y);
    //   } else {
    //     this.pos2.y = can_pCanvas.height / 2;
    //   }

    //   /* Draw the character using it's secondary position */
    //   ctx_pCanvas.drawImage(
    //     this.img,
    //     this.pos2.x,
    //     this.pos2.y
    //   );

    // console.log(this.pos2.x, this.pos2.y)
  };

  this.update = function() {
    //check for buttons pressed
    //   if (cursor.rightPressed && this.pos.x < can_world.width - this.width) {
    //     this.pos.x += this.speed.x;
    //   } else if (cursor.leftPressed && this.pos.x >= 0) {
    //     this.pos.x -= this.speed.x;
    //   }
    //   if (cursor.downPressed && this.pos.y < can_world.height - this.height) {
    //     this.pos.y += this.speed.y;
    //   } else if (cursor.upPressed && this.pos.y >= 0) {
    //     this.pos.y -= this.speed.y;
    //   }
  };
}
