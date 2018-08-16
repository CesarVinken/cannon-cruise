function Warship(asset) {
  Ship.call(this, asset);

  // console.log("created WARSHIP");
}

Warship.prototype = Object.create(Ship.prototype);
Warship.prototype.constructor = Warship;
