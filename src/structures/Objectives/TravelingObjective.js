const { Objective } = require('../Objective');

class TravelingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'travel';
	}

	advance()
	{
		let progress = super.advance();
		if (this.player.status.fatigued) progress *= 0.6;
		return progress;
	}

	playerStatusAdjust()
	{
		this.player.status.loseStamina(5);
	}
}

module.exports = { TravelingObjective };
