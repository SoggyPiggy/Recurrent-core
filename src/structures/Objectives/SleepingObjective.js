const { Objective } = require('../Objective');

class SleepingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'sleep';
	}

	generateEnd()
	{
		return this.random.integer(7, 10);
	}

	// eslint-disable-next-line class-methods-use-this
	advance()
	{
		return 1;
	}

	playerStatusAdjust()
	{
		if (this.complete)
		{
			this.player.status.gainHealth();
			this.player.status.gainStamina();
		}
	}
}

module.exports = { SleepingObjective };
