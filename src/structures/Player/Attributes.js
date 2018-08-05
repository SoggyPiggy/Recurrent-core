const { Attributes } = require('./../Attributes');

class PlayerAttributes extends Attributes
{
	constructor(player, data = {})
	{
		super(data);
		this.player = player;
	}

	get random() { return this.player.random; }
}

module.exports = { PlayerAttributes };