const { Objective } = require('../Objective');

class _Objective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'interact';
	}

	generateRewards()
	{
		const xp = this.generateXPReward();
		return { xp };
	}

	advance()
	{
		let progress = super.advance();
		progress *= (1 + this.player.charmMod);
		if (this.player.status.fatigued) progress *= 0.9;
		return progress;
	}
}

module.exports = { _Objective };
