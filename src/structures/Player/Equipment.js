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
}

module.exports = { PlayerEquipment };
