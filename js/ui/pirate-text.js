function PirateText(text) {
  this.text = text;
  this.startPos = {
    x: canViewport.width / 2 + 10,
    y: canViewport.height / 2 - sprites.player.height / 2
  };
  this.xCounter = 0;
  this.yCounter = 0;
  this.interval;

  if (texts.length > 0) return;

  texts.push(this);
  setTimeout(
    function() {
      texts.forEach((text, index) => {
        if (this === text) texts.splice(index, 1);
      });
    }.bind(this),
    1600
  );
}

PirateText.prototype.draw = function() {
  this.xCounter += 0.2;
  this.yCounter += 0.1;
  //ctx.font = "17px 'Patua One'";
  ctx.font = "17px Bitter";
  ctx.fillStyle = "#D3D3D3";
  ctx.fillText(
    this.text,
    sprites.player.pos.x + this.xCounter + 4,
    sprites.player.pos.y - this.yCounter
  );
};

function randomChestReaction() {
  let reactions = [
    "arr! booty!",
    "treasure!",
    "piles of gold!",
    "their coffers are ours!"
  ];
  let reaction =
    reactions[Math.floor(Math.random() * Math.floor(reactions.length * 2))];
  return reaction === undefined ? "" : reaction; //there is a good chance the reaction will be empty
}

function randomSinkingReaction() {
  let reactions = [
    "to davy jones' locker! arr!",
    "sent to the bottom of the sea!",
    "scuttled them barque!",
    "dead men tell no tales!",
    "the galleon's sinking!",
    "grappled them gunwalls!"
  ];
  let reaction =
    reactions[Math.floor(Math.random() * Math.floor(reactions.length * 2.5))];
  return reaction === undefined ? "" : reaction; //there is a good chance the reaction will be empty
}
