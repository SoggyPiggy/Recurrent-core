const { PlayerManager } = require("./../managers/PlayerManager");

class Game
{
	constructor()
	{
		this.players = new PlayerManager()
	}
}

module.exports = { Game }