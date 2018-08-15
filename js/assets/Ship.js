function Ship(asset) {
  GameAsset.call(this, asset);
  this.speed = 1;
  this.distanceToPlayer;
  this.health = asset.health;
  this.isChangingRoute = false;
  this.lengthVision = 160;
  this.angleVision = Math.PI / 4;
}
Ship.prototype = Object.create(GameAsset.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.create = function() {
  // console.log("ship created");
  ships.push(this);

  this.checkRoute = setInterval(
    function() {
      if (!this.isChangingRoute) {
        let rand = Math.floor(Math.random() * Math.floor(3));
        if (rand === 0) {
          this.changeRoute();
          this.isChangingRoute = true;
        }
      }
    }.bind(this),
    5000
  );
};

Ship.prototype.update = function() {
  this.move();
};

//the ships can spawn anywhere within the viewport, facing any direction
Ship.prototype.setRandomLocationInViewport = function() {
  let randomDegrees = Math.floor(Math.random() * Math.floor(360));
  this.rotation = degreesToRadians(randomDegrees);

  this.pos.x = Math.floor(Math.random() * Math.floor(canViewport.width));
  this.pos.y = Math.floor(Math.random() * Math.floor(canViewport.height));
  this.rotation = -degreesToRadians(randomDegrees);
};

Ship.prototype.setRandomLocationOutsideViewport = function() {
  let viewportPos = getViewport();
  let edgeOfViewport = Math.floor(Math.random() * 4);

  const minPadding = 30;
  const maxPadding = 60;

  let randomDegrees = 0;

  switch (
    edgeOfViewport //Math.random() * (max - min) + min; //formula for random in a range
  ) {
    case 0: //ship is above viewport
      // console.log("ship is above viewport");
      randomDegrees = Math.floor(Math.random() * Math.floor(360 - 180) + 180);
      this.rotation = degreesToRadians(randomDegrees);

      this.pos.x = Math.floor(
        Math.random() *
          Math.floor(viewportPos.topRight.x - viewportPos.topLeft.x) +
          viewportPos.topLeft.x
      );
      this.pos.y =
        Math.floor(
          Math.random() *
            Math.floor(
              viewportPos.topLeft.y -
                maxPadding -
                viewportPos.topLeft.y -
                minPadding
            ) +
            viewportPos.topLeft.y -
            minPadding
        ) - this.height;
      this.rotation = -degreesToRadians(randomDegrees);
      //  console.log("rotation: " + randomDegrees);

      break;
    case 1: //ship is under viewport
      // console.log("ship is under viewport");
      randomDegrees = Math.floor(Math.random() * Math.floor(180 - 0) + 0);
      this.rotation = degreesToRadians(randomDegrees);

      this.pos.x = Math.floor(
        Math.random() *
          Math.floor(viewportPos.bottomRight.x - viewportPos.bottomLeft.x) +
          viewportPos.bottomLeft.x
      );
      this.pos.y =
        Math.floor(
          Math.random() *
            Math.floor(
              viewportPos.bottomLeft.y +
                maxPadding -
                viewportPos.bottomLeft.y +
                minPadding
            ) +
            viewportPos.bottomLeft.y +
            minPadding
        ) + this.height;

      this.rotation = -degreesToRadians(randomDegrees);
      //console.log("rotation: " + randomDegrees);
      break;
    //Math.random() * (max - min) + min;
    case 2: //ship is left of the viewport
      // console.log("ship is left viewport");
      randomDegrees = Math.floor(Math.random() * Math.floor(270 - 90) + 90);
      this.rotation = degreesToRadians(randomDegrees);

      this.pos.x =
        Math.floor(
          Math.random() *
            Math.floor(
              viewportPos.bottomLeft.x -
                maxPadding -
                viewportPos.bottomLeft.x -
                minPadding
            ) +
            viewportPos.bottomLeft.x -
            minPadding
        ) - this.width;
      this.pos.y = Math.floor(
        Math.random() *
          Math.floor(
            viewportPos.bottomLeft.y +
              minPadding -
              viewportPos.topLeft.y -
              minPadding
          ) +
          viewportPos.topLeft.y -
          minPadding
      );

      this.rotation = -degreesToRadians(randomDegrees);
      //console.log("rotation: " + randomDegrees);
      break;
    case 3: //ship is right of the viewport
      // console.log("ship is right viewport");
      randomDegrees = Math.floor(Math.random() * Math.floor(180 - 0) + 0);
      if (randomDegrees > 90) randomDegrees += 180;
      this.rotation = degreesToRadians(randomDegrees);
      this.pos.x =
        Math.floor(
          Math.random() *
            Math.floor(
              viewportPos.bottomRight.x +
                maxPadding -
                viewportPos.bottomRight.x +
                minPadding
            ) +
            viewportPos.bottomRight.x +
            minPadding
        ) + this.width;
      this.pos.y = Math.floor(
        Math.random() *
          Math.floor(
            viewportPos.bottomRight.y +
              minPadding -
              viewportPos.topRight.y -
              minPadding
          ) +
          viewportPos.topRight.y -
          minPadding
      );
      this.rotation = -degreesToRadians(randomDegrees);
      //console.log("rotation: " + randomDegrees);
      break;
    default:
      console.log("unknown value : " + edgeOfViewport);
      break;
  }

  if (debug) console.log("ship created at " + this.pos.x, this.pos.y);
};

Ship.prototype.rotate = function() {
  ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2);

  ctx.rotate(this.rotation);

  ctx.translate(
    -(this.pos.x + this.width / 2),
    -(this.pos.y + this.height / 2)
  );
};

Ship.prototype.draw = function() {
  ctx.save();

  if (debug) this.drawFrontTriangle();

  this.rotate();

  if (debug) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(
      this.pos.x,
      this.pos.y + this.height / 4 - 1,
      this.width,
      this.height / 2
    );
    ctx.restore();
  }
  ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);

  ctx.restore();
};

Ship.prototype.drawFrontTriangle = function() {
  let center = this.getCenter();
  let top = {
    x: center.x + this.lengthVision * Math.cos(this.rotation),
    y: center.y + this.lengthVision * Math.sin(this.rotation)
  };
  let right = {
    x:
      center.x + this.lengthVision * Math.cos(this.rotation + this.angleVision),
    y: center.y + this.lengthVision * Math.sin(this.rotation + this.angleVision)
  };
  let left = {
    x:
      center.x + this.lengthVision * Math.cos(this.rotation - this.angleVision),
    y: center.y + this.lengthVision * Math.sin(this.rotation - this.angleVision)
  };

  ctx.beginPath();
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(left.x, left.y);
  ctx.lineTo(top.x, top.y);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(right.x, right.y);
  ctx.lineTo(top.x, top.y);
  ctx.closePath();
  ctx.stroke();
};

Ship.prototype.move = function() {
  let checkShipsInFrontRes = this.checkShipsInFront();
  if (checkShipsInFrontRes === "left") {
    this.forceRotate(2);
    console.log("left");
  } else if (checkShipsInFrontRes === "right") {
    this.forceRotate(-2);
  }

  // if (false && this.checkCollision()) {
  //   //handle ship movement in case of collision
  //   this.forceRotate(2);
  //   this.pos.x -= this.speed * Math.cos(this.rotation);
  //   this.pos.y -= this.speed * Math.sin(this.rotation);
  //   return;
  // } else {
  this.pos.x += this.speed * Math.cos(this.rotation);
  this.pos.y += this.speed * Math.sin(this.rotation);
  //}
};

Ship.prototype.shipTooFarAway = function() {
  //check if ship is not too far away from the player
  distanceToPlayer = Math.hypot(
    this.pos.x - sprites.player.pos.x,
    this.pos.y - sprites.player.pos.y
  );
  return distanceToPlayer > 700;
};

Ship.prototype.remove = function(index) {
  ships.splice(index, 1);
  clearInterval(this.checkRoute);
  clearInterval(this.changingRoute);
};

// Returns
// - undefined if no ship
// - "left" if there is a ship on the left
// - "right" if there is a ship on the right
Ship.prototype.checkShipsInFront = function() {
  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i];
    if (this === ship) return;
    let vector = {
      x: ship.getCenter().x - this.getCenter().x,
      y: ship.getCenter().y - this.getCenter().y
    };
    let vectorAngle = Math.atan2(vector.y, vector.x);

    let angleDiff = vectorAngle - this.rotation; // In radians
    if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    else if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

    if (
      Math.hypot(vector.x, vector.y) < this.lengthVision &&
      Math.abs(angleDiff) <= this.angleVision
    ) {
      if (debug) {
        ctx.strokeStyle = "red";
        this.color = "red";
        ctx.beginPath();
        ctx.moveTo(this.getCenter().x, this.getCenter().y);
        ctx.lineTo(
          this.getCenter().x + vector.x,
          this.getCenter().y + vector.y
        );
        ctx.stroke();
        ctx.strokeStyle = "black";
      }
      return angleDiff > 0 ? "right" : "right";
    }
  }
};

// Ship.prototype.checkCollision = function() {
//   let collision = false;
//   ships.forEach(ship => {
//     if (
//       this.pos.x + this.width / 4 < ship.pos.x + ship.width - ship.width / 4 &&
//       this.pos.x + this.width - this.width / 4 > ship.pos.x + ship.width / 4 &&
//       this.pos.y < ship.pos.y + ship.height &&
//       this.pos.y + this.height > ship.pos.y &&
//       this !== ship
//     ) {
//       //   this.pos.x -= (this.speed / 2) * Math.cos(this.rotation);
//       //    this.pos.y -= (this.speed / 2) * Math.sin(this.rotation);
//       collision = true;
//     }
//   });
//   return collision;
// };

Ship.prototype.forceRotate = function(angles) {
  ctx.save();
  ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2);

  //angles to radians
  this.rotation += degreesToRadians(angles);
  ctx.rotate(this.rotation);

  ctx.restore();
};

Ship.prototype.receiveDamage = function(index) {
  this.health--;
  if (this.health <= 0) {
    this.remove(index);
  }
};

Ship.prototype.changeRoute = function() {
  // console.log("change route! " + ultimateAngle + " degrees");
  let ultimateAngle = Math.floor(Math.random() * Math.floor(260)) - 130;
  let turningSpeed = Math.floor((Math.random() * Math.floor(12 - 6) + 6) / 10);
  let changedAngle = 0;
  let changingRoute = setInterval(
    function() {
      if (ultimateAngle >= 0) {
        this.forceRotate(turningSpeed);
        changedAngle += turningSpeed;
        if (changedAngle >= ultimateAngle) {
          clearInterval(changingRoute);
          this.isChangingRoute = false;
        }
      } else {
        this.forceRotate(turningSpeed);
        changedAngle -= turningSpeed;
        if (changedAngle <= ultimateAngle) {
          clearInterval(changingRoute);
          this.isChangingRoute = false;
        }
      }
    }.bind(this),
    50
  );
};
