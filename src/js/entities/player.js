var IGJ = IGJ || {};

IGJ.Player = function(game) {
	var setup = {
		x: 400,
		y: 650,
		offsetOlla: -135,
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
        if(_olla.y > -130 || _olla.y < -140) {
            _dirOlla = _dirOlla * -1;
        }
    };

    var _resetOlla = function() {
        _olla.y = setup.offsetOlla;
    };

	var player = {
        get sprite () {
        	return _sprite;
        },
        get x () {
        	return _group.x;
        },
        set x (x) { 
        	return _group.x = x;
        },
        get y () {
        	return _group.y;
        },
        set y (y) {
        	return _group.y = y;
        },
        add: function() {
        	game.add.existing(_group);
        	_group.add(_olla);
        	_group.add(_sprite);
        },
        anims: _sprite.animations,
        collides: function(sprite) {
            return Math.abs(_olla.world.x - sprite.x) < 70 && Math.abs(_olla.world.y -40 - sprite.y) < 20;
        },
        update: function() {
            _move();
            _animate();
        }
	};

	return player
}