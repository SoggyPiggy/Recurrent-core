const { Objective } = require('../Objective');

class FightingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'fight';
	}

	advance()
	{
		let progress = super.advance();
		progress *= (1 + this.player.mightMod);
		if (this.player.status.fatigued) progress *= 0.6;
		return progress;
	}
}

module.exports = { FightingObjective };