const { Objective } = require('../Objective');

class FightingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'fight';
	}

	generateRewards()
	{
		const xp = this.generateXPReward();
		return { xp };
	}

	advance()
	{
		let progress = super.advance();
		progress *= (1 + this.player.mightMod);
		if (this.player.status.fatigued) progress *= 0.6;
		return progress;
	}

	playerStatusAdjust()
	{
		this.player.status.loseStamina(5);
		let damage = 5;
		damage *= (1 + this.difficultyMod);
		this.player.status.loseHealth(damage);
	}
}

module.exports = { FightingObjective };
