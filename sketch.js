var spaceeImg, space;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var alien, alienImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  spaceImg = loadImage("spacebackground.jpg");
  doorImg = loadImage("door2.png");
  climberImg = loadImage("climber.png");
  alienImg = loadImage("alien.png");
  
}

function setup() {
  createCanvas(600, 600);
  space = createSprite(300,300);
  space.addImage("space",spaceImg);
  space.velocityY = 1;
  alien = createSprite(200,200,50,50)
  alien.addImage("alien", alienImg)
  alien.scale = 0.5
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw() {
  background(200);
  if (gameState === "play") {
    if (keyDown("left_arrow")) {
      alien.x = alien.x - 3
    }
    if (keyDown("right_arrow")) {
      alien.x = alien.x+3
  }
  if (keyDown("space")) {
    alien.velocityY = -10
  }
  alien.velocityY = alien.velocityY+0.8

  if(space.y > 400){
      space.y = 300
    }
    spawndoors()
    if (climbersGroup.isTouching(alien)) {
      alien.velocityY = 0
    }
    if (invisibleBlockGroup.isTouching(alien)|| alien.y>600) {
      alien.destroy()
      gameState = "end"
    }
  drawSprites()
  }
  if (gameState === "end") {
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("Game Over", 230,250)
  }
}
  function spawndoors() {
    if (frameCount%350 === 0) {
      var door = createSprite(200,-50)
      var climber = createSprite(200,10)
      var invisibleBlock = createSprite(200,15)
      invisibleBlock.width = climber.width-10
      invisibleBlock.height = 2
      climber.scale = 0.3
      door.scale = 0.3
      alien.x = Math.round(random(120,400))
      climber.x = door.x
      invisibleBlock.x = door.x
      door.addImage(doorImg)
      climber.addImage(climberImg)
      door.velocityY = 1
      climber.velocityY = 1
      invisibleBlock.velocityY = 1
      alien.depth = door.depth
      alien.depth+=1
      door.lifetime = 800
      climber.lifetime = 800
      invisibleBlock.lifetime = 800
      doorsGroup.add(door)
      invisibleBlock.debug = true
      climbersGroup.add(climber)
      invisibleBlockGroup.add(invisibleBlock)
    }
  }
