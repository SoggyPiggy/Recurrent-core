const { Objective } = require('../Objective');

class RestingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'rest';
	}

	generateEnd()
	{
		return this.random.integer(5, 10);
	}

	// eslint-disable-next-line class-methods-use-this
	advance()
	{
		return 1;
	}

	playerStatusAdjust()
	{
		let health = this.player.status.maxHealth;
		let stamina = this.player.status.maxStamina;
		if (this.player.status.healthy)
		{
			health *= 0.01;
			stamina *= 0.05;
		}
		else
		{
			health *= 0.05;
			stamina *= 0.01;
		}
		this.player.status.gainHealth(health);
		this.player.status.gainStamina(stamina);
	}
}

module.exports = { RestingObjective };
