class Experience
{
	constructor(data = {})
	{
		this.xp = typeof data.xp !== 'undefined' ? data.xp : 0;
	}

	get level() { return this.getLevel(this.xp); }
	get levelCompletion() { return this.xpInCurrentLevel() / this.getXP(this.level); }

	getLevel(xp)
	{
		return Math.floor(xp / 100);
	}

	getXPTotal(level)
	{
		return Math.ceil(level * 100);
	}

	getXP(level)
	{
		return this.getXPTotal(level) - this.getXPTotal(level - 1);
	}

	bonusXP(xp)
	{
		return 0;
	}

	xpInCurrentLevel()
	{
		return this.xp - this.getXPTotal(this.level);
	}

	xpRequiredForLevel()
	{
		return this.getXPTotal(this.level + 1) - this.xp;
	}

	gain(xp)
	{
		let baseXP = xp;
		let bonusXP = this.bonusXP(xp);
		let totalXP = baseXP + bonusXP;
		let preLevel = this.level;
		this.xp += totalXP;
		let postLevel = this.level;
		return { preLevel, postLevel, totalXP, baseXP, bonusXP };
	}

	compress()
	{
		let data = {};
		data.xp = this.xp;
		return data;
	}
}

module.exports = { Experience };