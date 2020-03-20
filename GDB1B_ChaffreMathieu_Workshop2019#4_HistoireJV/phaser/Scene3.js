class Scene3 extends Phaser.Scene {
  constructor() {
    super("troisième_scene");
  }

  init(data){
    this.reussite_1 = data.reussite_1;
    this.reussite_2 = data.reussite_2;
    this.reussite_3 = 0
    this.reussite_4 = data.reussite_4;

  }

  preload(){
    this.load.image("background_plat", "assets/background.png");
    this.load.image("platforms_1", "assets/biscuit_grand.png");
    this.load.spritesheet("player", "assets/sprite_walk.png", {frameWidth: 28, frameHeight: 50})
    this.load.spritesheet("player_stop", "assets/sprite_iddle.png", {frameWidth: 28, frameHeight: 50});
    this.load.spritesheet("player_saut", "assets/sprite_saut.png", {frameWidth: 28, frameHeight: 50});
    this.load.image("platforms_2", "assets/glace_.png");
    this.load.image("platforms_3", "assets/pomme_.png");
    this.load.image("paquet", "assets/paquet_yummy.png");
    this.load.image("projectile", "assets/cerise.png");
  }

  create(){

    this.balle = 3;

    this.physics.world.setBounds(0, 0, 4096, 768);
    this.cameras.main.setBounds(0, 0, 4096, 768);
    this.physics.world.setBoundsCollision(true, false, true, false);


    this.add.image(0,0, "background_plat").setOrigin(0,0);
    this.platforms_1 = this.physics.add.staticGroup();
    this.platforms_2 = this.physics.add.staticGroup();
    this.platforms_3 = this.physics.add.staticGroup();


    this.platform_amovible_1 = this.physics.add.image(2865, 675, "platforms_3");
    this.platform_amovible_1.setImmovable(true);
    this.platform_amovible_1.body.setAllowGravity(false);
    this.tweens.add({
        targets: this.platform_amovible_1,
        x: 3500,
        duration: 7000,
        ease: 'Power2',
        yoyo: true,
        repeat: -1
    });


    this.paquet_ = this.physics.add.staticGroup();
    this.platforms_1.create(100, 718, "platforms_1");
    this.platforms_1.create(300, 718, "platforms_1");
    this.platforms_1.create(500, 718, "platforms_1");
    this.platforms_1.create(965, 675, "platforms_1");
    this.platforms_1.create(1165, 675, "platforms_1");
    this.platforms_1.create(1365, 675, "platforms_1");
    this.platforms_2.create(1765, 700, "platforms_2");
    this.platforms_2.create(2065, 700, "platforms_2");
    this.platforms_1.create(2365, 675, "platforms_1");
    this.platforms_1.create(2565, 675, "platforms_1");
    this.paquet_.create(2575, 593, "paquet").setScale(0.9).refreshBody(true);
    this.platforms_1.create(3700, 675, "platforms_1");
    this.platforms_1.create(3900, 675, "platforms_1");
    this.paquet_.create(3950, 593, "paquet").setScale(0.9).refreshBody(true);
    this.platforms_1.create(4100, 675, "platforms_1");

    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.body.setAllowGravity(true);
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setZoom(1);

    this.physics.add.collider(this.player, this.platforms_1);
    this.physics.add.collider(this.player, this.platforms_2);
    this.physics.add.collider(this.player, this.platforms_3);
    this.physics.add.collider(this.player, this.paquet_);
    this.physics.add.collider(this.player, this.platform_amovible_1, this.setPosition, null, this);

    this.cerise = this.physics.add.group();
    this.physics.add.collider(this.cerise, this.platforms_1);
    this.physics.add.collider(this.cerise, this.platforms_2);
    this.physics.add.collider(this.cerise, this.platforms_3);

    this.physics.add.collider(this.player, this.cerise, this.hitPlayer, null, this);



    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', {start: 0, end: 6}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'stop',
      frames: this.anims.generateFrameNumbers('player_stop', {start: 0, end: 2}),
      frameRate: 5,
      repeat: -1
    });

    this.timedEvent = this.time.addEvent({ delay: 3000, callback: onEvent, callbackScope: this, repeat: -1 });
    function onEvent(){
      this.cerise_= this.cerise.create(2510, 590, "projectile").setScale(0.3);
      this.cerise_.setVelocityX(-100);
    };
    this.timedEvent_2 = this.time.addEvent({ delay: 3000, callback: onEvent_2, callbackScope: this, repeat: -1 });
    function onEvent_2(){
      this.cerise_2= this.cerise.create(3910, 590, "projectile").setScale(0.3);
      this.cerise_2.setVelocityX(-100);
    };

  }

  update(){
    if (this.cursors.left.isDown && this.player.x < 4000) {
      this.player.setVelocityX(-300);
      this.player.anims.play('right', true);
      this.player.setFlipX(true);
    }
    else if (this.cursors.right.isDown && this.player.x < 4000) {
      this.player.setVelocityX(300)
      this.player.anims.play('right', true);
      this.player.setFlipX(false);
    }
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('stop', true);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down && this.player.x < 4000) {
      this.player.setVelocityY(-200);
    }
    if (this.player.y > 768) {
      this.player.y = 450;
      this.player.x = 100;
    }

    if (this.player.x >= 3950) {
      this.player.setVelocityX(300);
      this.player.anims.play('right', true);
      this.player.setFlipX(false);
    }
    if(this.player.x > 4096){
      this.reussite_3 = 1;
      this.scene.start("title2", {reussite_1: this.reussite_1, reussite_2: this.reussite_2, reussite_3: this.reussite_3, reussite_4: this.reussite_4} );
    }

  }


  hitPlayer(player, cerise){
    player.x = 100;
    player.y = 450;
  }
  setPosition(){
    this.platform_amovible_1.y = 675;
  }

}
