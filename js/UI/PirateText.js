function PirateText(text) {
  this.text = text;
  this.startPos = {
    x: canViewport.width / 2 + 10,
    y: canViewport.height / 2 - sprites.player.height / 2
  };
  this.xCounter = 0;
  this.yCounter = 0;
  this.interval;

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
  ctx.font = "17px Lora";
  ctx.fillStyle = "#D3D3D3";
  ctx.fillText(
    this.text,
    sprites.player.pos.x + this.xCounter + 4,
    sprites.player.pos.y - this.yCounter
  );
};
