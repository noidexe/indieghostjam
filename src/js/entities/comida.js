var IGJ = IGJ || {};

IGJ.Comida = function(game) {
	var setup = {
		x: 200,
		y: 200,
	};
	
	this.emitter = game.add.emitter(game, 200, 200);
    this.emitter.emitX = game.width-50;
    this.emitter.emitY = 300;
    this.emitter.makeParticles('comida', [0,1,2,3,4,5,6,7], 200, false, false);
    //emitter.scale.setTo(0.75,0.75);
    this.emitter.minParticleSpeed.setTo(-50, -500);
    this.emitter.maxParticleSpeed.setTo(-450, -800);
    this.emitter.gravity = 500;
    this.emitter.particleAnchor.setTo(0.5,0.5);
    //emitter.bounce.setTo(0.5, 0.5);
    this.emitter.angularDrag = -30;
    this.emitter.setSize(10,10);

    this.start = function() {
        this.emitter.start(false, 5000, 200);
    };
}