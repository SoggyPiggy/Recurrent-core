const { Experience } = require('./../Experience');

class MasteryExperience extends Experience
{
	constructor(game, data = {})
	{
		super(data);
		this.game = game;
	}

	get random() { return this.game.random; }

	getLevel(xp)
	{
		return Math.floor(Math.pow(xp + 1, 1 / 5));
	}

	getXP(level)
	{
		return Math.ceil(Math.pow(level, 5) - 1);
	}

	gain(xp)
	{
		let data = super.gain(xp);
		this.game.emit('xp', data);
		if (data.preLevel < data.postLevel) this.game.emit('levelup', data);
		return data;
	}
}

module.exports = { MasteryExperience };