const { EventIDBase } = require('./Bases');
const { ObjectiveManager } = require('./../managers/ObjectiveManager');
const { Objective } = require('./Objective');

class Quest extends EventIDBase
{
	constructor(chapter, data = {})
	{
		super(data);
		this.chapter = chapter;
		this.type = 'base';
		this.level = this.player.experience.level;
		this.objectives = new ObjectiveManager(this, data.objectives);
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
		return this.chapter.player;
	}

	get manager()
	{
		return this.chapter.quests;
	}

	get objective()
	{
		return this.objectives.objective;
	}

	get complete()
	{
		return this.objectives.complete;
	}

	get completion()
	{
		return this.objectives.completion;
	}

	generateObjectives()
	{
		const objectives = [];
		const count = this.random.integer(5, 8);
		for (let i = 0; i < count; i += 1)
		{
			objectives.push(new Objective(this));
		}
		return objectives;
	}

	generateXPReward()
	{
		const levels = this.player.experience.level + (this.chapter.game.mastery.level - 1);
		let xp = Math.floor((20 + levels) ** (3 / 4));
		xp = Math.round(xp * this.random.real(0.3, 0.5));
		return xp;
	}

	generateRewards()
	{
		const xp = this.generateXPReward();
		return { xp };
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

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			'type',
			'objectives',
			'rewards',
		];
	}
}

module.exports = { Quest };
