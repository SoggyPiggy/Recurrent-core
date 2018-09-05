const { Objective } = require('../Objective');

class SearchingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'search';
	}

	advance()
	{
		let progress = super.advance();
		progress *= (1 + this.player.awarenessMod);
		if (this.player.status.fatigued) progress *= 0.8;
		return progress;
	}

	generateRewards()
	{
		const xp = this.generateXPReward();
		return { xp };
	}
}

module.exports = { SearchingObjective };
