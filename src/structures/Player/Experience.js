class PlayerExperience
{
	constructor(player, data = {})
	{
		this.player = player;
		this.random = this.player.random;
		this.xp = typeof data.xp !== 'undefined' ? data.xp : 0;
	}

	get level() { return Math.floor(Math.pow(this.xp, (2 / 5)) + 1); }
	get xpMod() { return this.player.attributes.insight / 171; }

	level()
	{
		return this.level;
	}

	gain(xp)
	{
		let baseXP = xp;
		let bonusXP = xp * this.xpMod;
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