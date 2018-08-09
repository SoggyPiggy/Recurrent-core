const { Objective } = require('./../structures/Objective');
const { FightingObjective } = require('./../structures/Objectives/FightingObjective');
const { RestingObjective } = require('./../structures/Objectives/RestingObjective');
const { GatheringObjective } = require('./../structures/Objectives/GatheringObjective');

class ObjectiveManager extends Array
{
	constructor(quest, data = [])
	{
		super(...data.map(objective => this.processObjective(quest, objective)));
		this.quest = quest;
		this._ = {};
		if (this.length <= 0) this.push(...quest.generateObjectives());
		this.refreshActiveObjective();
		this.refreshCompletion();
	}

	get objective()
	{
		return this._.activeobjective;
	}

	get complete()
	{
		return this[this.length - 1].complete;
	}

	get completion()
	{
		return this._.completion;
	}

	static processObjective(quest, objective)
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

	refreshActiveObjective()
	{
		this._.activeobjective = this.find(objective => !objective.complete);
		this.objective.once('completed', () => this.refreshActiveObjective());
	}

	refreshCompletion()
	{
		const total = this.reduce((accumulation, objective) => accumulation + objective.completion);
		const completion = total / this.length;
		this._.completion = !Number.isNaN(completion) ? completion : 0;
	}

	compress()
	{
		return this.map(objective => objective.compress());
	}
}

module.exports = { ObjectiveManager };
