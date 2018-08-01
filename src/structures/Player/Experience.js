class PlayerExperience
{
	constructor(player, data = {})
	{
		this.player = player;
		this.random = this.player.random;
		this.xp = typeof data.xp !== 'undefined' ? data.xp : 0;
	}

	get level() { return this.getLevel(this.xp); }
	get xpMod() { return this.player.attributes.insight / 171; }

	getLevel(xp)
	{
		return Math.floor(Math.pow(xp + 1, 2 / 5));
	}

	getXP(level)
	{
		return Math.ceil(Math.pow(level, 5 / 2) - 1);
	}

	gain(xp)
	{
		let baseXP = xp;
		let bonusXP = Math.round(xp * this.xpMod);
		let totalXP = baseXP + bonusXP;
		let preLevel = this.level;
		this.xp += totalXP;
		let postLevel = this.level;
		let levelsGained = postLevel - preLevel;
		if (postLevel > preLevel) this.player.emit('levelup', levelsGained, preLevel, postLevel, totalXP, baseXP, bonusXP);
	}

	compress()
	{
		let data = {};
		data.xp = this.xp;
		return xp;
	}
}

module.exports = { PlayerExperience };