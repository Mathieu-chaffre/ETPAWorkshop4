class Scene1 extends Phaser.Scene {
  constructor() {
    super("premiere_scene")
  }

  init(data){
    this.reussite_1 = 0;
    this.reussite_2 = data.reussite_2;
    this.reussite_3 = data.reussite_3;
    this.reussite_4 = data.reussite_4;
  }

  preload(){
    this.load.image("barre", "assets/breakout_bar3.png");
    this.load.image("balle", "assets/cerise.png");
    this.load.image("background_break", "assets/background_breakout.png")
  }

  create(){
    this.dehors = 0;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.camera = this.cameras.add(0,0,1024, 768);
    this.add.image(0,0, "background_break").setOrigin(0,0);

    this.physics.world.setBoundsCollision(false, false, true, true);
    this.player1 = this.physics.add.image(999, 380, 'barre');

    this.player1.setCollideWorldBounds(true);
    this.player1.body.setAllowGravity(false);


    this.player2 = this.physics.add.image(100, 380, 'barre');
    this.up = this.input.keyboard.addKey('Z');
    this.down = this.input.keyboard.addKey('S');
    this.player2.setCollideWorldBounds(true);

    this.player2.body.setAllowGravity(false);


    this.balle = this.physics.add.image(640, 380, 'balle').setScale(0.4);
    this.balle.setOrigin(0.5,0.5);
    this.balle.setCollideWorldBounds(true);
    this.physics.add.collider(this.balle, this.player1, this.hitPlayer1, null, this);
    this.physics.add.collider(this.balle, this.player2, this.hitPlayer2, null, this);
    this.balle.setBounce(1,1);
    this.balle.setVelocity(200, -20);
    this.balle.body.setAllowGravity(false);


    this.initialTime = 30;

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
    this.text.setText('Temps: ' + formatTime(this.initialTime),  {fontSize: '20px', fill:'#000'});
    }
    if(this.initialTime <= 0){
      this.reussite_1 = 1;
        this.scene.start("title2", {reussite_1: this.reussite_1, reussite_2: this.reussite_2, reussite_3: this.reussite_3, reussite_4: this.reussite_4});
    }

  }
}

  update(){
    if (this.cursors.up.isDown) {
      this.player1.setVelocityY(-500);
    }
    else if (this.cursors.down.isDown){
      this.player1.setVelocityY(500);
    }
    else {
      this.player1.setVelocityY(0);
    }

    if (this.up.isDown) {
      this.player2.setVelocityY(-500);
    }
    else if (this.down.isDown) {
      this.player2.setVelocityY(500);
    }
    else {
      this.player2.setVelocityY(0);
    }

    if (this.player1.x != 999) {
      this.player1.x = 999;
    }
    if (this.player2.x != 26) {
      this.player2.x = 26;
    }

    if (this.balle.x <0 || this.balle.x > 1024) {
      this.camera.flash(1000, 1.0, 1.0, 1.0, false, this.flashComplete, this);
      console.log(this.balle.x)
      this.balle.x = 512;
      this.balle.setVelocityX(-200)
      this.dehors +=1;

    }
    if (this.dehors == 3 ) {
      this.scene.start("premiere_scene", {reussite_1: this.reussite_1, reussite_2: this.reussite_2, reussite_3: this.reussite_3, reussite_4: this.reussite_4});
    }
  }


  hitPlayer1(){
    if (this.balle.y > this.player1.y) {
      this.VelocityY = this.balle.y - this.player1.x;
      console.log(this.VelocityY);
            this.balle.setVelocityY(this.VelocityY);
            this.balle.setVelocityX(-800);
    }
    else if(this.balle.y < this.player1.y){
      this.VelocityY = this.player1.y - this.balle.y;
            this.balle.setVelocityY(this.VelocityY*5);
            console.log(this.VelocityY);
            this.balle.setVelocityX(-800);
    }
    this.player1.setVelocityX(0);
  }

  hitPlayer2(){
    if (this.balle.y > this.player2.y) {
      this.VelocityY = this.balle.y - this.player2.x;
      console.log(this.VelocityY);
            this.balle.setVelocityY(this.VelocityY);
            this.balle.setVelocityX(800);
    }
    else if(this.balle.y < this.player2.y){
      this.VelocityY = this.player2.y - this.balle.y;
      console.log(this.VelocityY);
            this.balle.setVelocityY(-10 * this.VelocityY);
            this.balle.setVelocityX(800);
    }
    this.player2.setVelocityX(0);
  }

  flashComplete(){
    this.camera.shake(1000, 0.05, false);
  }



}
