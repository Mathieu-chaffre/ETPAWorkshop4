class Titre extends Phaser.Scene  {
  constructor() {
    super("Title")
  }


  init(){

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
      this.text_1.setcolor("green");
    }
    if (this.reussite_2 == 1) {
      this.text_2.setcolor("green");
    }
    if (this.reussite_3 == 1) {
      this.text_3.setcolor("green");
    }
    if (this.reussite_4 == 1) {
      this.text_4.setcolor("green");
    }
  }

  switchscene_1(pointer){
    this.scene.start("premiere_scene");
  }
  switchscene_2(pointer){
    this.scene.start("deuxieme_scene");
  }
  switchscene_3(pointer){
    this.scene.start("troisième_scene");
  }
  switchscene_4(pointer){
    this.scene.start("quatrieme_scene");
  }
}
