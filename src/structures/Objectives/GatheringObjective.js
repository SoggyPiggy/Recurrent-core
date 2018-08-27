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
		if (this.player.status.fatigued) progress *= 0.2;
		return progress;
	}
}

module.exports = { GatheringObjective };
