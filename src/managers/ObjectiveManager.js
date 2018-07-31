const { Objective } = require('./../structures/Objective');
const { FightingObjective } = require('./../structures/Objectives/FightingObjective');

class ObjectiveManager extends Array
{
	constructor(chapter, data = [])
	{
		if (!Array.isArray(data)) data = [];
		for (let i = 0; i < data.length; i++)
		{
			if (data[i] instanceof Objective) continue;
			switch (data[i].type)
			{
				case 'fight': break;
				default: break;
			}
		}
		super(...data);
	}

	get objective() { return this.getActiveObjective(); }
	get completed() { return this.isCompleted(); }

	getActiveObjective()
	{
		for (let objective of this)
		{
			if (!objective.completed) return objective;
		}
	}

	isCompleted()
	{
		for (let objective of tihs)
		{
			if (!objective.completed) return false;
		}
		return true;
	}
}

module.exports = { ObjectiveManager };