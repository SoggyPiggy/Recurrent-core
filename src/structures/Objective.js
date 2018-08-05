const { EventBase } = require('./Bases');

class Objective extends EventBase
{
	constructor(quest, data = {})
	{
		super(data);
		this.quest = quest;
		this.player = this.quest.chapter.player;
		this.progress = typeof data.progress !== 'undefined' ? data.progress : 0;
		this.end = typeof data.end !== 'undefined' ? data.end : this.generateEnd();
		this.rewards = typeof data.rewards !== 'undefined' ? data.rewards : this.generateRewards();
		this.rewarded = typeof data.rewarded !== 'undefined' ? data.rewarded : false;
		this.on('tick', () => this.tick());
		this.on('completed', () => this.reward());
	}

	get complete() { return this.progress >= this.end; }
	get completion() { return this.progress / this.end; }

	generateEnd()
	{
		return 1000;
	}

	generateRewards()
	{
		return {};
	}

	reward()
	{
		if (this.rewarded) return;
		if (typeof this.rewards.xp !== 'undefined')
		{
			this.player.experience.gain(this.rewards.xp);
		}
		this.rewarded = true;
	}

	advance()
	{
		return 100;
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
		data.rewarded = this.rewarded;
		return data;
	}
}

module.exports = { Objective };