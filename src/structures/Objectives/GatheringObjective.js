const { Objective } = require('../Objective');

class GatheringObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'gather';
	}

	advance()
	{
		let progress = super.advance();
		progress *= (1 + this.player.perceptionMod);
		if (this.player.status.fatigued) progress *= 0.2;
		return progress;
	}
}

module.exports = { GatheringObjective };
