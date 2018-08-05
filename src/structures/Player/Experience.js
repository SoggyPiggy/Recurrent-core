const { Experience } = require('./../Experience');

class PlayerExperience extends Experience
{
	constructor(player, data = {})
	{
		super(data);
		this.player = player;
		this.random = this.player.random;
	}

	getLevel(xp)
	{
		return Math.floor(Math.pow(xp + 1, 2 / 5));
	}

	getXP(level)
	{
		return Math.ceil(Math.pow(level, 5 / 2) - 1);
	}

	bonusXP(xp)
	{
		return Math.round(xp * this.player.attributes.insight / 171);
	}

	gain(xp)
	{
		let data = super.gain(xp);
		this.player.emit('xp', data);
		if (data.preLevel < data.postLevel) this.player.emit('levelup', data);
		return data;
	}
}

module.exports = { PlayerExperience };