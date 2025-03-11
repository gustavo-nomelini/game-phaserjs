import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Add background
        this.add.image(400, 300, 'sky');

        // Add platforms
        const platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // Add player
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Add collision
        this.physics.add.collider(this.player, platforms);

        // Set up controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Handle movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
        // In your update method or where player movement is handled
        if (this.player.body.velocity.x < 0) {
            this.player.setFlipX(true); // Face left
        } else if (this.player.body.velocity.x > 0) {
            this.player.setFlipX(false); // Face right
        }
    }
}

export default GameScene;