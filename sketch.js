var spiderMan, spiderManImage, spiderManFighting1, spiderManFighting2
var venom, venomImage, venomLaughingImage
var building
var fireBall, fireBallImage1, fireBallImage2
var fireBallGroup
var invisibleGround
var score = 6
var gameState = "swinging"

function preload()
{
spiderManImage = loadImage("Images/Spiderman.png")
spiderManFighting = loadAnimation("Images/Spiderman fighting2.png","Images/Spiderman fighting1.png")
venomImage = loadImage("Images/Venom.png")
venomLaughingImage = loadImage("Images/venomLaughingImage.png")
building = loadImage("Images/Buildings.jpeg")
fireBallImage1 = loadImage("Images/FireBall1.png")
fireBallImage2 = loadImage("Images/FireBall2.png")

}
function setup() 
{
  createCanvas(displayWidth - 50, displayHeight - 150);
  spiderMan = createSprite(150, 320);
  spiderMan.frameDelay = 0.2
  spiderMan.addImage("hero", spiderManImage)
  spiderMan.scale = 0.2
  //spiderMan.debug = true
  spiderMan.setCollider("circle", 0,0,200)

  venom = createSprite(1200, 460)
  venom.addImage(venomImage)
  venom.addImage("end", venomLaughingImage)
  venom.scale = 0.3
  //venom.debug = true
  venom.setCollider("circle", 0,0,200)

  spiderMan.addAnimation("fighting", spiderManFighting)
  
  fireBallGroup = createGroup()
}

function draw() {
  background(building);

  if(gameState === "swinging")
  {
    if(keyDown(UP_ARROW))
  {
    spiderMan.y = spiderMan.y - 5
  }

  if(keyDown(DOWN_ARROW))
  {
    spiderMan.y = spiderMan.y + 5
  }

  if(keyDown(LEFT_ARROW))
  {
    spiderMan.x = spiderMan.x - 5
  }

  if(keyDown(RIGHT_ARROW))
  {
    spiderMan.x = spiderMan.x + 5
  }

  spawnObstacles()

  if(spiderMan.isTouching(venom))
  {
    gameState = "fight"
    var button = createImg("Images/SpidermanButton.png")
  button.position(displayWidth - 900, 50)
  button.size(200,200)
  button.mouseClicked(attack)
  }

  if(fireBallGroup.isTouching(spiderMan))
  {
    gameState = "end"
    fireBallGroup.destroyEach()
    spiderMan.destroy()
  }

}

else if(gameState === "end")
{
  venom.changeImage("end")
  textSize(50)
  fill("yellow")
  text("Game Over", displayWidth/2 - 100, displayHeight/2)
}

else if(gameState === "fight")
{
  spiderMan.collide(venom)
}

  drawSprites();
  textSize(20)
  text("hit = "+score, x=40, y=100)
  
  if(score<=0)
  {
    venom.destroy()
    spiderMan.changeImage("hero")
    
    
    textSize(150)
    stroke("black")
    strokeWeight(10)
    fill("Red")
    text("You Win!!!", x = displayWidth/2 + 200, y = displayHeight/2)
  }
}

function attack()
{
  spiderMan.changeImage("fighting")
  console.log("fight")
  score = score - 1
  spiderMan.scale = 0.8
}

function spawnObstacles()
{
  if(frameCount%20 === 0)
  {
    fireBall = createSprite(300, -20, 50, 50)
      fireBall.velocityY = random(8,12)
      fireBall.x = random(300, 1200)
      var rand = Math.round(random(1,2))
      switch(rand)
      {
        case 1: fireBall.addImage(fireBallImage1)
        break;
        case 2: fireBall.addImage(fireBallImage2)
        break;
      }
      fireBall.scale = 0.2
      fireBallGroup.add(fireBall)
  }
}