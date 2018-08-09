const { Coordinates } = require('../Coordinates');

class PlayerCoordinates extends Coordinates
{
	constructor(player, data = {})
	{
		super(data);
		this.player = player;
	}

	get random()
	{
		return this.player.random;
	}
}

module.exports = { PlayerCoordinates };
