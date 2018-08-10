const { Experience } = require('./../Experience');

class PlayerExperience extends Experience
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

	getLevel(xp)
	{
		return Math.floor((xp + 1) ** (2 / 5));
	}

	getXP(level)
	{
		return Math.ceil((level ** (5 / 2)) - 1);
	}

	bonusXP(xp)
	{
		return Math.round(xp * this.player.insightMod);
	}

	gain(xp)
	{
		const data = super.gain(xp);
		this.player.emit('xp', data);
		if (data.preLevel < data.postLevel) this.player.emit('levelup', data);
		return data;
	}
}

module.exports = { PlayerExperience };
