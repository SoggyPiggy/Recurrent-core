const { ManagerBase } = require('./../structures/Bases');
const { Objective } = require('./../structures/Objective');
const { FightingObjective } = require('./../structures/Objectives/FightingObjective');
const { RestingObjective } = require('./../structures/Objectives/RestingObjective');
const { GatheringObjective } = require('./../structures/Objectives/GatheringObjective');

class ObjectiveManager extends ManagerBase
{
	constructor(quest, data = [])
	{
		super(data, quest);
		if (this.items.length <= 0) this.items.push(...quest.generateObjectives());
		this.refreshActiveObjective();
		this.refreshCompletion();
	}

	get quest()
	{
		return this.parent;
	}

	get objective()
	{
		return this.activeObjective;
	}

	get complete()
	{
		return this.items[this.items.length - 1].complete;
	}

	refreshActiveObjective()
	{
		const nextObjective = this.items.find(objective => !objective.complete);
		if (nextObjective)
		{
			this.activeObjective = nextObjective;
			nextObjective.once('completed', () => this.refreshActiveObjective());
		}
	}

	refreshCompletion()
	{
		const total = this.items.reduce((sum, objective) => sum + objective.completion, 0);
		const completion = total / this.items.length;
		this.completion = !Number.isNaN(completion) ? completion : 0;
	}

	processItem(objective)
	{
		if (objective instanceof Objective) return objective;
		switch (objective.type)
		{
			case 'fight': return new FightingObjective(this.quest, objective);
			case 'rest': return new RestingObjective(this.quest, objective);
			case 'gather': return new GatheringObjective(this.quest, objective);
			default: return new Objective(this.quest, objective);
		}
	}
}

module.exports = { ObjectiveManager };
