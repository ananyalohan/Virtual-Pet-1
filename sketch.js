var database;
var dog, happyDog, dogImg, happydogImg;
var foodS, foodStock;

function preload()
{
  dogImg= loadImage("images/leoSerious.jpg")
  happydogImg= loadImage("images/leo.jpg")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage(dogImg)
  dog.scale = 0.6;
  
  foodStock= database.ref("Food")
  foodStock.on("value",readStock)
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happydogImg)
  }

  drawSprites();
  textSize(20);
  stroke(10);
  fill("dark blue")
  text("Food Stock : "+ foodS,180,450);

  text("Press Up Arrow To Feed Leo",120,400)

}

function readStock(data){
  foodS= data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1
  }

  database.ref("/").update({
    Food:x
  })
}



