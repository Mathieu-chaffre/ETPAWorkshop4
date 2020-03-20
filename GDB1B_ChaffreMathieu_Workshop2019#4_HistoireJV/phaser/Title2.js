class Title2 extends Phaser.Scene {
  constructor() {
    super("title2");
  }
  init(data){
    this.reussite_1 = data.reussite_1;
    this.reussite_2 = data.reussite_2;
    this.reussite_3 = data.reussite_3;
    this.reussite_4 = data.reussite_4;

  }
  preload(){
    this.load.image("titre", "assets/titre.png");

  }
  create(){
    this.title = this.add.image(512, 384, "titre");
    this.text_1 = this.add.text(280, 225, "Cerise for two \n 1958", {fontSize: '20px', fill:'red', align:'center'} );
    this.text_1.setInteractive();
    this.text_1.on('pointerup', this.switchscene_1, this);

    this.text_2 = this.add.text(575, 225, "Bisc-out \n 1978", {fontSize: '20px', fill:'red', align:'center'} );
    this.text_2.setInteractive();
    this.text_2.on('pointerup', this.switchscene_2, this);

    this.text_3 = this.add.text(280, 425, "Glacerio bros \n 1985", {fontSize: '20px', fill:'red', align:'center'} );
    this.text_3.setInteractive();
    this.text_3.on('pointerup', this.switchscene_3, this);

    this.text_4 = this.add.text(475, 425, "The legend of bread \n 1986", {fontSize: '20px', fill:'red', align:'center'} );
    this.text_4.setInteractive();
    this.text_4.on('pointerup', this.switchscene_4, this);
  }

  update(){

    if (this.reussite_1 == 1) {
      this.text_1.setColor("green");
      
    }
    if (this.reussite_2 == 1) {
      this.text_2.setColor("green");
      
    }
    if (this.reussite_3 == 1) {
      this.text_3.setColor("green");
      
    }
    if (this.reussite_4 == 1) {
      this.text_4.setColor("green");
      
    }
    if (this.reussite_1 == 1 && this.reussite_2 == 1 && this.reussite_3 == 1 && this.reussite_4 == 1) {
      this.scene.start("title3");
    }
  }

  switchscene_1(pointer){
    this.scene.start("premiere_scene", {reussite_1: this.reussite_1, reussite_2: this.reussite_2, reussite_3: this.reussite_3, reussite_4: this.reussite_4});
  }
  switchscene_2(pointer){
    this.scene.start("deuxieme_scene", {reussite_1: this.reussite_1, reussite_2: this.reussite_2, reussite_3: this.reussite_3, reussite_4: this.reussite_4});
  }
  switchscene_3(pointer){
    this.scene.start("troisième_scene", {reussite_1: this.reussite_1, reussite_2: this.reussite_2, reussite_3: this.reussite_3, reussite_4: this.reussite_4});
  }
  switchscene_4(pointer){
    this.scene.start("quatrieme_scene", {reussite_1: this.reussite_1, reussite_2: this.reussite_2, reussite_3: this.reussite_3, reussite_4: this.reussite_4});
  }
}
