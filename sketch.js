var super_natural_banana_image,super_natural_banana,super_natural_banana_Grp;
var obstacles,obstacles_Grp,obstacle_1,obstacle_2,obstacle_3;
var gorrilla_1,gorrilla_2,gorrilla_3,gorrilla_running;

var background_image,background_bg;
var player,player_running;
var ground,ground_2;

var restart_but,restart_image;
var trophy,winner_image;
var lose,loser_image;

var forest_ambience;
var super_natural_banana_sfx;
var obstacles_sfx;
var gorrilla_sfx;
var winner_sfx;
var loser_sfx;
var jump_sfx;

var satisfied_gorrillas="not_satisfied";
var collected_banana=0;
var difficulty="none";
var gameState="alive";
var seconds=0;

function preload() {

    super_natural_banana_image = loadImage("./assets/Banana.png");
    background_image = loadImage("./assets/Background.png");

    gorrilla_running = loadAnimation("./assets/G_1.png","./assets/G_2.png","./assets/G_3.png","./assets/G_4.png","./assets/G_5.png","./assets/G_6.png","./assets/G_7.png","./assets/G_8.png","./assets/G_9.png","./assets/G_10.png","./assets/G_11.png","./assets/G_12.png");
    player_running = loadAnimation("./assets/R_1.png","./assets/R_2.png","./assets/R_3.png","./assets/R_4.png","./assets/R_5.png","./assets/R_7.png","./assets/R_7.png","./assets/R_8.png");
    
    obstacle_1 = loadImage("./assets/S_1.png");
    obstacle_2 = loadImage("./assets/S_2.png");
    obstacle_3 = loadImage("./assets/S_3.png");
    
    player_steady = loadAnimation("./assets/R_5.png");
    gorrilla_steady = loadAnimation("./assets/G_12.png");
    
    restart_image = loadImage("./assets/Restart.png");
    winner_image = loadImage("./assets/Winner.png");
    loser_image = loadImage("./assets/Loser.png")

    forest_ambience = loadSound('Forest_Ambience.mp3');
    super_natural_banana_sfx = loadSound('Super_Natural_Banana_Sfx.mp3');
    obstacles_sfx = loadSound('Obstacles_Sfx.mp3');
    gorrilla_sfx = loadSound('Gorrilla_Sfx.mp3');
    winner_sfx = loadSound('Winner_Sfx.mp3');
    loser_sfx = loadSound('Loser_Sfx.mp3')
    jump_sfx = loadSound('Jump_Sfx.mp3');

    forest_ambience.playing=true;
    forest_ambience.looping=true;

    super_natural_banana_sfx.playing=true;
    super_natural_banana_sfx.looping=false;

    obstacles_sfx.playing=true;
    obstacles_sfx.looping=false;

    gorrilla_sfx.playing=true;
    gorrilla_sfx.looping=false;

    winner_sfx.playing=true;
    winner_sfx.looping=false;

    loser_sfx.playing=true;
    loser_sfx.looping=false;

    jump_sfx.playing=true;
    jump_sfx.looping=false;

}

function setup() {

    createCanvas(1530,740);

    forest_ambience.play();
    forest_ambience.setVolume(0.1);

    super_natural_banana_sfx.setVolume(0.2);
    obstacles_sfx.setVolume(0.2);

    gorrilla_sfx.setVolume(0.3);
    winner_sfx.setVolume(0.3);
    loser_sfx.setVolume(0.3);

    jump_sfx.setVolume(0.1);

    background_bg = createSprite(0,369,1550,750);
    background_bg.addImage(background_image);             
    background_bg.velocityX= -26;

    restart_but = createSprite(765,370);
    restart_but.addImage(restart_image);
    restart_but.visible=false;
    restart_but.scale = 0.5;

    trophy = createSprite(765,600);
    trophy.addImage(winner_image);
    trophy.visible=false;
    trophy.scale = 0.5;
    
    lose = createSprite(765,600);
    lose.addImage(loser_image);
    lose.visible=false;
    lose.scale = 0.5;

    //Super_Gorrilla
    gorrilla_1 = createSprite(300,630,50,35);
    gorrilla_1.addAnimation("running",gorrilla_running);
    gorrilla_1.addAnimation("dead_gorrilla", gorrilla_steady);
    gorrilla_1.scale = 2;
    
    //Great_Gorrilla
    gorrilla_2 = createSprite(150,610,50,35);
    gorrilla_2.addAnimation("running",gorrilla_running);
    gorrilla_2.addAnimation("dead_gorrilla", gorrilla_steady);
    gorrilla_2.scale = 1.5;

    //Best_Gorrilla
    gorrilla_3 = createSprite(40,620,50,35);
    gorrilla_3.addAnimation("running",gorrilla_running);
    gorrilla_3.addAnimation("dead_gorrilla", gorrilla_steady);
    gorrilla_3.scale = 1;

    //Player
    player = createSprite(500,610,50,35);
    player.addAnimation("running",player_running);
    player.addAnimation("dead",player_steady);

    player.scale = 0.3;
    player.setCollider("circle",0,0,140);

    //Ground
    ground = createSprite(200,740,1800,30)
    ground.visible=false;

    ground_2 = createSprite(200,640,1800,30)
    ground_2.visible=false;

    obstacles_Grp = new Group();
    super_natural_banana_Grp = new Group();

}

function draw() {

    background(background_image);

    var date = new Date().getSeconds();
    seconds = date;

    if(gameState=="alive") {

        trophy.visible=false;
        lose.visible=false;

    if(difficulty=="none") {

        background_bg.velocityX=-26;
    
    }
    
    if(difficulty=="one") {
            
        background_bg.velocityX=-31;
    
    }
    
    if(difficulty=="two") {
            
        background_bg.velocityX=-36;
    
    }
    
    if(difficulty=="three") {
            
        background_bg.velocityX=-41;
    
    }
    
    if(background_bg.x<0) {

        background_bg.x=background_bg.width/2;

    }

    if(keyDown("space") && player.y>=550) {

        player.velocityY=-20;
        jump_sfx.play();

    }

    player.velocityY=player.velocityY+1;
    
    if (satisfied_gorrillas=="not_satisfied") {

        spawnObstacles();

    if (collected_banana<30) {

        gorrilla_growl();

    }

    else {

    }

        setTimeout(function(){
        spawnSuperNaturalBananas()
        },30000
        );

    }

    if(satisfied_gorrillas=="satisfied") {

        trophy.visible=true;
        restart_but.visible=true;

        obstacles_Grp.destroyEach();
        super_natural_banana_Grp.destroyEach();
        player.changeAnimation("dead",player_steady);

        player.x=500;
        player.y=610;
        player.velocityY=0;

        background_bg.velocityX=0;

        super_natural_banana_sfx.stop();
        forest_ambience.stop();
        obstacles_sfx.stop();
        gorrilla_sfx.stop();
        jump_sfx.stop();

        if(mousePressedOver(restart_but)) {

        restart();

    }

    }

    if(player.isTouching(obstacles_Grp)) {

        loser_sfx.play()
        gameState="dead";

    }

    if(player.isTouching(super_natural_banana_Grp)) {

        super_natural_banana_Grp.destroyEach();
        collected_banana=collected_banana+1;

    }

    }

    if(gameState=="dead") {

        player.changeAnimation("dead",player_steady);
        gorrilla_1.changeAnimation("dead_gorrilla", gorrilla_steady);
        gorrilla_2.changeAnimation("dead_gorrilla", gorrilla_steady);
        gorrilla_3.changeAnimation("dead_gorrilla", gorrilla_steady);
       
        player.velocityY= 0;
        background_bg.velocityX= 0;

        obstacles_Grp.setVelocityXEach(0);
        super_natural_banana_Grp.setVelocityXEach(0);

        obstacles_Grp.destroyEach();
        super_natural_banana_Grp.destroyEach();

        super_natural_banana_sfx.stop();
        forest_ambience.stop();
        obstacles_sfx.stop();
        gorrilla_sfx.stop();
        jump_sfx.stop();
    
        
        restart_but.visible=true ;
        lose.visible=true;

        if(mousePressedOver(restart_but)) {

            restart();

        }

    }

    //Disapper (Satisfication Of Gorillas)

    if(collected_banana==0) {

        gorrilla_3.visible=true;
        gorrilla_2.visible=true;
        gorrilla_1.visible=true;

    }

    if(collected_banana==5) {

        gorrilla_3.visible=false;
        difficulty="one";

    }

    if(collected_banana==15) {

        gorrilla_2.visible=false;
        difficulty="two";

    }

    if(collected_banana==30) {

        gorrilla_1.visible=false;
        difficulty="three";
        super_natural_banana_Grp.destroyEach();
              
        date=new Date().getSeconds();
        seconds=date;

            
        if(seconds==35) {

            collected_banana=0
            satisfied_gorrillas="satisfied"
            winner_sfx.play();

            gorrilla_1.changeAnimation("dead_gorrilla", gorrilla_steady);
            gorrilla_2.changeAnimation("dead_gorrilla", gorrilla_steady);
            gorrilla_3.changeAnimation("dead_gorrilla", gorrilla_steady);

        }

    }

    gorrilla_1.collide(ground);
    gorrilla_2.collide(ground);
    gorrilla_3.collide(ground);
    player.collide(ground_2);

    drawSprites();

    if (collected_banana<1) {

        textSize(25);
        fill("white");

        text("A jaded journalist, Jack, chased a whispered jungle legend – a crystal with world - ending power guarded by monstrous simians",10,100);
        text("Deep within a crumbling temple, he found it, pulsing with light, a deafening shriek shattered the silence",10,140);  
        text("Three colossal monkeys, eyes blazing with fury, materialized, Jack knew he'd awakened a nightmare",10,180);
        text("Crystal clutched tight, he sprinted through the treacherous jungle, the enraged simians hot on his heels",10,220)
    }

        textSize(25);
        fill("red");
        text("Super Natural Bananas Collected : "+collected_banana,10,50);

     //Display (Text For Satisfication Of Gorillas)
     if(collected_banana==5) {

        textSize(25);
        fill("cyan");
        text("The weakest simian seems content... for now",10,80);  

    }

    else

        text("",765,80)


    if(collected_banana==15) {

        textSize(25);
        fill("cyan");
        text("The intermidiate simian seems content... for now",10,80);  

    }

    else  

        text("",765,80)

    if(collected_banana==30) {

        textSize(25);
        fill("cyan");
        text("The strongest simian seems content... for now",10,80);  
   
    }

    else

        text("",765,80)
}

function spawnObstacles() {

    if(difficulty=="none") {

        if(frameCount%50 === 0) {

            var obstacles = createSprite(1500,610,50,35);
            obstacles.scale=1;
            obstacles.velocityX=-26;

            var rand = Math.round(random(1,3));
            switch (rand) {

            case 1: obstacles.addImage(obstacle_1);
                    break;
            case 2: obstacles.addImage(obstacle_2);
                    break;
            case 3: obstacles.addImage(obstacle_3);
                    break;
            default: break;

        }

        obstacles_Grp.add(obstacles);
        obstacles.lifetime=138;
        obstacles_sfx.play();

        }

    }

    if(difficulty=="one") {
        
        if(frameCount%45 === 0) {

            var obstacles = createSprite(1500,610,50,35);
            obstacles.scale=1;
            obstacles.velocityX=-31;

            var rand = Math.round(random(1,3));
            switch (rand) {

            case 1: obstacles.addImage(obstacle_1);
                    break;
            case 2: obstacles.addImage(obstacle_2);
                    break;
            case 3: obstacles.addImage(obstacle_3);
                    break;
            default: break;

        }

        obstacles_Grp.add(obstacles);
        obstacles.lifetime=138;
        obstacles_sfx.play();

        }

    }

    if(difficulty=="two") {
        
        if(frameCount%40 === 0) {

            var obstacles = createSprite(1500,610,50,35);
            obstacles.scale=1;
            obstacles.velocityX=-36;

            var rand = Math.round(random(1,3));
            switch (rand) {

            case 1: obstacles.addImage(obstacle_1);
                    break;
            case 2: obstacles.addImage(obstacle_2);
                    break;
            case 3: obstacles.addImage(obstacle_3);
                    break;
            default: break;

        }

        obstacles_Grp.add(obstacles);
        obstacles.lifetime=138;
        obstacles_sfx.play();

        }

    }

    if(difficulty=="three") {
        
        if(frameCount%35 === 0) {

            var obstacles = createSprite(1500,610,50,35);
            obstacles.scale=1;
            obstacles.velocityX=-41;

            var rand = Math.round(random(1,3));
            switch (rand) {

            case 1: obstacles.addImage(obstacle_1);
                    break;
            case 2: obstacles.addImage(obstacle_2);
                    break;
            case 3: obstacles.addImage(obstacle_3);
                    break;
            default: break;

        }

        obstacles_Grp.add(obstacles);
        obstacles.lifetime=138;
        obstacles_sfx.play();

        }

    }

}

function spawnSuperNaturalBananas() {

    if(difficulty=="none") {

        if(frameCount%100 === 0) {

            super_natural_banana = createSprite(1500,400,40,40);
            super_natural_banana.addImage(super_natural_banana_image);
            
            super_natural_banana.scale=0.3;
            super_natural_banana.velocityX=-26;
    
            super_natural_banana_Grp.add(super_natural_banana);
            super_natural_banana.lifetime=138;
    
        if(collected_banana<30 && collected_banana>0) {
    
            super_natural_banana_sfx.play();
    
        }
    
        else {
    
        }

        }

    }

    if(difficulty=="one") {

        if(frameCount%90 === 0) {

            super_natural_banana = createSprite(1500,400,40,40);
            super_natural_banana.addImage(super_natural_banana_image);
            
            super_natural_banana.scale=0.3;
            super_natural_banana.velocityX=-31;
    
            super_natural_banana_Grp.add(super_natural_banana);
            super_natural_banana.lifetime=138;
    
        if(collected_banana<30 && collected_banana>0) {
    
            super_natural_banana_sfx.play();
    
        }
    
        else {
    
        }
        
        }

    }

    if(difficulty=="two") {
        
        if(frameCount%80 === 0) {

            super_natural_banana = createSprite(1500,400,40,40);
            super_natural_banana.addImage(super_natural_banana_image);
            
            super_natural_banana.scale=0.3;
            super_natural_banana.velocityX=-36;
    
            super_natural_banana_Grp.add(super_natural_banana);
            super_natural_banana.lifetime=138;
    
        if(collected_banana<30 && collected_banana>0) {
    
            super_natural_banana_sfx.play();
    
        }
    
        else {
    
        }
        
        }

    }

    if(difficulty=="three") {
   
        if(frameCount%70 === 0) {

            super_natural_banana = createSprite(1500,400,40,40);
            super_natural_banana.addImage(super_natural_banana_image);
            
            super_natural_banana.scale=0.3;
            super_natural_banana.velocityX=-41;
    
            super_natural_banana_Grp.add(super_natural_banana);
            super_natural_banana.lifetime=138;
    
        if(collected_banana<30 && collected_banana>0) {
    
            super_natural_banana_sfx.play();
    
        }
    
        else {
    
        }
        
        }

    }

}

function restart() {

    gameState="alive";
    difficulty="none";
    collected_banana=0;
    satisfied_gorrillas="not_satisfied";

    forest_ambience.play();
    restart_but.visible=false;
    trophy.visible=false;
    lose.visible=false;
    background_bg.velocityX=-26;

    player.changeAnimation("running",player_running);
    gorrilla_1.changeAnimation("running",gorrilla_running);
    gorrilla_2.changeAnimation("running",gorrilla_running);
    gorrilla_3.changeAnimation("running",gorrilla_running);

}

function gorrilla_growl() {

    if(frameCount%300 === 0) {

        gorrilla_sfx.play()

    } 

}
