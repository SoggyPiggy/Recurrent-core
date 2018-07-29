const { EventBase } = require('./Bases');
const { ObjectiveManager } = require('./../managers/ObjectiveManager');
const { Objective } = require('./Objective');

class Quest extends EventBase
{
	constructor(chapter, data = {})
	{
		super(data);
		this.eventType = 'base';
		this.chapter = chapter;
		this.objectives = typeof data.objectives !== 'undefined' ? data.objectives : [];
		this.processObjectives();
	}

	get completed() { return this.objectives.length <= 0 ? true : this.objectives[this.objectives.length - 1].completed; }

	activeObjective()
	{
		if (this.completed) return null;
		for (let i = this.activeobjective; i < this.objectives.length - 1; i++)
		{
			this.activeobjective = i;
			if (!this.objectives[i].completed) return this.objectives[i];
		}
		return null;
	}

	processObjectives(data = null)
	{
		if (this.objectives.length) this.objectives = new ObjectiveManager(this.objectives);
		else
		{
			this.objectives = new ObjectiveManager();
			this.generateObjectives();
		}
	}

	generateObjectives()
	{
	}

	tick()
	{}

	compress()
	{
		let data = super.compress();
		data.eventType = this.eventType;
		return data;
	}
}