if (typeof require !== 'undefined') {
    var gui = require('nw.gui');        
}
var game;

function initPhaser(renderer) {
    game = new Phaser.Game(960,540, renderer || Phaser.AUTO, window);
    game.state.add('Boot', IGJ.Boot);
    //  Now start the Boot state.
    game.state.start('Boot');
}

initPhaser(Phaser.AUTO);
//}());
