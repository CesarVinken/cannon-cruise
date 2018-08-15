function KeyEvent() {
  this.keyPressed = false;
  this.available = true;
}

KeyEvent.prototype.cooldown = function() {
  this.available = false;
  setTimeout(
    function() {
      this.available = true;
    }.bind(this),
    800
  );
};
