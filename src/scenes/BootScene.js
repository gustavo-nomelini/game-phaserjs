import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load any assets needed for the loading screen
        this.load.image('loading-background', 'assets/loading-background.png');
    }

    create() {
        // Go to the next scene
        this.scene.start('PreloadScene');
    }
}

export default BootScene;