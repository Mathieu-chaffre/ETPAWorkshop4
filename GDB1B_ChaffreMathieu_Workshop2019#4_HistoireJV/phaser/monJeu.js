var config = {
  width: 1024,
  height: 768,
  parent: "game-container",
  physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Titre, Scene1, Scene2, Scene3, Scene4, Title2, Title3]
  }

var game = new Phaser.Game(config);
