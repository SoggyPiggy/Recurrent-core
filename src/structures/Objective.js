const { EventBase } = require('./Bases');

class Objective extends EventBase
{
	constructor(quest, data = {})
	{
		super(data);
		this.quest = quest;
		this.type = 'base';
		this.title = typeof data.title !== 'undefined' ? data.title : 'TITLE';
		this.description = typeof data.description !== 'undefined' ? data.description : 'DESCRIPTION';
		this.modifier = typeof data.modifier !== 'undefined' ? data.modifier : 1;
		this.progress = typeof data.progress !== 'undefined' ? data.progress : 0;
		this.end = typeof data.end !== 'undefined' ? data.end : this.generateEnd();
		this.rewards = typeof data.rewards !== 'undefined' ? data.rewards : this.generateRewards();
		if (!this.complete)
		{
			this.on('tick', () => this.tick());
			this.once('completed', () => this.removeAllListeners('tick'));
			this.once('completed', () => this.reward());
		}
	}

	get player()
	{
		return this.quest.player;
	}

	get manager()
	{
		return this.quest.objectives;
	}

	get level()
	{
		return this.quest.level;
	}

	get difficultyMod()
	{
		return this.level / 99;
	}

	get complete()
	{
		return this.progress >= this.end;
	}

	get completion()
	{
		return this.progress / this.end;
	}

	generateEnd()
	{
		return Math.round(this.random.integer(750, 1250) * this.modifier);
	}

	generateXPReward()
	{
		const levels = this.player.experience.level + (this.quest.chapter.game.mastery.level - 1);
		let xp = Math.floor((20 + levels) ** (3 / 4));
		xp = Math.round(xp * this.random.real(0.7, 1.1) * this.modifier);
		return xp;
	}

	// eslint-disable-next-line class-methods-use-this
	generateRewards()
	{
		return {};
	}

	reward()
	{
		if (typeof this.rewards.xp !== 'undefined')
		{
			this.player.experience.gain(this.rewards.xp);
		}
		this.rewarded = true;
	}

	advance()
	{
		return this.random.integer(75, 125);
	}

	// eslint-disable-next-line class-methods-use-this
	playerStatusAdjust()
	{}

	completionCheck()
	{
		if (!this.complete) return false;
		if (this.progress > this.end) this.progress = this.end;
		this.emit('completed');
		return true;
	}

	tick()
	{
		this.progress += Math.round(this.advance());
		this.completionCheck();
		this.playerStatusAdjust();
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			'type',
			'title',
			'description',
			'progress',
			'end',
			'rewards',
		];
	}
}

module.exports = { Objective };
