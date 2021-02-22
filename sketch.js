var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;
var x1=500;

function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappyImg = loadImage("happydog.png");
  milkImg = loadImage("milk.png");
  

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  emo = createSprite(200,200,1,1);
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  
  milk = createSprite(140,435,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.025;

  foodS=20;
}




function draw() {  
  
  background("black");
  
  x1=x1-3;
if(x1<=-20){
  x1=500;
}
  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);

   
  }
  
  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
  }
  if(foodS == 0){
  
    dog.addImage(dogImg);
    foodS = 20;
  
  }
}




  drawSprites();
  textSize(17);
  fill("white");
  text("I am your Dog Oscar..Feed me please😑",x1,150);
  fill("white");
  text("Press up arrow key to feed your pet Dog Oscar",50,50);
  fill("white");
  text("Milk Bottles Remaining  "+foodS,170,440);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(p){

  if(p<=0){
    p = 20;
 }else{
    p=p-1
  }

  database.ref('/').update({
    Food:p
  })
}
