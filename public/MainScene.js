export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        
    }

    create() {
        this.player = new Phaser.Physics.Matter.Sprite(this.matter.world);
        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
    }

    update() {

        // handle player movement speed
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();

        // handle left/right movement
        if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
        }
        else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        }

        // handle up/down movement
        if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        }
        else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }

        // create player movement
        playerVelocity.normalize(); // make diagonal movements same velocity as up/down/left/right
        playerVelocity.scale(speed);
        this.player.setVelocity(playerVelocity.x, playerVelocity.y);

    }
}