const { Objective } = require('./../structures/Objective');
const { FightingObjective } = require('./../structures/Objectives/FightingObjective');

class ObjectiveManager extends Array
{
	constructor(quest, data = [])
	{
		if (!Array.isArray(data)) data = [];
		for (let i = 0; i < data.length; i++)
		{
			if (data[i] instanceof Objective) continue;
			switch (data[i].type)
			{
				case 'fight': data[i] = new FightingObjective(quest, data[i]); break;
				default: data[i] = new Objective(quest, data[i]); break;
			}
		}
		super(...data);
		this.quest = quest;
		if (this.length <= 0) this.push(...quest.generateObjectives());
		this.refreshActiveObjective();
		this.refreshCompletion();
		this.objective.once('completed', () => this.refreshActiveObjective());
	}

	get objective() { return this._activeobjective; }
	get complete() { return this[this.length - 1].complete; }
	get completion() { return this._completion; }

	refreshActiveObjective()
	{
		for (let objective of this)
		{
			if (!objective.complete)
			{
				this._activeobjective = objective;
				return;
			}
		}
		this._activeobjective = this[0];
	}

	refreshCompletion()
	{
		let total = 0;
		for (let objective of this)
		{
			total += objective.completion;
		}
		let completion = total / this.length;
		this._completion = completion !== NaN ? completion : 0;
	}

	compress()
	{
		let data = [];
		for (let objective of this)
		{
			data.push(objective.compress());
		}
		return data;
	}
}

module.exports = { ObjectiveManager };