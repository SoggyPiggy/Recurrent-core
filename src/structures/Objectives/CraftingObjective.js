const { Objective } = require('../Objective');

class CraftingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'craft';
	}

	generateRewards()
	{
		const xp = this.generateXPReward();
		return { xp };
	}

	advance()
	{
		let progress = super.advance();
		progress *= (1 + this.player.ingenuityMod);
		if (this.player.status.fatigued) progress *= 0.8;
		return progress;
	}
}

module.exports = { CraftingObjective };
