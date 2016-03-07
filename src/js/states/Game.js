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

        this.scoreTable = {
            'papa00.png': 100,
            'papa01.png': -200,
            'zana00.png': 200,
            'zana01.png': -400,
            'pollo00.png': 500,
            'pollo01.png': -1000
        }

        this.score = 0;
        this.scoreTxt = this.game.add.bitmapText(10,10, 'gochi', 'Score: ' + this.score, 30);
        this.scoreTxt.kill();
        
        this.scorebar = this.game.add.graphics(0,0);
        this.scorebar.beginFill(0x22ff22);
        this.scorebar.drawRoundedRect(0.5*this.game.width, 40, 0.4*this.game.width,20,8);
        this.scorebar.endFill();
        this.scorebar.beginFill(0xff2222);
        this.scorebar.drawRoundedRect(0.5*this.game.width-0.4*this.game.width, 40, 0.4*this.game.width,20,8);
        this.scorebar.endFill();
        
        this.scoreNeedle = this.game.add.sprite(0.5*game.width, 50, 'olla');
        this.scoreNeedle.anchor.setTo(0.5,0.5);
        this.scoreNeedle.scale.setTo(0.25,0.25);


        this.txtYouLose = this.game.add.bitmapText(0.5*this.game.width, 0.5*this.game.height, 'gochi', 'YOU LOSE!', 100);
        this.txtYouLose.anchor.setTo(0.5,0.5);
        this.txtYouLose.kill();

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

        this.ollapos = this.cachito.olla.world;
    },

    update: function () {
        this.cachito.update();
        this.comida.emitter.forEachAlive(this.collide, this);
        if(!this.txtYouLose.alive && this.score <= -25000) {
            this.txtYouLose.revive();
        }
        if(!this.txtYouLose.alive && this.score >= 25000) {
            this.txtYouLose.revive();
            this.txtYouLose.setText('YOU WIN!');
        }
    },

    collide: function (sprite) {
        if(Math.abs(this.ollapos.x - sprite.x) < 50 && Math.abs(this.ollapos.y -60 - sprite.y) < 20 ) {
            this.makeSplash(this.cachito.olla, 0,-80);
            this.makeScoreIndicator(this.scoreTable[sprite.frameName], sprite.x, sprite.y);
            sprite.kill();
            this.score+= this.scoreTable[sprite.frameName];
            this.scoreTxt.setText('Score: ' + this.score);
        }
    },

    makeSplash: function(parent, x,y) {
            var _sprite = new Phaser.Sprite(game, 0,0,'splash');
            _sprite.anchor.setTo(0.5,0.5);
            _sprite.animations.add('splash', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], 24);
            parent.addChild(_sprite);
            _sprite.x = x;
            _sprite.y = y;
            _sprite.animations.play('splash').onComplete.addOnce(function() {
                this.destroy();
            }, _sprite);
    },

    makeScoreIndicator: function(score,x,y) {
            var text = this.game.add.bitmapText(x,y+40, 'gochi','' + score, 35+Math.abs(0.03*score));
            if (score > 0) {
                text.tint = 0x22ff22;
            } else {
                text.tint = 0xcc8888;
            }
            var removeText = this.game.time.create();
            removeText.add(500,text.destroy,text);
            removeText.start();
            this.scoreNeedle.x +=0.02*score;
    },

    shutdown: function () {
    }
};

