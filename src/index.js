const { Game } = require('./structures/Game');
const { Player } = require('./structures/Player');
const game = new Game();
module.exports = { game, Game, Player };