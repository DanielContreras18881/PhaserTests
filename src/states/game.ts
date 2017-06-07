module MyGame {

	export class GameState extends Phaser.State {

		preload() {
		    this.game.load.image('sky', 'assets/sky.png');
		    this.game.load.image('ground', 'assets/platform.png');
		    this.game.load.image('star', 'assets/star.png');
		    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		}

		create() {
			let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
			logo.anchor.setTo(0.5, 0.5);
			this.game.add.sprite(0, 0, 'star');
		}

	}

}