const { Objective } = require('../Objective');

class SearchingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'search';
	}

	generateRewards()
	{
		const xp = this.generateXPReward();
		return { xp };
	}
}

module.exports = { SearchingObjective };
