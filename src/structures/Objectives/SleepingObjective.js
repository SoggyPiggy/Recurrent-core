const { Objective } = require('../Objective');

class SleepingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'sleep';
	}
}

module.exports = { SleepingObjective };
