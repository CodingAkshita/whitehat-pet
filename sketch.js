var database ,dog,dog1,dog2
var foods
//var form
var feed,add
var foodobject
var fedTime
var lastFed
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/Dog.png")
  dogimg2 = loadImage("images/happy dog.png")
  
}

function setup() {
	createCanvas(700, 700);
  database = firebase.database();
  console.log(database);
 
  foodobject = new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(800,95)
  add.mousePressed(addFoods)


} 

function draw(){
 background(0,138,86);

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);

 if(lastFed>=12)
 {
   text("Last Feed : " + lastFed%12 + "PM", 150,30);
 }else if(lastFed==0 )
 {
   text("Last Feed : 12 AM" , 150,30)
 }else
 {
   text("Last Feed : " + lastFed + "AM", 150,30);
 }

 fedtime=database.ref('FeedTime')
 fedtime.on("value",function(data){ 
  lastFed=data.val();
 });
 
 
 fill("white");
text("Pet dog : Bruno",500,350);

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
 console.log("Error in writing to the database");
}


function addFoods(){
foods++
database.ref('/').update({
  Food:foods
})
}
function FeedDog(){

dog.addImage(dogimg2);

foodobject.updateFoodStock(foodobject.getFoodStock()-1);
database.ref('/').update({
Food:foodobject.getFoodStock(),
FeedTime:hour()
})
}