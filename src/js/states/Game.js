var IGG = IGG || {};

IGG.Game = function () {
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

IGG.Game.prototype = {

    preload: function () {
    },

    create: function () {
        this.game.input.gamepad.start();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.physics.setBoundsToWorld();
    },

    update: function () {
    },

    shutdown: function () {
    }
};

