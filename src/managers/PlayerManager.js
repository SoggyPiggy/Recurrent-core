const { Player } = require('./../structures/Player');

class PlayerManager extends Array
{
	constructor(data)
	{
		if (!Array.isArray(data)) data = [];
		for (let i = 0; i < data.length; i++)
		{
			data[i] = new Player(data[i]);
		}
		if (!data.length) data.unshift(new Player());
		super(...data);
	}

	get player() {return this[0];}

	newPlayer(data)
	{
		this.player.deactivate();
		this.unshift(new Player(data));
		return this;
	}
}

module.exports = { PlayerManager }