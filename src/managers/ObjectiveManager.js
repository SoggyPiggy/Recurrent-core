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
		this.bookmark = this.getFirstUncompleted();
	}

	get objective() { return this.getActiveObjective(); }
	get completed() { return this.isCompleted(); }
	
	getFirstUncompleted()
	{
		for (let i = 0; i < this.length; i++)
		{
			if (!this[i].completed) return i;
		}
		return 0;
	}

	getActiveObjective()
	{
		for (let i = this.bookmark; i < this.length; i++)
		{
			if (i !== this.bookmark) this.bookmark = i;
			if (!this[i].completed) return this[i];
		}
		return null;
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