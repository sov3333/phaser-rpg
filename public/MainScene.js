export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.atlas('female', 'assets/images/female.png', 'assets/images/female_atlas.json');
        this.load.animation('female_anim', 'assets/images/female_anim.json');
        this.load.image('tiles', 'assets/images/RPG Nature Tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/images/map.json');
    }

    create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0);
        const layer1 = map.createLayer('Tile Layer 1', tileset, 0, 0);
        layer1.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer1);

        this.player = new Phaser.Physics.Matter.Sprite(this.matter.world, 100, 100, 'female', 'townsfolk_f_idle_1');
        this.add.existing(this.player);

        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
    }

    update() {

        this.player.anims.play('female_idle', true);

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