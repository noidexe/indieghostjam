var IGJ = IGJ || {};

IGJ.Preloader = function (game) {
    this.game = game;
    this.ready = false;
};

IGJ.Preloader.prototype = {

    preload: function () {
        this.preloadBar = this.add.sprite(0,0, 'preloaderBar');
        this.preloadBar.x = 0.5*this.game.width-0.5*this.preloadBar.width;
        this.preloadBar.y = 0.5*this.game.height+46;
        this.loadText = this.game.add.text(
            0.5*this.game.width,
            0.8*this.game.height,
             'Loading assets...',
              {font:'20px Arial', fill:'#ffff00', align: 'center'}
        );
        this.loadText.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //this.game.load.atlas('cachito','assets/img/anim.png','assets/img/anim.json');
        this.game.load.pack('game', 'assets/pack.json', null, this);
    },

    create: function () {
        this.preloadBar.cropEnabled = false;
    },

    update: function () {
        /*
        this.ready = false;
        if (!this.game.load.isLoading) {
            this.loadText.setText('Decoding audio..' + Phaser.Utils.randomChoice(' o ','(  )'));
        }

        if (this.cache.isSoundDecoded('titleMusic') && this.ready === false)
        {
            this.ready = true;
            this.game.state.start('MainMenu');
        }
        */
        this.game.state.start('Game');
    }

};
