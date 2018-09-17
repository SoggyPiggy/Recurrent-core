const { Objective } = require('../Objective');

class ScavengingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'scavenge';
	}

	generateRewards()
	{
		const xp = this.generateXPReward();
		return { xp };
	}

	advance()
	{
		let progress = super.advance();
		progress *= (1 + (this.player.ingenuityMod + this.player.awarenessMod) / 2);
		if (this.player.status.fatigued) progress *= 0.8;
		return progress;
	}
}

module.exports = { ScavengingObjective };
