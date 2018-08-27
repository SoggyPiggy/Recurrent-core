const { Objective } = require('../Objective');

class TravelingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'travel';
	}
}

module.exports = { TravelingObjective };
