const { Objective } = require('../Objective');

class CraftingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'craft';
	}
}

module.exports = { CraftingObjective };
