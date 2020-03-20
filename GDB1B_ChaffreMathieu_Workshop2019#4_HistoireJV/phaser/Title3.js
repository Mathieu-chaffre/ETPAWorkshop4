class Title3 extends Phaser.Scene {
  constructor() {
    super("title3");
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
    this.text_1 = this.add.text(335, 250, "Cupcake History", {fontSize: '30px', fill:'white', align:'center'});
    this.text_3 = this.add.text(255, 350, "refs : Zelda, Mario bros, Breakout, Tennis for Two", {fontSize: '15px', fill:'white', align:'center'});
    this.text_2 = this.add.text (475, 495, "Merci d'avoir joué", {fontSize: '20px', fill:'white', align:'center'});
    this.timedEvent_2 = this.time.addEvent({ delay: 1000, callback: onEvent_2, callbackScope: this, repeat: -1 });
    function onEvent_2(){
      this.text_2.setColor("black");
    };

    this.timedEvent_1 = this.time.addEvent({ delay: 1500, callback: onEvent_1, callbackScope: this, repeat: -1 });
    function onEvent_1(){
      this.text_2.setColor("white");
    };


  }

  update(){
  }
}
