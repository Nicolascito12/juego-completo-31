const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;

var bg_img;
var food;
var rabbit;

var button;
var button2;
var button3;

var rope;
var rope2;
var rope3;

var bunny;
var blink,eat,sad;

var cut_sound;
var sad_sound;
var eating_sound;
var air_sound;

var Sonidodefondo;

var mute_button;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air_sound = loadSound('air.wav');
  
  Sonidodefondo = loadSound("piano.mp3");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    ancho = displayWidth;
    alto = displayHeight;
    createCanvas(displayWidth,displayHeight);
  }
  else{
    ancho = windowWidth;
    alto = windowHeight;
    createCanvas(displayWidth,displayHeight);
  }

  
  frameRate(80);

  Sonidodefondo.play();
  Sonidodefondo.setVolume(0.20)
  
  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(100,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(360,200);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(330,35);
  button3.size(50,50);
  button3.mouseClicked(drop3);
  
  blower = createImg("blower.png");
  blower.position(10,250)
  blower.size(100,100);
  blower.mouseClicked(airblow);

  mute_button = createImg("Mute_Icon.svg.png");
  mute_button.position(450,20)
  mute_button.size(50,50);
  mute_button.mouseClicked(mute);

  rope = new Rope(7,{x:105,y:30});
  rope2 = new Rope(7,{x:380,y:215});
  rope3= new Rope(8,{x:350,y:50});

  ground = new Ground(200,alto,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(340,alto-220,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3= new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth,displayHeight*2);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
     sad_sound.play();
   }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  cut_sound.play();
}

function drop2()
{
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 
  cut_sound.play();
}

function drop3()
{
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null; 
  cut_sound.play();
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow (){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.02,y:0});
  air_sound.play();
}

function mute (){
 if(Sonidodefondo.isPlaying()){
  Sonidodefondo.stop();
 }
 else{
  Sonidodefondo.play();
 }
}