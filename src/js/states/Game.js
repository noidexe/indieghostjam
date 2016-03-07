var IGJ = IGJ || {};

IGJ.Game = function (game) {
    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
/*
    this.game;      //  a reference to the currently running game
    this.add;       //  used to add sprites, text, groups, etc
    this.camera;    //  a reference to the game camera
    this.cache;     //  the game cache
    this.input;     //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;      //  for preloading assets
    this.math;      //  lots of useful common math operations
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc
    this.stage;     //  the game stage
    this.time;      //  the clock
    this.tweens;    //  the tween manager
    this.state;     //  the state manager
    this.world;     //  the game world
    this.particles; //  the particle manager
    this.physics;   //  the physics manager
    this.rnd;       //  the repeatable random number generator*/
};

IGJ.Game.prototype = {

    preload: function () {
    },

    create: function () {

        this.good = [1,3,5];

        this.score = 0;
        this.scoreTxt = this.game.add.bitmapText(10,10, 'gochi', 'Score: ' + this.score, 30);

        this.game.input.gamepad.start();
        IGJ.Input.init(game);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.physics.setBoundsToWorld();

        this.cachito = new IGJ.Player(game);
        this.cachito.add();
        this.cachito.sprite.animations.play('idle');
        this.game.stage.backgroundColor = "#aaaaff";

        this.comida = new IGJ.Comida(game);
        this.comida.start();
    },

    update: function () {
        this.cachito.update();
        this.comida.emitter.forEachAlive(this.collide, this);
    },

    collide: function (sprite) {
        if(this.cachito.collides(sprite)) {
            sprite.kill();
            if(this.good.indexOf(sprite.frame) === -1 ) {
                this.score+=100;
            } 
            else {
                this.score-=200;
            }
            this.scoreTxt.setText('Score: ' + this.score);
        }
    },

    shutdown: function () {
    }
};

