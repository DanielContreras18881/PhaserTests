module MyGame {

	let platforms:any;
	let ground:any;
	let ledge:any;
	let player:any;
	let hitPlatform:any;
	let cursors:any;
	let stars:any;
	let score:any;
	let scoreText:any;

	export class GameState extends Phaser.State {

		preload() {
		    this.game.load.image('sky', 'assets/sky.png');
		    this.game.load.image('ground', 'assets/platform.png');
		    this.game.load.image('star', 'assets/star.png');
		    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		}

		update() {
		
		    //  Collide the player and the stars with the platforms
		    hitPlatform = this.game.physics.arcade.collide(player, platforms);

		    //  Reset the players velocity (movement)
		    player.body.velocity.x = 0;
		
		    if (cursors.left.isDown)
		    {
		        //  Move to the left
		        player.body.velocity.x = -150;
		
		        player.animations.play('left');
		    }
		    else if (cursors.right.isDown)
		    {
		        //  Move to the right
		        player.body.velocity.x = 150;
		
		        player.animations.play('right');
		    }
		    else
		    {
		        //  Stand still
		        player.animations.stop();
		
		        player.frame = 4;
		    }
		
		    //  Allow the player to jump if they are touching the ground.
		    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
		    {
		        player.body.velocity.y = -350;
		    }			

			this.game.physics.arcade.collide(stars, platforms);

			this.game.physics.arcade.overlap(player, stars, 
					(player, star) => {
						// Removes the star from the screen
						star.kill();
						//  Add and update the score
						score += 10;
						scoreText.text = 'Score: ' + score;
					}, null, this);
		
		}
		create() {
		    //  We're going to be using physics, so enable the Arcade Physics system
		    this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		    //  A simple background for our game
		    this.game.add.sprite(0, 0, 'sky');
		
		    //  The platforms group contains the ground and the 2 ledges we can jump on
		    platforms = this.game.add.group();
		
		    //  We will enable physics for any object that is created in this group
		    platforms.enableBody = true;
		
		    // Here we create the ground.
		    ground = platforms.create(0, this.game.world.height - 64, 'ground');
		
		    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
		    ground.scale.setTo(2, 2);
		
		    //  This stops it from falling away when you jump on it
		    ground.body.immovable = true;
		
		    //  Now let's create two ledges
		    ledge = platforms.create(400, 400, 'ground');
		
		    ledge.body.immovable = true;
		
		    ledge = platforms.create(-150, 250, 'ground');
		
		    ledge.body.immovable = true;

		    // The player and its settings
		    player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
		
		    //  We need to enable physics on the player
		    this.game.physics.arcade.enable(player);
		
		    //  Player physics properties. Give the little guy a slight bounce.
		    player.body.bounce.y = 0.2;
		    player.body.gravity.y = 300;
		    player.body.collideWorldBounds = true;
		
		    //  Our two animations, walking left and right.
		    player.animations.add('left', [0, 1, 2, 3], 10, true);
		    player.animations.add('right', [5, 6, 7, 8], 10, true);			

			cursors = this.game.input.keyboard.createCursorKeys();

		    stars = this.game.add.group();
		
		    stars.enableBody = true;
		
		    //  Here we'll create 12 of them evenly spaced apart
		    for (var i = 0; i < 12; i++)
		    {
		        //  Create a star inside of the 'stars' group
		        var star = stars.create(i * 70, 0, 'star');
		
		        //  Let gravity do its thing
		        star.body.gravity.y = 6;
		
		        //  This just gives each star a slightly random bounce value
		    	star.body.bounce.y = 0.7 + Math.random() * 0.2;
			}
			
			scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
			score = 0;
		}

	}

}