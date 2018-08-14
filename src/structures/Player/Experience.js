const { Experience } = require('./../Experience');

class PlayerExperience extends Experience
{
	constructor(player, data = {})
	{
		super(data);
		this.player = player;
	}

	// eslint-disable-next-line class-methods-use-this
	getLevel(xp)
	{
		return Math.floor((xp + 1) ** (20 / 71));
	}

	// eslint-disable-next-line class-methods-use-this
	getXPTotal(level)
	{
		return Math.ceil((level ** (71 / 20)) - 1);
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
