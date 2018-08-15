// Converts from degrees to radians.
//Math.radians = function(degrees) {
function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Converts from radians to degrees.
function radiansToDegrees(radians) {
  //Math.degrees = function(radians) {
  return (radians * 180) / Math.PI;
}

function createElement(ele, attrObj) {
  var element = document.createElement(ele);

  if (attrObj) {
    for (var i in attrObj) {
      element.setAttribute(i, attrObj[i]);
    }
  }
  return element;
}

function getViewport() {
  return {
    topLeft: {
      x:
        sprites.player.pos.x - canViewport.width / 2 - sprites.player.width / 2,
      y:
        sprites.player.pos.y -
        canViewport.height / 2 -
        sprites.player.height / 2
    },
    topRight: {
      x:
        sprites.player.pos.x + canViewport.width / 2 - sprites.player.width / 2,
      y:
        sprites.player.pos.y -
        canViewport.height / 2 -
        sprites.player.height / 2
    },
    bottomLeft: {
      x:
        sprites.player.pos.x - canViewport.width / 2 - sprites.player.width / 2,
      y:
        sprites.player.pos.y +
        canViewport.height / 2 -
        sprites.player.height / 2
    },
    bottomRight: {
      x:
        sprites.player.pos.x + canViewport.width / 2 - sprites.player.width / 2,
      y:
        sprites.player.pos.y +
        canViewport.height / 2 -
        sprites.player.height / 2
    }
  };
}

function checkCollision(obj1, obj2) {
  return (
    obj1.pos.x < obj2.pos.x + obj2.width &&
    obj1.pos.x + obj1.width > obj2.pos.x &&
    obj1.pos.y < obj2.pos.y + obj2.height &&
    obj1.pos.y + obj1.height > obj2.pos.y
  );
}
