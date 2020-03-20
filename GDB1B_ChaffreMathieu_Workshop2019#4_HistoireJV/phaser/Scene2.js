class Scene2 extends Phaser.Scene {
  constructor() {
    super("deuxieme_scene");
  }
  init(data){
    this.reussite_1 = data.reussite_1;
    this.reussite_2 = 0;
    this.reussite_3 = data.reussite_3;
    this.reussite_4 = data.reussite_4;
  }
  preload(){
    this.load.image("barre_2", "assets/breakout_bar.png");
    this.load.image("barre_color", "assets/biscuit.png");
    this.load.image("balle_2", "assets/cerise.png");
    this.load.image("fond", "assets/background_breakout.png")
  }
  create(){
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.camera = this.cameras.add(0,0,1024, 768);
    this.add.image(0,0, "fond").setOrigin(0,0);

    this.player = this.physics.add.image(450, 700, 'barre_2').setImmovable();
    this.player.setCollideWorldBounds(true);
    this.player.body.setAllowGravity(false);

    this.balle = this.physics.add.image(450, 650, "balle_2").setCollideWorldBounds(true).setBounce(1).setScale(0.3);
    this.balle.setData("sur_Barre", true);
    this.balle.body.setAllowGravity(false);

    this.input.on("pointermove", this.barreMouv, this);

    this.brick = this.physics.add.staticGroup({
      key: "barre_color",
      frameQuantity: 28,
      gridAlign: { width: 7, height: 10, cellWidth: 125, cellHeight: 65, x: 150, y: 100 }

    });



    this.physics.add.collider(this.balle, this.player, this.hitPlayer, null, this);
    this.physics.add.collider(this.balle, this.brick, this.hitBarre, null, this);
    this.input.on("pointerup", this.lacheBalle, this );


    this.initialTime = 90;

    this.text = this.add.text(32, 32, 'Temps: ' + formatTime(this.initialTime), {fontSize: '20px', fill:'#000'});

    // Each 1000 ms call onEvent
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });


    function formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
    }


    function onEvent ()
    {
    if(this.initialTime > 0){
            this.initialTime -= 1; // One second
    this.text.setText('Temps: ' + formatTime(this.initialTime));
    }
    if(this.initialTime <= 0){

        this.scene.start("deuxieme_scene", {reussite_1: this.reussite_1, reussite_2: this.reussite_2, reussite_3: this.reussite_3, reussite_4: this.reussite_4});
    }

  }

  }
  update(){
    if(this.balle.y > 768){
      this.balle.setData("sur_Barre", true);
      this.balle.y = this.player.y -50;
      this.balle.x = this.player.x;
      this.balle.setVelocity(0,0);
      this.camera.flash(1000, 1.0, 1.0, 1.0, false, this.flashComplete, this);
      this.initialTime -=5;
    }
  }

barreMouv(pointer){
  this.player.x = Phaser.Math.Clamp(pointer.x, 100, 925);
  if (this.balle.getData("sur_Barre")) {
    this.balle.x = this.player.x;
  }
}

lacheBalle(){
  this.balle.setVelocity(-10, -400);
  this.balle.setData("sur_Barre", false);
}

hitBarre(balle, bricks){
  bricks.disableBody(true, true);
  if (this.brick.countActive() === 0)
        {
          this.reussite_2 = 1;
            this.scene.start("title2", {reussite_1: this.reussite_1, reussite_2: this.reussite_2, reussite_3: this.reussite_3, reussite_4: this.reussite_4});
        }
  console.log("touché");
}

hitPlayer(balle, barre){
  var velocity;
  if (balle.x < barre.x) {
    velocity = (barre.x - (balle.x+20)) *(-12) ;
    balle.setVelocityX(velocity);
  }
  else if(barre.x < balle.x){
    velocity = (balle.x+20-barre.x) * 12 ;
    balle.setVelocityX(velocity);
  }
  else {
    balle.x = Phaser.Math.Between(barre.x-10, barre.x+10);
  }
}

flashComplete(){
  this.camera.shake(1000, 0.05, false);
}


}
