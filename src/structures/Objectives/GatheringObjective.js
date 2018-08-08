const { Objective } = require('../Objective');

class GatheringObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'gathering';
	}

	advance()
	{
		if (this.player.status.fatigued)
		{
			if (this.random.bool(.6)) return 0;
		}
		let progress = super.advance();

	}
}

module.exports = { GatheringObjective };