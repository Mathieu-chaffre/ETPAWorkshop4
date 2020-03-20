class Scene4 extends Phaser.Scene {
  constructor() {
    super("quatrieme_scene");
  }
  init(data){
    this.reussite_1 = data.reussite_1;
    this.reussite_2 = data.reussite_2;
    this.reussite_3 = data.reussite_3;
    this.reussite_4 = 0;
  }
  preload(){
    this.load.image("tiles", "assets/tileset.png");
    this.load.tilemapTiledJSON("map", "assets/map.json");
    this.load.spritesheet('player_bas', "assets/bas.png", {frameWidth: 35, frameHeight: 51});
    this.load.spritesheet('player_haut', "assets/haut.png", {frameWidth: 34, frameHeight: 50});
    this.load.spritesheet('player_cote', "assets/cote.png", {frameWidth: 30, frameHeight: 48});
    this.load.spritesheet('stop', "assets/stop.png", {frameWidth: 35, frameHeight: 47});
    this.load.spritesheet('left_ennemie', "assets/ennemie_cote.png", {frameWidth: 30, frameHeight: 48});
    this.load.image("balle", "assets/cerise.png");
  }

  create(){
    this.physics.world.setBounds(0, 0, 3200, 3200);

    this.save = 1;
    this.save_1 = 0;
    this.save_2 = 0;
    this.save_3 = 0;
    this.save_4 = 0;

    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tileset", "tiles");

    const belowLayer = map.createStaticLayer("BelowLayer", tileset, 0, 0);
    this.worldLayer = map.createStaticLayer("world", tileset, 0, 0);
    this.aboveLayer = map.createStaticLayer("AboveLayer", tileset, 0, 0);



    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

     this.text = this.add
    .text(550, 16, " Hey Listen ! \n J'ai une quête pour toi !\n Va me chercher du pain à la boulangerie !", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#000000"
    })
    .setScrollFactor(0);

    this.worldLayer.setCollisionByProperty({collides:true});
    this.cerise = this.physics.add.group();

    this.spawnPoint = map.findObject("objects", obj => obj.name === "Spawn Point");
    this.player = this.physics.add.sprite(this.spawnPoint.x, this.spawnPoint.y, "player_bas");
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setZoom(1);
    this.physics.add.collider(this.player, this.worldLayer);
    this.player.body.setAllowGravity(false);
    this.aboveLayer.setDepth(10);



    this.tir = this.input.keyboard.addKey('NUMPAD_ZERO');
    this.tir_max = 0;

    this.spawnPoint_balle_1 = map.findObject("objects", obj => obj.name === "balle_1");
    this.balle_1 = this.physics.add.image(this.spawnPoint_balle_1.x , this.spawnPoint_balle_1.y, "balle").setScale(0.2);
    this.balle_1.body.setAllowGravity(false);

    this.spawnPoint_balle_2 = map.findObject("objects", obj => obj.name === "balle_2");
    this.balle_2 = this.physics.add.image(this.spawnPoint_balle_2.x , this.spawnPoint_balle_2.y, "balle").setScale(0.2);
    this.balle_2.body.setAllowGravity(false);

    this.spawnPoint_balle_3 = map.findObject("objects", obj => obj.name === "balle_3");
    this.balle_3 = this.physics.add.image(this.spawnPoint_balle_3.x , this.spawnPoint_balle_3.y, "balle").setScale(0.2);
    this.balle_3.body.setAllowGravity(false);

    this.spawnPoint_balle_4 = map.findObject("objects", obj => obj.name === "balle_4");
    this.balle_4 = this.physics.add.image(this.spawnPoint_balle_4.x , this.spawnPoint_balle_4.y, "balle").setScale(0.2);
    this.balle_4.body.setAllowGravity(false);




    this.spawnPoint_balle_6 = map.findObject("objects", obj => obj.name === "balle_6");
    this.balle_6 = this.physics.add.image(this.spawnPoint_balle_6.x , this.spawnPoint_balle_6.y, "balle").setScale(0.2);
    this.balle_6.body.setAllowGravity(false);





    this.physics.add.collider(this.player, this.balle_1, this.hitBalle, null , this);
    this.physics.add.collider(this.player, this.balle_2, this.hitBalle, null , this);
    this.physics.add.collider(this.player, this.balle_3, this.hitBalle, null , this);
    this.physics.add.collider(this.player, this.balle_4, this.hitBalle, null , this);
    this.physics.add.collider(this.player, this.balle_5, this.hitBalle, null , this);
    this.physics.add.collider(this.player, this.balle_6, this.hitBalle, null , this);






    this.ennemie_1 =  this.physics.add.sprite(1024, 1024, "left_ennemie");
    this.physics.add.collider(this.ennemie_1, this.worldLayer);
    this.physics.add.collider(this.ennemie_1, this.ennemie_2);
    this.physics.add.collider(this.ennemie_1, this.ennemie_3);
    this.physics.add.collider(this.ennemie_1, this.ennemie_4);
    this.physics.add.collider(this.ennemie_1, this.ennemie_5);
    this.physics.add.collider(this.ennemie_1, this.player, this.hitPlayer, null , this);
    this.ennemie_1.body.setAllowGravity(false);


    this.ennemie_2 =  this.physics.add.sprite(1036, 1036, "left_ennemie");
    this.physics.add.collider(this.ennemie_2, this.worldLayer);
    this.physics.add.collider(this.ennemie_2, this.ennemie_1);
    this.physics.add.collider(this.ennemie_2, this.ennemie_3);
    this.physics.add.collider(this.ennemie_2, this.ennemie_4);
    this.physics.add.collider(this.ennemie_2, this.ennemie_5);
    this.physics.add.collider(this.ennemie_2, this.player, this.hitPlayer, null , this);
    this.ennemie_2.body.setAllowGravity(false);

    this.ennemie_3 =  this.physics.add.sprite(1458, 3000, "left_ennemie");
    this.physics.add.collider(this.ennemie_3, this.worldLayer);
    this.physics.add.collider(this.ennemie_3, this.ennemie_1);
    this.physics.add.collider(this.ennemie_3, this.ennemie_2);
    this.physics.add.collider(this.ennemie_3, this.ennemie_4);
    this.physics.add.collider(this.ennemie_3, this.ennemie_5);
    this.physics.add.collider(this.ennemie_3, this.player, this.hitPlayer, null , this);
    this.ennemie_3.body.setAllowGravity(false);


    this.ennemie_4 =  this.physics.add.sprite(3000, 9111, "left_ennemie");
    this.physics.add.collider(this.ennemie_4, this.worldLayer);
    this.physics.add.collider(this.ennemie_4, this.ennemie_1);
    this.physics.add.collider(this.ennemie_4, this.ennemie_2);
    this.physics.add.collider(this.ennemie_4, this.ennemie_3);
    this.physics.add.collider(this.ennemie_4, this.ennemie_5);
    this.physics.add.collider(this.ennemie_4, this.player, this.hitPlayer, null , this);
    this.ennemie_4.body.setAllowGravity(false);

    this.ennemie_5 =  this.physics.add.sprite(15515, 545454, "left_ennemie");
    this.physics.add.collider(this.ennemie_5, this.worldLayer);
    this.physics.add.collider(this.ennemie_5, this.ennemie_1);
    this.physics.add.collider(this.ennemie_5, this.ennemie_2);
    this.physics.add.collider(this.ennemie_5, this.ennemie_3);
    this.physics.add.collider(this.ennemie_5, this.ennemie_4);
    this.physics.add.collider(this.ennemie_5, this.player, this.hitPlayer, null , this);
    this.ennemie_5.body.setAllowGravity(false);

    this.ennemie_1.setCollideWorldBounds(true);
    this.ennemie_2.setCollideWorldBounds(true);
    this.ennemie_3.setCollideWorldBounds(true);
    this.ennemie_4.setCollideWorldBounds(true);
    this.ennemie_5.setCollideWorldBounds(true);




    this.anims.create({
      key: 'droite',
      frames: this.anims.generateFrameNumbers('player_cote', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'haut',
      frames: this.anims.generateFrameNumbers('player_haut', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'bas',
      frames: this.anims.generateFrameNumbers('player_bas', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'pause',
      frames: this.anims.generateFrameNumbers('stop', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });


    this.anims.create({
      key: 'left_ennemie',
      frames: this.anims.generateFrameNumbers('left_ennemie', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.timedEvent = this.time.addEvent({ delay: 10000, callback: onEvent, callbackScope: this, repeat: -1 });
    function onEvent(){
      if (this.tir_max < 1) {
        this.tir_max +=1;
      }

    };

  }

  update(){
    if (this.cursors.left.isDown && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp) {
      this.player.setVelocityX(-200);
      this.player.anims.play('droite', true);

      this.player.setFlipX(false);

      if (this.tir_max > 0 && this.tir.isDown && this.save == 1) {
        this.cerise_ = this.cerise.create(this.player.x, this.player.y, "balle").setScale(0.2);
        this.cerise_.setVelocityX(-600);
        this.cerise_.body.setAllowGravity(false);
        this.physics.add.collider(this.cerise_, this.ennemie_1, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_2, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_3, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_4, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_5, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.worldLayer, this.HitMonde, null, this);
        this.tir_max -=1;
        this.save -=1;
      }
    }
    else if (this.cursors.right.isDown && this.cursors.left.isUp && this.cursors.up.isUp && this.cursors.down.isUp){
      this.player.setVelocityX(200);

      this.player.anims.play("droite", true);
      this.player.setFlipX(true);
      if (this.tir_max > 0 && this.tir.isDown && this.save == 1) {
        this.cerise_ = this.cerise.create(this.player.x, this.player.y, "balle").setScale(0.2);
        this.cerise_.setVelocityX(600);
        this.cerise_.body.setAllowGravity(false);
        this.physics.add.collider(this.cerise_, this.ennemie_1, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_2, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_3, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_4, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_5, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.worldLayer, this.HitMonde, null, this);
        this.tir_max -=1;
        this.save -=1;
      }
    }
    else {
      this.player.setVelocityX(0);
    }
    if(this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp) {

      this.player.anims.play("pause", true);
    }
    if (this.cursors.up.isDown && this.cursors.right.isUp && this.cursors.left.isUp && this.cursors.down.isUp) {
      this.player.setVelocityY(-200);

      this.player.anims.play("haut", true);

      if (this.tir_max > 0 && this.tir.isDown && this.save == 1) {
        this.cerise_ = this.cerise.create(this.player.x, this.player.y, "balle").setScale(0.2);
        this.cerise_.setVelocityY(-600);
        this.cerise_.body.setAllowGravity(false);
        this.physics.add.collider(this.cerise_, this.ennemie_1, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_2, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_3, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_4, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_5, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.worldLayer, this.HitMonde, null, this);
        this.tir_max -=1;
        this.save -=1;
      }

    }
    else if(this.cursors.down.isDown && this.cursors.right.isUp && this.cursors.left.isUp && this.cursors.up.isUp){
      this.player.setVelocityY(200);

      this.player.anims.play("bas", true);
      if (this.tir_max > 0 && this.tir.isDown && this.save == 1) {

        this.cerise_ = this.cerise.create(this.player.x, this.player.y, "balle").setScale(0.2);
        this.cerise_.setVelocityY(600);
        this.cerise_.body.setAllowGravity(false);
        this.physics.add.collider(this.cerise_, this.ennemie_1, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_2, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_3, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_4, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.ennemie_5, this.hitEnnemie, null , this);
        this.physics.add.collider(this.cerise_, this.worldLayer, this.HitMonde, null, this);
        this.tir_max -=1;
        this.save -=1;
      }

    }
    else {
      this.player.setVelocityY(0);
    }


    if (this.tir.isUp) {
      this.save = 1;
    }



    if (this.player.y > 100 && this.save_1 == 0) {
      this.text.setText(" De toute façon t'as pas le choix ! \n Vas à la boulangerie !\n Mais attention aux hommes Cerises !\n Ils sont assez bizarres je trouve...\n Bref au boulot !");
      this.save_1 +=1;
    }
    if (this.player.y > 200 &&this.save_2 == 0) {
      this.text.setText("D'ailleurs je te donne des cerises. \n Tu pourras te débarrasser d'eux\n si tu leur tir dessus avec!");
      this.save_2 +=1;
    }
    if (this.player.y > 400 && this.save_3 == 0) {
      this.text.setText("Appuis sur 0 pour tirer");
      this.text.setPosition(700, 10);
      this.save_3 +=1;

    }
    if (this.player.y > 500 && this.save_4 == 0) {
      this.text.setText("Cerise dans le chargeur : " + this.tir_max);
      this.text.setPosition(600, 10);
      this.save_4 +=1;
    }
    if (this.save_4 == 1) {
      this.text.setText("Cerise dans le chargeur : " + this.tir_max);
      this.text.setPosition(600, 10);
    }
    if (this.save_4 == 1 && this.player.x > 3023 && this.player.x < 3084 && this.player.y > 2777) {
      this.text.setText("Tu y es c'est juste devant !\n Vas y dirige toi vers la porte !");
      this.text.setPosition(550, 10);
    }



    if (this.ennemie_1.x > this.player.x+1024) {
      this.ennemie_1.x = this.player.x + 150;
      this.ennemie_1.y = this.player.y + 400;

    }
    else if(this.ennemie_1.x > this.player.x){
      this.ennemie_1.setVelocityX(-100);
      this.ennemie_1.anims.play("left_ennemie", true);
      this.ennemie_1.setFlipX(false);
    }
    else if (this.ennemie_1.x < this.player.x -1024) {
      this.ennemie_1.x = this.player.x + 150;
      this.ennemie_1.y = this.player.y + 400;

    }
    else if (this.ennemie_1.x < this.player.x) {
      this.ennemie_1.setVelocityX(100);
      this.ennemie_1.anims.play("left_ennemie", true);
      this.ennemie_1.setFlipX(true);
    }
    if (this.ennemie_1.y < this.player.y) {
      this.ennemie_1.setVelocityY(100);

    }
    else if (this.ennemie_1.y < this.player.y-100) {
      this.ennemie_1.setVelocityY(200);
    }
    else if (this.ennemie_1.y > this.player.y) {
      this.ennemie_1.setVelocityY(-100);
    }
    else if (this.ennemie_1.y > this.player.y+100) {
      this.ennemie_1.setVelocityY(-400);
    }



    if (this.ennemie_2.x > this.player.x+1024) {
      this.ennemie_2.x = this.player.x + 150;
      this.ennemie_2.y = this.player.y + 500;

    }
    else if(this.ennemie_2.x > this.player.x){
      this.ennemie_2.setVelocityX(-100);
      this.ennemie_2.anims.play("left_ennemie", true);
      this.ennemie_2.setFlipX(false);
    }
    else if (this.ennemie_2.x < this.player.x -1024) {
      this.ennemie_2.x = this.player.x + 150;
      this.ennemie_2.y = this.player.y + 500;

    }
    else if (this.ennemie_2.x < this.player.x) {
      this.ennemie_2.setVelocityX(100);
      this.ennemie_2.anims.play("left_ennemie", true);
      this.ennemie_2.setFlipX(true);
    }
    if (this.ennemie_2.y < this.player.y) {
      this.ennemie_2.setVelocityY(100);

    }
    else if (this.ennemie_2.y < this.player.y-100) {
      this.ennemie_2.setVelocityY(200);
    }
    else if (this.ennemie_2.y > this.player.y) {
      this.ennemie_2.setVelocityY(-100);
    }
    else if (this.ennemie_2.y > this.player.y+100) {
      this.ennemie_2.setVelocityY(-400);
    }













    if (this.ennemie_3.x > this.player.x+1024) {
      this.ennemie_3.x = this.player.x + 150;
      this.ennemie_3.y = this.player.y + 700;

    }
    else if(this.ennemie_3.x > this.player.x){
      this.ennemie_3.setVelocityX(-100);
      this.ennemie_3.anims.play("left_ennemie", true);
      this.ennemie_3.setFlipX(false);
    }
    else if (this.ennemie_3.x < this.player.x -1024) {
      this.ennemie_3.x = this.player.x + 150;
      this.ennemie_3.y = this.player.y + 700;

    }
    else if (this.ennemie_3.x < this.player.x) {
      this.ennemie_3.setVelocityX(100);
      this.ennemie_3.anims.play("left_ennemie", true);
      this.ennemie_3.setFlipX(true);
    }
    if (this.ennemie_3.y < this.player.y) {
      this.ennemie_3.setVelocityY(100);

    }
    else if (this.ennemie_3.y < this.player.y-100) {
      this.ennemie_3.setVelocityY(200);
    }
    else if (this.ennemie_3.y > this.player.y) {
      this.ennemie_3.setVelocityY(-100);
    }
    else if (this.ennemie_3.y > this.player.y+100) {
      this.ennemie_3.setVelocityY(-400);
    }








    if (this.ennemie_4.x > this.player.x+1024) {
      this.ennemie_4.x = this.player.x + 150;
      this.ennemie_4.y = this.player.y + 1000;

    }
    else if(this.ennemie_4.x > this.player.x){
      this.ennemie_4.setVelocityX(-100);
      this.ennemie_4.anims.play("left_ennemie", true);
      this.ennemie_4.setFlipX(false);
    }
    else if (this.ennemie_4.x < this.player.x -1024) {
      this.ennemie_4.x = this.player.x + 150;
      this.ennemie_4.y = this.player.y + 1000;

    }
    else if (this.ennemie_4.x < this.player.x) {
      this.ennemie_4.setVelocityX(100);
      this.ennemie_4.anims.play("left_ennemie", true);
      this.ennemie_4.setFlipX(true);
    }
    if (this.ennemie_4.y < this.player.y) {
      this.ennemie_4.setVelocityY(100);

    }
    else if (this.ennemie_4.y < this.player.y-100) {
      this.ennemie_4.setVelocityY(200);
    }
    else if (this.ennemie_4.y > this.player.y) {
      this.ennemie_4.setVelocityY(-100);
    }
    else if (this.ennemie_4.y > this.player.y+100) {
      this.ennemie_4.setVelocityY(-400);
    }




    if (this.ennemie_5.x > this.player.x+1024) {
      this.ennemie_5.x = this.player.x + 150;
      this.ennemie_5.y = this.player.y + 1400;

    }
    else if(this.ennemie_5.x > this.player.x){
      this.ennemie_5.setVelocityX(-100);
      this.ennemie_5.anims.play("left_ennemie", true);
      this.ennemie_5.setFlipX(false);
    }
    else if (this.ennemie_5.x < this.player.x -1024) {
      this.ennemie_5.x = this.player.x + 150;
      this.ennemie_5.y = this.player.y + 1400;

    }
    else if (this.ennemie_5.x < this.player.x) {
      this.ennemie_5.setVelocityX(100);
      this.ennemie_5.anims.play("left_ennemie", true);
      this.ennemie_5.setFlipX(true);
    }
    if (this.ennemie_5.y < this.player.y) {
      this.ennemie_5.setVelocityY(100);

    }
    else if (this.ennemie_5.y < this.player.y-100) {
      this.ennemie_5.setVelocityY(200);
    }
    else if (this.ennemie_5.y > this.player.y) {
      this.ennemie_5.setVelocityY(-100);
    }
    else if (this.ennemie_5.y > this.player.y+100) {
      this.ennemie_5.setVelocityY(-400);
    }

    if (this.ennemie_5.y > 3000 && this.ennemie_4.y > 3000 && this.ennemie_3.y > 3000 && this.ennemie_2.y > 3000 && this.ennemie_1.y > 3000) {
      this.ennemie_5.y = 2096;
      this.ennemie_1.y = 2096;
      this.ennemie_2.y = 2096;
      this.ennemie_3.y = 2096;
      this.ennemie_4.y = 2096;
    }

    if (this.player.x > 3023 && this.player.x < 3084) {
      if (this.player.y == 2777) {
        this.reussite_4 = 1;
        this.scene.start("title2", {reussite_1: this.reussite_1, reussite_2: this.reussite_2, reussite_3: this.reussite_3, reussite_4: this.reussite_4});
      }
    }



  }


  hitPlayer(ennemie, player){
    player.x = this.spawnPoint.x;
    player.y = this.spawnPoint.y;
  }
  hitBalle(player, balle){
    this.tir_max +=1;
    balle.disableBody(true ,true);
    console.log("touché");
  }

  hitEnnemie(balle, ennemie){
    ennemie.disableBody(true, true);
    balle.disableBody(true, true);
  }

  HitMonde(balle, monde){
    balle.disableBody(true, true);
  }

  }
