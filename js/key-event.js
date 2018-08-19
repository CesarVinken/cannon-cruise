function KeyEvent() {
  this.keyPressed = false;
  this.available = true;
}

let leftPressed = new KeyEvent(),
  rightPressed = new KeyEvent(),
  aPressed = new KeyEvent(),
  dPressed = new KeyEvent();

function keyDownHandler(event) {
  if (event.keyCode == 39) {
    rightPressed.keyPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed.keyPressed = true;
  } else if (event.keyCode == 65) {
    if (aPressed.available) {
      aPressed.keyPressed = true;
    }
  } else if (event.keyCode == 68) {
    if (dPressed.available) {
      dPressed.keyPressed = true;
    }
  }
}

function keyUpHandler(event) {
  if (event.keyCode == 39) {
    rightPressed.keyPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed.keyPressed = false;
  } else if (event.keyCode == 65) {
    aPressed.keyPressed = false;
  } else if (event.keyCode == 68) {
    dPressed.keyPressed = false;
  }
}
