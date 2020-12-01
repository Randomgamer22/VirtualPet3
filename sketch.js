var dog, hungryDog, happyDog, database, food, foodStock;
var feedButton, addFoodButton;
var lastFed;

function preload()
{
  hungryDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();

  dog = createSprite(750, 250, 10, 10);
  dog.addImage(hungryDog);

  feedButton = createButton("Feed the Dog");
  feedButton.position(1000, 85);
  feedButton.mousePressed(feedDog());

  addFoodButton = createButton("Add Food");
  addFoodButton.position(1100, 85)
  addFoodButton.mousePressed(addFood());

  food = new Food();

  foodStock = database.ref("Food")
  foodStock.on("value", readStock);
}


function draw() {  
  background('#339966')

  textSize(20);
  fill("white");
  stroke("black");

  if(lastFed) {
    if(lastFed >= 12){
      text("lastFed: "+ lastFed%12 + " PM", 400, 50);
    } else if(lastFed == 0) {
      text("lastFed: "+ "12 PM", 400, 50);
    } else {
      text("lastFed: "+ lastFed + " AM", 400, 50);
    }
  }

  food.display();

  drawSprites();
}

function readStock(data) {
  foodStock = data.val();
}

function writeStock(x) {

  if(x == 0){
    x = 0;
  }else {
    x=x+1
  }
  database.ref('/').update({
    Food: x
  });
}

function updateLastFed(data) {
  database.ref('/').update({
    FedTime: data
  })
}

function feedDog() {
  lastFed = hour();
  updateLastFed(lastFed);

  food.deductFood();
  dog.addImage(happyDog);
}

function addFood() {
  foodStock++;
  food.foodStock++;
  writeStock(foodStock);
}



