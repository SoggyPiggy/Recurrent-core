class PlayerEquipment
{
	constructor(player, data = {})
	{
		this.player = player;
		this.random = this.player.random;
	}
}

module.exports = { PlayerEquipment }