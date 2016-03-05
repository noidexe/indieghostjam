var IGJ = IGJ || {};

IGJ.Input = (function() {
    var input = {
        states: {
            left: -1,
            right: 1,
            idle: 0
        },
        get state () {
            if(input.cursors.left.isDown) {
                return input.states.left;
            }
            else if(input.cursors.right.isDown) {
                return input.states.right;
            }
            else {
                return input.states.idle;
            }
        },
        init : function(game) {
            input.cursors = {
                left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
                right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            }
        }
    };

	return input;
})();