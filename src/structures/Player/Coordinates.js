const { Coordinates } = require('../Coordinates');

class PlayerCoordinates extends Coordinates
{
	constructor(player, data = {})
	{
		super(data);
		this.player = player;
	}
}

module.exports = { PlayerCoordinates };
