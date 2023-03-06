const config = {
    type: Phaser.AUTO,
    width: 512,
    height: 512,
    backgroundColor: "#333",
    parent: "game-container",
    scene: [],
    scale: {
        zoom: 2,
    },
    physics: {
        default: "matter",
        matter: {
            debug: true,
            gravity: { y: 0 },
        }
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin.default,
                key: 'matterCollision',
                mapping: 'matterCollision',
            }
        ]
    }
}

new Phaser.Game(config);