class PlayerEquipment
{
	constructor(player, data = {})
	{
		this.player = player;
	}

	get random() { return this.player.random; }
}

module.exports = { PlayerEquipment }