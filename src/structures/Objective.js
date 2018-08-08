const { EventBase } = require('./Bases');

class Objective extends EventBase
{
	constructor(quest, data = {})
	{
		super(data);
		this.quest = quest;
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

	get player() { return this.quest.player; }
	get manager() { return this.quest.objectives; }
	get complete() { return this.progress >= this.end; }
	get completion() { return this.progress / this.end; }

	generateEnd()
	{
		return this.random.integer(750, 1250);
	}

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

	completionCheck()
	{
		if (!this.complete) return false;
		if (this.progress > this.end) this.progress = this.end;
		this.emit('completed');
		return true;
	}

	tick()
	{
		let progress = this.advance();
		this.progress += progress;
		this.completionCheck();
	}

	compress()
	{
		let data = super.compress();
		data.progress = this.progress;
		data.end = this.end;
		data.rewards = this.rewards;
		return data;
	}
}

module.exports = { Objective };