const { Objective } = require('../Objective');

class FightingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
	}

	advance()
	{
		let progress = super.advance();
		let buff = progress * this.player.mightMod;
		return Math.round(progress + buff);
	}
}

module.exports = { FightingObjective };