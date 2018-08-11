const { Objective } = require('../Objective');

class SearchingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'search';
	}
}

module.exports = { SearchingObjective };
