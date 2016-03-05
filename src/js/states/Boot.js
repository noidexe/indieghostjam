var IGJ = IGJ || {};

IGJ.Boot = function () {
};

IGJ.Boot.prototype = {
    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBar', 'assets/img/preload-bar.png');

    },

    create: function () {
        this.game.input.gamepad.start();

        this.game.state.add('Preloader', IGG.Preloader);
        this.game.state.add('Game', IGG.Game);

        this.game.scale.scaleMode = Phaser.ScaleManager.NOSCALE;
        this.game.scale.minWidth = 320;
        this.game.scale.minHeight = 180;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = false;
        this.game.state.start('Preloader');
    },
};
