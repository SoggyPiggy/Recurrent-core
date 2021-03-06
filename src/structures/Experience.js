const { Base } = require('./Bases');

class Experience extends Base
{
	constructor(data = {})
	{
		super();
		this.xp = typeof data.xp !== 'undefined' ? data.xp : 0;
	}

	get level()
	{
		return this.getLevel(this.xp);
	}

	get levelCompletion()
	{
		return this.xpInCurrentLevel() / this.getXP(this.level);
	}

	// eslint-disable-next-line class-methods-use-this
	getLevel(xp)
	{
		return Math.floor(xp / 100);
	}

	// eslint-disable-next-line class-methods-use-this
	getXPTotal(level)
	{
		return Math.ceil(level * 100);
	}

	getXP(level)
	{
		return this.getXPTotal(level) - this.getXPTotal(level - 1);
	}

	// eslint-disable-next-line class-methods-use-this
	bonusXP(xp)
	{
		return xp * 0;
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
		const baseXP = xp;
		const bonusXP = this.bonusXP(xp);
		const totalXP = baseXP + bonusXP;
		const preLevel = this.level;
		this.xp += totalXP;
		const postLevel = this.level;
		return {
			preLevel, postLevel, totalXP, baseXP, bonusXP,
		};
	}

	toString()
	{
		return `${this.level}:${this.xp}`;
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			'xp',
		];
	}
}

module.exports = { Experience };
