class PlayerEquipment
{
	constructor(player, data = {}) // eslint-disable-line
	{
		this.player = player;
	}

	get random()
	{
		return this.player.random;
	}

	compress()
	{
		const data = {};
		return data;
	}
}

module.exports = { PlayerEquipment };
