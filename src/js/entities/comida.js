var IGJ = IGJ || {};

IGJ.Comida = function(game) {
	var setup = {
		x: 200,
		y: 200,
	};
	
	var emitter = game.add.emitter(game, 200, 200);
    emitter.emitX = game.width-50;
    emitter.emitY = 300;
    emitter.makeParticles('comida', [0,1,2,3,4,5,6,7], 200, false, false);
    //emitter.scale.setTo(0.75,0.75);
    emitter.minParticleSpeed.setTo(-50, -500);
    emitter.maxParticleSpeed.setTo(-450, -800);
    emitter.gravity = 500;
    emitter.particleAnchor.setTo(0.5,0.5);
    //emitter.bounce.setTo(0.5, 0.5);
    emitter.angularDrag = -30;
    emitter.setSize(10,10);

	var comida = {
        get emitter () {
            return emitter;
        },
        get x () {
        	return emitter.x;
        },
        set x (x) { 
        	return emitter.x = x;
        },
        get y () {
        	return emitter.y;
        },
        set y (y) {
        	return emitter.y = y;
        },
        add: function() {
        },
        start: function() {
            emitter.start(false, 5000, 200);
        },
        update: function() {
        }
	};

	return comida;
}