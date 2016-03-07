var IGJ = IGJ || {};

IGJ.Player = function(game) {
	var setup = {
		x: 400,
		y: 650,
		offsetOlla: -115,
        speed: 10
	};
	
	var _group = new Phaser.Group(game, undefined, 'playerGroup');
	_group.x = setup.x;
	_group.y = setup.y;
    //_group.scale.setTo(0.75,0.75);

	var _sprite = new Phaser.Sprite(game, 0,0, 'cachito', 0);
	_sprite.anchor.setTo(0.5,0.5);

	var _olla = new Phaser.Sprite(game, 0,setup.offsetOlla , 'olla', 0);
	_olla.anchor.setTo(0.5,0.5);
    var _dirOlla = 2;

	_sprite.animations.add('idle',[0,1,2,3,4,5],8,true);
	_sprite.animations.add('run',[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],24,true);

    var _makeSplash = function(parent, x,y) {
        var _sprite = new Phaser.Sprite(game, 0,0,'splash');
        _sprite.anchor.setTo(0.5,0.5);
        _sprite.animations.add('splash', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], 24);
        parent.addChild(_sprite);
        _sprite.x = x;
        _sprite.y = y;
        _sprite.animations.play('splash').onComplete.addOnce(function() {
            this.destroy();
        }, _sprite);
    };

    var _move = function () {
        _group.x += setup.speed * IGJ.Input.state;
    };

    var _animate = function() {
        if (IGJ.Input.state === 1) {
            _group.scale.x = 1;
            _sprite.animations.play('run');
            _animateOlla();
        }
        else if (IGJ.Input.state === -1) {
            _group.scale.x = -1;
            _sprite.animations.play('run');
            _animateOlla();
        }
        else {
            _resetOlla();
            _sprite.animations.play('idle');
        }
    };
        
    var _animateOlla = function() {
        _olla.y += _dirOlla;
        if(_olla.y > -100 || _olla.y < -120) {
            _dirOlla = _dirOlla * -1;
        }
    };

    var _resetOlla = function() {
        _olla.y = setup.offsetOlla;
    };

    this.sprite = _sprite;
    Object.defineProperty(this, 'x', {
        get: function() {return _group.x },
        set: function(x) {_group.x = x}
    });
    Object.defineProperty(this, 'y', {
        get: function() {return _group.y },
        set: function(y) {_group.y = y}
    });
    
    this.add = function() {
    	game.add.existing(_group);
    	_group.add(_olla);
    	_group.add(_sprite);
    };

    this.anims = _sprite.animations;

    this.collides = function(sprite) {
        if ( Math.abs(_olla.world.x - sprite.x) < 50 && Math.abs(_olla.world.y -60 - sprite.y) < 20 ) {
            _makeSplash(_olla, 0,-80);
            return true;
        }
        return false;
    };

    this.update = function() {
        _move();
        _animate();
    };

}