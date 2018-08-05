const { Objective } = require('../Objective');

class FightingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
	}
}

module.exports = { FightingObjective };