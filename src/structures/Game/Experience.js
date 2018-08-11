const { Experience } = require('./../Experience');

class MasteryExperience extends Experience
{
	constructor(game, data = {})
	{
		super(data);
		this.game = game;
	}

	get random()
	{
		return this.game.random;
	}

	getLevel(xp)
	{
		return Math.floor((xp + 1) ** (1 / 6));
	}

	getXPTotal(level)
	{
		return Math.ceil((level ** 6) - 1);
	}

	gain(xp)
	{
		const data = super.gain(xp);
		this.game.emit('xp', data);
		if (data.preLevel < data.postLevel) this.game.emit('levelup', data);
		return data;
	}
}

module.exports = { MasteryExperience };
