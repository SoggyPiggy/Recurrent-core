const { Base } = require('./../structures/Bases');
const { Objective } = require('./../structures/Objective');
const { FightingObjective } = require('./../structures/Objectives/FightingObjective');
const { RestingObjective } = require('./../structures/Objectives/RestingObjective');
const { GatheringObjective } = require('./../structures/Objectives/GatheringObjective');

class ObjectiveManager extends Base
{
	constructor(quest, data = [])
	{
		super();
		this.quest = quest;
		this.items = [...data.map(objective => ObjectiveManager.process(quest, objective))];
		if (this.items.length <= 0) this.items.push(...quest.generateObjectives());
		this.refreshActiveObjective();
		this.refreshCompletion();
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

	toJSON()
	{
		return this.items.map(objective => objective.toJSON());
	}

	static process(quest, objective)
	{
		if (objective instanceof Objective) return objective;
		switch (objective.type)
		{
			case 'fight': return new FightingObjective(quest, objective);
			case 'rest': return new RestingObjective(quest, objective);
			case 'gather': return new GatheringObjective(quest, objective);
			default: return new Objective(quest, objective);
		}
	}
}

module.exports = { ObjectiveManager };
