const { EventBase } = require('./Bases');
const { ObjectiveManager } = require('./../managers/ObjectiveManager');
const { Objective } = require('./Objective');

class Quest extends EventBase
{
	constructor(chapter, data = {})
	{
		super(data);
		this.chapter = chapter;
		this.type = 'base';
		this.objectives = new ObjectiveManager(this, data.objectives);
		this.rewards = typeof data.rewards !== 'undefined' ? data.rewards : this.generateRewards();
		if (!this.complete)
		{
			this.on('tick', () => this.tick());
			this.once('completed', () => this.removeAllListeners('tick'));
			this.once('completed', () => this.reward());
		}
	}

	get player() { return this.chapter.player; }
	get manager() { return this.chapter.quests; }
	get objective() { return this.objectives.objective; }
	get complete() { return this.objectives.complete; }
	get completion() { return this.objectives.completion; }

	generateObjectives()
	{
		let objectives = [];
		let count = this.random.integer(5, 8);
		for (let i = 0; i < count; i++)
		{
			objectives.push(new Objective(this));
		}
		return objectives;
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
	}

	completionCheck()
	{
		if (!this.complete) return false;
		this.emit('completed');
		this.once('tick', () => this.manager.newQuest());
		return true;
	}

	tick()
	{
		this.objectives.refreshCompletion();
		this.completionCheck();
	}

	compress()
	{
		let data = super.compress();
		data.type = this.type;
		data.objectives = this.objectives.compress();
		data.rewards = this.rewards;
		return data;
	}
}

module.exports = { Quest };