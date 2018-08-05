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
		this.on('tick', () => this.tick());
	}

	get objective() { return this.objectives.objective; };
	get complete() { return this.objectives.complete; };
	get completion() { return this.objectives.completion; };

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

	completionCheck()
	{
		if (!this.complete) return false;
		this.emit('completed');
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
		return data;
	}
}

module.exports = { Quest };