const { Attributes } = require('./../Attributes');

class PlayerAttributes extends Attributes
{
	constructor(player, data = {})
	{
		super(data);
		this.player = player;
	}
}

module.exports = { PlayerAttributes };
